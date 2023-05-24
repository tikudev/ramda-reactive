import { computed, unref } from 'vue'
import { count } from 'ramda'

/**
 * Returns the number of items in a given `list` matching the predicate `f`
 *
 * @param {import('./types').MaybeRef<Function>} predicate to match items against
 * @return {import('vue').ComputedRef<Array>} list of items to count in
*/
const useCount = (predicate) => computed(() => count(typeof predicate === 'function' ? (...fnArgs) => unref(unref(predicate)(...fnArgs)) : unref(predicate)))

export default useCount
