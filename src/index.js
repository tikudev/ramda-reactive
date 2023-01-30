import { computed, unref } from 'vue-demi'
import {
  add,
  addIndex,
  adjust,
  all,
  allPass,
  and,
  andThen,
  any,
  anyPass,
  ap,
  aperture,
  append,
  apply,
  applySpec,
  applyTo,
  ascend,
  assoc,
  assocPath,
  binary,
  bind,
  both,
  call,
  chain,
  clamp,
  clone,
  collectBy,
  comparator,
  complement,
  compose,
  composeWith,
  concat,
  cond,
  construct,
  constructN,
  converge,
  count,
  countBy,
  curry,
  curryN,
  dec,
  defaultTo,
  descend,
  difference,
  differenceWith,
  dissoc,
  dissocPath,
  divide,
  drop,
  dropLast,
  dropLastWhile,
  dropRepeats,
  dropRepeatsWith,
  dropWhile,
  either,
  empty,
  endsWith,
  eqBy,
  eqProps,
  equals,
  evolve,
  filter,
  find,
  findIndex,
  findLast,
  findLastIndex,
  flatten,
  flip,
  forEach,
  forEachObjIndexed,
  fromPairs,
  groupBy,
  groupWith,
  gt,
  gte,
  has,
  hasIn,
  hasPath,
  head,
  identical,
  identity,
  ifElse,
  inc,
  includes,
  indexBy,
  indexOf,
  init,
  innerJoin,
  insert,
  insertAll,
  intersection,
  intersperse,
  into,
  invert,
  invertObj,
  invoker,
  is,
  isEmpty,
  isNil,
  join,
  juxt,
  keys,
  keysIn,
  last,
  lastIndexOf,
  length,
  lens,
  lensIndex,
  lensPath,
  lensProp,
  lift,
  liftN,
  lt,
  lte,
  map,
  mapAccum,
  mapAccumRight,
  mapObjIndexed,
  match,
  mathMod,
  max,
  maxBy,
  mean,
  median,
  memoizeWith,
  mergeAll,
  mergeDeepLeft,
  mergeDeepRight,
  mergeDeepWith,
  mergeDeepWithKey,
  mergeLeft,
  mergeRight,
  mergeWith,
  mergeWithKey,
  min,
  minBy,
  modify,
  modifyPath,
  modulo,
  move,
  multiply,
  nAry,
  negate,
  none,
  not,
  nth,
  nthArg,
  o,
  objOf,
  of,
  omit,
  on,
  once,
  or,
  otherwise,
  over,
  pair,
  partial,
  partialObject,
  partialRight,
  partition,
  path,
  pathEq,
  pathOr,
  pathSatisfies,
  paths,
  pick,
  pickAll,
  pickBy,
  pipe,
  pipeWith,
  pluck,
  prepend,
  product,
  project,
  promap,
  prop,
  propEq,
  propIs,
  propOr,
  propSatisfies,
  props,
  range,
  reduce,
  reduceBy,
  reduceRight,
  reduceWhile,
  reduced,
  reject,
  remove,
  repeat,
  replace,
  reverse,
  scan,
  sequence,
  set,
  slice,
  sort,
  sortBy,
  sortWith,
  split,
  splitAt,
  splitEvery,
  splitWhen,
  splitWhenever,
  startsWith,
  subtract,
  sum,
  symmetricDifference,
  symmetricDifferenceWith,
  tail,
  take,
  takeLast,
  takeLastWhile,
  takeWhile,
  tap,
  test,
  thunkify,
  times,
  toLower,
  toPairs,
  toPairsIn,
  toString,
  toUpper,
  transduce,
  transpose,
  traverse,
  trim,
  tryCatch,
  type,
  unapply,
  unary,
  uncurryN,
  unfold,
  union,
  unionWith,
  uniq,
  uniqBy,
  uniqWith,
  unless,
  unnest,
  until,
  unwind,
  update,
  useWith,
  values,
  valuesIn,
  view,
  when,
  where,
  whereAny,
  whereEq,
  without,
  xor,
  xprod,
  zip,
  zipObj,
  zipWith,
} from 'ramda'

const reactifyCurried = fn =>
  curryN(fn.length, (...args) =>
    computed(() => fn.apply(undefined, args.map(unref)))
  )

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

