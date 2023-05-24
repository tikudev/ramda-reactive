import { computed, unref } from 'vue'
import { inc } from 'ramda'

/**
 * Increments its argument.
 *
 * @param {import('./types').MaybeWatchSource<Number>} n 
 * @return {import('vue').ComputedRef<Number>} n + 1
*/
const useInc = (n) => computed(() => inc(typeof n === 'function' ? n() : unref(n)))

export default useInc
