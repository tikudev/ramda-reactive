import { computed, unref } from 'vue'
import { intersection, curryN } from 'ramda'

/**
 * Combines two lists into a set (i.e. no duplicates) composed of those
 * elements common to both lists.
 *
 * @param {import('./types').MaybeWatchSource<Array>} list1 The first list.
 * @param {import('./types').MaybeWatchSource<Array>} list2 The second list.
 * @return {import('vue').ComputedRef<Array>} The list of elements found in both `list1` and `list2`.
*/
const useIntersection = curryN(2,(list1, list2) => computed(() => intersection(typeof list1 === 'function' ? list1() : unref(list1), typeof list2 === 'function' ? list2() : unref(list2))))

export default useIntersection
