import { computed, unref } from 'vue'
import { symmetricDifference, curryN } from 'ramda'

/**
 * Finds the set (i.e. no duplicates) of all elements contained in the first or
 * second list, but not both.
 *
 * @param {import('./types').MaybeWatchSource<Array>} list1 The first list.
 * @param {import('./types').MaybeWatchSource<Array>} list2 The second list.
 * @return {import('vue').ComputedRef<Array>} The elements in `list1` or `list2`, but not both.
*/
const useSymmetricDifference = curryN(2,(list1, list2) => computed(() => symmetricDifference(typeof list1 === 'function' ? list1() : unref(list1), typeof list2 === 'function' ? list2() : unref(list2))))

export default useSymmetricDifference
