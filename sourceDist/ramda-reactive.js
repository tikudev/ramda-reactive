import { computed, unref } from 'vue'
import { add, addIndex, addIndexRight, adjust, all, allPass, always, and, andThen, any, anyPass, ap, aperture, append, apply, applySpec, applyTo, ascend, assoc, assocPath, binary, bind, both, call, chain, clamp, clone, collectBy, comparator, complement, compose, composeWith, concat, cond, construct, constructN, converge, count, countBy, curry, curryN, dec, defaultTo, descend, difference, differenceWith, dissoc, dissocPath, divide, drop, dropLast, dropLastWhile, dropRepeats, dropRepeatsBy, dropRepeatsWith, dropWhile, either, empty, endsWith, eqBy, eqProps, equals, evolve, filter, find, findIndex, findLast, findLastIndex, flatten, flip, forEach, forEachObjIndexed, fromPairs, groupBy, groupWith, gt, gte, has, hasIn, hasPath, head, identical, identity, ifElse, inc, includes, indexBy, indexOf, init, innerJoin, insert, insertAll, intersection, intersperse, into, invert, invertObj, invoker, is, isEmpty, isNil, isNotNil, join, juxt, keys, keysIn, last, lastIndexOf, length, lens, lensIndex, lensPath, lensProp, lift, liftN, lt, lte, map, mapAccum, mapAccumRight, mapObjIndexed, match, mathMod, max, maxBy, mean, median, memoizeWith, mergeAll, mergeDeepLeft, mergeDeepRight, mergeDeepWith, mergeDeepWithKey, mergeLeft, mergeRight, mergeWith, mergeWithKey, min, minBy, modify, modifyPath, modulo, move, multiply, nAry, negate, none, not, nth, nthArg, o, objOf, of, omit, on, once, or, otherwise, over, pair, partial, partialObject, partialRight, partition, path, pathEq, pathOr, pathSatisfies, paths, pick, pickAll, pickBy, pipe, pipeWith, pluck, prepend, product, project, promap, prop, propEq, propIs, propOr, propSatisfies, props, range, reduce, reduceBy, reduceRight, reduceWhile, reduced, reject, remove, repeat, replace, reverse, scan, sequence, set, slice, sort, sortBy, sortWith, split, splitAt, splitEvery, splitWhen, splitWhenever, startsWith, subtract, sum, swap, symmetricDifference, symmetricDifferenceWith, tail, take, takeLast, takeLastWhile, takeWhile, tap, test, thunkify, times, toLower, toPairs, toPairsIn, toString, toUpper, transduce, transpose, traverse, trim, tryCatch, type, unapply, unary, uncurryN, unfold, union, unionWith, uniq, uniqBy, uniqWith, unless, unnest, until, unwind, update, useWith, values, valuesIn, view, when, where, whereAny, whereEq, without, xor, xprod, zip, zipObj, zipWith} from 'ramda'

/**
 * Adds two values.
 *
 * @param {import('./types').MaybeWatchSource<Number>} a 
 * @param {import('./types').MaybeWatchSource<Number>} b 
 * @return {import('vue').ComputedRef<Number>} 
*/
export const useAdd = curryN(2,(a, b) => computed(() => add(typeof a === 'function' ? a() : unref(a), typeof b === 'function' ? b() : unref(b))))


/**
 * Creates a new list iteration function from an existing one by adding two new
 * parameters to its callback function: the current index, and the entire list.
 * 
 * This would turn, for instance, [`R.map`](#map) function into one that
 * more closely resembles `Array.prototype.map`. Note that this will only work
 * for functions in which the iteration callback function is the first
 * parameter, and where the list is the last parameter. (This latter might be
 * unimportant if the list parameter is not used.)
 *
 * @param {import('./types').MaybeRef<Function>} fn A list iteration function that does not pass index or list to its callback
 * @return {import('vue').ComputedRef<Function>} An altered list iteration function that passes (item, index, list) to its callback
*/
export const useAddIndex = (fn) => computed(() => addIndex(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn)))


/**
 * As with `addIndex`, `addIndexRight` creates a new list iteration function
 * from an existing one by adding two new parameters to its callback function:
 * the current index, and the entire list.
 * 
 * Unlike `addIndex`, `addIndexRight` iterates from the right to the left.
 *
 * @param {import('./types').MaybeRef<Function>} fn A list iteration function that does not pass index or list to its callback
 * @return {import('vue').ComputedRef<Function>} An altered list iteration function that passes (item, index, list) to its callback
*/
export const useAddIndexRight = (fn) => computed(() => addIndexRight(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn)))


/**
 * Applies a function to the value at the given index of an array, returning a
 * new copy of the array with the element at the given index replaced with the
 * result of the function application.
 *
 * @param {import('./types').MaybeWatchSource<Number>} idx The index.
 * @param {import('./types').MaybeRef<Function>} fn The function to apply.
 * @param {import('./types').MaybeWatchSource<Array|Arguments>} list An array-like object whose value at the supplied index will be replaced.
 * @return {import('vue').ComputedRef<Array>} A copy of the supplied array-like object with the element at index `idx` replaced with the value returned by applying `fn` to the existing element.
*/
export const useAdjust = curryN(3,(idx, fn, list) => computed(() => adjust(typeof idx === 'function' ? idx() : unref(idx), typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof list === 'function' ? list() : unref(list))))


/**
 * Returns `true` if all elements of the list match the predicate, `false` if
 * there are any that don't.
 * 
 * Dispatches to the `all` method of the second argument, if present.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param {import('./types').MaybeRef<Function>} fn The predicate function.
 * @param {import('./types').MaybeWatchSource<Array>} list The array to consider.
 * @return {import('vue').ComputedRef<Boolean>} `true` if the predicate is satisfied by every element, `false` otherwise.
*/
export const useAll = curryN(2,(fn, list) => computed(() => all(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof list === 'function' ? list() : unref(list))))


/**
 * Takes a list of predicates and returns a predicate that returns true for a
 * given list of arguments if every one of the provided predicates is satisfied
 * by those arguments.
 * 
 * The function returned is a curried function whose arity matches that of the
 * highest-arity predicate.
 *
 * @param {import('./types').MaybeWatchSource<Array>} predicates An array of predicates to check
 * @return {import('vue').ComputedRef<Function>} The combined predicate
*/
export const useAllPass = (predicates) => computed(() => allPass(typeof predicates === 'function' ? predicates() : unref(predicates)))


/**
 * Returns a function that always returns the given value. Note that for
 * non-primitives the value returned is a reference to the original value.
 * 
 * This function is known as `const`, `constant`, or `K` (for K combinator) in
 * other languages and libraries.
 *
 * @param {import('./types').MaybeRef<*>} val The value to wrap in a function
 * @return {import('vue').ComputedRef<Function>} A Function ::-> val.
*/
export const useAlways = (val) => computed(() => always(typeof val === 'function' ? (...fnArgs) => unref(unref(val)(...fnArgs)) : unref(val)))


/**
 * Returns the first argument if it is falsy, otherwise the second argument.
 * Acts as the boolean `and` statement if both inputs are `Boolean`s.
 *
 * @param {import('./types').MaybeRef<Any>} a 
 * @param {import('./types').MaybeRef<Any>} b 
 * @return {import('vue').ComputedRef<Any>} 
*/
export const useAnd = curryN(2,(a, b) => computed(() => and(typeof a === 'function' ? (...fnArgs) => unref(unref(a)(...fnArgs)) : unref(a), typeof b === 'function' ? (...fnArgs) => unref(unref(b)(...fnArgs)) : unref(b))))


/**
 * Returns the result of applying the onSuccess function to the value inside
 * a successfully resolved promise. This is useful for working with promises
 * inside function compositions.
 *
 * @param {import('./types').MaybeRef<Function>} onSuccess The function to apply. Can return a value or a promise of a value.
 * @param {import('./types').MaybeWatchSource<Promise>} p 
 * @return {import('vue').ComputedRef<Promise>} The result of calling `p.then(onSuccess)`
*/
export const useAndThen = curryN(2,(onSuccess, p) => computed(() => andThen(typeof onSuccess === 'function' ? (...fnArgs) => unref(unref(onSuccess)(...fnArgs)) : unref(onSuccess), typeof p === 'function' ? p() : unref(p))))


/**
 * Returns `true` if at least one of the elements of the list match the predicate,
 * `false` otherwise.
 * 
 * Dispatches to the `any` method of the second argument, if present.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param {import('./types').MaybeRef<Function>} fn The predicate function.
 * @param {import('./types').MaybeWatchSource<Array>} list The array to consider.
 * @return {import('vue').ComputedRef<Boolean>} `true` if the predicate is satisfied by at least one element, `false` otherwise.
*/
export const useAny = curryN(2,(fn, list) => computed(() => any(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof list === 'function' ? list() : unref(list))))


/**
 * Takes a list of predicates and returns a predicate that returns true for a
 * given list of arguments if at least one of the provided predicates is
 * satisfied by those arguments.
 * 
 * The function returned is a curried function whose arity matches that of the
 * highest-arity predicate.
 *
 * @param {import('./types').MaybeWatchSource<Array>} predicates An array of predicates to check
 * @return {import('vue').ComputedRef<Function>} The combined predicate
*/
export const useAnyPass = (predicates) => computed(() => anyPass(typeof predicates === 'function' ? predicates() : unref(predicates)))


/**
 * ap applies a list of functions to a list of values.
 * 
 * Dispatches to the `ap` method of the first argument, if present. Also
 * treats curried functions as applicatives.
 *
 * @param {import('./types').MaybeRef<*>} applyF 
 * @param {import('./types').MaybeRef<*>} applyX 
 * @return {import('vue').ComputedRef<*>} 
*/
export const useAp = curryN(2,(applyF, applyX) => computed(() => ap(typeof applyF === 'function' ? (...fnArgs) => unref(unref(applyF)(...fnArgs)) : unref(applyF), typeof applyX === 'function' ? (...fnArgs) => unref(unref(applyX)(...fnArgs)) : unref(applyX))))


/**
 * Returns a new list, composed of n-tuples of consecutive elements. If `n` is
 * greater than the length of the list, an empty list is returned.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param {import('./types').MaybeWatchSource<Number>} n The size of the tuples to create
 * @param {import('./types').MaybeWatchSource<Array>} list The list to split into `n`-length tuples
 * @return {import('vue').ComputedRef<Array>} The resulting list of `n`-length tuples
*/
export const useAperture = curryN(2,(n, list) => computed(() => aperture(typeof n === 'function' ? n() : unref(n), typeof list === 'function' ? list() : unref(list))))


/**
 * Returns a new list containing the contents of the given list, followed by
 * the given element.
 *
 * @param {import('./types').MaybeRef<*>} el The element to add to the end of the new list.
 * @param {import('./types').MaybeWatchSource<Array>} list The list of elements to add a new item to. list.
 * @return {import('vue').ComputedRef<Array>} A new list containing the elements of the old list followed by `el`.
*/
export const useAppend = curryN(2,(el, list) => computed(() => append(typeof el === 'function' ? (...fnArgs) => unref(unref(el)(...fnArgs)) : unref(el), typeof list === 'function' ? list() : unref(list))))


/**
 * Applies function `fn` to the argument list `args`. This is useful for
 * creating a fixed-arity function from a variadic function. `fn` should be a
 * bound function if context is significant.
 *
 * @param {import('./types').MaybeRef<Function>} fn The function which will be called with `args`
 * @param {import('./types').MaybeWatchSource<Array>} args The arguments to call `fn` with
 * @return {import('vue').ComputedRef<*>} result The result, equivalent to `fn(...args)`
*/
export const useApply = curryN(2,(fn, args) => computed(() => apply(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof args === 'function' ? args() : unref(args))))


/**
 * Given a spec object recursively mapping properties to functions, creates a
 * function producing an object of the same structure, by mapping each property
 * to the result of calling its associated function with the supplied arguments.
 *
 * @param {import('./types').MaybeWatchSource<Object>} spec an object recursively mapping properties to functions for producing the values for these properties.
 * @return {import('vue').ComputedRef<Function>} A function that returns an object of the same structure as `spec', with each property set to the value returned by calling its associated function with the supplied arguments.
*/
export const useApplySpec = (spec) => computed(() => applySpec(typeof spec === 'function' ? spec() : unref(spec)))


/**
 * Takes a value and applies a function to it.
 * 
 * This function is also known as the `thrush` combinator.
 *
 * @param {import('./types').MaybeRef<*>} x The value
 * @param {import('./types').MaybeRef<Function>} f The function to apply
 * @return {import('vue').ComputedRef<*>} The result of applying `f` to `x`
*/
export const useApplyTo = curryN(2,(x, f) => computed(() => applyTo(typeof x === 'function' ? (...fnArgs) => unref(unref(x)(...fnArgs)) : unref(x), typeof f === 'function' ? (...fnArgs) => unref(unref(f)(...fnArgs)) : unref(f))))


/**
 * Makes an ascending comparator function out of a function that returns a value
 * that can be compared with `<` and `>`.
 *
 * @param {import('./types').MaybeRef<Function>} fn A function of arity one that returns a value that can be compared
 * @param {import('./types').MaybeRef<*>} a The first item to be compared.
 * @param {import('./types').MaybeRef<*>} b The second item to be compared.
 * @return {import('vue').ComputedRef<Number>} `-1` if fn(a) < fn(b), `1` if fn(b) < fn(a), otherwise `0`
*/
export const useAscend = curryN(3,(fn, a, b) => computed(() => ascend(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof a === 'function' ? (...fnArgs) => unref(unref(a)(...fnArgs)) : unref(a), typeof b === 'function' ? (...fnArgs) => unref(unref(b)(...fnArgs)) : unref(b))))


/**
 * Makes a shallow clone of an object, setting or overriding the specified
 * property with the given value. Note that this copies and flattens prototype
 * properties onto the new object as well. All non-primitive properties are
 * copied by reference.
 *
 * @param {import('./types').MaybeWatchSource<String|Number>} prop The property name to set
 * @param {import('./types').MaybeRef<*>} val The new value
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to clone
 * @return {import('vue').ComputedRef<Object>} A new object equivalent to the original except for the changed property.
*/
export const useAssoc = curryN(3,(_prop, val, obj) => computed(() => assoc(typeof _prop === 'function' ? _prop() : unref(_prop), typeof val === 'function' ? (...fnArgs) => unref(unref(val)(...fnArgs)) : unref(val), typeof obj === 'function' ? obj() : unref(obj))))


/**
 * Makes a shallow clone of an object, setting or overriding the nodes required
 * to create the given path, and placing the specific value at the tail end of
 * that path. Note that this copies and flattens prototype properties onto the
 * new object as well. All non-primitive properties are copied by reference.
 *
 * @param {import('./types').MaybeWatchSource<Array>} path the path to set
 * @param {import('./types').MaybeRef<*>} val The new value
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to clone
 * @return {import('vue').ComputedRef<Object>} A new object equivalent to the original except along the specified path.
*/
export const useAssocPath = curryN(3,(_path, val, obj) => computed(() => assocPath(typeof _path === 'function' ? _path() : unref(_path), typeof val === 'function' ? (...fnArgs) => unref(unref(val)(...fnArgs)) : unref(val), typeof obj === 'function' ? obj() : unref(obj))))


/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly 2 parameters. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * @param {import('./types').MaybeRef<Function>} fn The function to wrap.
 * @return {import('vue').ComputedRef<Function>} A new function wrapping `fn`. The new function is guaranteed to be of arity 2.
*/
export const useBinary = (fn) => computed(() => binary(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn)))


/**
 * Creates a function that is bound to a context.
 * Note: `R.bind` does not provide the additional argument-binding capabilities of
 * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
 *
 * @param {import('./types').MaybeRef<Function>} fn The function to bind to context
 * @param {import('./types').MaybeWatchSource<Object>} thisObj The context to bind `fn` to
 * @return {import('vue').ComputedRef<Function>} A function that will execute in the context of `thisObj`.
*/
export const useBind = curryN(2,(fn, thisObj) => computed(() => bind(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof thisObj === 'function' ? thisObj() : unref(thisObj))))


/**
 * A function which calls the two provided functions and returns the `&&`
 * of the results.
 * It returns the result of the first function if it is false-y and the result
 * of the second function otherwise. Note that this is short-circuited,
 * meaning that the second function will not be invoked if the first returns a
 * false-y value.
 * 
 * In addition to functions, `R.both` also accepts any fantasy-land compatible
 * applicative functor.
 *
 * @param {import('./types').MaybeRef<Function>} f A predicate
 * @param {import('./types').MaybeRef<Function>} g Another predicate
 * @return {import('vue').ComputedRef<Function>} a function that applies its arguments to `f` and `g` and `&&`s their outputs together.
*/
export const useBoth = curryN(2,(f, g) => computed(() => both(typeof f === 'function' ? (...fnArgs) => unref(unref(f)(...fnArgs)) : unref(f), typeof g === 'function' ? (...fnArgs) => unref(unref(g)(...fnArgs)) : unref(g))))


/**
 * Returns the result of calling its first argument with the remaining
 * arguments. This is occasionally useful as a converging function for
 * [`R.converge`](#converge): the first branch can produce a function while the
 * remaining branches produce values to be passed to that function as its
 * arguments.
 *
 * @param {import('./types').MaybeRef<Function>} fn The function to apply to the remaining arguments.
 * @param {...import('./types').MaybeRef<*>} args Any number of positional arguments.
 * @return {import('vue').ComputedRef<*>} 
*/
export const useCall = curryN(2,(fn, ...args) => computed(() => call(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), ...args.map(varArg => typeof varArg === 'function' ? (...fnArgs) => unref(unref(varArg)(...fnArgs)) : unref(varArg)))))


/**
 * `chain` maps a function over a list and concatenates the results. `chain`
 * is also known as `flatMap` in some libraries.
 * 
 * Dispatches to the `chain` method of the second argument, if present,
 * according to the [FantasyLand Chain spec](https://github.com/fantasyland/fantasy-land#chain).
 * 
 * If second argument is a function, `chain(f, g)(x)` is equivalent to `f(g(x), x)`.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param {import('./types').MaybeRef<Function>} fn The function to map with
 * @param {import('./types').MaybeWatchSource<Array>} list The list to map over
 * @return {import('vue').ComputedRef<Array>} The result of flat-mapping `list` with `fn`
*/
export const useChain = curryN(2,(fn, list) => computed(() => chain(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof list === 'function' ? list() : unref(list))))


/**
 * Restricts a number to be within a range.
 * 
 * Also works for other ordered types such as Strings and Dates.
 *
 * @param {import('./types').MaybeWatchSource<Number>} minimum The lower limit of the clamp (inclusive)
 * @param {import('./types').MaybeWatchSource<Number>} maximum The upper limit of the clamp (inclusive)
 * @param {import('./types').MaybeWatchSource<Number>} value Value to be clamped
 * @return {import('vue').ComputedRef<Number>} Returns `minimum` when `val < minimum`, `maximum` when `val > maximum`, returns `val` otherwise
*/
export const useClamp = curryN(3,(minimum, maximum, value) => computed(() => clamp(typeof minimum === 'function' ? minimum() : unref(minimum), typeof maximum === 'function' ? maximum() : unref(maximum), typeof value === 'function' ? value() : unref(value))))


/**
 * Creates a deep copy of the source that can be used in place of the source
 * object without retaining any references to it.
 * The source object may contain (nested) `Array`s and `Object`s,
 * `Number`s, `String`s, `Boolean`s and `Date`s.
 * `Function`s are assigned by reference rather than copied.
 * 
 * Dispatches to a `clone` method if present.
 * 
 * Note that if the source object has multiple nodes that share a reference,
 * the returned object will have the same structure, but the references will
 * be pointed to the location within the cloned value.
 *
 * @param {import('./types').MaybeRef<*>} value The object or array to clone
 * @return {import('vue').ComputedRef<*>} A deeply cloned copy of `val`
*/
export const useClone = (value) => computed(() => clone(typeof value === 'function' ? (...fnArgs) => unref(unref(value)(...fnArgs)) : unref(value)))


/**
 * Splits a list into sub-lists, based on the result of calling a key-returning function on each element,
 * and grouping the results according to values returned.
 *
 * @param {import('./types').MaybeRef<Function>} fn Function :: a -> Idx
 * @param {import('./types').MaybeWatchSource<Array>} list The array to group
 * @return {import('vue').ComputedRef<Array>} An array of arrays where each sub-array contains items for which the String-returning function has returned the same value.
*/
export const useCollectBy = curryN(2,(fn, list) => computed(() => collectBy(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof list === 'function' ? list() : unref(list))))


/**
 * Makes a comparator function out of a function that reports whether the first
 * element is less than the second.
 *
 * @param {import('./types').MaybeRef<Function>} pred A predicate function of arity two which will return `true` if the first argument is less than the second, `false` otherwise
 * @return {import('vue').ComputedRef<Function>} A Function :: a -> b -> Int that returns `-1` if a < b, `1` if b < a, otherwise `0`
*/
export const useComparator = (pred) => computed(() => comparator(typeof pred === 'function' ? (...fnArgs) => unref(unref(pred)(...fnArgs)) : unref(pred)))


