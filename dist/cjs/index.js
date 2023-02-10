"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useForEachObjIndexed = exports.useForEach = exports.useFlip = exports.useFlatten = exports.useEvolve = exports.useEquals = exports.useEqProps = exports.useEqBy = exports.useEndsWith = exports.useEmpty = exports.useDropRepeats = exports.useDropLast = exports.useDrop = exports.useDivide = exports.useDissocPath = exports.useDissoc = exports.useDifference = exports.useDescend = exports.useDefaultTo = exports.useDec = exports.useCurryN = exports.useCurry = exports.useCountBy = exports.useConverge = exports.useConstructN = exports.useConstruct = exports.useCond = exports.useConcat = exports.useComposeWith = exports.useCompose = exports.useComplement = exports.useCollectBy = exports.useClone = exports.useClamp = exports.useChain = exports.useCall = exports.useBind = exports.useBinary = exports.useAssocPath = exports.useAssoc = exports.useAscend = exports.useApplyTo = exports.useApplySpec = exports.useApply = exports.useAppend = exports.useAperture = exports.useAp = exports.useAnd = exports.useAdjust = exports.useAdd = void 0;
exports.useMean = exports.useMaxBy = exports.useMax = exports.useMathMod = exports.useMatch = exports.useMapObjIndexed = exports.useMapAccumRight = exports.useMapAccum = exports.useMap = exports.useLte = exports.useLt = exports.useLiftN = exports.useLift = exports.useLensProp = exports.useLensPath = exports.useLensIndex = exports.useLens = exports.useLength = exports.useLastIndexOf = exports.useLast = exports.useKeysIn = exports.useKeys = exports.useJuxt = exports.useJoin = exports.useIsNil = exports.useIsEmpty = exports.useIs = exports.useInvoker = exports.useInvertObj = exports.useInvert = exports.useInto = exports.useIntersperse = exports.useIntersection = exports.useInsertAll = exports.useInsert = exports.useInit = exports.useIndexOf = exports.useIndexBy = exports.useIncludes = exports.useInc = exports.useIdentity = exports.useIdentical = exports.useHead = exports.useHasPath = exports.useHasIn = exports.useHas = exports.useGte = exports.useGt = exports.useGroupBy = exports.useFromPairs = void 0;
exports.useProp = exports.usePromap = exports.useProject = exports.useProduct = exports.usePrepend = exports.usePluck = exports.usePipeWith = exports.usePipe = exports.usePickAll = exports.usePick = exports.usePaths = exports.usePathOr = exports.usePathEq = exports.usePath = exports.usePartialRight = exports.usePartialObject = exports.usePartial = exports.usePair = exports.useOver = exports.useOtherwise = exports.useOr = exports.useOnce = exports.useOn = exports.useOmit = exports.useOf = exports.useObjOf = exports.useO = exports.useNthArg = exports.useNth = exports.useNot = exports.useNegate = exports.useNAry = exports.useMultiply = exports.useMove = exports.useModulo = exports.useModifyPath = exports.useModify = exports.useMinBy = exports.useMin = exports.useMergeWithKey = exports.useMergeWith = exports.useMergeRight = exports.useMergeLeft = exports.useMergeDeepWithKey = exports.useMergeDeepWith = exports.useMergeDeepRight = exports.useMergeDeepLeft = exports.useMergeAll = exports.useMemoizeWith = exports.useMedian = void 0;
exports.useUniq = exports.useUnion = exports.useUnfold = exports.useUncurryN = exports.useUnary = exports.useUnapply = exports.useType = exports.useTryCatch = exports.useTrim = exports.useTraverse = exports.useTranspose = exports.useTransduce = exports.useToUpper = exports.useToString = exports.useToPairsIn = exports.useToPairs = exports.useToLower = exports.useTimes = exports.useThunkify = exports.useTest = exports.useTap = exports.useTakeLast = exports.useTake = exports.useTail = exports.useSymmetricDifference = exports.useSum = exports.useSubtract = exports.useStartsWith = exports.useSplitEvery = exports.useSplitAt = exports.useSplit = exports.useSortWith = exports.useSort = exports.useSlice = exports.useSet = exports.useSequence = exports.useScan = exports.useReverse = exports.useReplace = exports.useRepeat = exports.useRemove = exports.useReduced = exports.useReduceRight = exports.useReduceBy = exports.useReduce = exports.useRange = exports.useProps = exports.usePropOr = exports.usePropIs = exports.usePropEq = void 0;
exports.useWhen = exports.useUntil = exports.useUnless = exports.useUniqWith = exports.useUnionWith = exports.useTakeWhile = exports.useTakeLastWhile = exports.useSymmetricDifferenceWith = exports.useSplitWhenever = exports.useSplitWhen = exports.useSortBy = exports.useReject = exports.useReduceWhile = exports.usePropSatisfies = exports.usePickBy = exports.usePathSatisfies = exports.usePartition = exports.useNone = exports.useInnerJoin = exports.useIfElse = exports.useGroupWith = exports.useFindLastIndex = exports.useFindLast = exports.useFindIndex = exports.useFind = exports.useFilter = exports.useDropWhile = exports.useDropRepeatsWith = exports.useDropLastWhile = exports.useDifferenceWith = exports.useCount = exports.useComparator = exports.useAny = exports.useAll = exports.useZipObj = exports.useZip = exports.useXprod = exports.useXor = exports.useWithout = exports.useWhereEq = exports.useWhereAny = exports.useWhere = exports.useView = exports.useValuesIn = exports.useValues = exports.useUseWith = exports.useUpdate = exports.useUnwind = exports.useUnnest = exports.useUniqBy = void 0;
exports.useEither = exports.useBoth = exports.useAnyPass = exports.useAllPass = exports.useZipWith = void 0;
const vue_1 = require("vue");
const ramda_1 = require("ramda");
const reactifyCurried = fn => (0, ramda_1.curryN)(fn.length, (...args) => (0, vue_1.computed)(() => fn.apply(undefined, args.map(vue_1.unref))));
const unrefFirstParam = fn => (first, ...rest) => fn((...innerFnArgs) => (0, vue_1.unref)(first(...innerFnArgs)), ...rest);
const unrefSecondParam = fn => (first, second, ...rest) => fn(first, (...innerFnArgs) => (0, vue_1.unref)(second(...innerFnArgs)), ...rest);
const unrefFirstParamList = fn => (predList, ...rest) => fn(predList.map(pred => (...innerFnArgs) => (0, vue_1.unref)(pred(...innerFnArgs))), ...rest);
const unrefAllParams = fn => (...params) => fn(...params.map(pred => (...innerFnArgs) => (0, vue_1.unref)(pred(...innerFnArgs))));
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
exports.useAdd = reactifyCurried(ramda_1.add);
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
exports.useAdjust = reactifyCurried(ramda_1.adjust);
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
exports.useAnd = reactifyCurried(ramda_1.and);
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
exports.useAp = reactifyCurried(ramda_1.ap);
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
exports.useAperture = reactifyCurried(ramda_1.aperture);
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
exports.useAppend = reactifyCurried(ramda_1.append);
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
 *      const nums = [1, 2, 3, -99, 42, 6, 7];
 *      R.apply(Math.max, nums); //=> 42
 * @symb R.apply(f, [a, b, c]) = f(a, b, c)
 */
