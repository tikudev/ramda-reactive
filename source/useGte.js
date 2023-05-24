import { computed, unref } from 'vue'
import { gte, curryN } from 'ramda'

/**
 * Returns `true` if the first argument is greater than or equal to the second;
 * `false` otherwise.
 *
 * @param {import('./types').MaybeWatchSource<Number>} a 
 * @param {import('./types').MaybeWatchSource<Number>} b 
 * @return {import('vue').ComputedRef<Boolean>} 
*/
const useGte = curryN(2,(a, b) => computed(() => gte(typeof a === 'function' ? a() : unref(a), typeof b === 'function' ? b() : unref(b))))

export default useGte