/**
 * Takes a function `f` and returns a function `g` such that if called with the same arguments
 * when `f` returns a "truthy" value, `g` returns `false` and when `f` returns a "falsy" value `g` returns `true`.
 * 
 * `R.complement` may be applied to any functor
 *
 * @param {import('./types').MaybeRef<Function>} f 
 * @return {import('vue').ComputedRef<Function>} 
*/
export const useComplement = (f) => computed(() => complement(typeof f === 'function' ? (...fnArgs) => unref(unref(f)(...fnArgs)) : unref(f)))


/**
 * Performs right-to-left function composition. The last argument may have
 * any arity; the remaining arguments must be unary.
 * 
 * **Note:** The result of compose is not automatically curried.
 *
 * @param {...import('./types').MaybeRef<Function>} ...functions The functions to compose
 * @return {import('vue').ComputedRef<Function>} 
*/
export const useCompose = (...functions) => computed(() => compose(...functions.map(varArg => typeof varArg === 'function' ? (...fnArgs) => unref(unref(varArg)(...fnArgs)) : unref(varArg))))


/**
 * Performs right-to-left function composition using transforming function. The last function may have
 * any arity; the remaining functions must be unary. Unlike `compose`, functions are passed in an array.
 * 
 * **Note:** The result of composeWith is not automatically curried. Transforming function is not used
 * on the last argument.
 *
 * @param {import('./types').MaybeRef<Function>} transformer The transforming function
 * @param {import('./types').MaybeWatchSource<Array>} functions The functions to compose
 * @return {import('vue').ComputedRef<Function>} 
*/
export const useComposeWith = curryN(2,(transformer, functions) => computed(() => composeWith(typeof transformer === 'function' ? (...fnArgs) => unref(unref(transformer)(...fnArgs)) : unref(transformer), typeof functions === 'function' ? functions() : unref(functions))))


/**
 * Returns the result of concatenating the given lists or strings.
 * 
 * Note: `R.concat` expects both arguments to be of the same type,
 * unlike the native `Array.prototype.concat` method. It will throw
 * an error if you `concat` an Array with a non-Array value.
 * 
 * Dispatches to the `concat` method of the first argument, if present.
 * Can also concatenate two members of a [fantasy-land
 * compatible semigroup](https://github.com/fantasyland/fantasy-land#semigroup).
 *
 * @param {import('./types').MaybeWatchSource<Array|String>} firstList The first list
 * @param {import('./types').MaybeWatchSource<Array|String>} secondList The second list
 * @return {import('vue').ComputedRef<Array|String>} A list consisting of the elements of `firstList` followed by the elements of `secondList`.  *
*/
export const useConcat = curryN(2,(firstList, secondList) => computed(() => concat(typeof firstList === 'function' ? firstList() : unref(firstList), typeof secondList === 'function' ? secondList() : unref(secondList))))


/**
 * Returns a function, `fn`, which encapsulates `if/else, if/else, ...` logic.
 * `R.cond` takes a list of [predicate, transformer] pairs. All of the arguments
 * to `fn` are applied to each of the predicates in turn until one returns a
 * "truthy" value, at which point `fn` returns the result of applying its
 * arguments to the corresponding transformer. If none of the predicates
 * matches, `fn` returns undefined.
 * 
 * **Please note**: This is not a direct substitute for a `switch` statement.
 * Remember that both elements of every pair passed to `cond` are *functions*,
 * and `cond` returns a function.
 *
 * @param {import('./types').MaybeWatchSource<Array>} pairs A list of [predicate, transformer]
 * @return {import('vue').ComputedRef<Function>} 
*/
export const useCond = (pairs) => computed(() => cond(typeof pairs === 'function' ? pairs() : unref(pairs)))


/**
 * Wraps a constructor function inside a curried function that can be called
 * with the same arguments and returns the same type.
 *
 * @param {import('./types').MaybeRef<Function>} fn The constructor function to wrap.
 * @return {import('vue').ComputedRef<Function>} A wrapped, curried constructor function.
*/
export const useConstruct = (fn) => computed(() => construct(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn)))


/**
 * Wraps a constructor function inside a curried function that can be called
 * with the same arguments and returns the same type. The arity of the function
 * returned is specified to allow using variadic constructor functions.
 *
 * @param {import('./types').MaybeWatchSource<Number>} n The arity of the constructor function.
 * @param {import('./types').MaybeRef<Function>} Fn The constructor function to wrap.
 * @return {import('vue').ComputedRef<Function>} A wrapped, curried constructor function.
*/
export const useConstructN = curryN(2,(n, Fn) => computed(() => constructN(typeof n === 'function' ? n() : unref(n), typeof Fn === 'function' ? (...fnArgs) => unref(unref(Fn)(...fnArgs)) : unref(Fn))))


/**
 * Accepts a converging function and a list of branching functions and returns
 * a new function. The arity of the new function is the same as the arity of
 * the longest branching function. When invoked, this new function is applied
 * to some arguments, and each branching function is applied to those same
 * arguments. The results of each branching function are passed as arguments
 * to the converging function to produce the return value.
 *
 * @param {import('./types').MaybeRef<Function>} after A function. `after` will be invoked with the return values of `fn1` and `fn2` as its arguments.
 * @param {import('./types').MaybeWatchSource<Array>} functions A list of functions.
 * @return {import('vue').ComputedRef<Function>} A new function.
*/
export const useConverge = curryN(2,(after, functions) => computed(() => converge(typeof after === 'function' ? (...fnArgs) => unref(unref(after)(...fnArgs)) : unref(after), typeof functions === 'function' ? functions() : unref(functions))))


/**
 * Returns the number of items in a given `list` matching the predicate `f`
 *
 * @param {import('./types').MaybeRef<Function>} predicate to match items against
 * @return {import('vue').ComputedRef<Array>} list of items to count in
*/
export const useCount = (predicate) => computed(() => count(typeof predicate === 'function' ? (...fnArgs) => unref(unref(predicate)(...fnArgs)) : unref(predicate)))


/**
 * Counts the elements of a list according to how many match each value of a
 * key generated by the supplied function. Returns an object mapping the keys
 * produced by `fn` to the number of occurrences in the list. Note that all
 * keys are coerced to strings because of how JavaScript objects work.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param {import('./types').MaybeRef<Function>} fn The function used to map values to keys.
 * @param {import('./types').MaybeWatchSource<Array>} list The list to count elements from.
 * @return {import('vue').ComputedRef<Object>} An object mapping keys to number of occurrences in the list.
*/
export const useCountBy = curryN(2,(fn, list) => computed(() => countBy(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof list === 'function' ? list() : unref(list))))


/**
 * Returns a curried equivalent of the provided function. The curried function
 * has two unusual capabilities. First, its arguments needn't be provided one
 * at a time. If `f` is a ternary function and `g` is `R.curry(f)`, the
 * following are equivalent:
 * 
 * - `g(1)(2)(3)`
 * - `g(1)(2, 3)`
 * - `g(1, 2)(3)`
 * - `g(1, 2, 3)`
 * 
 * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
 * the following are equivalent:
 * 
 * - `g(1, 2, 3)`
 * - `g(_, 2, 3)(1)`
 * - `g(_, _, 3)(1)(2)`
 * - `g(_, _, 3)(1, 2)`
 * - `g(_, 2)(1)(3)`
 * - `g(_, 2)(1, 3)`
 * - `g(_, 2)(_, 3)(1)`
 * 
 * Please note that default parameters don't count towards a [function arity](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
 * and therefore `curry` won't work well with those:
 * 
 * ```
 * const h = R.curry((a, b, c = 2) => a + b + c);
 * 
 * h(40);
 * //=> function (waits for `b`)
 * 
 * h(39)(1);
 * //=> 42
 * 
 * h(1)(2, 3);
 * //=> 6
 * 
 * h(1)(2)(7);
 * //=> Error! (`3` is not a function!)
 * ```
 *
 * @param {import('./types').MaybeRef<Function>} fn The function to curry.
 * @return {import('vue').ComputedRef<Function>} A new, curried function.
*/
export const useCurry = (fn) => computed(() => curry(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn)))


/**
 * Returns a curried equivalent of the provided function, with the specified
 * arity. The curried function has two unusual capabilities. First, its
 * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the
 * following are equivalent:
 * 
 * - `g(1)(2)(3)`
 * - `g(1)(2, 3)`
 * - `g(1, 2)(3)`
 * - `g(1, 2, 3)`
 * 
 * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
 * the following are equivalent:
 * 
 * - `g(1, 2, 3)`
 * - `g(_, 2, 3)(1)`
 * - `g(_, _, 3)(1)(2)`
 * - `g(_, _, 3)(1, 2)`
 * - `g(_, 2)(1)(3)`
 * - `g(_, 2)(1, 3)`
 * - `g(_, 2)(_, 3)(1)`
 *
 * @param {import('./types').MaybeWatchSource<Number>} length The arity for the returned function.
 * @param {import('./types').MaybeRef<Function>} fn The function to curry.
 * @return {import('vue').ComputedRef<Function>} A new, curried function.
*/
export const useCurryN = curryN(2,(_length, fn) => computed(() => curryN(typeof _length === 'function' ? _length() : unref(_length), typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn))))


/**
 * Decrements its argument.
 *
 * @param {import('./types').MaybeWatchSource<Number>} n 
 * @return {import('vue').ComputedRef<Number>} n - 1
*/
export const useDec = (n) => computed(() => dec(typeof n === 'function' ? n() : unref(n)))


/**
 * Returns the second argument if it is not `null`, `undefined` or `NaN`;
 * otherwise the first argument is returned.
 *
 * @param {import('./types').MaybeWatchSource<a>} default The default value.
 * @param {import('./types').MaybeWatchSource<b>} val `val` will be returned instead of `default` unless `val` is `null`, `undefined` or `NaN`.
 * @return {import('vue').ComputedRef<*>} The second value if it is not `null`, `undefined` or `NaN`, otherwise the default value
*/
export const useDefaultTo = curryN(2,(_default, val) => computed(() => defaultTo(typeof _default === 'function' ? _default() : unref(_default), typeof val === 'function' ? val() : unref(val))))


/**
 * Makes a descending comparator function out of a function that returns a value
 * that can be compared with `<` and `>`.
 *
 * @param {import('./types').MaybeRef<Function>} fn A function of arity one that returns a value that can be compared
 * @param {import('./types').MaybeRef<*>} a The first item to be compared.
 * @param {import('./types').MaybeRef<*>} b The second item to be compared.
 * @return {import('vue').ComputedRef<Number>} `-1` if fn(a) > fn(b), `1` if fn(b) > fn(a), otherwise `0`
*/
export const useDescend = curryN(3,(fn, a, b) => computed(() => descend(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof a === 'function' ? (...fnArgs) => unref(unref(a)(...fnArgs)) : unref(a), typeof b === 'function' ? (...fnArgs) => unref(unref(b)(...fnArgs)) : unref(b))))


/**
 * Finds the set (i.e. no duplicates) of all elements in the first list not
 * contained in the second list. Objects and Arrays are compared in terms of
 * value equality, not reference equality.
 *
 * @param {import('./types').MaybeWatchSource<Array>} list1 The first list.
 * @param {import('./types').MaybeWatchSource<Array>} list2 The second list.
 * @return {import('vue').ComputedRef<Array>} The elements in `list1` that are not in `list2`.
*/
export const useDifference = curryN(2,(list1, list2) => computed(() => difference(typeof list1 === 'function' ? list1() : unref(list1), typeof list2 === 'function' ? list2() : unref(list2))))


/**
 * Finds the set (i.e. no duplicates) of all elements in the first list not
 * contained in the second list. Duplication is determined according to the
 * value returned by applying the supplied predicate to two list elements.
 *
 * @param {import('./types').MaybeRef<Function>} pred A predicate used to test whether two items are equal.
 * @param {import('./types').MaybeWatchSource<Array>} list1 The first list.
 * @param {import('./types').MaybeWatchSource<Array>} list2 The second list.
 * @return {import('vue').ComputedRef<Array>} The elements in `list1` that are not in `list2`.
*/
export const useDifferenceWith = curryN(3,(pred, list1, list2) => computed(() => differenceWith(typeof pred === 'function' ? (...fnArgs) => unref(unref(pred)(...fnArgs)) : unref(pred), typeof list1 === 'function' ? list1() : unref(list1), typeof list2 === 'function' ? list2() : unref(list2))))


/**
 * Returns a new object that does not contain a `prop` property.
 *
 * @param {import('./types').MaybeWatchSource<String>} prop The name of the property to dissociate
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to clone
 * @return {import('vue').ComputedRef<Object>} A new object equivalent to the original but without the specified property
*/
export const useDissoc = curryN(2,(_prop, obj) => computed(() => dissoc(typeof _prop === 'function' ? _prop() : unref(_prop), typeof obj === 'function' ? obj() : unref(obj))))


/**
 * Makes a shallow clone of an object, omitting the property at the given path.
 * Note that this copies and flattens prototype properties onto the new object
 * as well. All non-primitive properties are copied by reference.
 *
 * @param {import('./types').MaybeWatchSource<Array>} path The path to the value to omit
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to clone
 * @return {import('vue').ComputedRef<Object>} A new object without the property at path
*/
export const useDissocPath = curryN(2,(_path, obj) => computed(() => dissocPath(typeof _path === 'function' ? _path() : unref(_path), typeof obj === 'function' ? obj() : unref(obj))))


/**
 * Divides two numbers. Equivalent to `a / b`.
 *
 * @param {import('./types').MaybeWatchSource<Number>} a The first value.
 * @param {import('./types').MaybeWatchSource<Number>} b The second value.
 * @return {import('vue').ComputedRef<Number>} The result of `a / b`.
*/
export const useDivide = curryN(2,(a, b) => computed(() => divide(typeof a === 'function' ? a() : unref(a), typeof b === 'function' ? b() : unref(b))))


/**
 * Returns all but the first `n` elements of the given list, string, or
 * transducer/transformer (or object with a `drop` method).
 * 
 * Dispatches to the `drop` method of the second argument, if present.
 *
 * @param {import('./types').MaybeWatchSource<Number>} n 
 * @param {import('./types').MaybeRef<*>} list 
 * @return {import('vue').ComputedRef<*>} A copy of list without the first `n` elements
*/
export const useDrop = curryN(2,(n, list) => computed(() => drop(typeof n === 'function' ? n() : unref(n), typeof list === 'function' ? (...fnArgs) => unref(unref(list)(...fnArgs)) : unref(list))))


/**
 * Returns a list containing all but the last `n` elements of the given `list`.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param {import('./types').MaybeWatchSource<Number>} n The number of elements of `list` to skip.
 * @param {import('./types').MaybeWatchSource<Array>} list The list of elements to consider.
 * @return {import('vue').ComputedRef<Array>} A copy of the list with only the first `list.length - n` elements
*/
export const useDropLast = curryN(2,(n, list) => computed(() => dropLast(typeof n === 'function' ? n() : unref(n), typeof list === 'function' ? list() : unref(list))))


/**
 * Returns a new list excluding all the tailing elements of a given list which
 * satisfy the supplied predicate function. It passes each value from the right
 * to the supplied predicate function, skipping elements until the predicate
 * function returns a `falsy` value. The predicate function is applied to one argument:
 * *(value)*.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param {import('./types').MaybeRef<Function>} predicate The function to be called on each element
 * @param {import('./types').MaybeWatchSource<Array>} xs The collection to iterate over.
 * @return {import('vue').ComputedRef<Array>} A new array without any trailing elements that return `falsy` values from the `predicate`.
*/
export const useDropLastWhile = curryN(2,(predicate, xs) => computed(() => dropLastWhile(typeof predicate === 'function' ? (...fnArgs) => unref(unref(predicate)(...fnArgs)) : unref(predicate), typeof xs === 'function' ? xs() : unref(xs))))


/**
 * Returns a new list without any consecutively repeating elements.
 * [`R.equals`](#equals) is used to determine equality.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param {import('./types').MaybeWatchSource<Array>} list The array to consider.
 * @return {import('vue').ComputedRef<Array>} `list` without repeating elements.
*/
export const useDropRepeats = (list) => computed(() => dropRepeats(typeof list === 'function' ? list() : unref(list)))


/**
 * Returns a new list without any consecutively repeating elements,
 * based upon the value returned by applying the supplied function to
 * each list element. [`R.equals`](#equals) is used to determine equality.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param {import('./types').MaybeRef<Function>} fn A function used to produce a value to use during comparisons.
 * @param {import('./types').MaybeWatchSource<Array>} list The array to consider.
 * @return {import('vue').ComputedRef<Array>} `list` without repeating elements.
*/
export const useDropRepeatsBy = curryN(2,(fn, list) => computed(() => dropRepeatsBy(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof list === 'function' ? list() : unref(list))))


/**
 * Returns a new list without any consecutively repeating elements. Equality is
 * determined by applying the supplied predicate to each pair of consecutive elements. The
 * first element in a series of equal elements will be preserved.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param {import('./types').MaybeRef<Function>} pred A predicate used to test whether two items are equal.
 * @param {import('./types').MaybeWatchSource<Array>} list The array to consider.
 * @return {import('vue').ComputedRef<Array>} `list` without repeating elements.
*/
export const useDropRepeatsWith = curryN(2,(pred, list) => computed(() => dropRepeatsWith(typeof pred === 'function' ? (...fnArgs) => unref(unref(pred)(...fnArgs)) : unref(pred), typeof list === 'function' ? list() : unref(list))))


/**
 * Returns a new list excluding the leading elements of a given list which
 * satisfy the supplied predicate function. It passes each value to the supplied
 * predicate function, skipping elements while the predicate function returns
 * `true`. The predicate function is applied to one argument: *(value)*.
 * 
 * Dispatches to the `dropWhile` method of the second argument, if present.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param {import('./types').MaybeRef<Function>} fn The function called per iteration.
 * @param {import('./types').MaybeWatchSource<Array>} xs The collection to iterate over.
 * @return {import('vue').ComputedRef<Array>} A new array.
*/
export const useDropWhile = curryN(2,(fn, xs) => computed(() => dropWhile(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof xs === 'function' ? xs() : unref(xs))))


/**
 * A function wrapping calls to the two functions in an `||` operation,
 * returning the result of the first function if it is truth-y and the result
 * of the second function otherwise. Note that this is short-circuited,
 * meaning that the second function will not be invoked if the first returns a
 * truth-y value.
 * 
 * In addition to functions, `R.either` also accepts any fantasy-land compatible
 * applicative functor.
 *
 * @param {import('./types').MaybeRef<Function>} f a predicate
 * @param {import('./types').MaybeRef<Function>} g another predicate
 * @return {import('vue').ComputedRef<Function>} a function that applies its arguments to `f` and `g` and `||`s their outputs together.
*/
export const useEither = curryN(2,(f, g) => computed(() => either(typeof f === 'function' ? (...fnArgs) => unref(unref(f)(...fnArgs)) : unref(f), typeof g === 'function' ? (...fnArgs) => unref(unref(g)(...fnArgs)) : unref(g))))


/**
 * Returns the empty value of its argument's type. Ramda defines the empty
 * value of Array (`[]`), Object (`{}`), String (`''`),
 * TypedArray (`Uint8Array []`, `Float32Array []`, etc), and Arguments. Other
 * types are supported if they define `<Type>.empty`,
 * `<Type>.prototype.empty` or implement the
 * [FantasyLand Monoid spec](https://github.com/fantasyland/fantasy-land#monoid).
 * 
 * Dispatches to the `empty` method of the first argument, if present.
 *
 * @param {import('./types').MaybeRef<*>} x 
 * @return {import('vue').ComputedRef<*>} 
*/
export const useEmpty = (x) => computed(() => empty(typeof x === 'function' ? (...fnArgs) => unref(unref(x)(...fnArgs)) : unref(x)))


/**
 * Checks if a list ends with the provided sublist.
 * 
 * Similarly, checks if a string ends with the provided substring.
 *
 * @param {import('./types').MaybeRef<*>} suffix 
 * @param {import('./types').MaybeRef<*>} list 
 * @return {import('vue').ComputedRef<Boolean>} 
*/
export const useEndsWith = curryN(2,(suffix, list) => computed(() => endsWith(typeof suffix === 'function' ? (...fnArgs) => unref(unref(suffix)(...fnArgs)) : unref(suffix), typeof list === 'function' ? (...fnArgs) => unref(unref(list)(...fnArgs)) : unref(list))))


/**
 * Takes a function and two values in its domain and returns `true` if the
 * values map to the same value in the codomain; `false` otherwise.
 *
 * @param {import('./types').MaybeRef<Function>} f 
 * @param {import('./types').MaybeRef<*>} x 
 * @param {import('./types').MaybeRef<*>} y 
 * @return {import('vue').ComputedRef<Boolean>} 
*/
export const useEqBy = curryN(3,(f, x, y) => computed(() => eqBy(typeof f === 'function' ? (...fnArgs) => unref(unref(f)(...fnArgs)) : unref(f), typeof x === 'function' ? (...fnArgs) => unref(unref(x)(...fnArgs)) : unref(x), typeof y === 'function' ? (...fnArgs) => unref(unref(y)(...fnArgs)) : unref(y))))


