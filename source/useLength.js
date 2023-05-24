import { computed, unref } from 'vue'
import { length } from 'ramda'

/**
 * Returns the number of elements in the array by returning `list.length`.
 *
 * @param {import('./types').MaybeWatchSource<Array>} list The array to inspect.
 * @return {import('vue').ComputedRef<Number>} The length of the array.
*/
const useLength = (list) => computed(() => length(typeof list === 'function' ? list() : unref(list)))

export default useLength
