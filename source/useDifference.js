import { computed, unref } from 'vue'
import { difference, curryN } from 'ramda'

/**
 * Finds the set (i.e. no duplicates) of all elements in the first list not
 * contained in the second list. Objects and Arrays are compared in terms of
 * value equality, not reference equality.
 *
 * @param {import('./types').MaybeWatchSource<Array>} list1 The first list.
 * @param {import('./types').MaybeWatchSource<Array>} list2 The second list.
 * @return {import('vue').ComputedRef<Array>} The elements in `list1` that are not in `list2`.
*/
const useDifference = curryN(2,(list1, list2) => computed(() => difference(typeof list1 === 'function' ? list1() : unref(list1), typeof list2 === 'function' ? list2() : unref(list2))))

export default useDifference
