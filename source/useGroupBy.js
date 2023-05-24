import { computed, unref } from 'vue'
import { groupBy, curryN } from 'ramda'

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
const useGroupBy = curryN(2,(fn, list) => computed(() => groupBy(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof list === 'function' ? list() : unref(list))))

export default useGroupBy
