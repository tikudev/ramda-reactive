import { computed, unref } from 'vue'
import { min, curryN } from 'ramda'

/**
 * Returns the smaller of its two arguments.
 *
 * @param {import('./types').MaybeRef<*>} a 
 * @param {import('./types').MaybeRef<*>} b 
 * @return {import('vue').ComputedRef<*>} 
*/
const useMin = curryN(2,(a, b) => computed(() => min(typeof a === 'function' ? (...fnArgs) => unref(unref(a)(...fnArgs)) : unref(a), typeof b === 'function' ? (...fnArgs) => unref(unref(b)(...fnArgs)) : unref(b))))

export default useMin