exports.useApply = reactifyCurried(ramda_1.apply);
// export const useApply = reactifyCurried(unrefSecondParam(apply))
exports.useApplySpec = reactifyCurried(ramda_1.applySpec);
exports.useApplyTo = reactifyCurried(ramda_1.applyTo);
exports.useAscend = reactifyCurried(ramda_1.ascend);
exports.useAssoc = reactifyCurried(ramda_1.assoc);
exports.useAssocPath = reactifyCurried(ramda_1.assocPath);
exports.useBinary = reactifyCurried(ramda_1.binary);
exports.useBind = reactifyCurried(ramda_1.bind);
exports.useCall = reactifyCurried(ramda_1.call);
exports.useChain = reactifyCurried(ramda_1.chain);
exports.useClamp = reactifyCurried(ramda_1.clamp);
exports.useClone = reactifyCurried(ramda_1.clone);
exports.useCollectBy = reactifyCurried(ramda_1.collectBy);
exports.useComplement = reactifyCurried(ramda_1.complement);
exports.useCompose = reactifyCurried(ramda_1.compose);
exports.useComposeWith = reactifyCurried(ramda_1.composeWith);
exports.useConcat = reactifyCurried(ramda_1.concat);
exports.useCond = reactifyCurried(ramda_1.cond);
exports.useConstruct = reactifyCurried(ramda_1.construct);
exports.useConstructN = reactifyCurried(ramda_1.constructN);
exports.useConverge = reactifyCurried(ramda_1.converge);
exports.useCountBy = reactifyCurried(ramda_1.countBy);
exports.useCurry = reactifyCurried(ramda_1.curry);
exports.useCurryN = reactifyCurried(ramda_1.curryN);
exports.useDec = reactifyCurried(ramda_1.dec);
exports.useDefaultTo = reactifyCurried(ramda_1.defaultTo);
exports.useDescend = reactifyCurried(ramda_1.descend);
exports.useDifference = reactifyCurried(ramda_1.difference);
exports.useDissoc = reactifyCurried(ramda_1.dissoc);
exports.useDissocPath = reactifyCurried(ramda_1.dissocPath);
exports.useDivide = reactifyCurried(ramda_1.divide);
exports.useDrop = reactifyCurried(ramda_1.drop);
exports.useDropLast = reactifyCurried(ramda_1.dropLast);
exports.useDropRepeats = reactifyCurried(ramda_1.dropRepeats);
exports.useEmpty = reactifyCurried(ramda_1.empty);
exports.useEndsWith = reactifyCurried(ramda_1.endsWith);
exports.useEqBy = reactifyCurried(ramda_1.eqBy);
exports.useEqProps = reactifyCurried(ramda_1.eqProps);
exports.useEquals = reactifyCurried(ramda_1.equals);
exports.useEvolve = reactifyCurried(ramda_1.evolve);
exports.useFlatten = reactifyCurried(ramda_1.flatten);
exports.useFlip = reactifyCurried(ramda_1.flip);
exports.useForEach = reactifyCurried(ramda_1.forEach);
exports.useForEachObjIndexed = reactifyCurried(ramda_1.forEachObjIndexed);
exports.useFromPairs = reactifyCurried(ramda_1.fromPairs);
exports.useGroupBy = reactifyCurried(ramda_1.groupBy);
exports.useGt = reactifyCurried(ramda_1.gt);
exports.useGte = reactifyCurried(ramda_1.gte);
exports.useHas = reactifyCurried(ramda_1.has);
exports.useHasIn = reactifyCurried(ramda_1.hasIn);
exports.useHasPath = reactifyCurried(ramda_1.hasPath);
exports.useHead = reactifyCurried(ramda_1.head);
exports.useIdentical = reactifyCurried(ramda_1.identical);
exports.useIdentity = reactifyCurried(ramda_1.identity);
exports.useInc = reactifyCurried(ramda_1.inc);
exports.useIncludes = reactifyCurried(ramda_1.includes);
exports.useIndexBy = reactifyCurried(ramda_1.indexBy);
exports.useIndexOf = reactifyCurried(ramda_1.indexOf);
exports.useInit = reactifyCurried(ramda_1.init);
exports.useInsert = reactifyCurried(ramda_1.insert);
exports.useInsertAll = reactifyCurried(ramda_1.insertAll);
exports.useIntersection = reactifyCurried(ramda_1.intersection);
exports.useIntersperse = reactifyCurried(ramda_1.intersperse);
exports.useInto = reactifyCurried(ramda_1.into);
exports.useInvert = reactifyCurried(ramda_1.invert);
exports.useInvertObj = reactifyCurried(ramda_1.invertObj);
exports.useInvoker = reactifyCurried(ramda_1.invoker);
exports.useIs = reactifyCurried(ramda_1.is);
exports.useIsEmpty = reactifyCurried(ramda_1.isEmpty);
exports.useIsNil = reactifyCurried(ramda_1.isNil);
exports.useJoin = reactifyCurried(ramda_1.join);
exports.useJuxt = reactifyCurried(ramda_1.juxt);
exports.useKeys = reactifyCurried(ramda_1.keys);
exports.useKeysIn = reactifyCurried(ramda_1.keysIn);
exports.useLast = reactifyCurried(ramda_1.last);
exports.useLastIndexOf = reactifyCurried(ramda_1.lastIndexOf);
exports.useLength = reactifyCurried(ramda_1.length);
exports.useLens = reactifyCurried(ramda_1.lens);
exports.useLensIndex = reactifyCurried(ramda_1.lensIndex);
exports.useLensPath = reactifyCurried(ramda_1.lensPath);
exports.useLensProp = reactifyCurried(ramda_1.lensProp);
exports.useLift = reactifyCurried(ramda_1.lift);
exports.useLiftN = reactifyCurried(ramda_1.liftN);
exports.useLt = reactifyCurried(ramda_1.lt);
exports.useLte = reactifyCurried(ramda_1.lte);
exports.useMap = reactifyCurried(ramda_1.map);
exports.useMapAccum = reactifyCurried(ramda_1.mapAccum);
exports.useMapAccumRight = reactifyCurried(ramda_1.mapAccumRight);
exports.useMapObjIndexed = reactifyCurried(ramda_1.mapObjIndexed);
exports.useMatch = reactifyCurried(ramda_1.match);
exports.useMathMod = reactifyCurried(ramda_1.mathMod);
exports.useMax = reactifyCurried(ramda_1.max);
exports.useMaxBy = reactifyCurried(ramda_1.maxBy);
exports.useMean = reactifyCurried(ramda_1.mean);
exports.useMedian = reactifyCurried(ramda_1.median);
exports.useMemoizeWith = reactifyCurried(ramda_1.memoizeWith);
exports.useMergeAll = reactifyCurried(ramda_1.mergeAll);
exports.useMergeDeepLeft = reactifyCurried(ramda_1.mergeDeepLeft);
exports.useMergeDeepRight = reactifyCurried(ramda_1.mergeDeepRight);
exports.useMergeDeepWith = reactifyCurried(ramda_1.mergeDeepWith);
exports.useMergeDeepWithKey = reactifyCurried(ramda_1.mergeDeepWithKey);
exports.useMergeLeft = reactifyCurried(ramda_1.mergeLeft);
exports.useMergeRight = reactifyCurried(ramda_1.mergeRight);
exports.useMergeWith = reactifyCurried(ramda_1.mergeWith);
exports.useMergeWithKey = reactifyCurried(ramda_1.mergeWithKey);
exports.useMin = reactifyCurried(ramda_1.min);
exports.useMinBy = reactifyCurried(ramda_1.minBy);
exports.useModify = reactifyCurried(ramda_1.modify);
exports.useModifyPath = reactifyCurried(ramda_1.modifyPath);
exports.useModulo = reactifyCurried(ramda_1.modulo);
exports.useMove = reactifyCurried(ramda_1.move);
exports.useMultiply = reactifyCurried(ramda_1.multiply);
exports.useNAry = reactifyCurried(ramda_1.nAry);
exports.useNegate = reactifyCurried(ramda_1.negate);
exports.useNot = reactifyCurried(ramda_1.not);
exports.useNth = reactifyCurried(ramda_1.nth);
exports.useNthArg = reactifyCurried(ramda_1.nthArg);
exports.useO = reactifyCurried(ramda_1.o);
exports.useObjOf = reactifyCurried(ramda_1.objOf);
exports.useOf = reactifyCurried(ramda_1.of);
exports.useOmit = reactifyCurried(ramda_1.omit);
exports.useOn = reactifyCurried(ramda_1.on);
exports.useOnce = reactifyCurried(ramda_1.once);
exports.useOr = reactifyCurried(ramda_1.or);
exports.useOtherwise = reactifyCurried(ramda_1.otherwise);
exports.useOver = reactifyCurried(ramda_1.over);
exports.usePair = reactifyCurried(ramda_1.pair);
exports.usePartial = reactifyCurried(ramda_1.partial);
exports.usePartialObject = reactifyCurried(ramda_1.partialObject);
exports.usePartialRight = reactifyCurried(ramda_1.partialRight);
exports.usePath = reactifyCurried(ramda_1.path);
exports.usePathEq = reactifyCurried(ramda_1.pathEq);
exports.usePathOr = reactifyCurried(ramda_1.pathOr);
exports.usePaths = reactifyCurried(ramda_1.paths);
exports.usePick = reactifyCurried(ramda_1.pick);
exports.usePickAll = reactifyCurried(ramda_1.pickAll);
exports.usePipe = reactifyCurried(ramda_1.pipe);
exports.usePipeWith = reactifyCurried(ramda_1.pipeWith);
exports.usePluck = reactifyCurried(ramda_1.pluck);
exports.usePrepend = reactifyCurried(ramda_1.prepend);
exports.useProduct = reactifyCurried(ramda_1.product);
exports.useProject = reactifyCurried(ramda_1.project);
exports.usePromap = reactifyCurried(ramda_1.promap);
exports.useProp = reactifyCurried(ramda_1.prop);
exports.usePropEq = reactifyCurried(ramda_1.propEq);
exports.usePropIs = reactifyCurried(ramda_1.propIs);
exports.usePropOr = reactifyCurried(ramda_1.propOr);
exports.useProps = reactifyCurried(ramda_1.props);
exports.useRange = reactifyCurried(ramda_1.range);
exports.useReduce = reactifyCurried(ramda_1.reduce);
exports.useReduceBy = reactifyCurried(ramda_1.reduceBy);
exports.useReduceRight = reactifyCurried(ramda_1.reduceRight);
exports.useReduced = reactifyCurried(ramda_1.reduced);
exports.useRemove = reactifyCurried(ramda_1.remove);
exports.useRepeat = reactifyCurried(ramda_1.repeat);
exports.useReplace = reactifyCurried(ramda_1.replace);
exports.useReverse = reactifyCurried(ramda_1.reverse);
exports.useScan = reactifyCurried(ramda_1.scan);
exports.useSequence = reactifyCurried(ramda_1.sequence);
exports.useSet = reactifyCurried(ramda_1.set);
exports.useSlice = reactifyCurried(ramda_1.slice);
exports.useSort = reactifyCurried(ramda_1.sort);
exports.useSortWith = reactifyCurried(ramda_1.sortWith);
exports.useSplit = reactifyCurried(ramda_1.split);
exports.useSplitAt = reactifyCurried(ramda_1.splitAt);
exports.useSplitEvery = reactifyCurried(ramda_1.splitEvery);
exports.useStartsWith = reactifyCurried(ramda_1.startsWith);
exports.useSubtract = reactifyCurried(ramda_1.subtract);
exports.useSum = reactifyCurried(ramda_1.sum);
exports.useSymmetricDifference = reactifyCurried(ramda_1.symmetricDifference);
exports.useTail = reactifyCurried(ramda_1.tail);
exports.useTake = reactifyCurried(ramda_1.take);
exports.useTakeLast = reactifyCurried(ramda_1.takeLast);
exports.useTap = reactifyCurried(ramda_1.tap);
exports.useTest = reactifyCurried(ramda_1.test);
exports.useThunkify = reactifyCurried(ramda_1.thunkify);
exports.useTimes = reactifyCurried(ramda_1.times);
exports.useToLower = reactifyCurried(ramda_1.toLower);
exports.useToPairs = reactifyCurried(ramda_1.toPairs);
exports.useToPairsIn = reactifyCurried(ramda_1.toPairsIn);
exports.useToString = reactifyCurried(ramda_1.toString);
exports.useToUpper = reactifyCurried(ramda_1.toUpper);
exports.useTransduce = reactifyCurried(ramda_1.transduce);
exports.useTranspose = reactifyCurried(ramda_1.transpose);
exports.useTraverse = reactifyCurried(ramda_1.traverse);
exports.useTrim = reactifyCurried(ramda_1.trim);
exports.useTryCatch = reactifyCurried(ramda_1.tryCatch);
exports.useType = reactifyCurried(ramda_1.type);
exports.useUnapply = reactifyCurried(ramda_1.unapply);
exports.useUnary = reactifyCurried(ramda_1.unary);
exports.useUncurryN = reactifyCurried(ramda_1.uncurryN);
exports.useUnfold = reactifyCurried(ramda_1.unfold);
exports.useUnion = reactifyCurried(ramda_1.union);
exports.useUniq = reactifyCurried(ramda_1.uniq);
exports.useUniqBy = reactifyCurried(ramda_1.uniqBy);
exports.useUnnest = reactifyCurried(ramda_1.unnest);
exports.useUnwind = reactifyCurried(ramda_1.unwind);
exports.useUpdate = reactifyCurried(ramda_1.update);
exports.useUseWith = reactifyCurried(ramda_1.useWith);
exports.useValues = reactifyCurried(ramda_1.values);
exports.useValuesIn = reactifyCurried(ramda_1.valuesIn);
exports.useView = reactifyCurried(ramda_1.view);
exports.useWhere = reactifyCurried(ramda_1.where);
exports.useWhereAny = reactifyCurried(ramda_1.whereAny);
exports.useWhereEq = reactifyCurried(ramda_1.whereEq);
exports.useWithout = reactifyCurried(ramda_1.without);
exports.useXor = reactifyCurried(ramda_1.xor);
exports.useXprod = reactifyCurried(ramda_1.xprod);
exports.useZip = reactifyCurried(ramda_1.zip);
exports.useZipObj = reactifyCurried(ramda_1.zipObj);
exports.useAll = reactifyCurried(unrefFirstParam(ramda_1.all));
exports.useAny = reactifyCurried(unrefFirstParam(ramda_1.any));
exports.useComparator = reactifyCurried(unrefFirstParam(ramda_1.comparator));
exports.useCount = reactifyCurried(unrefFirstParam(ramda_1.count));
exports.useDifferenceWith = reactifyCurried(unrefFirstParam(ramda_1.differenceWith));
exports.useDropLastWhile = reactifyCurried(unrefFirstParam(ramda_1.dropLastWhile));
exports.useDropRepeatsWith = reactifyCurried(unrefFirstParam(ramda_1.dropRepeatsWith));
exports.useDropWhile = reactifyCurried(unrefFirstParam(ramda_1.dropWhile));
exports.useFilter = reactifyCurried(unrefFirstParam(ramda_1.filter));
exports.useFind = reactifyCurried(unrefFirstParam(ramda_1.find));
exports.useFindIndex = reactifyCurried(unrefFirstParam(ramda_1.findIndex));
exports.useFindLast = reactifyCurried(unrefFirstParam(ramda_1.findLast));
exports.useFindLastIndex = reactifyCurried(unrefFirstParam(ramda_1.findLastIndex));
exports.useGroupWith = reactifyCurried(unrefFirstParam(ramda_1.groupWith));
exports.useIfElse = reactifyCurried(unrefFirstParam(ramda_1.ifElse));
exports.useInnerJoin = reactifyCurried(unrefFirstParam(ramda_1.innerJoin));
exports.useNone = reactifyCurried(unrefFirstParam(ramda_1.none));
exports.usePartition = reactifyCurried(unrefFirstParam(ramda_1.partition));
exports.usePathSatisfies = reactifyCurried(unrefFirstParam(ramda_1.pathSatisfies));
exports.usePickBy = reactifyCurried(unrefFirstParam(ramda_1.pickBy));
exports.usePropSatisfies = reactifyCurried(unrefFirstParam(ramda_1.propSatisfies));
exports.useReduceWhile = reactifyCurried(unrefFirstParam(ramda_1.reduceWhile));
exports.useReject = reactifyCurried(unrefFirstParam(ramda_1.reject));
exports.useSortBy = reactifyCurried(unrefFirstParam(ramda_1.sortBy));
exports.useSplitWhen = reactifyCurried(unrefFirstParam(ramda_1.splitWhen));
exports.useSplitWhenever = reactifyCurried(unrefFirstParam(ramda_1.splitWhenever));
exports.useSymmetricDifferenceWith = reactifyCurried(unrefFirstParam(ramda_1.symmetricDifferenceWith));
exports.useTakeLastWhile = reactifyCurried(unrefFirstParam(ramda_1.takeLastWhile));
exports.useTakeWhile = reactifyCurried(unrefFirstParam(ramda_1.takeWhile));
exports.useUnionWith = reactifyCurried(unrefFirstParam(ramda_1.unionWith));
exports.useUniqWith = reactifyCurried(unrefFirstParam(ramda_1.uniqWith));
exports.useUnless = reactifyCurried(unrefFirstParam(ramda_1.unless));
exports.useUntil = reactifyCurried(unrefFirstParam(ramda_1.until));
exports.useWhen = reactifyCurried(unrefFirstParam(ramda_1.when));
exports.useZipWith = reactifyCurried(unrefFirstParam(ramda_1.zipWith));
exports.useAllPass = reactifyCurried(unrefFirstParamList(ramda_1.allPass));
exports.useAnyPass = reactifyCurried(unrefFirstParamList(ramda_1.anyPass));
exports.useBoth = reactifyCurried(unrefAllParams(ramda_1.both));
exports.useEither = reactifyCurried(unrefAllParams(ramda_1.either));
