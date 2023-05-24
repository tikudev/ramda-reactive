import { computed, unref } from 'vue'
import { lte, curryN } from 'ramda'

/**
 * Returns `true` if the first argument is less than or equal to the second;
 * `false` otherwise.
 *
 * @param {import('./types').MaybeWatchSource<Number>} a 
 * @param {import('./types').MaybeWatchSource<Number>} b 
 * @return {import('vue').ComputedRef<Boolean>} 
*/
const useLte = curryN(2,(a, b) => computed(() => lte(typeof a === 'function' ? a() : unref(a), typeof b === 'function' ? b() : unref(b))))

export default useLte
