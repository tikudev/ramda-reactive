import { computed, unref } from 'vue'
import { product } from 'ramda'

/**
 * Multiplies together all the elements of a list.
 *
 * @param {import('./types').MaybeWatchSource<Array>} list An array of numbers
 * @return {import('vue').ComputedRef<Number>} The product of all the numbers in the list.
*/
const useProduct = (list) => computed(() => product(typeof list === 'function' ? list() : unref(list)))

export default useProduct
