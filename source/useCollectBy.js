import { computed, unref } from 'vue'
import { collectBy, curryN } from 'ramda'

/**
 * Splits a list into sub-lists, based on the result of calling a key-returning function on each element,
 * and grouping the results according to values returned.
 *
 * @param {import('./types').MaybeRef<Function>} fn Function :: a -> Idx
 * @param {import('./types').MaybeWatchSource<Array>} list The array to group
 * @return {import('vue').ComputedRef<Array>} An array of arrays where each sub-array contains items for which the String-returning function has returned the same value.
*/
const useCollectBy = curryN(2,(fn, list) => computed(() => collectBy(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof list === 'function' ? list() : unref(list))))

export default useCollectBy
