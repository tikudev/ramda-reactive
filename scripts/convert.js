import { concat, pipe } from 'ramda'
import {
  canBeFunction,
  capitalizeFirstLetter,
  prependStar,
  reservedWords,
} from './str.js'
import { ramdaReactivePrefix } from './constants.js'

export const convertFnName = pipe(
  capitalizeFirstLetter,
  concat(ramdaReactivePrefix)
)

const paramTypeToWrapper = type => {
  return canBeFunction(type) ? 'MaybeRef' : 'MaybeWatchSource'
}

export const jsDocPropsToSingleLine = comment => {
  const comments = comment.replace(/  +/g, ' ')

  const [desc, ...rest] = comments.split('\n * @')
  const processed = rest.map(
    s => s.replaceAll('\n', ' ').replaceAll(' * ', '') + ' '
  )
  return desc + '\n' + processed.map(s => ' * @' + s).join('\n')
}
const cleanParamName = pName => {
  if (startsWithDots(pName)) pName = pName.substring(3)
  return reservedWords.includes(pName) ? `_${pName}` : pName
}
const startsWithDots = str => str.substring(0, 3) === '...'
export const parseJsDocParam = jsDocParam => {
  const type = jsDocParam.type
  const isVarArgs = startsWithDots(type)
  return {
    isVarArgs,
    type: isVarArgs ? type.substring(3) : type,
    name: cleanParamName(jsDocParam.name),
  }
}

export const reactifyParsedJsDocParam = parsedJSDocParam => ({
  ...parsedJSDocParam,
  type: paramTypeToReactive(parsedJSDocParam.type),
})

const getReactiveParamType = jsDocParam => {
  const isVarArgs = jsDocParam.type.substring(0, 3) === '...'
  if (isVarArgs) {
    const type = jsDocParam.type.substring(3)
    return `...import('./types').${paramTypeToWrapper(type)}<${type}>`
  }

  return `import('./types').${paramTypeToWrapper(jsDocParam.type)}<${
    jsDocParam.type
  }>`
}

export const createJSDoc = parsedJSDoc => {
  const description = prependStar(parsedJSDoc.description?.value)
  const params = parsedJSDoc.param
    .map(
      p =>
        ` * ${p.tag} {${getReactiveParamType(p)}} ${p.name} ${
          p.description ?? ''
        }\n`
    )
    .join('')

  const parsedReturn = parsedJSDoc.return
  const returnStr = ` * ${parsedReturn.tag} {import('vue').ComputedRef<${
    parsedReturn.type
  }>} ${parsedReturn.description ?? ''}\n`
  return `/**\n${description}\n *\n${params}${returnStr}*/\n`
}

export const paramTypeToReactive = type =>
  `${paramTypeToWrapper(type)}<${type}>`

const preprocessArgument = ({ type, name, isVarArgs }) => {
  const varArgName = 'varArg'
  const innerArgumentName = isVarArgs ? varArgName : name

  /**
   * if type can be function wrap the function with unrefs
   * to allow compositions with use
   *
   * if type can not be function but a function is given
   * then it is probably a function which returns a reactive obj
   * so call it
   */
  const handleFnStr = canBeFunction(type)
    ? `(...fnArgs) => unref(unref(${innerArgumentName})(...fnArgs))`
    : `${innerArgumentName}()`

  const reactiveArgument = `typeof ${innerArgumentName} === 'function' ? ${handleFnStr} : unref(${innerArgumentName})`

  if (isVarArgs) {
    return `...${name}.map(${varArgName} => ${reactiveArgument})`
  } else {
    return reactiveArgument
  }
}

export const reactifyFn = ({ original, reactive }, jsDoc = '') => {
  const usesCurry = original.params.length !== 1

  const imports = `import { computed, unref } from 'vue'\nimport { ${
    original.name
  }${
    usesCurry && original.name !== 'curryN' ? ', curryN' : ''
  } } from 'ramda'\n\n`

  const curry = usesCurry ? `curryN(${original.params.length},` : ''

  const fnStart = `const ${reactive.name} = ${curry}(${reactive.params
    .map(p => `${p.isVarArgs ? '...' : ''}${p.name}`)
    .join(', ')}) => computed(() => `

  const fnEnd = `${original.name}(${original.params
    .map(preprocessArgument)
    .join(', ')}))${usesCurry ? ')' : ''}\n\n`

  const exportStatement = `export default ${reactive.name}\n`

  const reactifiedCode = imports + jsDoc + fnStart + fnEnd + exportStatement
  return {
    reactifiedCode,
    imports,
    jsDoc,
    fn: fnStart + fnEnd,
    exportStatement,
  }
}