/**
 * Reports whether two objects have the same value, in [`R.equals`](#equals)
 * terms, for the specified property. Useful as a curried predicate.
 *
 * @param {import('./types').MaybeWatchSource<String>} prop The name of the property to compare
 * @param {import('./types').MaybeWatchSource<Object>} obj1 
 * @param {import('./types').MaybeWatchSource<Object>} obj2 
 * @return {import('vue').ComputedRef<Boolean>} *
*/
export const useEqProps = curryN(3,(_prop, obj1, obj2) => computed(() => eqProps(typeof _prop === 'function' ? _prop() : unref(_prop), typeof obj1 === 'function' ? obj1() : unref(obj1), typeof obj2 === 'function' ? obj2() : unref(obj2))))


/**
 * Returns `true` if its arguments are equivalent, `false` otherwise. Handles
 * cyclical data structures.
 * 
 * Dispatches symmetrically to the `equals` methods of both arguments, if
 * present.
 *
 * @param {import('./types').MaybeRef<*>} a 
 * @param {import('./types').MaybeRef<*>} b 
 * @return {import('vue').ComputedRef<Boolean>} 
*/
export const useEquals = curryN(2,(a, b) => computed(() => equals(typeof a === 'function' ? (...fnArgs) => unref(unref(a)(...fnArgs)) : unref(a), typeof b === 'function' ? (...fnArgs) => unref(unref(b)(...fnArgs)) : unref(b))))


/**
 * Creates a new object by recursively evolving a shallow copy of `object`,
 * according to the `transformation` functions. All non-primitive properties
 * are copied by reference.
 * 
 * A `transformation` function will not be invoked if its corresponding key
 * does not exist in the evolved object.
 *
 * @param {import('./types').MaybeWatchSource<Object>} transformations The object specifying transformation functions to apply to the object.
 * @param {import('./types').MaybeWatchSource<Object>} object The object to be transformed.
 * @return {import('vue').ComputedRef<Object>} The transformed object.
*/
export const useEvolve = curryN(2,(transformations, object) => computed(() => evolve(typeof transformations === 'function' ? transformations() : unref(transformations), typeof object === 'function' ? object() : unref(object))))


/**
 * Takes a predicate and a `Filterable`, and returns a new filterable of the
 * same type containing the members of the given filterable which satisfy the
 * given predicate. Filterable objects include plain objects or any object
 * that has a filter method such as `Array`.
 * 
 * Dispatches to the `filter` method of the second argument, if present.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param {import('./types').MaybeRef<Function>} pred 
 * @param {import('./types').MaybeWatchSource<Array>} filterable 
 * @return {import('vue').ComputedRef<Array>} Filterable
*/
export const useFilter = curryN(2,(pred, filterable) => computed(() => filter(typeof pred === 'function' ? (...fnArgs) => unref(unref(pred)(...fnArgs)) : unref(pred), typeof filterable === 'function' ? filterable() : unref(filterable))))


/**
 * Returns the first element of the list which matches the predicate, or
 * `undefined` if no element matches.
 * 
 * Dispatches to the `find` method of the second argument, if present.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param {import('./types').MaybeRef<Function>} fn The predicate function used to determine if the element is the desired one.
 * @param {import('./types').MaybeWatchSource<Array>} list The array to consider.
 * @return {import('vue').ComputedRef<Object>} The element found, or `undefined`.
*/
export const useFind = curryN(2,(fn, list) => computed(() => find(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof list === 'function' ? list() : unref(list))))


/**
 * Returns the index of the first element of the list which matches the
 * predicate, or `-1` if no element matches.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param {import('./types').MaybeRef<Function>} fn The predicate function used to determine if the element is the desired one.
 * @param {import('./types').MaybeWatchSource<Array>} list The array to consider.
 * @return {import('vue').ComputedRef<Number>} The index of the element found, or `-1`.
*/
export const useFindIndex = curryN(2,(fn, list) => computed(() => findIndex(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof list === 'function' ? list() : unref(list))))


/**
 * Returns the last element of the list which matches the predicate, or
 * `undefined` if no element matches.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param {import('./types').MaybeRef<Function>} fn The predicate function used to determine if the element is the desired one.
 * @param {import('./types').MaybeWatchSource<Array>} list The array to consider.
 * @return {import('vue').ComputedRef<Object>} The element found, or `undefined`.
*/
export const useFindLast = curryN(2,(fn, list) => computed(() => findLast(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof list === 'function' ? list() : unref(list))))


/**
 * Returns the index of the last element of the list which matches the
 * predicate, or `-1` if no element matches.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param {import('./types').MaybeRef<Function>} fn The predicate function used to determine if the element is the desired one.
 * @param {import('./types').MaybeWatchSource<Array>} list The array to consider.
 * @return {import('vue').ComputedRef<Number>} The index of the element found, or `-1`.
*/
export const useFindLastIndex = curryN(2,(fn, list) => computed(() => findLastIndex(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof list === 'function' ? list() : unref(list))))


/**
 * Returns a new list by pulling every item out of it (and all its sub-arrays)
 * and putting them in a new array, depth-first.
 *
 * @param {import('./types').MaybeWatchSource<Array>} list The array to consider.
 * @return {import('vue').ComputedRef<Array>} The flattened list.
*/
export const useFlatten = (list) => computed(() => flatten(typeof list === 'function' ? list() : unref(list)))


/**
 * Returns a new function much like the supplied one, except that the first two
 * arguments' order is reversed.
 *
 * @param {import('./types').MaybeRef<Function>} fn The function to invoke with its first two parameters reversed.
 * @return {import('vue').ComputedRef<*>} The result of invoking `fn` with its first two parameters' order reversed.
*/
export const useFlip = (fn) => computed(() => flip(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn)))


/**
 * Iterate over an input `list`, calling a provided function `fn` for each
 * element in the list.
 * 
 * `fn` receives one argument: *(value)*.
 * 
 * Note: `R.forEach` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.forEach` method. For more
 * details on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Description
 * 
 * Also note that, unlike `Array.prototype.forEach`, Ramda's `forEach` returns
 * the original array. In some libraries this function is named `each`.
 * 
 * Dispatches to the `forEach` method of the second argument, if present.
 *
 * @param {import('./types').MaybeRef<Function>} fn The function to invoke. Receives one argument, `value`.
 * @param {import('./types').MaybeWatchSource<Array>} list The list to iterate over.
 * @return {import('vue').ComputedRef<Array>} The original list.
*/
export const useForEach = curryN(2,(fn, list) => computed(() => forEach(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof list === 'function' ? list() : unref(list))))


/**
 * Iterate over an input `object`, calling a provided function `fn` for each
 * key and value in the object.
 * 
 * `fn` receives three argument: *(value, key, obj)*.
 *
 * @param {import('./types').MaybeRef<Function>} fn The function to invoke. Receives three argument, `value`, `key`, `obj`.
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to iterate over.
 * @return {import('vue').ComputedRef<Object>} The original object.
*/
export const useForEachObjIndexed = curryN(2,(fn, obj) => computed(() => forEachObjIndexed(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof obj === 'function' ? obj() : unref(obj))))


/**
 * Creates a new object from a list key-value pairs. If a key appears in
 * multiple pairs, the rightmost pair is included in the object.
 *
 * @param {import('./types').MaybeWatchSource<Array>} pairs An array of two-element arrays that will be the keys and values of the output object.
 * @return {import('vue').ComputedRef<Object>} The object made by pairing up `keys` and `values`.
*/
export const useFromPairs = (pairs) => computed(() => fromPairs(typeof pairs === 'function' ? pairs() : unref(pairs)))


/**
 * Splits a list into sub-lists stored in an object, based on the result of
 * calling a key-returning function on each element, and grouping the
 * results according to values returned.
 * 
 * Dispatches to the `groupBy` method of the second argument, if present.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param {import('./types').MaybeRef<Function>} fn Function :: a -> Idx
 * @param {import('./types').MaybeWatchSource<Array>} list The array to group
 * @return {import('vue').ComputedRef<Object>} An object with the output of `fn` for keys, mapped to arrays of elements that produced that key when passed to `fn`.
*/
export const useGroupBy = curryN(2,(fn, list) => computed(() => groupBy(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof list === 'function' ? list() : unref(list))))


/**
 * Takes a list and returns a list of lists where each sublist's elements are
 * all satisfied pairwise comparison according to the provided function.
 * Only adjacent elements are passed to the comparison function.
 *
 * @param {import('./types').MaybeRef<Function>} fn Function for determining whether two given (adjacent) elements should be in the same group
 * @param {import('./types').MaybeWatchSource<Array>} list The array to group. Also accepts a string, which will be treated as a list of characters.
 * @return {import('vue').ComputedRef<List>} A list that contains sublists of elements, whose concatenations are equal to the original list.
*/
export const useGroupWith = curryN(2,(fn, list) => computed(() => groupWith(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof list === 'function' ? list() : unref(list))))


/**
 * Returns `true` if the first argument is greater than the second; `false`
 * otherwise.
 *
 * @param {import('./types').MaybeRef<*>} a 
 * @param {import('./types').MaybeRef<*>} b 
 * @return {import('vue').ComputedRef<Boolean>} 
*/
export const useGt = curryN(2,(a, b) => computed(() => gt(typeof a === 'function' ? (...fnArgs) => unref(unref(a)(...fnArgs)) : unref(a), typeof b === 'function' ? (...fnArgs) => unref(unref(b)(...fnArgs)) : unref(b))))


/**
 * Returns `true` if the first argument is greater than or equal to the second;
 * `false` otherwise.
 *
 * @param {import('./types').MaybeWatchSource<Number>} a 
 * @param {import('./types').MaybeWatchSource<Number>} b 
 * @return {import('vue').ComputedRef<Boolean>} 
*/
export const useGte = curryN(2,(a, b) => computed(() => gte(typeof a === 'function' ? a() : unref(a), typeof b === 'function' ? b() : unref(b))))


/**
 * Returns whether or not an object has an own property with the specified name
 *
 * @param {import('./types').MaybeWatchSource<String>} prop The name of the property to check for.
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to query.
 * @return {import('vue').ComputedRef<Boolean>} Whether the property exists.
*/
export const useHas = curryN(2,(_prop, obj) => computed(() => has(typeof _prop === 'function' ? _prop() : unref(_prop), typeof obj === 'function' ? obj() : unref(obj))))


/**
 * Returns whether or not an object or its prototype chain has a property with
 * the specified name
 *
 * @param {import('./types').MaybeWatchSource<String>} prop The name of the property to check for.
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to query.
 * @return {import('vue').ComputedRef<Boolean>} Whether the property exists.
*/
export const useHasIn = curryN(2,(_prop, obj) => computed(() => hasIn(typeof _prop === 'function' ? _prop() : unref(_prop), typeof obj === 'function' ? obj() : unref(obj))))


/**
 * Returns whether or not a path exists in an object. Only the object's
 * own properties are checked.
 *
 * @param {import('./types').MaybeWatchSource<Array>} path The path to use.
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to check the path in.
 * @return {import('vue').ComputedRef<Boolean>} Whether the path exists.
*/
export const useHasPath = curryN(2,(_path, obj) => computed(() => hasPath(typeof _path === 'function' ? _path() : unref(_path), typeof obj === 'function' ? obj() : unref(obj))))


/**
 * Returns the first element of the given list or string. In some libraries
 * this function is named `first`.
 *
 * @param {import('./types').MaybeWatchSource<Array|String>} list 
 * @return {import('vue').ComputedRef<*>} 
*/
export const useHead = (list) => computed(() => head(typeof list === 'function' ? list() : unref(list)))


/**
 * Returns true if its arguments are identical, false otherwise. Values are
 * identical if they reference the same memory. `NaN` is identical to `NaN`;
 * `0` and `-0` are not identical.
 * 
 * Note this is merely a curried version of ES6 `Object.is`.
 * 
 * `identical` does not support the `__` placeholder.
 *
 * @param {import('./types').MaybeRef<*>} a 
 * @param {import('./types').MaybeRef<*>} b 
 * @return {import('vue').ComputedRef<Boolean>} 
*/
export const useIdentical = curryN(2,(a, b) => computed(() => identical(typeof a === 'function' ? (...fnArgs) => unref(unref(a)(...fnArgs)) : unref(a), typeof b === 'function' ? (...fnArgs) => unref(unref(b)(...fnArgs)) : unref(b))))


/**
 * A function that does nothing but return the parameter supplied to it. Good
 * as a default or placeholder function.
 *
 * @param {import('./types').MaybeRef<*>} x The value to return.
 * @return {import('vue').ComputedRef<*>} The input value, `x`.
*/
export const useIdentity = (x) => computed(() => identity(typeof x === 'function' ? (...fnArgs) => unref(unref(x)(...fnArgs)) : unref(x)))


/**
 * Creates a function that will process either the `onTrue` or the `onFalse`
 * function depending upon the result of the `condition` predicate.
 * 
 * Note that `ifElse` takes its arity from the longest of the three functions passed to it.
 *
 * @param {import('./types').MaybeRef<Function>} condition A predicate function
 * @param {import('./types').MaybeRef<Function>} onTrue A function to invoke when the `condition` evaluates to a truthy value.
 * @param {import('./types').MaybeRef<Function>} onFalse A function to invoke when the `condition` evaluates to a falsy value.
 * @return {import('vue').ComputedRef<Function>} A new function that will process either the `onTrue` or the `onFalse` function depending upon the result of the `condition` predicate.
*/
export const useIfElse = curryN(3,(condition, onTrue, onFalse) => computed(() => ifElse(typeof condition === 'function' ? (...fnArgs) => unref(unref(condition)(...fnArgs)) : unref(condition), typeof onTrue === 'function' ? (...fnArgs) => unref(unref(onTrue)(...fnArgs)) : unref(onTrue), typeof onFalse === 'function' ? (...fnArgs) => unref(unref(onFalse)(...fnArgs)) : unref(onFalse))))


/**
 * Increments its argument.
 *
 * @param {import('./types').MaybeWatchSource<Number>} n 
 * @return {import('vue').ComputedRef<Number>} n + 1
*/
export const useInc = (n) => computed(() => inc(typeof n === 'function' ? n() : unref(n)))


/**
 * Returns `true` if the specified value is equal, in [`R.equals`](#equals)
 * terms, to at least one element of the given list; `false` otherwise.
 * Also works with strings.
 *
 * @param {import('./types').MaybeWatchSource<Object>} a The item to compare against.
 * @param {import('./types').MaybeWatchSource<Array>} list The array to consider.
 * @return {import('vue').ComputedRef<Boolean>} `true` if an equivalent item is in the list, `false` otherwise.
*/
export const useIncludes = curryN(2,(a, list) => computed(() => includes(typeof a === 'function' ? a() : unref(a), typeof list === 'function' ? list() : unref(list))))


/**
 * Given a function that generates a key, turns a list of objects into an
 * object indexing the objects by the given key. Note that if multiple
 * objects generate the same value for the indexing key only the last value
 * will be included in the generated object.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param {import('./types').MaybeRef<Function>} fn Function :: a -> Idx
 * @param {import('./types').MaybeWatchSource<Array>} array The array of objects to index
 * @return {import('vue').ComputedRef<Object>} An object indexing each array element by the given property.
*/
export const useIndexBy = curryN(2,(fn, array) => computed(() => indexBy(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof array === 'function' ? array() : unref(array))))


/**
 * Returns the position of the first occurrence of an item in an array, or -1
 * if the item is not included in the array. [`R.equals`](#equals) is used to
 * determine equality.
 *
 * @param {import('./types').MaybeRef<*>} target The item to find.
 * @param {import('./types').MaybeWatchSource<Array>} xs The array to search in.
 * @return {import('vue').ComputedRef<Number>} the index of the target, or -1 if the target is not found.
*/
export const useIndexOf = curryN(2,(target, xs) => computed(() => indexOf(typeof target === 'function' ? (...fnArgs) => unref(unref(target)(...fnArgs)) : unref(target), typeof xs === 'function' ? xs() : unref(xs))))


/**
 * Returns all but the last element of the given list or string.
 *
 * @param {import('./types').MaybeRef<*>} list 
 * @return {import('vue').ComputedRef<*>} 
*/
export const useInit = (list) => computed(() => init(typeof list === 'function' ? (...fnArgs) => unref(unref(list)(...fnArgs)) : unref(list)))


/**
 * Takes a predicate `pred`, a list `xs`, and a list `ys`, and returns a list
 * `xs'` comprising each of the elements of `xs` which is equal to one or more
 * elements of `ys` according to `pred`.
 * 
 * `pred` must be a binary function expecting an element from each list.
 * 
 * `xs`, `ys`, and `xs'` are treated as sets, semantically, so ordering should
 * not be significant, but since `xs'` is ordered the implementation guarantees
 * that its values are in the same order as they appear in `xs`. Duplicates are
 * not removed, so `xs'` may contain duplicates if `xs` contains duplicates.
 *
 * @param {import('./types').MaybeRef<Function>} pred 
 * @param {import('./types').MaybeWatchSource<Array>} xs 
 * @param {import('./types').MaybeWatchSource<Array>} ys 
 * @return {import('vue').ComputedRef<Array>} 
*/
export const useInnerJoin = curryN(3,(pred, xs, ys) => computed(() => innerJoin(typeof pred === 'function' ? (...fnArgs) => unref(unref(pred)(...fnArgs)) : unref(pred), typeof xs === 'function' ? xs() : unref(xs), typeof ys === 'function' ? ys() : unref(ys))))


/**
 * Inserts the supplied element into the list, at the specified `index`. _Note that
 * this is not destructive_: it returns a copy of the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @param {import('./types').MaybeWatchSource<Number>} index The position to insert the element
 * @param {import('./types').MaybeRef<*>} elt The element to insert into the Array
 * @param {import('./types').MaybeWatchSource<Array>} list The list to insert into
 * @return {import('vue').ComputedRef<Array>} A new Array with `elt` inserted at `index`.
*/
export const useInsert = curryN(3,(index, elt, list) => computed(() => insert(typeof index === 'function' ? index() : unref(index), typeof elt === 'function' ? (...fnArgs) => unref(unref(elt)(...fnArgs)) : unref(elt), typeof list === 'function' ? list() : unref(list))))


/**
 * Inserts the sub-list into the list, at the specified `index`. _Note that this is not
 * destructive_: it returns a copy of the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @param {import('./types').MaybeWatchSource<Number>} index The position to insert the sub-list
 * @param {import('./types').MaybeWatchSource<Array>} elts The sub-list to insert into the Array
 * @param {import('./types').MaybeWatchSource<Array>} list The list to insert the sub-list into
 * @return {import('vue').ComputedRef<Array>} A new Array with `elts` inserted starting at `index`.
*/
export const useInsertAll = curryN(3,(index, elts, list) => computed(() => insertAll(typeof index === 'function' ? index() : unref(index), typeof elts === 'function' ? elts() : unref(elts), typeof list === 'function' ? list() : unref(list))))


/**
 * Combines two lists into a set (i.e. no duplicates) composed of those
 * elements common to both lists.
 *
 * @param {import('./types').MaybeWatchSource<Array>} list1 The first list.
 * @param {import('./types').MaybeWatchSource<Array>} list2 The second list.
 * @return {import('vue').ComputedRef<Array>} The list of elements found in both `list1` and `list2`.
*/
export const useIntersection = curryN(2,(list1, list2) => computed(() => intersection(typeof list1 === 'function' ? list1() : unref(list1), typeof list2 === 'function' ? list2() : unref(list2))))


/**
 * Creates a new list with the separator interposed between elements.
 * 
 * Dispatches to the `intersperse` method of the second argument, if present.
 *
 * @param {import('./types').MaybeRef<*>} separator The element to add to the list.
 * @param {import('./types').MaybeWatchSource<Array>} list The list to be interposed.
 * @return {import('vue').ComputedRef<Array>} The new list.
*/
export const useIntersperse = curryN(2,(separator, list) => computed(() => intersperse(typeof separator === 'function' ? (...fnArgs) => unref(unref(separator)(...fnArgs)) : unref(separator), typeof list === 'function' ? list() : unref(list))))


/**
 * Transforms the items of the list with the transducer and appends the
 * transformed items to the accumulator using an appropriate iterator function
 * based on the accumulator type.
 * 
 * The accumulator can be an array, string, object or a transformer. Iterated
 * items will be appended to arrays and concatenated to strings. Objects will
 * be merged directly or 2-item arrays will be merged as key, value pairs.
 * 
 * The accumulator can also be a transformer object that provides a 2-arity
 * reducing iterator function, step, 0-arity initial value function, init, and
 * 1-arity result extraction function result. The step function is used as the
 * iterator function in reduce. The result function is used to convert the
 * final accumulator into the return type and in most cases is R.identity. The
 * init function is used to provide the initial accumulator.
 * 
 * The iteration is performed with [`R.reduce`](#reduce) after initializing the
 * transducer.
 *
 * @param {import('./types').MaybeRef<*>} acc The initial accumulator value.
 * @param {import('./types').MaybeRef<Function>} xf The transducer function. Receives a transformer and returns a transformer.
 * @param {import('./types').MaybeWatchSource<Array>} list The list to iterate over.
 * @return {import('vue').ComputedRef<*>} The final, accumulated value.
*/
export const useInto = curryN(3,(acc, xf, list) => computed(() => into(typeof acc === 'function' ? (...fnArgs) => unref(unref(acc)(...fnArgs)) : unref(acc), typeof xf === 'function' ? (...fnArgs) => unref(unref(xf)(...fnArgs)) : unref(xf), typeof list === 'function' ? list() : unref(list))))


