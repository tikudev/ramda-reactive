import * as R from 'ramda'
import fs from 'fs'

const ramdaExports = Object.keys(R)

const firstParamPredicate = [
  'all',
  'any',
  'comparator',
  'count',
  'differenceWith',
  'dropLastWhile',
  'dropRepeatsWith',
  'dropWhile',
  'filter',
  'find',
  'findIndex',
  'findLast',
  'findLastIndex',
  'groupWith',
  'ifElse',
  'innerJoin',
  'none',
  'partition',
  'pathSatisfies',
  'pickBy',
  'propSatisfies',
  'reduceWhile',
  'reject',
  'sortBy',
  'splitWhen',
  'splitWhenever',
  'symmetricDifferenceWith',
  'takeLastWhile',
  'takeWhile',
  'unionWith',
  'uniqWith',
  'unless',
  'until',
  'when',
  'zipWith',
]
const firstParamListOfPredicate = ['allPass', 'anyPass']
const allParamsPredicate = ['both', 'either']
const excludedExports = ['__', 'always', 'T', 'F']
const relevantExports = R.without(excludedExports, ramdaExports)

const specialExports = [
  ...firstParamListOfPredicate,
  ...firstParamPredicate,
  ...allParamsPredicate,
  ...excludedExports,
]

const otherExports = R.without(specialExports, ramdaExports)

const generateImports = () => `import { computed, unref } from 'vue-demi'
import {${relevantExports.join(', ')}} from 'ramda'

const reactifyCurried = fn => curryN(fn.length, (...args) => computed(() => fn.apply(undefined, args.map(unref))))


const unrefFirstParamPredicate =
  fn =>
  (pred, ...rest) =>
    fn((...predArgs) => unref(pred(...predArgs)), ...rest)

const unrefFirstParamListPredicate =
  fn =>
  (predList, ...rest) =>
    fn(
      predList.map(
        pred =>
          (...predArgs) =>
            unref(pred(...predArgs))
      ),
      ...rest
    )

const unrefAllParamPredicate =
  fn =>
  (...params) =>
    fn(
      ...params.map(
        pred =>
          (...predArgs) =>
            unref(pred(...predArgs))
      )
    )
`
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const reactifyOther = fnName =>
  `export const use${capitalizeFirstLetter(
    fnName
  )} = reactifyCurried(${fnName})`

const reactifyFirstParamPred = fnName =>
  `export const use${capitalizeFirstLetter(
    fnName
  )} = reactifyCurried(unrefFirstParamPredicate(${fnName}))`

const reactifyFirstParamListPred = fnName =>
  `export const use${capitalizeFirstLetter(
    fnName
  )} = reactifyCurried(unrefFirstParamListPredicate(${fnName}))`

const reactifyAllParamsPred = fnName =>
  `export const use${capitalizeFirstLetter(
    fnName
  )} = reactifyCurried(unrefAllParamPredicate(${fnName}))`

const generateFile = () => {
  return `
${generateImports()}


${otherExports.map(reactifyOther).join('\n')}

${firstParamPredicate.map(reactifyFirstParamPred).join('\n')}

${firstParamListOfPredicate.map(reactifyFirstParamListPred).join('\n')}

${allParamsPredicate.map(reactifyAllParamsPred).join('\n')}
  `
}

fs.writeFileSync('./src/index.js', generateFile())
