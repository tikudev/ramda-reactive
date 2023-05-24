import { computed, unref } from 'vue'
import { median } from 'ramda'

/**
 * Returns the median of the given list of numbers.
 *
 * @param {import('./types').MaybeWatchSource<Array>} list 
 * @return {import('vue').ComputedRef<Number>} 
*/
const useMedian = (list) => computed(() => median(typeof list === 'function' ? list() : unref(list)))

export default useMedian