/**
 * Same as [`R.invertObj`](#invertObj), however this accounts for objects with
 * duplicate values by putting the values into an array.
 *
 * @param {import('./types').MaybeWatchSource<Object>} obj The object or array to invert
 * @return {import('vue').ComputedRef<Object>} out A new object with keys in an array.
*/
export const useInvert = (obj) => computed(() => invert(typeof obj === 'function' ? obj() : unref(obj)))


/**
 * Returns a new object with the keys of the given object as values, and the
 * values of the given object, which are coerced to strings, as keys. Note
 * that the last key found is preferred when handling the same value.
 *
 * @param {import('./types').MaybeWatchSource<Object>} obj The object or array to invert
 * @return {import('vue').ComputedRef<Object>} out A new object
*/
export const useInvertObj = (obj) => computed(() => invertObj(typeof obj === 'function' ? obj() : unref(obj)))


/**
 * Given an `arity` (Number) and a `name` (String) the `invoker` function
 * returns a curried function that takes `arity` arguments and a `context`
 * object. It will "invoke" the `name`'d function (a method) on the `context`
 * object.
 *
 * @param {import('./types').MaybeWatchSource<Number>} arity Number of arguments the returned function should take before the target object.
 * @param {import('./types').MaybeWatchSource<String>} method Name of any of the target object's methods to call.
 * @return {import('vue').ComputedRef<Function>} A new curried function.
*/
export const useInvoker = curryN(2,(arity, method) => computed(() => invoker(typeof arity === 'function' ? arity() : unref(arity), typeof method === 'function' ? method() : unref(method))))


/**
 * See if an object (i.e. `val`) is an instance of the supplied constructor. This
 * function will check up the inheritance chain, if any.
 * If `val` was created using `Object.create`, `R.is(Object, val) === true`.
 *
 * @param {import('./types').MaybeWatchSource<Object>} ctor A constructor
 * @param {import('./types').MaybeRef<*>} val The value to test
 * @return {import('vue').ComputedRef<Boolean>} 
*/
export const useIs = curryN(2,(ctor, val) => computed(() => is(typeof ctor === 'function' ? ctor() : unref(ctor), typeof val === 'function' ? (...fnArgs) => unref(unref(val)(...fnArgs)) : unref(val))))


/**
 * Returns `true` if the given value is its type's empty value; `false`
 * otherwise.
 *
 * @param {import('./types').MaybeRef<*>} x 
 * @return {import('vue').ComputedRef<Boolean>} 
*/
export const useIsEmpty = (x) => computed(() => isEmpty(typeof x === 'function' ? (...fnArgs) => unref(unref(x)(...fnArgs)) : unref(x)))


/**
 * Checks if the input value is `null` or `undefined`.
 *
 * @param {import('./types').MaybeRef<*>} x The value to test.
 * @return {import('vue').ComputedRef<Boolean>} `true` if `x` is `undefined` or `null`, otherwise `false`.
*/
export const useIsNil = (x) => computed(() => isNil(typeof x === 'function' ? (...fnArgs) => unref(unref(x)(...fnArgs)) : unref(x)))


/**
 * Checks if the input value is not `null` and not `undefined`.
 *
 * @param {import('./types').MaybeRef<*>} x The value to test.
 * @return {import('vue').ComputedRef<Boolean>} `true` if `x` is not `undefined` or not `null`, otherwise `false`.
*/
export const useIsNotNil = (x) => computed(() => isNotNil(typeof x === 'function' ? (...fnArgs) => unref(unref(x)(...fnArgs)) : unref(x)))


/**
 * Returns a string made by inserting the `separator` between each element and
 * concatenating all the elements into a single string.
 *
 * @param {import('./types').MaybeWatchSource<Number|String>} separator The string used to separate the elements.
 * @param {import('./types').MaybeWatchSource<Array>} xs The elements to join into a string.
 * @return {import('vue').ComputedRef<String>} str The string made by concatenating `xs` with `separator`.
*/
export const useJoin = curryN(2,(separator, xs) => computed(() => join(typeof separator === 'function' ? separator() : unref(separator), typeof xs === 'function' ? xs() : unref(xs))))


/**
 * juxt applies a list of functions to a list of values.
 *
 * @param {import('./types').MaybeWatchSource<Array>} fns An array of functions
 * @return {import('vue').ComputedRef<Function>} A function that returns a list of values after applying each of the original `fns` to its parameters.
*/
export const useJuxt = (fns) => computed(() => juxt(typeof fns === 'function' ? fns() : unref(fns)))


/**
 * Returns a list containing the names of all the enumerable own properties of
 * the supplied object.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to extract properties from
 * @return {import('vue').ComputedRef<Array>} An array of the object's own properties.
*/
export const useKeys = (obj) => computed(() => keys(typeof obj === 'function' ? obj() : unref(obj)))


/**
 * Returns a list containing the names of all the properties of the supplied
 * object, including prototype properties.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to extract properties from
 * @return {import('vue').ComputedRef<Array>} An array of the object's own and prototype properties.
*/
export const useKeysIn = (obj) => computed(() => keysIn(typeof obj === 'function' ? obj() : unref(obj)))


/**
 * Returns the last element of the given list or string.
 *
 * @param {import('./types').MaybeRef<*>} list 
 * @return {import('vue').ComputedRef<*>} 
*/
export const useLast = (list) => computed(() => last(typeof list === 'function' ? (...fnArgs) => unref(unref(list)(...fnArgs)) : unref(list)))


/**
 * Returns the position of the last occurrence of an item in an array, or -1 if
 * the item is not included in the array. [`R.equals`](#equals) is used to
 * determine equality.
 *
 * @param {import('./types').MaybeRef<*>} target The item to find.
 * @param {import('./types').MaybeWatchSource<Array>} xs The array to search in.
 * @return {import('vue').ComputedRef<Number>} the index of the target, or -1 if the target is not found.
*/
export const useLastIndexOf = curryN(2,(target, xs) => computed(() => lastIndexOf(typeof target === 'function' ? (...fnArgs) => unref(unref(target)(...fnArgs)) : unref(target), typeof xs === 'function' ? xs() : unref(xs))))


/**
 * Returns the number of elements in the array by returning `list.length`.
 *
 * @param {import('./types').MaybeWatchSource<Array>} list The array to inspect.
 * @return {import('vue').ComputedRef<Number>} The length of the array.
*/
export const useLength = (list) => computed(() => length(typeof list === 'function' ? list() : unref(list)))


/**
 * Returns a lens for the given getter and setter functions. The getter "gets"
 * the value of the focus; the setter "sets" the value of the focus. The setter
 * should not mutate the data structure.
 *
 * @param {import('./types').MaybeRef<Function>} getter 
 * @param {import('./types').MaybeRef<Function>} setter 
 * @return {import('vue').ComputedRef<Lens>} 
*/
export const useLens = curryN(2,(getter, setter) => computed(() => lens(typeof getter === 'function' ? (...fnArgs) => unref(unref(getter)(...fnArgs)) : unref(getter), typeof setter === 'function' ? (...fnArgs) => unref(unref(setter)(...fnArgs)) : unref(setter))))


/**
 * Returns a lens whose focus is the specified index.
 *
 * @param {import('./types').MaybeWatchSource<Number>} n 
 * @return {import('vue').ComputedRef<Lens>} 
*/
export const useLensIndex = (n) => computed(() => lensIndex(typeof n === 'function' ? n() : unref(n)))


/**
 * Returns a lens whose focus is the specified path.
 *
 * @param {import('./types').MaybeWatchSource<Array>} path The path to use.
 * @return {import('vue').ComputedRef<Lens>} 
*/
export const useLensPath = (_path) => computed(() => lensPath(typeof _path === 'function' ? _path() : unref(_path)))


/**
 * Returns a lens whose focus is the specified property.
 *
 * @param {import('./types').MaybeWatchSource<String>} k 
 * @return {import('vue').ComputedRef<Lens>} 
*/
export const useLensProp = (k) => computed(() => lensProp(typeof k === 'function' ? k() : unref(k)))


/**
 * "lifts" a function of arity >= 1 so that it may "map over" a list, Function or other
 * object that satisfies the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
 *
 * @param {import('./types').MaybeRef<Function>} fn The function to lift into higher context
 * @return {import('vue').ComputedRef<Function>} The lifted function.
*/
export const useLift = (fn) => computed(() => lift(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn)))


/**
 * "lifts" a function to be the specified arity, so that it may "map over" that
 * many lists, Functions or other objects that satisfy the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
 *
 * @param {import('./types').MaybeRef<Function>} fn The function to lift into higher context
 * @return {import('vue').ComputedRef<Function>} The lifted function.
*/
export const useLiftN = (fn) => computed(() => liftN(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn)))


/**
 * Returns `true` if the first argument is less than the second; `false`
 * otherwise.
 *
 * @param {import('./types').MaybeRef<*>} a 
 * @param {import('./types').MaybeRef<*>} b 
 * @return {import('vue').ComputedRef<Boolean>} 
*/
export const useLt = curryN(2,(a, b) => computed(() => lt(typeof a === 'function' ? (...fnArgs) => unref(unref(a)(...fnArgs)) : unref(a), typeof b === 'function' ? (...fnArgs) => unref(unref(b)(...fnArgs)) : unref(b))))


/**
 * Returns `true` if the first argument is less than or equal to the second;
 * `false` otherwise.
 *
 * @param {import('./types').MaybeWatchSource<Number>} a 
 * @param {import('./types').MaybeWatchSource<Number>} b 
 * @return {import('vue').ComputedRef<Boolean>} 
*/
export const useLte = curryN(2,(a, b) => computed(() => lte(typeof a === 'function' ? a() : unref(a), typeof b === 'function' ? b() : unref(b))))


/**
 * Takes a function and
 * a [functor](https://github.com/fantasyland/fantasy-land#functor),
 * applies the function to each of the functor's values, and returns
 * a functor of the same shape.
 * 
 * Ramda provides suitable `map` implementations for `Array` and `Object`,
 * so this function may be applied to `[1, 2, 3]` or `{x: 1, y: 2, z: 3}`.
 * 
 * Dispatches to the `map` method of the second argument, if present.
 * 
 * Acts as a transducer if a transformer is given in list position.
 * 
 * Also treats functions as functors and will compose them together.
 *
 * @param {import('./types').MaybeRef<Function>} fn The function to be called on every element of the input `list`.
 * @param {import('./types').MaybeWatchSource<Array>} list The list to be iterated over.
 * @return {import('vue').ComputedRef<Array>} The new list.
*/
export const useMap = curryN(2,(fn, list) => computed(() => map(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof list === 'function' ? list() : unref(list))))


/**
 * The `mapAccum` function behaves like a combination of map and reduce; it
 * applies a function to each element of a list, passing an accumulating
 * parameter from left to right, and returning a final value of this
 * accumulator together with the new list.
 * 
 * The iterator function receives two arguments, *acc* and *value*, and should
 * return a tuple *[acc, value]*.
 *
 * @param {import('./types').MaybeRef<Function>} fn The function to be called on every element of the input `list`.
 * @param {import('./types').MaybeRef<*>} acc The accumulator value.
 * @param {import('./types').MaybeWatchSource<Array>} list The list to iterate over.
 * @return {import('vue').ComputedRef<*>} The final, accumulated value.
*/
export const useMapAccum = curryN(3,(fn, acc, list) => computed(() => mapAccum(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof acc === 'function' ? (...fnArgs) => unref(unref(acc)(...fnArgs)) : unref(acc), typeof list === 'function' ? list() : unref(list))))


/**
 * The `mapAccumRight` function behaves like a combination of map and reduce; it
 * applies a function to each element of a list, passing an accumulating
 * parameter from right to left, and returning a final value of this
 * accumulator together with the new list.
 * 
 * Similar to [`mapAccum`](#mapAccum), except moves through the input list from
 * the right to the left.
 * 
 * The iterator function receives two arguments, *acc* and *value*, and should
 * return a tuple *[acc, value]*.
 *
 * @param {import('./types').MaybeRef<Function>} fn The function to be called on every element of the input `list`.
 * @param {import('./types').MaybeRef<*>} acc The accumulator value.
 * @param {import('./types').MaybeWatchSource<Array>} list The list to iterate over.
 * @return {import('vue').ComputedRef<*>} The final, accumulated value.
*/
export const useMapAccumRight = curryN(3,(fn, acc, list) => computed(() => mapAccumRight(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof acc === 'function' ? (...fnArgs) => unref(unref(acc)(...fnArgs)) : unref(acc), typeof list === 'function' ? list() : unref(list))))


/**
 * An Object-specific version of [`map`](#map). The function is applied to three
 * arguments: *(value, key, obj)*. If only the value is significant, use
 * [`map`](#map) instead.
 *
 * @param {import('./types').MaybeRef<Function>} fn 
 * @param {import('./types').MaybeWatchSource<Object>} obj 
 * @return {import('vue').ComputedRef<Object>} 
*/
export const useMapObjIndexed = curryN(2,(fn, obj) => computed(() => mapObjIndexed(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof obj === 'function' ? obj() : unref(obj))))


/**
 * Tests a regular expression against a String. Note that this function will
 * return an empty array when there are no matches. This differs from
 * [`String.prototype.match`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)
 * which returns `null` when there are no matches.
 *
 * @param {import('./types').MaybeWatchSource<RegExp>} rx A regular expression.
 * @param {import('./types').MaybeWatchSource<String>} str The string to match against
 * @return {import('vue').ComputedRef<Array>} The list of matches or empty array.
*/
export const useMatch = curryN(2,(rx, str) => computed(() => match(typeof rx === 'function' ? rx() : unref(rx), typeof str === 'function' ? str() : unref(str))))


/**
 * `mathMod` behaves like the modulo operator should mathematically, unlike the
 * `%` operator (and by extension, [`R.modulo`](#modulo)). So while
 * `-17 % 5` is `-2`, `mathMod(-17, 5)` is `3`. `mathMod` requires Integer
 * arguments, and returns NaN when the modulus is zero or negative.
 *
 * @param {import('./types').MaybeWatchSource<Number>} m The dividend.
 * @param {import('./types').MaybeWatchSource<Number>} p the modulus.
 * @return {import('vue').ComputedRef<Number>} The result of `b mod a`.
*/
export const useMathMod = curryN(2,(m, p) => computed(() => mathMod(typeof m === 'function' ? m() : unref(m), typeof p === 'function' ? p() : unref(p))))


/**
 * Returns the larger of its two arguments.
 *
 * @param {import('./types').MaybeRef<*>} a 
 * @param {import('./types').MaybeRef<*>} b 
 * @return {import('vue').ComputedRef<*>} 
*/
export const useMax = curryN(2,(a, b) => computed(() => max(typeof a === 'function' ? (...fnArgs) => unref(unref(a)(...fnArgs)) : unref(a), typeof b === 'function' ? (...fnArgs) => unref(unref(b)(...fnArgs)) : unref(b))))


/**
 * Takes a function and two values, and returns whichever value produces the
 * larger result when passed to the provided function.
 *
 * @param {import('./types').MaybeRef<Function>} f 
 * @param {import('./types').MaybeRef<*>} a 
 * @param {import('./types').MaybeRef<*>} b 
 * @return {import('vue').ComputedRef<*>} 
*/
export const useMaxBy = curryN(3,(f, a, b) => computed(() => maxBy(typeof f === 'function' ? (...fnArgs) => unref(unref(f)(...fnArgs)) : unref(f), typeof a === 'function' ? (...fnArgs) => unref(unref(a)(...fnArgs)) : unref(a), typeof b === 'function' ? (...fnArgs) => unref(unref(b)(...fnArgs)) : unref(b))))


/**
 * Returns the mean of the given list of numbers.
 *
 * @param {import('./types').MaybeWatchSource<Array>} list 
 * @return {import('vue').ComputedRef<Number>} 
*/
export const useMean = (list) => computed(() => mean(typeof list === 'function' ? list() : unref(list)))


/**
 * Returns the median of the given list of numbers.
 *
 * @param {import('./types').MaybeWatchSource<Array>} list 
 * @return {import('vue').ComputedRef<Number>} 
*/
export const useMedian = (list) => computed(() => median(typeof list === 'function' ? list() : unref(list)))


/**
 * Takes a string-returning function `keyGen` and a function `fn` and returns
 * a new function that returns cached results for subsequent
 * calls with the same arguments.
 * 
 * When the function is invoked, `keyGen` is applied to the same arguments
 * and its result becomes the cache key. If the cache contains something
 * under that key, the function simply returns it and does not invoke `fn` at all.
 * 
 * Otherwise `fn` is applied to the same arguments and its return value
 * is cached under that key and returned by the function.
 * 
 * Care must be taken when implementing `keyGen` to avoid key collision,
 * or if tracking references, memory leaks and mutating arguments.
 *
 * @param {import('./types').MaybeRef<Function>} keyGen The function to generate the cache key.
 * @param {import('./types').MaybeRef<Function>} fn The function to memoize.
 * @return {import('vue').ComputedRef<Function>} Memoized version of `fn`.
*/
export const useMemoizeWith = curryN(2,(keyGen, fn) => computed(() => memoizeWith(typeof keyGen === 'function' ? (...fnArgs) => unref(unref(keyGen)(...fnArgs)) : unref(keyGen), typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn))))


/**
 * Creates one new object with the own properties from a list of objects.
 * If a key exists in more than one object, the value from the last
 * object it exists in will be used.
 *
 * @param {import('./types').MaybeWatchSource<Array>} list An array of objects
 * @return {import('vue').ComputedRef<Object>} A merged object.
*/
export const useMergeAll = (list) => computed(() => mergeAll(typeof list === 'function' ? list() : unref(list)))


/**
 * Creates a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects:
 * - and both values are objects, the two values will be recursively merged
 * - otherwise the value from the first object will be used.
 *
 * @param {import('./types').MaybeWatchSource<Object>} lObj 
 * @param {import('./types').MaybeWatchSource<Object>} rObj 
 * @return {import('vue').ComputedRef<Object>} 
*/
export const useMergeDeepLeft = curryN(2,(lObj, rObj) => computed(() => mergeDeepLeft(typeof lObj === 'function' ? lObj() : unref(lObj), typeof rObj === 'function' ? rObj() : unref(rObj))))


/**
 * Creates a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects:
 * - and both values are objects, the two values will be recursively merged
 * - otherwise the value from the second object will be used.
 *
 * @param {import('./types').MaybeWatchSource<Object>} lObj 
 * @param {import('./types').MaybeWatchSource<Object>} rObj 
 * @return {import('vue').ComputedRef<Object>} 
*/
export const useMergeDeepRight = curryN(2,(lObj, rObj) => computed(() => mergeDeepRight(typeof lObj === 'function' ? lObj() : unref(lObj), typeof rObj === 'function' ? rObj() : unref(rObj))))


/**
 * Creates a new object with the own properties of the two provided objects.
 * If a key exists in both objects:
 * - and both associated values are also objects then the values will be
 * recursively merged.
 * - otherwise the provided function is applied to associated values using the
 * resulting value as the new value associated with the key.
 * If a key only exists in one object, the value will be associated with the key
 * of the resulting object.
 *
 * @param {import('./types').MaybeRef<Function>} fn 
 * @param {import('./types').MaybeWatchSource<Object>} lObj 
 * @param {import('./types').MaybeWatchSource<Object>} rObj 
 * @return {import('vue').ComputedRef<Object>} 
*/
export const useMergeDeepWith = curryN(3,(fn, lObj, rObj) => computed(() => mergeDeepWith(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof lObj === 'function' ? lObj() : unref(lObj), typeof rObj === 'function' ? rObj() : unref(rObj))))


/**
 * Creates a new object with the own properties of the two provided objects.
 * If a key exists in both objects:
 * - and both associated values are also objects then the values will be
 * recursively merged.
 * - otherwise the provided function is applied to the key and associated values
 * using the resulting value as the new value associated with the key.
 * If a key only exists in one object, the value will be associated with the key
 * of the resulting object.
 *
 * @param {import('./types').MaybeRef<Function>} fn 
 * @param {import('./types').MaybeWatchSource<Object>} lObj 
 * @param {import('./types').MaybeWatchSource<Object>} rObj 
 * @return {import('vue').ComputedRef<Object>} 
*/
export const useMergeDeepWithKey = curryN(3,(fn, lObj, rObj) => computed(() => mergeDeepWithKey(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof lObj === 'function' ? lObj() : unref(lObj), typeof rObj === 'function' ? rObj() : unref(rObj))))


/**
 * Create a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects,
 * the value from the first object will be used.
 *
 * @param {import('./types').MaybeWatchSource<Object>} l 
 * @param {import('./types').MaybeWatchSource<Object>} r 
 * @return {import('vue').ComputedRef<Object>} 
*/
export const useMergeLeft = curryN(2,(l, r) => computed(() => mergeLeft(typeof l === 'function' ? l() : unref(l), typeof r === 'function' ? r() : unref(r))))


