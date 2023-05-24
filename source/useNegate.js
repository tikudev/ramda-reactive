import { computed, unref } from 'vue'
import { negate } from 'ramda'

/**
 * Negates its argument.
 *
 * @param {import('./types').MaybeWatchSource<Number>} n 
 * @return {import('vue').ComputedRef<Number>} 
*/
const useNegate = (n) => computed(() => negate(typeof n === 'function' ? n() : unref(n)))

export default useNegate