export const useAdd = reactifyCurried(add)
export const useAddIndex = reactifyCurried(addIndex)
export const useAdjust = reactifyCurried(adjust)
export const useAnd = reactifyCurried(and)
export const useAndThen = reactifyCurried(andThen)
export const useAp = reactifyCurried(ap)
export const useAperture = reactifyCurried(aperture)
export const useAppend = reactifyCurried(append)
export const useApply = reactifyCurried(apply)
export const useApplySpec = reactifyCurried(applySpec)
export const useApplyTo = reactifyCurried(applyTo)
export const useAscend = reactifyCurried(ascend)
export const useAssoc = reactifyCurried(assoc)
export const useAssocPath = reactifyCurried(assocPath)
export const useBinary = reactifyCurried(binary)
export const useBind = reactifyCurried(bind)
export const useCall = reactifyCurried(call)
export const useChain = reactifyCurried(chain)
export const useClamp = reactifyCurried(clamp)
export const useClone = reactifyCurried(clone)
export const useCollectBy = reactifyCurried(collectBy)
export const useComplement = reactifyCurried(complement)
export const useCompose = reactifyCurried(compose)
export const useComposeWith = reactifyCurried(composeWith)
export const useConcat = reactifyCurried(concat)
export const useCond = reactifyCurried(cond)
export const useConstruct = reactifyCurried(construct)
export const useConstructN = reactifyCurried(constructN)
export const useConverge = reactifyCurried(converge)
export const useCountBy = reactifyCurried(countBy)
export const useCurry = reactifyCurried(curry)
export const useCurryN = reactifyCurried(curryN)
export const useDec = reactifyCurried(dec)
export const useDefaultTo = reactifyCurried(defaultTo)
export const useDescend = reactifyCurried(descend)
export const useDifference = reactifyCurried(difference)
export const useDissoc = reactifyCurried(dissoc)
export const useDissocPath = reactifyCurried(dissocPath)
export const useDivide = reactifyCurried(divide)
export const useDrop = reactifyCurried(drop)
export const useDropLast = reactifyCurried(dropLast)
export const useDropRepeats = reactifyCurried(dropRepeats)
export const useEmpty = reactifyCurried(empty)
export const useEndsWith = reactifyCurried(endsWith)
export const useEqBy = reactifyCurried(eqBy)
export const useEqProps = reactifyCurried(eqProps)
export const useEquals = reactifyCurried(equals)
export const useEvolve = reactifyCurried(evolve)
export const useFlatten = reactifyCurried(flatten)
export const useFlip = reactifyCurried(flip)
export const useForEach = reactifyCurried(forEach)
export const useForEachObjIndexed = reactifyCurried(forEachObjIndexed)
export const useFromPairs = reactifyCurried(fromPairs)
export const useGroupBy = reactifyCurried(groupBy)
export const useGt = reactifyCurried(gt)
export const useGte = reactifyCurried(gte)
export const useHas = reactifyCurried(has)
export const useHasIn = reactifyCurried(hasIn)
export const useHasPath = reactifyCurried(hasPath)
export const useHead = reactifyCurried(head)
export const useIdentical = reactifyCurried(identical)
export const useIdentity = reactifyCurried(identity)
export const useInc = reactifyCurried(inc)
export const useIncludes = reactifyCurried(includes)
export const useIndexBy = reactifyCurried(indexBy)
export const useIndexOf = reactifyCurried(indexOf)
export const useInit = reactifyCurried(init)
export const useInsert = reactifyCurried(insert)
export const useInsertAll = reactifyCurried(insertAll)
export const useIntersection = reactifyCurried(intersection)
export const useIntersperse = reactifyCurried(intersperse)
export const useInto = reactifyCurried(into)
export const useInvert = reactifyCurried(invert)
export const useInvertObj = reactifyCurried(invertObj)
export const useInvoker = reactifyCurried(invoker)
export const useIs = reactifyCurried(is)
export const useIsEmpty = reactifyCurried(isEmpty)
export const useIsNil = reactifyCurried(isNil)
export const useJoin = reactifyCurried(join)
export const useJuxt = reactifyCurried(juxt)
export const useKeys = reactifyCurried(keys)
export const useKeysIn = reactifyCurried(keysIn)
export const useLast = reactifyCurried(last)
export const useLastIndexOf = reactifyCurried(lastIndexOf)
export const useLength = reactifyCurried(length)
export const useLens = reactifyCurried(lens)
export const useLensIndex = reactifyCurried(lensIndex)
export const useLensPath = reactifyCurried(lensPath)
export const useLensProp = reactifyCurried(lensProp)
export const useLift = reactifyCurried(lift)
export const useLiftN = reactifyCurried(liftN)
export const useLt = reactifyCurried(lt)
export const useLte = reactifyCurried(lte)
export const useMap = reactifyCurried(map)
export const useMapAccum = reactifyCurried(mapAccum)
export const useMapAccumRight = reactifyCurried(mapAccumRight)
export const useMapObjIndexed = reactifyCurried(mapObjIndexed)
export const useMatch = reactifyCurried(match)
export const useMathMod = reactifyCurried(mathMod)
export const useMax = reactifyCurried(max)
export const useMaxBy = reactifyCurried(maxBy)
export const useMean = reactifyCurried(mean)
export const useMedian = reactifyCurried(median)
export const useMemoizeWith = reactifyCurried(memoizeWith)
export const useMergeAll = reactifyCurried(mergeAll)
export const useMergeDeepLeft = reactifyCurried(mergeDeepLeft)
export const useMergeDeepRight = reactifyCurried(mergeDeepRight)
export const useMergeDeepWith = reactifyCurried(mergeDeepWith)
export const useMergeDeepWithKey = reactifyCurried(mergeDeepWithKey)
export const useMergeLeft = reactifyCurried(mergeLeft)
export const useMergeRight = reactifyCurried(mergeRight)
export const useMergeWith = reactifyCurried(mergeWith)
export const useMergeWithKey = reactifyCurried(mergeWithKey)
export const useMin = reactifyCurried(min)
export const useMinBy = reactifyCurried(minBy)
export const useModify = reactifyCurried(modify)
export const useModifyPath = reactifyCurried(modifyPath)
export const useModulo = reactifyCurried(modulo)
export const useMove = reactifyCurried(move)
export const useMultiply = reactifyCurried(multiply)
export const useNAry = reactifyCurried(nAry)
export const useNegate = reactifyCurried(negate)
export const useNot = reactifyCurried(not)
export const useNth = reactifyCurried(nth)
export const useNthArg = reactifyCurried(nthArg)
export const useO = reactifyCurried(o)
export const useObjOf = reactifyCurried(objOf)
export const useOf = reactifyCurried(of)
export const useOmit = reactifyCurried(omit)
export const useOn = reactifyCurried(on)
export const useOnce = reactifyCurried(once)
export const useOr = reactifyCurried(or)
export const useOtherwise = reactifyCurried(otherwise)
export const useOver = reactifyCurried(over)
export const usePair = reactifyCurried(pair)
export const usePartial = reactifyCurried(partial)
export const usePartialObject = reactifyCurried(partialObject)
export const usePartialRight = reactifyCurried(partialRight)
export const usePath = reactifyCurried(path)
export const usePathEq = reactifyCurried(pathEq)
export const usePathOr = reactifyCurried(pathOr)
export const usePaths = reactifyCurried(paths)
export const usePick = reactifyCurried(pick)
export const usePickAll = reactifyCurried(pickAll)
export const usePipe = reactifyCurried(pipe)
export const usePipeWith = reactifyCurried(pipeWith)
export const usePluck = reactifyCurried(pluck)
export const usePrepend = reactifyCurried(prepend)
export const useProduct = reactifyCurried(product)
export const useProject = reactifyCurried(project)
export const usePromap = reactifyCurried(promap)
export const useProp = reactifyCurried(prop)
export const usePropEq = reactifyCurried(propEq)
export const usePropIs = reactifyCurried(propIs)
export const usePropOr = reactifyCurried(propOr)
export const useProps = reactifyCurried(props)
export const useRange = reactifyCurried(range)
export const useReduce = reactifyCurried(reduce)
export const useReduceBy = reactifyCurried(reduceBy)
export const useReduceRight = reactifyCurried(reduceRight)
export const useReduced = reactifyCurried(reduced)
export const useRemove = reactifyCurried(remove)
export const useRepeat = reactifyCurried(repeat)
export const useReplace = reactifyCurried(replace)
export const useReverse = reactifyCurried(reverse)
export const useScan = reactifyCurried(scan)
export const useSequence = reactifyCurried(sequence)
export const useSet = reactifyCurried(set)
export const useSlice = reactifyCurried(slice)
export const useSort = reactifyCurried(sort)
export const useSortWith = reactifyCurried(sortWith)
export const useSplit = reactifyCurried(split)
export const useSplitAt = reactifyCurried(splitAt)
export const useSplitEvery = reactifyCurried(splitEvery)
export const useStartsWith = reactifyCurried(startsWith)
export const useSubtract = reactifyCurried(subtract)
export const useSum = reactifyCurried(sum)
export const useSymmetricDifference = reactifyCurried(symmetricDifference)
export const useTail = reactifyCurried(tail)
export const useTake = reactifyCurried(take)
export const useTakeLast = reactifyCurried(takeLast)
export const useTap = reactifyCurried(tap)
export const useTest = reactifyCurried(test)
export const useThunkify = reactifyCurried(thunkify)
export const useTimes = reactifyCurried(times)
export const useToLower = reactifyCurried(toLower)
export const useToPairs = reactifyCurried(toPairs)
export const useToPairsIn = reactifyCurried(toPairsIn)
export const useToString = reactifyCurried(toString)
export const useToUpper = reactifyCurried(toUpper)
export const useTransduce = reactifyCurried(transduce)
export const useTranspose = reactifyCurried(transpose)
export const useTraverse = reactifyCurried(traverse)
export const useTrim = reactifyCurried(trim)
export const useTryCatch = reactifyCurried(tryCatch)
export const useType = reactifyCurried(type)
export const useUnapply = reactifyCurried(unapply)
export const useUnary = reactifyCurried(unary)
export const useUncurryN = reactifyCurried(uncurryN)
export const useUnfold = reactifyCurried(unfold)
export const useUnion = reactifyCurried(union)
export const useUniq = reactifyCurried(uniq)
export const useUniqBy = reactifyCurried(uniqBy)
export const useUnnest = reactifyCurried(unnest)
export const useUnwind = reactifyCurried(unwind)
export const useUpdate = reactifyCurried(update)
export const useUseWith = reactifyCurried(useWith)
export const useValues = reactifyCurried(values)
export const useValuesIn = reactifyCurried(valuesIn)
export const useView = reactifyCurried(view)
export const useWhere = reactifyCurried(where)
export const useWhereAny = reactifyCurried(whereAny)
export const useWhereEq = reactifyCurried(whereEq)
export const useWithout = reactifyCurried(without)
export const useXor = reactifyCurried(xor)
export const useXprod = reactifyCurried(xprod)
export const useZip = reactifyCurried(zip)
export const useZipObj = reactifyCurried(zipObj)