/**
 * Create a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects,
 * the value from the second object will be used.
 *
 * @param {import('./types').MaybeWatchSource<Object>} l 
 * @param {import('./types').MaybeWatchSource<Object>} r 
 * @return {import('vue').ComputedRef<Object>} 
*/
export const useMergeRight = curryN(2,(l, r) => computed(() => mergeRight(typeof l === 'function' ? l() : unref(l), typeof r === 'function' ? r() : unref(r))))


/**
 * Creates a new object with the own properties of the two provided objects. If
 * a key exists in both objects, the provided function is applied to the values
 * associated with the key in each object, with the result being used as the
 * value associated with the key in the returned object.
 *
 * @param {import('./types').MaybeRef<Function>} fn 
 * @param {import('./types').MaybeWatchSource<Object>} l 
 * @param {import('./types').MaybeWatchSource<Object>} r 
 * @return {import('vue').ComputedRef<Object>} 
*/
export const useMergeWith = curryN(3,(fn, l, r) => computed(() => mergeWith(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof l === 'function' ? l() : unref(l), typeof r === 'function' ? r() : unref(r))))


/**
 * Creates a new object with the own properties of the two provided objects. If
 * a key exists in both objects, the provided function is applied to the key
 * and the values associated with the key in each object, with the result being
 * used as the value associated with the key in the returned object.
 *
 * @param {import('./types').MaybeRef<Function>} fn 
 * @param {import('./types').MaybeWatchSource<Object>} l 
 * @param {import('./types').MaybeWatchSource<Object>} r 
 * @return {import('vue').ComputedRef<Object>} 
*/
export const useMergeWithKey = curryN(3,(fn, l, r) => computed(() => mergeWithKey(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof l === 'function' ? l() : unref(l), typeof r === 'function' ? r() : unref(r))))


/**
 * Returns the smaller of its two arguments.
 *
 * @param {import('./types').MaybeRef<*>} a 
 * @param {import('./types').MaybeRef<*>} b 
 * @return {import('vue').ComputedRef<*>} 
*/
export const useMin = curryN(2,(a, b) => computed(() => min(typeof a === 'function' ? (...fnArgs) => unref(unref(a)(...fnArgs)) : unref(a), typeof b === 'function' ? (...fnArgs) => unref(unref(b)(...fnArgs)) : unref(b))))


/**
 * Takes a function and two values, and returns whichever value produces the
 * smaller result when passed to the provided function.
 *
 * @param {import('./types').MaybeRef<Function>} f 
 * @param {import('./types').MaybeRef<*>} a 
 * @param {import('./types').MaybeRef<*>} b 
 * @return {import('vue').ComputedRef<*>} 
*/
export const useMinBy = curryN(3,(f, a, b) => computed(() => minBy(typeof f === 'function' ? (...fnArgs) => unref(unref(f)(...fnArgs)) : unref(f), typeof a === 'function' ? (...fnArgs) => unref(unref(a)(...fnArgs)) : unref(a), typeof b === 'function' ? (...fnArgs) => unref(unref(b)(...fnArgs)) : unref(b))))


/**
 * Creates a copy of the passed object by applying an `fn` function to the given `prop` property.
 * 
 * The function will not be invoked, and the object will not change
 * if its corresponding property does not exist in the object.
 * All non-primitive properties are copied to the new object by reference.
 *
 * @param {import('./types').MaybeWatchSource<String|Number>} prop The property to be modified.
 * @param {import('./types').MaybeRef<Function>} fn The function to apply to the property.
 * @param {import('./types').MaybeWatchSource<Object>} object The object to be transformed.
 * @return {import('vue').ComputedRef<Object>} The transformed object.
*/
export const useModify = curryN(3,(_prop, fn, object) => computed(() => modify(typeof _prop === 'function' ? _prop() : unref(_prop), typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof object === 'function' ? object() : unref(object))))


/**
 * Creates a shallow clone of the passed object by applying an `fn` function
 * to the value at the given path.
 * 
 * The function will not be invoked, and the object will not change
 * if its corresponding path does not exist in the object.
 * All non-primitive properties are copied to the new object by reference.
 *
 * @param {import('./types').MaybeWatchSource<Array>} path The path to be modified.
 * @param {import('./types').MaybeRef<Function>} fn The function to apply to the path.
 * @param {import('./types').MaybeWatchSource<Object>} object The object to be transformed.
 * @return {import('vue').ComputedRef<Object>} The transformed object.
*/
export const useModifyPath = curryN(3,(_path, fn, object) => computed(() => modifyPath(typeof _path === 'function' ? _path() : unref(_path), typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof object === 'function' ? object() : unref(object))))


/**
 * Divides the first parameter by the second and returns the remainder. Note
 * that this function preserves the JavaScript-style behavior for modulo. For
 * mathematical modulo see [`mathMod`](#mathMod).
 *
 * @param {import('./types').MaybeWatchSource<Number>} a The value to the divide.
 * @param {import('./types').MaybeWatchSource<Number>} b The pseudo-modulus
 * @return {import('vue').ComputedRef<Number>} The result of `b % a`.
*/
export const useModulo = curryN(2,(a, b) => computed(() => modulo(typeof a === 'function' ? a() : unref(a), typeof b === 'function' ? b() : unref(b))))


/**
 * Move an item, at index `from`, to index `to`, in a list of elements.
 * A new list will be created containing the new elements order.
 *
 * @param {import('./types').MaybeWatchSource<Number>} from The source index
 * @param {import('./types').MaybeWatchSource<Number>} to The destination index
 * @param {import('./types').MaybeWatchSource<Array>} list The list which will serve to realise the move
 * @return {import('vue').ComputedRef<Array>} The new list reordered
*/
export const useMove = curryN(3,(from, to, list) => computed(() => move(typeof from === 'function' ? from() : unref(from), typeof to === 'function' ? to() : unref(to), typeof list === 'function' ? list() : unref(list))))


/**
 * Multiplies two numbers. Equivalent to `a * b` but curried.
 *
 * @param {import('./types').MaybeWatchSource<Number>} a The first value.
 * @param {import('./types').MaybeWatchSource<Number>} b The second value.
 * @return {import('vue').ComputedRef<Number>} The result of `ab`.
*/
export const useMultiply = curryN(2,(a, b) => computed(() => multiply(typeof a === 'function' ? a() : unref(a), typeof b === 'function' ? b() : unref(b))))


/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly `n` parameters. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * @param {import('./types').MaybeWatchSource<Number>} n The desired arity of the new function.
 * @param {import('./types').MaybeRef<Function>} fn The function to wrap.
 * @return {import('vue').ComputedRef<Function>} A new function wrapping `fn`. The new function is guaranteed to be of arity `n`.
*/
export const useNAry = curryN(2,(n, fn) => computed(() => nAry(typeof n === 'function' ? n() : unref(n), typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn))))


/**
 * Negates its argument.
 *
 * @param {import('./types').MaybeWatchSource<Number>} n 
 * @return {import('vue').ComputedRef<Number>} 
*/
export const useNegate = (n) => computed(() => negate(typeof n === 'function' ? n() : unref(n)))


/**
 * Returns `true` if no elements of the list match the predicate, `false`
 * otherwise.
 * 
 * Dispatches to the `all` method of the second argument, if present.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param {import('./types').MaybeRef<Function>} fn The predicate function.
 * @param {import('./types').MaybeWatchSource<Array>} list The array to consider.
 * @return {import('vue').ComputedRef<Boolean>} `true` if the predicate is not satisfied by every element, `false` otherwise.
*/
export const useNone = curryN(2,(fn, list) => computed(() => none(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof list === 'function' ? list() : unref(list))))


/**
 * A function that returns the `!` of its argument. It will return `true` when
 * passed false-y value, and `false` when passed a truth-y one.
 *
 * @param {import('./types').MaybeRef<*>} a any value
 * @return {import('vue').ComputedRef<Boolean>} the logical inverse of passed argument.
*/
export const useNot = (a) => computed(() => not(typeof a === 'function' ? (...fnArgs) => unref(unref(a)(...fnArgs)) : unref(a)))


/**
 * Returns the nth element of the given list or string. If n is negative the
 * element at index length + n is returned.
 *
 * @param {import('./types').MaybeWatchSource<Number>} offset 
 * @param {import('./types').MaybeRef<*>} list 
 * @return {import('vue').ComputedRef<*>} 
*/
export const useNth = curryN(2,(offset, list) => computed(() => nth(typeof offset === 'function' ? offset() : unref(offset), typeof list === 'function' ? (...fnArgs) => unref(unref(list)(...fnArgs)) : unref(list))))


/**
 * Returns a function which returns its nth argument.
 *
 * @param {import('./types').MaybeWatchSource<Number>} n 
 * @return {import('vue').ComputedRef<Function>} 
*/
export const useNthArg = (n) => computed(() => nthArg(typeof n === 'function' ? n() : unref(n)))


/**
 * `o` is a curried composition function that returns a unary function.
 * Like [`compose`](#compose), `o` performs right-to-left function composition.
 * Unlike [`compose`](#compose), the rightmost function passed to `o` will be
 * invoked with only one argument. Also, unlike [`compose`](#compose), `o` is
 * limited to accepting only 2 unary functions. The name o was chosen because
 * of its similarity to the mathematical composition operator ∘.
 *
 * @param {import('./types').MaybeRef<Function>} f 
 * @param {import('./types').MaybeRef<Function>} g 
 * @return {import('vue').ComputedRef<Function>} 
*/
export const useO = curryN(2,(f, g) => computed(() => o(typeof f === 'function' ? (...fnArgs) => unref(unref(f)(...fnArgs)) : unref(f), typeof g === 'function' ? (...fnArgs) => unref(unref(g)(...fnArgs)) : unref(g))))


/**
 * Creates an object containing a single key:value pair.
 *
 * @param {import('./types').MaybeWatchSource<String>} key 
 * @param {import('./types').MaybeRef<*>} val 
 * @return {import('vue').ComputedRef<Object>} 
*/
export const useObjOf = curryN(2,(key, val) => computed(() => objOf(typeof key === 'function' ? key() : unref(key), typeof val === 'function' ? (...fnArgs) => unref(unref(val)(...fnArgs)) : unref(val))))


/**
 * Given a constructor and a value, returns a new instance of that constructor
 * containing the value.
 * 
 * Dispatches to the `fantasy-land/of` method of the constructor first (if present)
 * or to the `of` method last (if present). When neither are present, wraps the
 * value in an array.
 * 
 * Note this `of` is different from the ES6 `of`; See
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of
 *
 * @param {import('./types').MaybeWatchSource<Object>} Ctor A constructor
 * @param {import('./types').MaybeRef<*>} val any value
 * @return {import('vue').ComputedRef<*>} An instance of the `Ctor` wrapping `val`.
*/
export const useOf = curryN(2,(Ctor, val) => computed(() => of(typeof Ctor === 'function' ? Ctor() : unref(Ctor), typeof val === 'function' ? (...fnArgs) => unref(unref(val)(...fnArgs)) : unref(val))))


/**
 * Returns a partial copy of an object omitting the keys specified.
 *
 * @param {import('./types').MaybeWatchSource<Array>} names an array of String property names to omit from the new object
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to copy from
 * @return {import('vue').ComputedRef<Object>} A new object with properties from `names` not on it.
*/
export const useOmit = curryN(2,(names, obj) => computed(() => omit(typeof names === 'function' ? names() : unref(names), typeof obj === 'function' ? obj() : unref(obj))))


/**
 * Takes a binary function `f`, a unary function `g`, and two values.
 * Applies `g` to each value, then applies the result of each to `f`.
 * 
 * Also known as the P combinator.
 *
 * @param {import('./types').MaybeRef<Function>} f a binary function
 * @param {import('./types').MaybeRef<Function>} g a unary function
 * @param {import('./types').MaybeRef<any>} a any value
 * @param {import('./types').MaybeRef<any>} b any value
 * @return {import('vue').ComputedRef<any>} The result of `f`
*/
export const useOn = curryN(4,(f, g, a, b) => computed(() => on(typeof f === 'function' ? (...fnArgs) => unref(unref(f)(...fnArgs)) : unref(f), typeof g === 'function' ? (...fnArgs) => unref(unref(g)(...fnArgs)) : unref(g), typeof a === 'function' ? (...fnArgs) => unref(unref(a)(...fnArgs)) : unref(a), typeof b === 'function' ? (...fnArgs) => unref(unref(b)(...fnArgs)) : unref(b))))


/**
 * Accepts a function `fn` and returns a function that guards invocation of
 * `fn` such that `fn` can only ever be called once, no matter how many times
 * the returned function is invoked. The first value calculated is returned in
 * subsequent invocations.
 *
 * @param {import('./types').MaybeRef<Function>} fn The function to wrap in a call-only-once wrapper.
 * @return {import('vue').ComputedRef<Function>} The wrapped function.
*/
export const useOnce = (fn) => computed(() => once(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn)))


/**
 * Returns the first argument if it is truthy, otherwise the second argument.
 * Acts as the boolean `or` statement if both inputs are `Boolean`s.
 *
 * @param {import('./types').MaybeRef<Any>} a 
 * @param {import('./types').MaybeRef<Any>} b 
 * @return {import('vue').ComputedRef<Any>} 
*/
export const useOr = curryN(2,(a, b) => computed(() => or(typeof a === 'function' ? (...fnArgs) => unref(unref(a)(...fnArgs)) : unref(a), typeof b === 'function' ? (...fnArgs) => unref(unref(b)(...fnArgs)) : unref(b))))


/**
 * Returns the result of applying the onFailure function to the value inside
 * a failed promise. This is useful for handling rejected promises
 * inside function compositions.
 *
 * @param {import('./types').MaybeRef<Function>} onFailure The function to apply. Can return a value or a promise of a value.
 * @param {import('./types').MaybeWatchSource<Promise>} p 
 * @return {import('vue').ComputedRef<Promise>} The result of calling `p.then(null, onFailure)`
*/
export const useOtherwise = curryN(2,(onFailure, p) => computed(() => otherwise(typeof onFailure === 'function' ? (...fnArgs) => unref(unref(onFailure)(...fnArgs)) : unref(onFailure), typeof p === 'function' ? p() : unref(p))))


/**
 * Returns the result of "setting" the portion of the given data structure
 * focused by the given lens to the result of applying the given function to
 * the focused value.
 *
 * @param {import('./types').MaybeWatchSource<Lens>} lens 
 * @param {import('./types').MaybeRef<*>} v 
 * @param {import('./types').MaybeRef<*>} x 
 * @return {import('vue').ComputedRef<*>} 
*/
export const useOver = curryN(3,(_lens, v, x) => computed(() => over(typeof _lens === 'function' ? _lens() : unref(_lens), typeof v === 'function' ? (...fnArgs) => unref(unref(v)(...fnArgs)) : unref(v), typeof x === 'function' ? (...fnArgs) => unref(unref(x)(...fnArgs)) : unref(x))))


/**
 * Takes two arguments, `fst` and `snd`, and returns `[fst, snd]`.
 *
 * @param {import('./types').MaybeRef<*>} fst 
 * @param {import('./types').MaybeRef<*>} snd 
 * @return {import('vue').ComputedRef<Array>} 
*/
export const usePair = curryN(2,(fst, snd) => computed(() => pair(typeof fst === 'function' ? (...fnArgs) => unref(unref(fst)(...fnArgs)) : unref(fst), typeof snd === 'function' ? (...fnArgs) => unref(unref(snd)(...fnArgs)) : unref(snd))))


/**
 * Takes a function `f` and a list of arguments, and returns a function `g`.
 * When applied, `g` returns the result of applying `f` to the arguments
 * provided initially followed by the arguments provided to `g`.
 *
 * @param {import('./types').MaybeRef<Function>} f 
 * @param {import('./types').MaybeWatchSource<Array>} args 
 * @return {import('vue').ComputedRef<Function>} 
*/
export const usePartial = curryN(2,(f, args) => computed(() => partial(typeof f === 'function' ? (...fnArgs) => unref(unref(f)(...fnArgs)) : unref(f), typeof args === 'function' ? args() : unref(args))))


/**
 * Takes a function `f` and an object, and returns a function `g`.
 * When applied, `g` returns the result of applying `f` to the object
 * provided initially merged deeply (right) with the object provided as an argument to `g`.
 *
 * @param {import('./types').MaybeRef<Function>} f 
 * @param {import('./types').MaybeWatchSource<Object>} props 
 * @return {import('vue').ComputedRef<Function>} 
*/
export const usePartialObject = curryN(2,(f, _props) => computed(() => partialObject(typeof f === 'function' ? (...fnArgs) => unref(unref(f)(...fnArgs)) : unref(f), typeof _props === 'function' ? _props() : unref(_props))))


/**
 * Takes a function `f` and a list of arguments, and returns a function `g`.
 * When applied, `g` returns the result of applying `f` to the arguments
 * provided to `g` followed by the arguments provided initially.
 *
 * @param {import('./types').MaybeRef<Function>} f 
 * @param {import('./types').MaybeWatchSource<Array>} args 
 * @return {import('vue').ComputedRef<Function>} 
*/
export const usePartialRight = curryN(2,(f, args) => computed(() => partialRight(typeof f === 'function' ? (...fnArgs) => unref(unref(f)(...fnArgs)) : unref(f), typeof args === 'function' ? args() : unref(args))))


/**
 * Takes a predicate and a list or other `Filterable` object and returns the
 * pair of filterable objects of the same type of elements which do and do not
 * satisfy, the predicate, respectively. Filterable objects include plain objects or any object
 * that has a filter method such as `Array`.
 *
 * @param {import('./types').MaybeRef<Function>} pred A predicate to determine which side the element belongs to.
 * @param {import('./types').MaybeWatchSource<Array>} filterable the list (or other filterable) to partition.
 * @return {import('vue').ComputedRef<Array>} An array, containing first the subset of elements that satisfy the predicate, and second the subset of elements that do not satisfy.
*/
export const usePartition = curryN(2,(pred, filterable) => computed(() => partition(typeof pred === 'function' ? (...fnArgs) => unref(unref(pred)(...fnArgs)) : unref(pred), typeof filterable === 'function' ? filterable() : unref(filterable))))


/**
 * Retrieves the value at a given path. The nodes of the path can be arbitrary strings or non-negative integers.
 * For anything else, the value is unspecified. Integer paths are meant to index arrays, strings are meant for objects.
 *
 * @param {import('./types').MaybeWatchSource<Array>} path The path to use.
 * @param {import('./types').MaybeWatchSource<Object>} obj The object or array to retrieve the nested property from.
 * @return {import('vue').ComputedRef<*>} The data at `path`.
*/
export const usePath = curryN(2,(_path, obj) => computed(() => path(typeof _path === 'function' ? _path() : unref(_path), typeof obj === 'function' ? obj() : unref(obj))))


/**
 * Determines whether a nested path on an object has a specific value, in
 * [`R.equals`](#equals) terms. Most likely used to filter a list.
 *
 * @param {import('./types').MaybeRef<*>} val The value to compare the nested property with
 * @param {import('./types').MaybeWatchSource<Array>} path The path of the nested property to use
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to check the nested property in
 * @return {import('vue').ComputedRef<Boolean>} `true` if the value equals the nested object property, `false` otherwise.
*/
export const usePathEq = curryN(3,(val, _path, obj) => computed(() => pathEq(typeof val === 'function' ? (...fnArgs) => unref(unref(val)(...fnArgs)) : unref(val), typeof _path === 'function' ? _path() : unref(_path), typeof obj === 'function' ? obj() : unref(obj))))


/**
 * If the given, non-null object has a value at the given path, returns the
 * value at that path. Otherwise returns the provided default value.
 *
 * @param {import('./types').MaybeRef<*>} d The default value.
 * @param {import('./types').MaybeWatchSource<Array>} p The path to use.
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to retrieve the nested property from.
 * @return {import('vue').ComputedRef<*>} The data at `path` of the supplied object or the default value.
*/
export const usePathOr = curryN(3,(d, p, obj) => computed(() => pathOr(typeof d === 'function' ? (...fnArgs) => unref(unref(d)(...fnArgs)) : unref(d), typeof p === 'function' ? p() : unref(p), typeof obj === 'function' ? obj() : unref(obj))))


/**
 * Returns `true` if the specified object property at given path satisfies the
 * given predicate; `false` otherwise.
 *
 * @param {import('./types').MaybeRef<Function>} pred 
 * @param {import('./types').MaybeWatchSource<Array>} propPath 
 * @param {import('./types').MaybeRef<*>} obj 
 * @return {import('vue').ComputedRef<Boolean>} 
*/
export const usePathSatisfies = curryN(3,(pred, propPath, obj) => computed(() => pathSatisfies(typeof pred === 'function' ? (...fnArgs) => unref(unref(pred)(...fnArgs)) : unref(pred), typeof propPath === 'function' ? propPath() : unref(propPath), typeof obj === 'function' ? (...fnArgs) => unref(unref(obj)(...fnArgs)) : unref(obj))))


