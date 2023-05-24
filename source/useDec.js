import { computed, unref } from 'vue'
import { dec } from 'ramda'

/**
 * Decrements its argument.
 *
 * @param {import('./types').MaybeWatchSource<Number>} n 
 * @return {import('vue').ComputedRef<Number>} n - 1
*/
const useDec = (n) => computed(() => dec(typeof n === 'function' ? n() : unref(n)))

export default useDec
