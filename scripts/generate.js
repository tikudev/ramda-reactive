import { getCommentsFromFile, parse } from '../lib/parseJsDoc/index.js'
import {
  writeNewFiles,
  ramdaTypeDefFilePath,
  getRamdaFilesInfo,
} from './file.js'
import {
  convertFnName,
  createJSDoc,
  reactifyFn,
  jsDocPropsToSingleLine,
  parseJsDocParam,
  reactifyParsedJsDocParam,
} from './convert.js'
import { genTypes } from './types.js'

const getRamdaFnInfo = f => {
  const fnName = f.file.split('.')[0]

  const commentsWithoutPrivate = getCommentsFromFile(f.content).filter(
    c => !c.includes('* @private')
  )

  const comments = jsDocPropsToSingleLine(commentsWithoutPrivate.toString())

  const jsDoc = parse(comments, ['sig'])

  if (!jsDoc.param || jsDoc.param.length === 0) {
    return []
  }
  const desc = getFnDescription(fnName, jsDoc)

  const newContent = reactifyFn(desc, createJSDoc(jsDoc))

  return [
    {
      ...f,
      comments,
      fnName,
      jsDoc,
      desc,
      newContent,
    },
  ]
}

const generate = async () => {
  const filesInfo = await getRamdaFilesInfo()
  const ramdaFnsInfo = filesInfo.flatMap(getRamdaFnInfo)
  const ramdaReactiveTypesCode = genTypes(ramdaTypeDefFilePath, ramdaFnsInfo)

  writeNewFiles(ramdaFnsInfo, ramdaReactiveTypesCode)
}

const getFnDescription = (oldFnName, parsedJsDoc) => {
  const jsDocParams = parsedJsDoc.param ?? []

  const parsedJsDocParams = jsDocParams.map(parseJsDocParam)
  const out = {
    original: {
      name: oldFnName,
      params: parsedJsDocParams,
      returnType: parsedJsDoc.return.type,
    },
    reactive: {
      name: convertFnName(oldFnName),
      params: parsedJsDocParams.map(reactifyParsedJsDocParam),
      returnType: `ComputedRef<${parsedJsDoc.return.type}>`,
    },
  }

  return out
}

generate()