/**
 * Retrieves the values at given paths of an object.
 *
 * @param {import('./types').MaybeWatchSource<Array>} pathsArray The array of paths to be fetched.
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to retrieve the nested properties from.
 * @return {import('vue').ComputedRef<Array>} A list consisting of values at paths specified by "pathsArray".
*/
export const usePaths = curryN(2,(pathsArray, obj) => computed(() => paths(typeof pathsArray === 'function' ? pathsArray() : unref(pathsArray), typeof obj === 'function' ? obj() : unref(obj))))


/**
 * Returns a partial copy of an object containing only the keys specified. If
 * the key does not exist, the property is ignored.
 *
 * @param {import('./types').MaybeWatchSource<Array>} names an array of String property names to copy onto a new object
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to copy from
 * @return {import('vue').ComputedRef<Object>} A new object with only properties from `names` on it.
*/
export const usePick = curryN(2,(names, obj) => computed(() => pick(typeof names === 'function' ? names() : unref(names), typeof obj === 'function' ? obj() : unref(obj))))


/**
 * Similar to `pick` except that this one includes a `key: undefined` pair for
 * properties that don't exist.
 *
 * @param {import('./types').MaybeWatchSource<Array>} names an array of String property names to copy onto a new object
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to copy from
 * @return {import('vue').ComputedRef<Object>} A new object with only properties from `names` on it.
*/
export const usePickAll = curryN(2,(names, obj) => computed(() => pickAll(typeof names === 'function' ? names() : unref(names), typeof obj === 'function' ? obj() : unref(obj))))


/**
 * Returns a partial copy of an object containing only the keys that satisfy
 * the supplied predicate.
 *
 * @param {import('./types').MaybeRef<Function>} pred A predicate to determine whether or not a key should be included on the output object.
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to copy from
 * @return {import('vue').ComputedRef<Object>} A new object with only properties that satisfy `pred` on it.
*/
export const usePickBy = curryN(2,(pred, obj) => computed(() => pickBy(typeof pred === 'function' ? (...fnArgs) => unref(unref(pred)(...fnArgs)) : unref(pred), typeof obj === 'function' ? obj() : unref(obj))))


/**
 * Performs left-to-right function composition. The first argument may have
 * any arity; the remaining arguments must be unary.
 * 
 * In some libraries this function is named `sequence`.
 * 
 * **Note:** The result of pipe is not automatically curried.
 *
 * @param {...import('./types').MaybeRef<Function>} functions 
 * @return {import('vue').ComputedRef<Function>} 
*/
export const usePipe = (...functions) => computed(() => pipe(...functions.map(varArg => typeof varArg === 'function' ? (...fnArgs) => unref(unref(varArg)(...fnArgs)) : unref(varArg))))


/**
 * Performs left-to-right function composition using transforming function. The first function may have
 * any arity; the remaining functions must be unary.
 * 
 * **Note:** The result of pipeWith is not automatically curried. Transforming function is not used on the
 * first argument.
 *
 * @param {import('./types').MaybeRef<Function>} transformer The transforming function
 * @param {import('./types').MaybeWatchSource<Array>} functions The functions to pipe
 * @return {import('vue').ComputedRef<Function>} 
*/
export const usePipeWith = curryN(2,(transformer, functions) => computed(() => pipeWith(typeof transformer === 'function' ? (...fnArgs) => unref(unref(transformer)(...fnArgs)) : unref(transformer), typeof functions === 'function' ? functions() : unref(functions))))


/**
 * Returns a new list by plucking the same named property off all objects in
 * the list supplied.
 * 
 * `pluck` will work on
 * any [functor](https://github.com/fantasyland/fantasy-land#functor) in
 * addition to arrays, as it is equivalent to `R.map(R.prop(k), f)`.
 *
 * @param {import('./types').MaybeWatchSource<Number|String>} key The key name to pluck off of each object.
 * @param {import('./types').MaybeWatchSource<Array>} f The array or functor to consider.
 * @return {import('vue').ComputedRef<Array>} The list of values for the given key.
*/
export const usePluck = curryN(2,(key, f) => computed(() => pluck(typeof key === 'function' ? key() : unref(key), typeof f === 'function' ? f() : unref(f))))


/**
 * Returns a new list with the given element at the front, followed by the
 * contents of the list.
 *
 * @param {import('./types').MaybeRef<*>} el The item to add to the head of the output list.
 * @param {import('./types').MaybeWatchSource<Array>} list The array to add to the tail of the output list.
 * @return {import('vue').ComputedRef<Array>} A new array.
*/
export const usePrepend = curryN(2,(el, list) => computed(() => prepend(typeof el === 'function' ? (...fnArgs) => unref(unref(el)(...fnArgs)) : unref(el), typeof list === 'function' ? list() : unref(list))))


/**
 * Multiplies together all the elements of a list.
 *
 * @param {import('./types').MaybeWatchSource<Array>} list An array of numbers
 * @return {import('vue').ComputedRef<Number>} The product of all the numbers in the list.
*/
export const useProduct = (list) => computed(() => product(typeof list === 'function' ? list() : unref(list)))


/**
 * Reasonable analog to SQL `select` statement.
 *
 * @param {import('./types').MaybeWatchSource<Array>} props The property names to project
 * @param {import('./types').MaybeWatchSource<Array>} objs The objects to query
 * @return {import('vue').ComputedRef<Array>} An array of objects with just the `props` properties.
*/
export const useProject = curryN(2,(_props, objs) => computed(() => project(typeof _props === 'function' ? _props() : unref(_props), typeof objs === 'function' ? objs() : unref(objs))))


/**
 * Takes two functions as pre- and post- processors respectively for a third function,
 * i.e. `promap(f, g, h)(x) === g(h(f(x)))`.
 * 
 * Dispatches to the `promap` method of the third argument, if present,
 * according to the [FantasyLand Profunctor spec](https://github.com/fantasyland/fantasy-land#profunctor).
 * 
 * Acts as a transducer if a transformer is given in profunctor position.
 *
 * @param {import('./types').MaybeRef<Function>} f The preprocessor function, a -> b
 * @param {import('./types').MaybeRef<Function>} g The postprocessor function, c -> d
 * @param {import('./types').MaybeWatchSource<Profunctor>} profunctor The profunctor instance to be promapped, e.g. b -> c
 * @return {import('vue').ComputedRef<Profunctor>} The new profunctor instance, e.g. a -> d
*/
export const usePromap = curryN(3,(f, g, profunctor) => computed(() => promap(typeof f === 'function' ? (...fnArgs) => unref(unref(f)(...fnArgs)) : unref(f), typeof g === 'function' ? (...fnArgs) => unref(unref(g)(...fnArgs)) : unref(g), typeof profunctor === 'function' ? profunctor() : unref(profunctor))))


/**
 * Returns a function that when supplied an object returns the indicated
 * property of that object, if it exists.
 *
 * @param {import('./types').MaybeWatchSource<String|Number>} p The property name or array index
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to query
 * @return {import('vue').ComputedRef<*>} The value at `obj.p`.
*/
export const useProp = curryN(2,(p, obj) => computed(() => prop(typeof p === 'function' ? p() : unref(p), typeof obj === 'function' ? obj() : unref(obj))))


/**
 * Returns `true` if the specified object property is equal, in
 * [`R.equals`](#equals) terms, to the given value; `false` otherwise.
 * You can test multiple properties with [`R.whereEq`](#whereEq),
 * and test nested path property with [`R.pathEq`](#pathEq).
 *
 * @param {import('./types').MaybeRef<*>} val The value to compare the property with
 * @param {import('./types').MaybeWatchSource<String>} name the specified object property's key
 * @param {import('./types').MaybeRef<*>} obj The object to check the property in
 * @return {import('vue').ComputedRef<Boolean>} `true` if the value equals the specified object property, `false` otherwise.
*/
export const usePropEq = curryN(3,(val, name, obj) => computed(() => propEq(typeof val === 'function' ? (...fnArgs) => unref(unref(val)(...fnArgs)) : unref(val), typeof name === 'function' ? name() : unref(name), typeof obj === 'function' ? (...fnArgs) => unref(unref(obj)(...fnArgs)) : unref(obj))))


/**
 * Returns `true` if the specified object property is of the given type;
 * `false` otherwise.
 *
 * @param {import('./types').MaybeRef<Function>} type 
 * @param {import('./types').MaybeWatchSource<String>} name 
 * @param {import('./types').MaybeRef<*>} obj 
 * @return {import('vue').ComputedRef<Boolean>} 
*/
export const usePropIs = curryN(3,(_type, name, obj) => computed(() => propIs(typeof _type === 'function' ? (...fnArgs) => unref(unref(_type)(...fnArgs)) : unref(_type), typeof name === 'function' ? name() : unref(name), typeof obj === 'function' ? (...fnArgs) => unref(unref(obj)(...fnArgs)) : unref(obj))))


/**
 * Return the specified property of the given non-null object if the property
 * is present and it's value is not `null`, `undefined` or `NaN`.
 * 
 * Otherwise the first argument is returned.
 *
 * @param {import('./types').MaybeRef<*>} val The default value.
 * @param {import('./types').MaybeWatchSource<String>} p The name of the property to return.
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to query.
 * @return {import('vue').ComputedRef<*>} The value of given property of the supplied object or the default value.
*/
export const usePropOr = curryN(3,(val, p, obj) => computed(() => propOr(typeof val === 'function' ? (...fnArgs) => unref(unref(val)(...fnArgs)) : unref(val), typeof p === 'function' ? p() : unref(p), typeof obj === 'function' ? obj() : unref(obj))))


/**
 * Returns `true` if the specified object property satisfies the given
 * predicate; `false` otherwise. You can test multiple properties with
 * [`R.where`](#where).
 *
 * @param {import('./types').MaybeRef<Function>} pred 
 * @param {import('./types').MaybeWatchSource<String>} name 
 * @param {import('./types').MaybeRef<*>} obj 
 * @return {import('vue').ComputedRef<Boolean>} 
*/
export const usePropSatisfies = curryN(3,(pred, name, obj) => computed(() => propSatisfies(typeof pred === 'function' ? (...fnArgs) => unref(unref(pred)(...fnArgs)) : unref(pred), typeof name === 'function' ? name() : unref(name), typeof obj === 'function' ? (...fnArgs) => unref(unref(obj)(...fnArgs)) : unref(obj))))


/**
 * Acts as multiple `prop`: array of keys in, array of values out. Preserves
 * order.
 *
 * @param {import('./types').MaybeWatchSource<Array>} ps The property names to fetch
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to query
 * @return {import('vue').ComputedRef<Array>} The corresponding values or partially applied function.
*/
export const useProps = curryN(2,(ps, obj) => computed(() => props(typeof ps === 'function' ? ps() : unref(ps), typeof obj === 'function' ? obj() : unref(obj))))


/**
 * Returns a list of numbers from `from` (inclusive) to `to` (exclusive).
 *
 * @param {import('./types').MaybeWatchSource<Number>} from The first number in the list.
 * @param {import('./types').MaybeWatchSource<Number>} to One more than the last number in the list.
 * @return {import('vue').ComputedRef<Array>} The list of numbers in the set `[a, b)`.
*/
export const useRange = curryN(2,(from, to) => computed(() => range(typeof from === 'function' ? from() : unref(from), typeof to === 'function' ? to() : unref(to))))


/**
 * Returns a single item by iterating through the list, successively calling
 * the iterator function and passing it an accumulator value and the current
 * value from the array, and then passing the result to the next call.
 * 
 * The iterator function receives two values: *(acc, value)*. It may use
 * [`R.reduced`](#reduced) to shortcut the iteration.
 * 
 * The arguments' order of [`reduceRight`](#reduceRight)'s iterator function
 * is *(value, acc)*.
 * 
 * Note: `R.reduce` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.reduce` method. For more details
 * on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
 * 
 * Be cautious of mutating and returning the accumulator. If you reuse it across
 * invocations, it will continue to accumulate onto the same value. The general
 * recommendation is to always return a new value. If you can't do so for
 * performance reasons, then be sure to reinitialize the accumulator on each
 * invocation.
 * 
 * Dispatches to the `reduce` method of the third argument, if present. When
 * doing so, it is up to the user to handle the [`R.reduced`](#reduced)
 * shortcuting, as this is not implemented by `reduce`.
 *
 * @param {import('./types').MaybeRef<Function>} fn The iterator function. Receives two values, the accumulator and the current element from the array.
 * @param {import('./types').MaybeRef<*>} acc The accumulator value.
 * @param {import('./types').MaybeWatchSource<Array>} list The list to iterate over.
 * @return {import('vue').ComputedRef<*>} The final, accumulated value.
*/
export const useReduce = curryN(3,(fn, acc, list) => computed(() => reduce(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof acc === 'function' ? (...fnArgs) => unref(unref(acc)(...fnArgs)) : unref(acc), typeof list === 'function' ? list() : unref(list))))


/**
 * Groups the elements of the list according to the result of calling
 * the String-returning function `keyFn` on each element and reduces the elements
 * of each group to a single value via the reducer function `valueFn`.
 * 
 * The value function receives two values: *(acc, value)*. It may use
 * [`R.reduced`](#reduced) to short circuit the iteration.
 * 
 * This function is basically a more general [`groupBy`](#groupBy) function.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param {import('./types').MaybeRef<Function>} valueFn The function that reduces the elements of each group to a single value. Receives two values, accumulator for a particular group and the current element.
 * @param {import('./types').MaybeRef<*>} acc The (initial) accumulator value for each group.
 * @param {import('./types').MaybeRef<Function>} keyFn The function that maps the list's element into a key.
 * @param {import('./types').MaybeWatchSource<Array>} list The array to group.
 * @return {import('vue').ComputedRef<Object>} An object with the output of `keyFn` for keys, mapped to the output of `valueFn` for elements which produced that key when passed to `keyFn`.
*/
export const useReduceBy = curryN(4,(valueFn, acc, keyFn, list) => computed(() => reduceBy(typeof valueFn === 'function' ? (...fnArgs) => unref(unref(valueFn)(...fnArgs)) : unref(valueFn), typeof acc === 'function' ? (...fnArgs) => unref(unref(acc)(...fnArgs)) : unref(acc), typeof keyFn === 'function' ? (...fnArgs) => unref(unref(keyFn)(...fnArgs)) : unref(keyFn), typeof list === 'function' ? list() : unref(list))))


/**
 * Returns a single item by iterating through the list, successively calling
 * the iterator function and passing it an accumulator value and the current
 * value from the array, and then passing the result to the next call.
 * 
 * Similar to [`reduce`](#reduce), except moves through the input list from the
 * right to the left.
 * 
 * The iterator function receives two values: *(value, acc)*, while the arguments'
 * order of `reduce`'s iterator function is *(acc, value)*. `reduceRight` may use [`reduced`](#reduced)
 * to short circuit the iteration.
 * 
 * Note: `R.reduceRight` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.reduceRight` method. For more details
 * on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight#Description
 * 
 * Be cautious of mutating and returning the accumulator. If you reuse it across
 * invocations, it will continue to accumulate onto the same value. The general
 * recommendation is to always return a new value. If you can't do so for
 * performance reasons, then be sure to reinitialize the accumulator on each
 * invocation.
 *
 * @param {import('./types').MaybeRef<Function>} fn The iterator function. Receives two values, the current element from the array and the accumulator.
 * @param {import('./types').MaybeRef<*>} acc The accumulator value.
 * @param {import('./types').MaybeWatchSource<Array>} list The list to iterate over.
 * @return {import('vue').ComputedRef<*>} The final, accumulated value.
*/
export const useReduceRight = curryN(3,(fn, acc, list) => computed(() => reduceRight(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof acc === 'function' ? (...fnArgs) => unref(unref(acc)(...fnArgs)) : unref(acc), typeof list === 'function' ? list() : unref(list))))


/**
 * Like [`reduce`](#reduce), `reduceWhile` returns a single item by iterating
 * through the list, successively calling the iterator function. `reduceWhile`
 * also takes a predicate that is evaluated before each step. If the predicate
 * returns `false`, it "short-circuits" the iteration and returns the current
 * value of the accumulator. `reduceWhile` may alternatively be short-circuited
 * via [`reduced`](#reduced).
 *
 * @param {import('./types').MaybeRef<Function>} pred The predicate. It is passed the accumulator and the current element.
 * @param {import('./types').MaybeRef<Function>} fn The iterator function. Receives two values, the accumulator and the current element.
 * @param {import('./types').MaybeRef<*>} a The accumulator value.
 * @param {import('./types').MaybeWatchSource<Array>} list The list to iterate over.
 * @return {import('vue').ComputedRef<*>} The final, accumulated value.
*/
export const useReduceWhile = curryN(4,(pred, fn, a, list) => computed(() => reduceWhile(typeof pred === 'function' ? (...fnArgs) => unref(unref(pred)(...fnArgs)) : unref(pred), typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof a === 'function' ? (...fnArgs) => unref(unref(a)(...fnArgs)) : unref(a), typeof list === 'function' ? list() : unref(list))))


/**
 * Returns a value wrapped to indicate that it is the final value of the reduce
 * and transduce functions. The returned value should be considered a black
 * box: the internal structure is not guaranteed to be stable.
 * 
 * This optimization is available to the below functions:
 * - [`reduce`](#reduce)
 * - [`reduceWhile`](#reduceWhile)
 * - [`reduceBy`](#reduceBy)
 * - [`reduceRight`](#reduceRight)
 * - [`transduce`](#transduce)
 *
 * @param {import('./types').MaybeRef<*>} x The final value of the reduce.
 * @return {import('vue').ComputedRef<*>} The wrapped value.
*/
export const useReduced = (x) => computed(() => reduced(typeof x === 'function' ? (...fnArgs) => unref(unref(x)(...fnArgs)) : unref(x)))


/**
 * The complement of [`filter`](#filter).
 * 
 * Acts as a transducer if a transformer is given in list position. Filterable
 * objects include plain objects or any object that has a filter method such
 * as `Array`.
 *
 * @param {import('./types').MaybeRef<Function>} pred 
 * @param {import('./types').MaybeWatchSource<Array>} filterable 
 * @return {import('vue').ComputedRef<Array>} 
*/
export const useReject = curryN(2,(pred, filterable) => computed(() => reject(typeof pred === 'function' ? (...fnArgs) => unref(unref(pred)(...fnArgs)) : unref(pred), typeof filterable === 'function' ? filterable() : unref(filterable))))


/**
 * Removes the sub-list of `list` starting at index `start` and containing
 * `count` elements. _Note that this is not destructive_: it returns a copy of
 * the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @param {import('./types').MaybeWatchSource<Number>} start The position to start removing elements
 * @param {import('./types').MaybeWatchSource<Number>} count The number of elements to remove
 * @param {import('./types').MaybeWatchSource<Array>} list The list to remove from
 * @return {import('vue').ComputedRef<Array>} A new Array with `count` elements from `start` removed.
*/
export const useRemove = curryN(3,(start, _count, list) => computed(() => remove(typeof start === 'function' ? start() : unref(start), typeof _count === 'function' ? _count() : unref(_count), typeof list === 'function' ? list() : unref(list))))


/**
 * Returns a fixed list of size `n` containing a specified identical value.
 *
 * @param {import('./types').MaybeRef<*>} value The value to repeat.
 * @param {import('./types').MaybeWatchSource<Number>} n The desired size of the output list.
 * @return {import('vue').ComputedRef<Array>} A new array containing `n` `value`s.
*/
export const useRepeat = curryN(2,(value, n) => computed(() => repeat(typeof value === 'function' ? (...fnArgs) => unref(unref(value)(...fnArgs)) : unref(value), typeof n === 'function' ? n() : unref(n))))


/**
 * Replace a substring or regex match in a string with a replacement.
 * 
 * The first two parameters correspond to the parameters of the
 * `String.prototype.replace()` function, so the second parameter can also be a
 * function.
 *
 * @param {import('./types').MaybeWatchSource<RegExp|String>} pattern A regular expression or a substring to match.
 * @param {import('./types').MaybeWatchSource<String>} replacement The string to replace the matches with.
 * @param {import('./types').MaybeWatchSource<String>} str The String to do the search and replacement in.
 * @return {import('vue').ComputedRef<String>} The result.
*/
export const useReplace = curryN(3,(pattern, replacement, str) => computed(() => replace(typeof pattern === 'function' ? pattern() : unref(pattern), typeof replacement === 'function' ? replacement() : unref(replacement), typeof str === 'function' ? str() : unref(str))))


/**
 * Returns a new list or string with the elements or characters in reverse
 * order.
 *
 * @param {import('./types').MaybeWatchSource<Array|String>} list 
 * @return {import('vue').ComputedRef<Array|String>} 
*/
export const useReverse = (list) => computed(() => reverse(typeof list === 'function' ? list() : unref(list)))


/**
 * Scan is similar to [`reduce`](#reduce), but returns a list of successively
 * reduced values from the left.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param {import('./types').MaybeRef<Function>} fn The iterator function. Receives two values, the accumulator and the current element from the array
 * @param {import('./types').MaybeRef<*>} acc The accumulator value.
 * @param {import('./types').MaybeWatchSource<Array>} list The list to iterate over.
 * @return {import('vue').ComputedRef<Array>} A list of all intermediately reduced values.
*/
export const useScan = curryN(3,(fn, acc, list) => computed(() => scan(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof acc === 'function' ? (...fnArgs) => unref(unref(acc)(...fnArgs)) : unref(acc), typeof list === 'function' ? list() : unref(list))))


