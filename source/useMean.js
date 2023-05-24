import { computed, unref } from 'vue'
import { mean } from 'ramda'

/**
 * Returns the mean of the given list of numbers.
 *
 * @param {import('./types').MaybeWatchSource<Array>} list 
 * @return {import('vue').ComputedRef<Number>} 
*/
const useMean = (list) => computed(() => mean(typeof list === 'function' ? list() : unref(list)))

export default useMean
