import { computed, unref } from 'vue'
import { zipWith, curryN } from 'ramda'

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
const useZipWith = curryN(3,(fn, list1, list2) => computed(() => zipWith(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof list1 === 'function' ? list1() : unref(list1), typeof list2 === 'function' ? list2() : unref(list2))))

export default useZipWith
