import { computed, unref } from 'vue'
import { sum } from 'ramda'

/**
 * Adds together all the elements of a list.
 *
 * @param {import('./types').MaybeWatchSource<Array>} list An array of numbers
 * @return {import('vue').ComputedRef<Number>} The sum of all the numbers in the list.
*/
const useSum = (list) => computed(() => sum(typeof list === 'function' ? list() : unref(list)))

export default useSum
