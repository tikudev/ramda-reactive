import { computed, unref } from 'vue'
import {
  add,
  adjust,
  all,
  allPass,
  and,
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

const unrefFirstParam =
  fn =>
  (first, ...rest) =>
    fn((...innerFnArgs) => unref(first(...innerFnArgs)), ...rest)

const unrefSecondParam =
  fn =>
  (first, second, ...rest) =>
    fn(first, (...innerFnArgs) => unref(second(...innerFnArgs)), ...rest)

const unrefFirstParamList =
  fn =>
  (predList, ...rest) =>
    fn(
      predList.map(
        pred =>
          (...innerFnArgs) =>
            unref(pred(...innerFnArgs))
      ),
      ...rest
    )

const unrefAllParams =
  fn =>
  (...params) =>
    fn(
      ...params.map(
        pred =>
          (...innerFnArgs) =>
            unref(pred(...innerFnArgs))
      )
    )

/**
 * A number, or a string containing a number.
 * @typedef {(number|string)} NumberLike
 */

/**
 * A Ref contains a value and can be used for reactive programming
 * @template T
 * @typedef {Object} Ref
 * @property {T} value
 */

/**
 * A ComputedRef contains a value and can be used for reactive programming
 * This value can not be set.
 * @template T
 * @typedef {Object} ComputedRef
 * @property {T} value
 */

/**
 * Either a Ref containing a type or the the type itself
 * @template T
 * @typedef {(Ref<T> | T)} MaybeRef
 */

/**
 * Adds two values.
 *
 * @func
 * @category Math
 * @sig Number -> Number -> Number
 * @param {MaybeRef<Number>} a
 * @param {MaybeRef<Number>} b
 * @return {ComputedRef<Number>}
 * @see R.subtract
 * @example
 *
 *      const a = ref(2)
 *      const b = ref(3)
 *      const c = useAdd(2, 3)      //=>  c.value === 5
 *      b.value++                   //=>  c.value === 6
 *
 */
export const useAdd = reactifyCurried(add)

/**
 * Applies a function to the value at the given index of an array, returning a
 * new copy of the array with the element at the given index replaced with the
 * result of the function application.
 *
 * @func
 * @category List
 * @sig Number -> (a -> a) -> [a] -> [a]
 * @param {MaybeRef<Number} idx The index.
 * @param {MaybeRef<Function>} fn The function to apply.
 * @param {MaybeRef<Array|Arguments>} list An array-like object whose value
 *        at the supplied index will be replaced.
 * @return {ComputedRef<Array>} A copy of the supplied array-like object with
 *         the element at index `idx` replaced with the value
 *         returned by applying `fn` to the existing element.
 * @see R.update
 * @example
 *      const reactiveIndex = ref(1)
 *      const computedList = useAdjust(reactiveIndex, R.toUpper, ['a', 'b', 'c', 'd']) //=> ['a', 'B', 'c', 'd']
 *      reactiveIndex.value = -1   //=> ['a', 'b', 'c', 'D']
 */
export const useAdjust = reactifyCurried(adjust)

/**
 * Returns the first argument if it is falsy, otherwise the second argument.
 * Acts as the boolean `and` statement if both inputs are `Boolean`s.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig a -> b -> a | b
 * @param {MaybeRef<any>} a
 * @param {MaybeRef<any>} b
 * @return {ComputedRef<Any>}
 * @see R.both, R.or
 * @example
 *
 *      const a = ref(true)
 *      const b = ref(false)
 *      const c = useAnd(a, b) //=> c.value === false
 *      b.value = true //=> c.value === true
 */
export const useAnd = reactifyCurried(and)

/**
 * ap applies a list of functions to a list of values.
 *
 * Dispatches to the `ap` method of the second argument, if present. Also
 * treats curried functions as applicatives.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig [a -> b] -> [a] -> [b]
 * @sig Apply f => f (a -> b) -> f a -> f b
 * @sig (r -> a -> b) -> (r -> a) -> (r -> b)
 * @param {MaybeRef<*>} applyF
 * @param {MaybeRef<*>} applyX
 * @return {ComputedRef<*>}
 * @example
 *
 *      const reactiveList = ref([1, 2, 3])
 *      const computedList = useAp([R.multiply(2), R.add(3)], reactiveList) //=> [2, 4, 6, 4, 5, 6]
 *      reactiveList.value = ref([2, 4]) // => [4, 8, 5, 7]
 */
export const useAp = reactifyCurried(ap)

/**
 * Returns a new list, composed of n-tuples of consecutive elements. If `n` is
 * greater than the length of the list, an empty list is returned.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @category List
 * @sig Number -> [a] -> [[a]]
 * @param {MaybeRef<Number>} n The size of the tuples to create
 * @param {MaybeRef<Array>} list The list to split into `n`-length tuples
 * @return {ComputedRef<Array>} The resulting list of `n`-length tuples
 * @see R.transduce
 * @example
 *      const a = ref(2)
 *      const b = ref([1, 2, 3, 4, 5])
 *      const c = useAperture(a,b)      //=> c.value === [[1, 2], [2, 3], [3, 4], [4, 5]]
 *      a.value = 3                     //=> c.value === [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
 *      a.value = 7                     //=> c.value === []
 */
export const useAperture = reactifyCurried(aperture)

/**
 * Returns a new list containing the contents of the given list, followed by
 * the given element.
 *
 * @func
 * @category List
 * @sig a -> [a] -> [a]
 * @param {MaybeRef<*>} el The element to add to the end of the new list.
 * @param {MaybeRef<Array>} list The list of elements to add a new item to.
 *        list.
 * @return {ComputedRef<Array>} A new list containing the elements of the old list followed by `el`.
 * @see R.prepend
 * @example
 *      const a = ref('tests')
 *      const b = ref(['write', 'more'])
 *      const c = useAppend(a, b)  //=> c.value === ['write', 'more', 'tests']
 *      a.value = ['tests']     //=> c.value === ['write', 'more', ['tests']]
 *      b.value = []            //=> c.value === [['tests']]
 */
export const useAppend = reactifyCurried(append)

/**
 * Applies function `fn` to the argument list `args`. This is useful for
 * creating a fixed-arity function from a variadic function. `fn` should be a
 * bound function if context is significant.
 *
 * @func
 * @category Function
 * @sig (*... -> a) -> [*] -> a
 * @param {MaybeRef<Function>} fn The function which will be called with `args`
 * @param {MaybeRef<Array>} args The arguments to call `fn` with
 * @return {ComputedRef<*>} result The result, equivalent to `fn(...args)`
 * @see R.call, R.unapply
 * @example
 *
 *      const nums = ref([1, 2, 3])
 *      const result = useApply(Math.max, nums) //=> result.value === 3
 *      nums.value.push(4) //=> result.value === 4
 * @symb R.apply(f, [a, b, c]) = f(a, b, c)
 */

export const useApply = reactifyCurried(apply)

/**
 * Given a spec object recursively mapping properties to functions, creates a
 * function producing an object of the same structure, by mapping each property
 * to the result of calling its associated function with the supplied arguments.
 *
 * @func
 * @category Function
 * @sig {k: ((a, b, ..., m) -> v)} -> ((a, b, ..., m) -> {k: v})
 * @param {MaybeRef<Object>} spec an object recursively mapping properties to functions for
 *        producing the values for these properties.
 * @return {ComputedRef<Function>} A function that returns an object of the same structure
 * as `spec', with each property set to the value returned by calling its
 * associated function with the supplied arguments.
 * @see R.converge, R.juxt
 * @example
 *
 *      const specObj = ref({
 *        sum: R.add,
 *        nested: { mul: R.multiply }
 *      })
 *
 *      const metricInputs = ref([2, 4])
 *      const result = useApply(useApplySpec(specObj), metricInputs) // => result.value === { sum: 6, nested: { mul: 8 } }
 *      specObj.value = {multi: R.multiply} // => result.value === { multi: 8}
 *
 * @symb R.applySpec({ x: f, y: { z: g } })(a, b) = { x: f(a, b), y: { z: g(a, b) } }
 */
export const useApplySpec = reactifyCurried(applySpec)

/**
 * Takes a value and applies a function to it.
 *
 * This function is also known as the `thrush` combinator.
 *
 * @func
 * @category Function
 * @sig a -> (a -> b) -> b
 * @param {MaybeRef<*>} x The value
 * @param {MaybeRef<Function>} f The function to apply
 * @return {ComputedRef<*>} The result of applying `f` to `x`
 * @example
 *
 *      const val = ref(2)
 *      const fn = ref(R.add(1))
 *      const result = useApplyTo(val, fn) // => result.value === 3
 *      val.value = 3 // => result.value === 4
 *      fn.value = R.add(5) // => result.value === 8
 */

export const useApplyTo = reactifyCurried(applyTo)

/**
 * Makes an ascending comparator function out of a function that returns a value
 * that can be compared with `<` and `>`.
 *
 * @func
 * @category Function
 * @sig Ord b => (a -> b) -> a -> a -> Number
 * @param {MaybeRef<Function>} fn A function of arity one that returns a value that can be compared
 * @param {MaybeRef<*>} a The first item to be compared.
 * @param {MaybeRef<*>} b The second item to be compared.
 * @return {ComputedRef<Number>} `-1` if fn(a) < fn(b), `1` if fn(b) < fn(a), otherwise `0`
 * @see R.descend
 * @example
 *
 * const sortProp = ref('age')
 * const ascendSortingFn = useAscend(useProp(sortProp))
 * const people = [
 *   { name: 'Emma', age: 70, height: 170 },
 *   { name: 'Peter', age: 78, height: 180 },
 *   { name: 'Mikhail', age: 62, height: 190 },
 * ]
 * const sortedPeople = useSort(ascendSortingFn, people)
 * //=> sortedPeople.value === [{ name: 'Mikhail', age: 62, height: 190 }, { name: 'Emma', age: 70, height: 170 }, { name: 'Peter', age: 78, height: 180 }])
 *
 *  sortProp.value = 'height'
 *  //=> sortedPeople.value === [{ name: 'Emma', age: 70, height: 170 }, { name: 'Peter', age: 78, height: 180 }, { name: 'Mikhail', age: 62, height: 190 }])
 */
export const useAscend = reactifyCurried(unrefFirstParam(ascend))

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

export const useAll = reactifyCurried(unrefFirstParam(all))
export const useAny = reactifyCurried(unrefFirstParam(any))
export const useComparator = reactifyCurried(unrefFirstParam(comparator))
export const useCount = reactifyCurried(unrefFirstParam(count))
export const useDifferenceWith = reactifyCurried(
  unrefFirstParam(differenceWith)
)
export const useDropLastWhile = reactifyCurried(unrefFirstParam(dropLastWhile))
export const useDropRepeatsWith = reactifyCurried(
  unrefFirstParam(dropRepeatsWith)
)
export const useDropWhile = reactifyCurried(unrefFirstParam(dropWhile))
export const useFilter = reactifyCurried(unrefFirstParam(filter))
export const useFind = reactifyCurried(unrefFirstParam(find))
export const useFindIndex = reactifyCurried(unrefFirstParam(findIndex))
export const useFindLast = reactifyCurried(unrefFirstParam(findLast))
export const useFindLastIndex = reactifyCurried(unrefFirstParam(findLastIndex))
export const useGroupWith = reactifyCurried(unrefFirstParam(groupWith))
export const useIfElse = reactifyCurried(unrefFirstParam(ifElse))
export const useInnerJoin = reactifyCurried(unrefFirstParam(innerJoin))
export const useNone = reactifyCurried(unrefFirstParam(none))
export const usePartition = reactifyCurried(unrefFirstParam(partition))
export const usePathSatisfies = reactifyCurried(unrefFirstParam(pathSatisfies))
export const usePickBy = reactifyCurried(unrefFirstParam(pickBy))
export const usePropSatisfies = reactifyCurried(unrefFirstParam(propSatisfies))
export const useReduceWhile = reactifyCurried(unrefFirstParam(reduceWhile))
export const useReject = reactifyCurried(unrefFirstParam(reject))
export const useSortBy = reactifyCurried(unrefFirstParam(sortBy))
export const useSplitWhen = reactifyCurried(unrefFirstParam(splitWhen))
export const useSplitWhenever = reactifyCurried(unrefFirstParam(splitWhenever))
export const useSymmetricDifferenceWith = reactifyCurried(
  unrefFirstParam(symmetricDifferenceWith)
)
export const useTakeLastWhile = reactifyCurried(unrefFirstParam(takeLastWhile))
export const useTakeWhile = reactifyCurried(unrefFirstParam(takeWhile))
export const useUnionWith = reactifyCurried(unrefFirstParam(unionWith))
export const useUniqWith = reactifyCurried(unrefFirstParam(uniqWith))
export const useUnless = reactifyCurried(unrefFirstParam(unless))
export const useUntil = reactifyCurried(unrefFirstParam(until))
export const useWhen = reactifyCurried(unrefFirstParam(when))
export const useZipWith = reactifyCurried(unrefFirstParam(zipWith))

export const useAllPass = reactifyCurried(unrefFirstParamList(allPass))
export const useAnyPass = reactifyCurried(unrefFirstParamList(anyPass))

export const useBoth = reactifyCurried(unrefAllParams(both))
export const useEither = reactifyCurried(unrefAllParams(either))