export const useAll = reactifyCurried(unrefFirstParamPredicate(all))
export const useAny = reactifyCurried(unrefFirstParamPredicate(any))
export const useComparator = reactifyCurried(
  unrefFirstParamPredicate(comparator)
)
export const useCount = reactifyCurried(unrefFirstParamPredicate(count))
export const useDifferenceWith = reactifyCurried(
  unrefFirstParamPredicate(differenceWith)
)
export const useDropLastWhile = reactifyCurried(
  unrefFirstParamPredicate(dropLastWhile)
)
export const useDropRepeatsWith = reactifyCurried(
  unrefFirstParamPredicate(dropRepeatsWith)
)
export const useDropWhile = reactifyCurried(unrefFirstParamPredicate(dropWhile))
export const useFilter = reactifyCurried(unrefFirstParamPredicate(filter))
export const useFind = reactifyCurried(unrefFirstParamPredicate(find))
export const useFindIndex = reactifyCurried(unrefFirstParamPredicate(findIndex))
export const useFindLast = reactifyCurried(unrefFirstParamPredicate(findLast))
export const useFindLastIndex = reactifyCurried(
  unrefFirstParamPredicate(findLastIndex)
)
export const useGroupWith = reactifyCurried(unrefFirstParamPredicate(groupWith))
export const useIfElse = reactifyCurried(unrefFirstParamPredicate(ifElse))
export const useInnerJoin = reactifyCurried(unrefFirstParamPredicate(innerJoin))
export const useNone = reactifyCurried(unrefFirstParamPredicate(none))
export const usePartition = reactifyCurried(unrefFirstParamPredicate(partition))
export const usePathSatisfies = reactifyCurried(
  unrefFirstParamPredicate(pathSatisfies)
)
export const usePickBy = reactifyCurried(unrefFirstParamPredicate(pickBy))
export const usePropSatisfies = reactifyCurried(
  unrefFirstParamPredicate(propSatisfies)
)
export const useReduceWhile = reactifyCurried(
  unrefFirstParamPredicate(reduceWhile)
)
export const useReject = reactifyCurried(unrefFirstParamPredicate(reject))
export const useSortBy = reactifyCurried(unrefFirstParamPredicate(sortBy))
export const useSplitWhen = reactifyCurried(unrefFirstParamPredicate(splitWhen))
export const useSplitWhenever = reactifyCurried(
  unrefFirstParamPredicate(splitWhenever)
)
export const useSymmetricDifferenceWith = reactifyCurried(
  unrefFirstParamPredicate(symmetricDifferenceWith)
)
export const useTakeLastWhile = reactifyCurried(
  unrefFirstParamPredicate(takeLastWhile)
)
export const useTakeWhile = reactifyCurried(unrefFirstParamPredicate(takeWhile))
export const useUnionWith = reactifyCurried(unrefFirstParamPredicate(unionWith))
export const useUniqWith = reactifyCurried(unrefFirstParamPredicate(uniqWith))
export const useUnless = reactifyCurried(unrefFirstParamPredicate(unless))
export const useUntil = reactifyCurried(unrefFirstParamPredicate(until))
export const useWhen = reactifyCurried(unrefFirstParamPredicate(when))
export const useZipWith = reactifyCurried(unrefFirstParamPredicate(zipWith))

export const useAllPass = reactifyCurried(unrefFirstParamListPredicate(allPass))
export const useAnyPass = reactifyCurried(unrefFirstParamListPredicate(anyPass))

export const useBoth = reactifyCurried(unrefAllParamPredicate(both))
export const useEither = reactifyCurried(unrefAllParamPredicate(either))
