import { computed, unref } from 'vue'
import { union, curryN } from 'ramda'

/**
 * Combines two lists into a set (i.e. no duplicates) composed of the elements
 * of each list.
 *
 * @param {import('./types').MaybeWatchSource<Array>} as The first list.
 * @param {import('./types').MaybeWatchSource<Array>} bs The second list.
 * @return {import('vue').ComputedRef<Array>} The first and second lists concatenated, with duplicates removed.
*/
const useUnion = curryN(2,(as, bs) => computed(() => union(typeof as === 'function' ? as() : unref(as), typeof bs === 'function' ? bs() : unref(bs))))

export default useUnion