/**
 * Transforms a [Traversable](https://github.com/fantasyland/fantasy-land#traversable)
 * of [Applicative](https://github.com/fantasyland/fantasy-land#applicative) into an
 * Applicative of Traversable.
 * 
 * Dispatches to the `"fantasy-land/traverse"` or the `traverse` method of the second argument, if present.
 *
 * @param {import('./types').MaybeRef<Object|Function>} TypeRepresentative with an `of` or `fantasy-land/of` method
 * @param {import('./types').MaybeRef<*>} traversable 
 * @return {import('vue').ComputedRef<*>} 
*/
export const useSequence = curryN(2,(TypeRepresentative, traversable) => computed(() => sequence(typeof TypeRepresentative === 'function' ? (...fnArgs) => unref(unref(TypeRepresentative)(...fnArgs)) : unref(TypeRepresentative), typeof traversable === 'function' ? (...fnArgs) => unref(unref(traversable)(...fnArgs)) : unref(traversable))))


/**
 * Returns the result of "setting" the portion of the given data structure
 * focused by the given lens to the given value.
 *
 * @param {import('./types').MaybeWatchSource<Lens>} lens 
 * @param {import('./types').MaybeRef<*>} v 
 * @param {import('./types').MaybeRef<*>} x 
 * @return {import('vue').ComputedRef<*>} 
*/
export const useSet = curryN(3,(_lens, v, x) => computed(() => set(typeof _lens === 'function' ? _lens() : unref(_lens), typeof v === 'function' ? (...fnArgs) => unref(unref(v)(...fnArgs)) : unref(v), typeof x === 'function' ? (...fnArgs) => unref(unref(x)(...fnArgs)) : unref(x))))


/**
 * Returns the elements of the given list or string (or object with a `slice`
 * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
 * 
 * Dispatches to the `slice` method of the third argument, if present.
 *
 * @param {import('./types').MaybeWatchSource<Number>} fromIndex The start index (inclusive).
 * @param {import('./types').MaybeWatchSource<Number>} toIndex The end index (exclusive).
 * @param {import('./types').MaybeRef<*>} list 
 * @return {import('vue').ComputedRef<*>} 
*/
export const useSlice = curryN(3,(fromIndex, toIndex, list) => computed(() => slice(typeof fromIndex === 'function' ? fromIndex() : unref(fromIndex), typeof toIndex === 'function' ? toIndex() : unref(toIndex), typeof list === 'function' ? (...fnArgs) => unref(unref(list)(...fnArgs)) : unref(list))))


/**
 * Returns a copy of the list, sorted according to the comparator function,
 * which should accept two values at a time and return a negative number if the
 * first value is smaller, a positive number if it's larger, and zero if they
 * are equal. Please note that this is a **copy** of the list. It does not
 * modify the original.
 *
 * @param {import('./types').MaybeRef<Function>} comparator A sorting function :: a -> b -> Int
 * @param {import('./types').MaybeWatchSource<Array>} list The list to sort
 * @return {import('vue').ComputedRef<Array>} a new array with its elements sorted by the comparator function.
*/
export const useSort = curryN(2,(_comparator, list) => computed(() => sort(typeof _comparator === 'function' ? (...fnArgs) => unref(unref(_comparator)(...fnArgs)) : unref(_comparator), typeof list === 'function' ? list() : unref(list))))


/**
 * Sorts the list according to the supplied function.
 *
 * @param {import('./types').MaybeRef<Function>} fn 
 * @param {import('./types').MaybeWatchSource<Array>} list The list to sort.
 * @return {import('vue').ComputedRef<Array>} A new list sorted by the keys generated by `fn`.
*/
export const useSortBy = curryN(2,(fn, list) => computed(() => sortBy(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof list === 'function' ? list() : unref(list))))


/**
 * Sorts a list according to a list of comparators.
 *
 * @param {import('./types').MaybeWatchSource<Array>} functions A list of comparator functions.
 * @param {import('./types').MaybeWatchSource<Array>} list The list to sort.
 * @return {import('vue').ComputedRef<Array>} A new list sorted according to the comarator functions.
*/
export const useSortWith = curryN(2,(functions, list) => computed(() => sortWith(typeof functions === 'function' ? functions() : unref(functions), typeof list === 'function' ? list() : unref(list))))


/**
 * Splits a string into an array of strings based on the given
 * separator.
 *
 * @param {import('./types').MaybeWatchSource<String|RegExp>} sep The pattern.
 * @param {import('./types').MaybeWatchSource<String>} str The string to separate into an array.
 * @return {import('vue').ComputedRef<Array>} The array of strings from `str` separated by `sep`.
*/
export const useSplit = curryN(2,(sep, str) => computed(() => split(typeof sep === 'function' ? sep() : unref(sep), typeof str === 'function' ? str() : unref(str))))


/**
 * Splits a given list or string at a given index.
 *
 * @param {import('./types').MaybeWatchSource<Number>} index The index where the array/string is split.
 * @param {import('./types').MaybeWatchSource<Array|String>} array The array/string to be split.
 * @return {import('vue').ComputedRef<Array>} 
*/
export const useSplitAt = curryN(2,(index, array) => computed(() => splitAt(typeof index === 'function' ? index() : unref(index), typeof array === 'function' ? array() : unref(array))))


/**
 * Splits a collection into slices of the specified length.
 *
 * @param {import('./types').MaybeWatchSource<Number>} n 
 * @param {import('./types').MaybeWatchSource<Array>} list 
 * @return {import('vue').ComputedRef<Array>} 
*/
export const useSplitEvery = curryN(2,(n, list) => computed(() => splitEvery(typeof n === 'function' ? n() : unref(n), typeof list === 'function' ? list() : unref(list))))


/**
 * Takes a list and a predicate and returns a pair of lists with the following properties:
 * 
 * - the result of concatenating the two output lists is equivalent to the input list;
 * - none of the elements of the first output list satisfies the predicate; and
 * - if the second output list is non-empty, its first element satisfies the predicate.
 *
 * @param {import('./types').MaybeRef<Function>} pred The predicate that determines where the array is split.
 * @param {import('./types').MaybeWatchSource<Array>} list The array to be split.
 * @return {import('vue').ComputedRef<Array>} 
*/
export const useSplitWhen = curryN(2,(pred, list) => computed(() => splitWhen(typeof pred === 'function' ? (...fnArgs) => unref(unref(pred)(...fnArgs)) : unref(pred), typeof list === 'function' ? list() : unref(list))))


/**
 * Splits an array into slices on every occurrence of a value.
 *
 * @param {import('./types').MaybeRef<Function>} pred The predicate that determines where the array is split.
 * @param {import('./types').MaybeWatchSource<Array>} list The array to be split.
 * @return {import('vue').ComputedRef<Array>} 
*/
export const useSplitWhenever = curryN(2,(pred, list) => computed(() => splitWhenever(typeof pred === 'function' ? (...fnArgs) => unref(unref(pred)(...fnArgs)) : unref(pred), typeof list === 'function' ? list() : unref(list))))


/**
 * Checks if a list starts with the provided sublist.
 * 
 * Similarly, checks if a string starts with the provided substring.
 *
 * @param {import('./types').MaybeRef<*>} prefix 
 * @param {import('./types').MaybeRef<*>} list 
 * @return {import('vue').ComputedRef<Boolean>} 
*/
export const useStartsWith = curryN(2,(prefix, list) => computed(() => startsWith(typeof prefix === 'function' ? (...fnArgs) => unref(unref(prefix)(...fnArgs)) : unref(prefix), typeof list === 'function' ? (...fnArgs) => unref(unref(list)(...fnArgs)) : unref(list))))


/**
 * Subtracts its second argument from its first argument.
 *
 * @param {import('./types').MaybeWatchSource<Number>} a The first value.
 * @param {import('./types').MaybeWatchSource<Number>} b The second value.
 * @return {import('vue').ComputedRef<Number>} The result of `a - b`.
*/
export const useSubtract = curryN(2,(a, b) => computed(() => subtract(typeof a === 'function' ? a() : unref(a), typeof b === 'function' ? b() : unref(b))))


/**
 * Adds together all the elements of a list.
 *
 * @param {import('./types').MaybeWatchSource<Array>} list An array of numbers
 * @return {import('vue').ComputedRef<Number>} The sum of all the numbers in the list.
*/
export const useSum = (list) => computed(() => sum(typeof list === 'function' ? list() : unref(list)))


/**
 * Swap an item, at index `indexA` with another item, at index `indexB`, in an object or a list of elements.
 * A new result will be created containing the new elements order.
 *
 * @param {import('./types').MaybeWatchSource<Number|string|Object>} indexA The first index
 * @param {import('./types').MaybeWatchSource<Number|string|Object>} indexB The second index
 * @param {import('./types').MaybeWatchSource<Array|Object>} o Either the object or list which will serve to realise the swap
 * @return {import('vue').ComputedRef<Array|Object>} The new object or list reordered
*/
export const useSwap = curryN(3,(indexA, indexB, _o) => computed(() => swap(typeof indexA === 'function' ? indexA() : unref(indexA), typeof indexB === 'function' ? indexB() : unref(indexB), typeof _o === 'function' ? _o() : unref(_o))))


/**
 * Finds the set (i.e. no duplicates) of all elements contained in the first or
 * second list, but not both.
 *
 * @param {import('./types').MaybeWatchSource<Array>} list1 The first list.
 * @param {import('./types').MaybeWatchSource<Array>} list2 The second list.
 * @return {import('vue').ComputedRef<Array>} The elements in `list1` or `list2`, but not both.
*/
export const useSymmetricDifference = curryN(2,(list1, list2) => computed(() => symmetricDifference(typeof list1 === 'function' ? list1() : unref(list1), typeof list2 === 'function' ? list2() : unref(list2))))


/**
 * Finds the set (i.e. no duplicates) of all elements contained in the first or
 * second list, but not both. Duplication is determined according to the value
 * returned by applying the supplied predicate to two list elements.
 *
 * @param {import('./types').MaybeRef<Function>} pred A predicate used to test whether two items are equal.
 * @param {import('./types').MaybeWatchSource<Array>} list1 The first list.
 * @param {import('./types').MaybeWatchSource<Array>} list2 The second list.
 * @return {import('vue').ComputedRef<Array>} The elements in `list1` or `list2`, but not both.
*/
export const useSymmetricDifferenceWith = curryN(3,(pred, list1, list2) => computed(() => symmetricDifferenceWith(typeof pred === 'function' ? (...fnArgs) => unref(unref(pred)(...fnArgs)) : unref(pred), typeof list1 === 'function' ? list1() : unref(list1), typeof list2 === 'function' ? list2() : unref(list2))))


/**
 * Returns all but the first element of the given list or string (or object
 * with a `tail` method).
 * 
 * Dispatches to the `slice` method of the first argument, if present.
 *
 * @param {import('./types').MaybeRef<*>} list 
 * @return {import('vue').ComputedRef<*>} 
*/
export const useTail = (list) => computed(() => tail(typeof list === 'function' ? (...fnArgs) => unref(unref(list)(...fnArgs)) : unref(list)))


/**
 * Returns the first `n` elements of the given list, string, or
 * transducer/transformer (or object with a `take` method).
 * 
 * Dispatches to the `take` method of the second argument, if present.
 *
 * @param {import('./types').MaybeWatchSource<Number>} n 
 * @param {import('./types').MaybeRef<*>} list 
 * @return {import('vue').ComputedRef<*>} 
*/
export const useTake = curryN(2,(n, list) => computed(() => take(typeof n === 'function' ? n() : unref(n), typeof list === 'function' ? (...fnArgs) => unref(unref(list)(...fnArgs)) : unref(list))))


/**
 * Returns a new list containing the last `n` elements of the given list.
 * If `n > list.length`, returns a list of `list.length` elements.
 *
 * @param {import('./types').MaybeWatchSource<Number>} n The number of elements to return.
 * @param {import('./types').MaybeWatchSource<Array>} xs The collection to consider.
 * @return {import('vue').ComputedRef<Array>} 
*/
export const useTakeLast = curryN(2,(n, xs) => computed(() => takeLast(typeof n === 'function' ? n() : unref(n), typeof xs === 'function' ? xs() : unref(xs))))


/**
 * Returns a new list containing the last `n` elements of a given list, passing
 * each value to the supplied predicate function, and terminating when the
 * predicate function returns `false`. Excludes the element that caused the
 * predicate function to fail. The predicate function is passed one argument:
 * *(value)*.
 *
 * @param {import('./types').MaybeRef<Function>} fn The function called per iteration.
 * @param {import('./types').MaybeWatchSource<Array>} xs The collection to iterate over.
 * @return {import('vue').ComputedRef<Array>} A new array.
*/
export const useTakeLastWhile = curryN(2,(fn, xs) => computed(() => takeLastWhile(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof xs === 'function' ? xs() : unref(xs))))


/**
 * Returns a new list containing the first `n` elements of a given list,
 * passing each value to the supplied predicate function, and terminating when
 * the predicate function returns `false`. Excludes the element that caused the
 * predicate function to fail. The predicate function is passed one argument:
 * *(value)*.
 * 
 * Dispatches to the `takeWhile` method of the second argument, if present.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param {import('./types').MaybeRef<Function>} fn The function called per iteration.
 * @param {import('./types').MaybeWatchSource<Array>} xs The collection to iterate over.
 * @return {import('vue').ComputedRef<Array>} A new array.
*/
export const useTakeWhile = curryN(2,(fn, xs) => computed(() => takeWhile(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof xs === 'function' ? xs() : unref(xs))))


/**
 * Runs the given function with the supplied object, then returns the object.
 * 
 * Acts as a transducer if a transformer is given as second parameter.
 *
 * @param {import('./types').MaybeRef<Function>} fn The function to call with `x`. The return value of `fn` will be thrown away.
 * @param {import('./types').MaybeRef<*>} x 
 * @return {import('vue').ComputedRef<*>} `x`.
*/
export const useTap = curryN(2,(fn, x) => computed(() => tap(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof x === 'function' ? (...fnArgs) => unref(unref(x)(...fnArgs)) : unref(x))))


/**
 * Determines whether a given string matches a given regular expression.
 *
 * @param {import('./types').MaybeWatchSource<RegExp>} pattern 
 * @param {import('./types').MaybeWatchSource<String>} str 
 * @return {import('vue').ComputedRef<Boolean>} 
*/
export const useTest = curryN(2,(pattern, str) => computed(() => test(typeof pattern === 'function' ? pattern() : unref(pattern), typeof str === 'function' ? str() : unref(str))))


/**
 * Creates a thunk out of a function. A thunk delays a calculation until
 * its result is needed, providing lazy evaluation of arguments.
 *
 * @param {import('./types').MaybeRef<Function>} fn A function to wrap in a thunk
 * @return {import('vue').ComputedRef<Function>} Expects arguments for `fn` and returns a new function that, when called, applies those arguments to `fn`.
*/
export const useThunkify = (fn) => computed(() => thunkify(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn)))


/**
 * Calls an input function `n` times, returning an array containing the results
 * of those function calls.
 * 
 * `fn` is passed one argument: The current value of `n`, which begins at `0`
 * and is gradually incremented to `n - 1`.
 *
 * @param {import('./types').MaybeRef<Function>} fn The function to invoke. Passed one argument, the current value of `n`.
 * @param {import('./types').MaybeWatchSource<Number>} n A value between `0` and `n - 1`. Increments after each function call.
 * @return {import('vue').ComputedRef<Array>} An array containing the return values of all calls to `fn`.
*/
export const useTimes = curryN(2,(fn, n) => computed(() => times(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof n === 'function' ? n() : unref(n))))


/**
 * The lower case version of a string.
 *
 * @param {import('./types').MaybeWatchSource<String>} str The string to lower case.
 * @return {import('vue').ComputedRef<String>} The lower case version of `str`.
*/
export const useToLower = (str) => computed(() => toLower(typeof str === 'function' ? str() : unref(str)))


/**
 * Converts an object into an array of key, value arrays. Only the object's
 * own properties are used.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to extract from
 * @return {import('vue').ComputedRef<Array>} An array of key, value arrays from the object's own properties.
*/
export const useToPairs = (obj) => computed(() => toPairs(typeof obj === 'function' ? obj() : unref(obj)))


/**
 * Converts an object into an array of key, value arrays. The object's own
 * properties and prototype properties are used. Note that the order of the
 * output array is not guaranteed to be consistent across different JS
 * platforms.
 *
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to extract from
 * @return {import('vue').ComputedRef<Array>} An array of key, value arrays from the object's own and prototype properties.
*/
export const useToPairsIn = (obj) => computed(() => toPairsIn(typeof obj === 'function' ? obj() : unref(obj)))


/**
 * Returns the string representation of the given value. `eval`'ing the output
 * should result in a value equivalent to the input value. Many of the built-in
 * `toString` methods do not satisfy this requirement.
 * 
 * If the given value is an `[object Object]` with a `toString` method other
 * than `Object.prototype.toString`, this method is invoked with no arguments
 * to produce the return value. This means user-defined constructor functions
 * can provide a suitable `toString` method. For example:
 * 
 * function Point(x, y) {
 * this.x = x;
 * this.y = y;
 * }
 * 
 * Point.prototype.toString = function() {
 * return 'new Point(' + this.x + ', ' + this.y + ')';
 * };
 * 
 * R.toString(new Point(1, 2)); //=> 'new Point(1, 2)'
 *
 * @param {import('./types').MaybeRef<*>} val 
 * @return {import('vue').ComputedRef<String>} 
*/
export const useToString = (val) => computed(() => toString(typeof val === 'function' ? (...fnArgs) => unref(unref(val)(...fnArgs)) : unref(val)))


/**
 * The upper case version of a string.
 *
 * @param {import('./types').MaybeWatchSource<String>} str The string to upper case.
 * @return {import('vue').ComputedRef<String>} The upper case version of `str`.
*/
export const useToUpper = (str) => computed(() => toUpper(typeof str === 'function' ? str() : unref(str)))


/**
 * Initializes a transducer using supplied iterator function. Returns a single
 * item by iterating through the list, successively calling the transformed
 * iterator function and passing it an accumulator value and the current value
 * from the array, and then passing the result to the next call.
 * 
 * The iterator function receives two values: *(acc, value)*. It will be
 * wrapped as a transformer to initialize the transducer. A transformer can be
 * passed directly in place of an iterator function. In both cases, iteration
 * may be stopped early with the [`R.reduced`](#reduced) function.
 * 
 * A transducer is a function that accepts a transformer and returns a
 * transformer and can be composed directly.
 * 
 * A transformer is an object that provides a 2-arity reducing iterator
 * function, step, 0-arity initial value function, init, and 1-arity result
 * extraction function, result. The step function is used as the iterator
 * function in reduce. The result function is used to convert the final
 * accumulator into the return type and in most cases is
 * [`R.identity`](#identity). The init function can be used to provide an
 * initial accumulator, but is ignored by transduce.
 * 
 * The iteration is performed with [`R.reduce`](#reduce) after initializing the transducer.
 *
 * @param {import('./types').MaybeRef<Function>} xf The transducer function. Receives a transformer and returns a transformer.
 * @param {import('./types').MaybeRef<Function>} fn The iterator function. Receives two values, the accumulator and the current element from the array. Wrapped as transformer, if necessary, and used to initialize the transducer
 * @param {import('./types').MaybeRef<*>} acc The initial accumulator value.
 * @param {import('./types').MaybeWatchSource<Array>} list The list to iterate over.
 * @return {import('vue').ComputedRef<*>} The final, accumulated value.
*/
export const useTransduce = curryN(4,(xf, fn, acc, list) => computed(() => transduce(typeof xf === 'function' ? (...fnArgs) => unref(unref(xf)(...fnArgs)) : unref(xf), typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof acc === 'function' ? (...fnArgs) => unref(unref(acc)(...fnArgs)) : unref(acc), typeof list === 'function' ? list() : unref(list))))


/**
 * Transposes the rows and columns of a 2D list.
 * When passed a list of `n` lists of length `x`,
 * returns a list of `x` lists of length `n`.
 *
 * @param {import('./types').MaybeWatchSource<Array>} list A 2D list
 * @return {import('vue').ComputedRef<Array>} A 2D list
*/
export const useTranspose = (list) => computed(() => transpose(typeof list === 'function' ? list() : unref(list)))


