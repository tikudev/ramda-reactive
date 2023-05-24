import { computed, unref } from 'vue'
import { zip, curryN } from 'ramda'

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
const useZip = curryN(2,(list1, list2) => computed(() => zip(typeof list1 === 'function' ? list1() : unref(list1), typeof list2 === 'function' ? list2() : unref(list2))))

export default useZip
