import { computed, unref } from 'vue'
import { max, curryN } from 'ramda'

/**
 * Returns the larger of its two arguments.
 *
 * @param {import('./types').MaybeRef<*>} a 
 * @param {import('./types').MaybeRef<*>} b 
 * @return {import('vue').ComputedRef<*>} 
*/
const useMax = curryN(2,(a, b) => computed(() => max(typeof a === 'function' ? (...fnArgs) => unref(unref(a)(...fnArgs)) : unref(a), typeof b === 'function' ? (...fnArgs) => unref(unref(b)(...fnArgs)) : unref(b))))

export default useMax