/**
 * Maps an [Applicative](https://github.com/fantasyland/fantasy-land#applicative)-returning
 * function over a [Traversable](https://github.com/fantasyland/fantasy-land#traversable),
 * then uses [`sequence`](#sequence) to transform the resulting Traversable of Applicative
 * into an Applicative of Traversable.
 * 
 * Dispatches to the `traverse` method of the third argument, if present.
 *
 * @param {import('./types').MaybeRef<Object|Function>} TypeRepresentative with an `of` or `fantasy-land/of` method
 * @param {import('./types').MaybeRef<Function>} f 
 * @param {import('./types').MaybeRef<*>} traversable 
 * @return {import('vue').ComputedRef<*>} 
*/
export const useTraverse = curryN(3,(TypeRepresentative, f, traversable) => computed(() => traverse(typeof TypeRepresentative === 'function' ? (...fnArgs) => unref(unref(TypeRepresentative)(...fnArgs)) : unref(TypeRepresentative), typeof f === 'function' ? (...fnArgs) => unref(unref(f)(...fnArgs)) : unref(f), typeof traversable === 'function' ? (...fnArgs) => unref(unref(traversable)(...fnArgs)) : unref(traversable))))


/**
 * Removes (strips) whitespace from both ends of the string.
 *
 * @param {import('./types').MaybeWatchSource<String>} str The string to trim.
 * @return {import('vue').ComputedRef<String>} Trimmed version of `str`.
*/
export const useTrim = (str) => computed(() => trim(typeof str === 'function' ? str() : unref(str)))


/**
 * `tryCatch` takes two functions, a `tryer` and a `catcher`. The returned
 * function evaluates the `tryer`; if it does not throw, it simply returns the
 * result. If the `tryer` *does* throw, the returned function evaluates the
 * `catcher` function and returns its result. Note that for effective
 * composition with this function, both the `tryer` and `catcher` functions
 * must return the same type of results.
 *
 * @param {import('./types').MaybeRef<Function>} tryer The function that may throw.
 * @param {import('./types').MaybeRef<Function>} catcher The function that will be evaluated if `tryer` throws.
 * @return {import('vue').ComputedRef<Function>} A new function that will catch exceptions and send them to the catcher.
*/
export const useTryCatch = curryN(2,(tryer, catcher) => computed(() => tryCatch(typeof tryer === 'function' ? (...fnArgs) => unref(unref(tryer)(...fnArgs)) : unref(tryer), typeof catcher === 'function' ? (...fnArgs) => unref(unref(catcher)(...fnArgs)) : unref(catcher))))


/**
 * Gives a single-word string description of the (native) type of a value,
 * returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not
 * attempt to distinguish user Object types any further, reporting them all as
 * 'Object'.
 *
 * @param {import('./types').MaybeRef<*>} val The value to test
 * @return {import('vue').ComputedRef<String>} 
*/
export const useType = (val) => computed(() => type(typeof val === 'function' ? (...fnArgs) => unref(unref(val)(...fnArgs)) : unref(val)))


/**
 * Takes a function `fn`, which takes a single array argument, and returns a
 * function which:
 * 
 * - takes any number of positional arguments;
 * - passes these arguments to `fn` as an array; and
 * - returns the result.
 * 
 * In other words, `R.unapply` derives a variadic function from a function which
 * takes an array. `R.unapply` is the inverse of [`R.apply`](#apply).
 *
 * @param {import('./types').MaybeRef<Function>} fn 
 * @return {import('vue').ComputedRef<Function>} 
*/
export const useUnapply = (fn) => computed(() => unapply(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn)))


/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly 1 parameter. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * @param {import('./types').MaybeRef<Function>} fn The function to wrap.
 * @return {import('vue').ComputedRef<Function>} A new function wrapping `fn`. The new function is guaranteed to be of arity 1.
*/
export const useUnary = (fn) => computed(() => unary(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn)))


/**
 * Returns a function of arity `n` from a (manually) curried function.
 * Note that, the returned function is actually a ramda style
 * curryied function, which can accept one or more arguments in each
 * function calling.
 *
 * @param {import('./types').MaybeWatchSource<Number>} length The arity for the returned function.
 * @param {import('./types').MaybeRef<Function>} fn The function to uncurry.
 * @return {import('vue').ComputedRef<Function>} A new function.
*/
export const useUncurryN = curryN(2,(_length, fn) => computed(() => uncurryN(typeof _length === 'function' ? _length() : unref(_length), typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn))))


/**
 * Builds a list from a seed value. Accepts an iterator function, which returns
 * either false to stop iteration or an array of length 2 containing the value
 * to add to the resulting list and the seed to be used in the next call to the
 * iterator function.
 * 
 * The iterator function receives one argument: *(seed)*.
 *
 * @param {import('./types').MaybeRef<Function>} fn The iterator function. receives one argument, `seed`, and returns either false to quit iteration or an array of length two to proceed. The element at index 0 of this array will be added to the resulting array, and the element at index 1 will be passed to the next call to `fn`.
 * @param {import('./types').MaybeRef<*>} seed The seed value.
 * @return {import('vue').ComputedRef<Array>} The final list.
*/
export const useUnfold = curryN(2,(fn, seed) => computed(() => unfold(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof seed === 'function' ? (...fnArgs) => unref(unref(seed)(...fnArgs)) : unref(seed))))


/**
 * Combines two lists into a set (i.e. no duplicates) composed of the elements
 * of each list.
 *
 * @param {import('./types').MaybeWatchSource<Array>} as The first list.
 * @param {import('./types').MaybeWatchSource<Array>} bs The second list.
 * @return {import('vue').ComputedRef<Array>} The first and second lists concatenated, with duplicates removed.
*/
export const useUnion = curryN(2,(as, bs) => computed(() => union(typeof as === 'function' ? as() : unref(as), typeof bs === 'function' ? bs() : unref(bs))))


/**
 * Combines two lists into a set (i.e. no duplicates) composed of the elements
 * of each list. Duplication is determined according to the value returned by
 * applying the supplied predicate to two list elements. If an element exists
 * in both lists, the first element from the first list will be used.
 *
 * @param {import('./types').MaybeRef<Function>} pred A predicate used to test whether two items are equal.
 * @param {import('./types').MaybeWatchSource<Array>} list1 The first list.
 * @param {import('./types').MaybeWatchSource<Array>} list2 The second list.
 * @return {import('vue').ComputedRef<Array>} The first and second lists concatenated, with duplicates removed.
*/
export const useUnionWith = curryN(3,(pred, list1, list2) => computed(() => unionWith(typeof pred === 'function' ? (...fnArgs) => unref(unref(pred)(...fnArgs)) : unref(pred), typeof list1 === 'function' ? list1() : unref(list1), typeof list2 === 'function' ? list2() : unref(list2))))


/**
 * Returns a new list containing only one copy of each element in the original
 * list. [`R.equals`](#equals) is used to determine equality.
 *
 * @param {import('./types').MaybeWatchSource<Array>} list The array to consider.
 * @return {import('vue').ComputedRef<Array>} The list of unique items.
*/
export const useUniq = (list) => computed(() => uniq(typeof list === 'function' ? list() : unref(list)))


/**
 * Returns a new list containing only one copy of each element in the original
 * list, based upon the value returned by applying the supplied function to
 * each list element. Prefers the first item if the supplied function produces
 * the same value on two items. [`R.equals`](#equals) is used for comparison.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param {import('./types').MaybeRef<Function>} fn A function used to produce a value to use during comparisons.
 * @param {import('./types').MaybeWatchSource<Array>} list The array to consider.
 * @return {import('vue').ComputedRef<Array>} The list of unique items.
*/
export const useUniqBy = curryN(2,(fn, list) => computed(() => uniqBy(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof list === 'function' ? list() : unref(list))))


/**
 * Returns a new list containing only one copy of each element in the original
 * list, based upon the value returned by applying the supplied predicate to
 * two list elements. Prefers the first item if two items compare equal based
 * on the predicate.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param {import('./types').MaybeRef<Function>} pred A predicate used to test whether two items are equal.
 * @param {import('./types').MaybeWatchSource<Array>} list The array to consider.
 * @return {import('vue').ComputedRef<Array>} The list of unique items.
*/
export const useUniqWith = curryN(2,(pred, list) => computed(() => uniqWith(typeof pred === 'function' ? (...fnArgs) => unref(unref(pred)(...fnArgs)) : unref(pred), typeof list === 'function' ? list() : unref(list))))


/**
 * Tests the final argument by passing it to the given predicate function. If
 * the predicate is not satisfied, the function will return the result of
 * calling the `whenFalseFn` function with the same argument. If the predicate
 * is satisfied, the argument is returned as is.
 *
 * @param {import('./types').MaybeRef<Function>} pred A predicate function
 * @param {import('./types').MaybeRef<Function>} whenFalseFn A function to invoke when the `pred` evaluates to a falsy value.
 * @param {import('./types').MaybeRef<*>} x An object to test with the `pred` function and pass to `whenFalseFn` if necessary.
 * @return {import('vue').ComputedRef<*>} Either `x` or the result of applying `x` to `whenFalseFn`.
*/
export const useUnless = curryN(3,(pred, whenFalseFn, x) => computed(() => unless(typeof pred === 'function' ? (...fnArgs) => unref(unref(pred)(...fnArgs)) : unref(pred), typeof whenFalseFn === 'function' ? (...fnArgs) => unref(unref(whenFalseFn)(...fnArgs)) : unref(whenFalseFn), typeof x === 'function' ? (...fnArgs) => unref(unref(x)(...fnArgs)) : unref(x))))


/**
 * Shorthand for `R.chain(R.identity)`, which removes one level of nesting from
 * any [Chain](https://github.com/fantasyland/fantasy-land#chain).
 *
 * @param {import('./types').MaybeRef<*>} list 
 * @return {import('vue').ComputedRef<*>} 
*/
export const useUnnest = (list) => computed(() => unnest(typeof list === 'function' ? (...fnArgs) => unref(unref(list)(...fnArgs)) : unref(list)))


/**
 * Takes a predicate, a transformation function, and an initial value,
 * and returns a value of the same type as the initial value.
 * It does so by applying the transformation until the predicate is satisfied,
 * at which point it returns the satisfactory value.
 *
 * @param {import('./types').MaybeRef<Function>} pred A predicate function
 * @param {import('./types').MaybeRef<Function>} fn The iterator function
 * @param {import('./types').MaybeRef<*>} init Initial value
 * @return {import('vue').ComputedRef<*>} Final value that satisfies predicate
*/
export const useUntil = curryN(3,(pred, fn, _init) => computed(() => until(typeof pred === 'function' ? (...fnArgs) => unref(unref(pred)(...fnArgs)) : unref(pred), typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof _init === 'function' ? (...fnArgs) => unref(unref(_init)(...fnArgs)) : unref(_init))))


/**
 * Deconstructs an array field from the input documents to output a document for each element.
 * Each output document is the input document with the value of the array field replaced by the element.
 *
 * @param {import('./types').MaybeWatchSource<String>} key The key to determine which property of the object should be unwind
 * @param {import('./types').MaybeWatchSource<Object>} object The object containing list under property named as key which is to unwind
 * @return {import('vue').ComputedRef<List>} A new list of object containing the value of input key having list replaced by each element in the object.
*/
export const useUnwind = curryN(2,(key, object) => computed(() => unwind(typeof key === 'function' ? key() : unref(key), typeof object === 'function' ? object() : unref(object))))


/**
 * Returns a new copy of the array with the element at the provided index
 * replaced with the given value.
 *
 * @param {import('./types').MaybeWatchSource<Number>} idx The index to update.
 * @param {import('./types').MaybeRef<*>} x The value to exist at the given index of the returned array.
 * @param {import('./types').MaybeWatchSource<Array|Arguments>} list The source array-like object to be updated.
 * @return {import('vue').ComputedRef<Array>} A copy of `list` with the value at index `idx` replaced with `x`.
*/
export const useUpdate = curryN(3,(idx, x, list) => computed(() => update(typeof idx === 'function' ? idx() : unref(idx), typeof x === 'function' ? (...fnArgs) => unref(unref(x)(...fnArgs)) : unref(x), typeof list === 'function' ? list() : unref(list))))


/**
 * Accepts a function `fn` and a list of transformer functions and returns a
 * new curried function. When the new function is invoked, it calls the
 * function `fn` with parameters consisting of the result of calling each
 * supplied handler on successive arguments to the new function.
 * 
 * If more arguments are passed to the returned function than transformer
 * functions, those arguments are passed directly to `fn` as additional
 * parameters. If you expect additional arguments that don't need to be
 * transformed, although you can ignore them, it's best to pass an identity
 * function so that the new function reports the correct arity.
 *
 * @param {import('./types').MaybeRef<Function>} fn The function to wrap.
 * @param {import('./types').MaybeWatchSource<Array>} transformers A list of transformer functions
 * @return {import('vue').ComputedRef<Function>} The wrapped function.
*/
export const useUseWith = curryN(2,(fn, transformers) => computed(() => useWith(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof transformers === 'function' ? transformers() : unref(transformers))))


/**
 * Returns a list of all the enumerable own properties of the supplied object.
 * Note that the order of the output array is not guaranteed across different
 * JS platforms.
 *
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to extract values from
 * @return {import('vue').ComputedRef<Array>} An array of the values of the object's own properties.
*/
export const useValues = (obj) => computed(() => values(typeof obj === 'function' ? obj() : unref(obj)))


/**
 * Returns a list of all the properties, including prototype properties, of the
 * supplied object.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to extract values from
 * @return {import('vue').ComputedRef<Array>} An array of the values of the object's own and prototype properties.
*/
export const useValuesIn = (obj) => computed(() => valuesIn(typeof obj === 'function' ? obj() : unref(obj)))


/**
 * Returns a "view" of the given data structure, determined by the given lens.
 * The lens's focus determines which portion of the data structure is visible.
 *
 * @param {import('./types').MaybeWatchSource<Lens>} lens 
 * @param {import('./types').MaybeRef<*>} x 
 * @return {import('vue').ComputedRef<*>} 
*/
export const useView = curryN(2,(_lens, x) => computed(() => view(typeof _lens === 'function' ? _lens() : unref(_lens), typeof x === 'function' ? (...fnArgs) => unref(unref(x)(...fnArgs)) : unref(x))))


/**
 * Tests the final argument by passing it to the given predicate function. If
 * the predicate is satisfied, the function will return the result of calling
 * the `whenTrueFn` function with the same argument. If the predicate is not
 * satisfied, the argument is returned as is.
 *
 * @param {import('./types').MaybeRef<Function>} pred A predicate function
 * @param {import('./types').MaybeRef<Function>} whenTrueFn A function to invoke when the `condition` evaluates to a truthy value.
 * @param {import('./types').MaybeRef<*>} x An object to test with the `pred` function and pass to `whenTrueFn` if necessary.
 * @return {import('vue').ComputedRef<*>} Either `x` or the result of applying `x` to `whenTrueFn`.
*/
export const useWhen = curryN(3,(pred, whenTrueFn, x) => computed(() => when(typeof pred === 'function' ? (...fnArgs) => unref(unref(pred)(...fnArgs)) : unref(pred), typeof whenTrueFn === 'function' ? (...fnArgs) => unref(unref(whenTrueFn)(...fnArgs)) : unref(whenTrueFn), typeof x === 'function' ? (...fnArgs) => unref(unref(x)(...fnArgs)) : unref(x))))


/**
 * Takes a spec object and a test object; returns true if the test satisfies
 * the spec. Each of the spec's own properties must be a predicate function.
 * Each predicate is applied to the value of the corresponding property of the
 * test object. `where` returns true if all the predicates return true, false
 * otherwise.
 * 
 * `where` is well suited to declaratively expressing constraints for other
 * functions such as [`filter`](#filter) and [`find`](#find).
 *
 * @param {import('./types').MaybeWatchSource<Object>} spec 
 * @param {import('./types').MaybeWatchSource<Object>} testObj 
 * @return {import('vue').ComputedRef<Boolean>} 
*/
export const useWhere = curryN(2,(spec, testObj) => computed(() => where(typeof spec === 'function' ? spec() : unref(spec), typeof testObj === 'function' ? testObj() : unref(testObj))))


/**
 * Takes a spec object and a test object; each of the spec's own properties must be a predicate function.
 * Each predicate is applied to the value of the corresponding property of the
 * test object. `whereAny` returns true if at least one of the predicates return true,
 * false otherwise.
 * 
 * `whereAny` is well suited to declaratively expressing constraints for other
 * functions such as [`filter`](#filter) and [`find`](#find).
 *
 * @param {import('./types').MaybeWatchSource<Object>} spec 
 * @param {import('./types').MaybeWatchSource<Object>} testObj 
 * @return {import('vue').ComputedRef<Boolean>} 
*/
export const useWhereAny = curryN(2,(spec, testObj) => computed(() => whereAny(typeof spec === 'function' ? spec() : unref(spec), typeof testObj === 'function' ? testObj() : unref(testObj))))


/**
 * Takes a spec object and a test object; returns true if the test satisfies
 * the spec, false otherwise. An object satisfies the spec if, for each of the
 * spec's own properties, accessing that property of the object gives the same
 * value (in [`R.equals`](#equals) terms) as accessing that property of the
 * spec.
 * 
 * `whereEq` is a specialization of [`where`](#where).
 *
 * @param {import('./types').MaybeWatchSource<Object>} spec 
 * @param {import('./types').MaybeWatchSource<Object>} testObj 
 * @return {import('vue').ComputedRef<Boolean>} 
*/
export const useWhereEq = curryN(2,(spec, testObj) => computed(() => whereEq(typeof spec === 'function' ? spec() : unref(spec), typeof testObj === 'function' ? testObj() : unref(testObj))))


/**
 * Returns a new list without values in the first argument.
 * [`R.equals`](#equals) is used to determine equality.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param {import('./types').MaybeWatchSource<Array>} list1 The values to be removed from `list2`.
 * @param {import('./types').MaybeWatchSource<Array>} list2 The array to remove values from.
 * @return {import('vue').ComputedRef<Array>} The new array without values in `list1`.
*/
export const useWithout = curryN(2,(list1, list2) => computed(() => without(typeof list1 === 'function' ? list1() : unref(list1), typeof list2 === 'function' ? list2() : unref(list2))))


/**
 * Exclusive disjunction logical operation.
 * Returns `true` if one of the arguments is truthy and the other is falsy.
 * Otherwise, it returns `false`.
 *
 * @param {import('./types').MaybeRef<Any>} a 
 * @param {import('./types').MaybeRef<Any>} b 
 * @return {import('vue').ComputedRef<Boolean>} true if one of the arguments is truthy and the other is falsy
*/
export const useXor = curryN(2,(a, b) => computed(() => xor(typeof a === 'function' ? (...fnArgs) => unref(unref(a)(...fnArgs)) : unref(a), typeof b === 'function' ? (...fnArgs) => unref(unref(b)(...fnArgs)) : unref(b))))


/**
 * Creates a new list out of the two supplied by creating each possible pair
 * from the lists.
 *
 * @param {import('./types').MaybeWatchSource<Array>} as The first list.
 * @param {import('./types').MaybeWatchSource<Array>} bs The second list.
 * @return {import('vue').ComputedRef<Array>} The list made by combining each possible pair from `as` and `bs` into pairs (`[a, b]`).
*/
export const useXprod = curryN(2,(as, bs) => computed(() => xprod(typeof as === 'function' ? as() : unref(as), typeof bs === 'function' ? bs() : unref(bs))))


/**
 * Creates a new list out of the two supplied by pairing up equally-positioned
 * items from both lists. The returned list is truncated to the length of the
 * shorter of the two input lists.
 * Note: `zip` is equivalent to `zipWith(function(a, b) { return [a, b] })`.
 *
 * @param {import('./types').MaybeWatchSource<Array>} list1 The first array to consider.
 * @param {import('./types').MaybeWatchSource<Array>} list2 The second array to consider.
 * @return {import('vue').ComputedRef<Array>} The list made by pairing up same-indexed elements of `list1` and `list2`.
*/
export const useZip = curryN(2,(list1, list2) => computed(() => zip(typeof list1 === 'function' ? list1() : unref(list1), typeof list2 === 'function' ? list2() : unref(list2))))


/**
 * Creates a new object out of a list of keys and a list of values.
 * Key/value pairing is truncated to the length of the shorter of the two lists.
 * Note: `zipObj` is equivalent to `pipe(zip, fromPairs)`.
 *
 * @param {import('./types').MaybeWatchSource<Array>} keys The array that will be properties on the output object.
 * @param {import('./types').MaybeWatchSource<Array>} values The list of values on the output object.
 * @return {import('vue').ComputedRef<Object>} The object made by pairing up same-indexed elements of `keys` and `values`.
*/
export const useZipObj = curryN(2,(_keys, _values) => computed(() => zipObj(typeof _keys === 'function' ? _keys() : unref(_keys), typeof _values === 'function' ? _values() : unref(_values))))


/**
 * Creates a new list out of the two supplied by applying the function to each
 * equally-positioned pair in the lists. The returned list is truncated to the
 * length of the shorter of the two input lists.
 *
 * @param {import('./types').MaybeRef<Function>} fn The function used to combine the two elements into one value.
 * @param {import('./types').MaybeWatchSource<Array>} list1 The first array to consider.
 * @param {import('./types').MaybeWatchSource<Array>} list2 The second array to consider.
 * @return {import('vue').ComputedRef<Array>} The list made by combining same-indexed elements of `list1` and `list2` using `fn`.
*/
export const useZipWith = curryN(3,(fn, list1, list2) => computed(() => zipWith(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof list1 === 'function' ? list1() : unref(list1), typeof list2 === 'function' ? list2() : unref(list2))))

