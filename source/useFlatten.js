import { computed, unref } from 'vue'
import { flatten } from 'ramda'

/**
 * Returns a new list by pulling every item out of it (and all its sub-arrays)
 * and putting them in a new array, depth-first.
 *
 * @param {import('./types').MaybeWatchSource<Array>} list The array to consider.
 * @return {import('vue').ComputedRef<Array>} The flattened list.
*/
const useFlatten = (list) => computed(() => flatten(typeof list === 'function' ? list() : unref(list)))

export default useFlatten
