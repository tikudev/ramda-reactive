import { computed, unref } from 'vue'
import { lt, curryN } from 'ramda'

/**
 * Returns `true` if the first argument is less than the second; `false`
 * otherwise.
 *
 * @param {import('./types').MaybeRef<*>} a 
 * @param {import('./types').MaybeRef<*>} b 
 * @return {import('vue').ComputedRef<Boolean>} 
*/
const useLt = curryN(2,(a, b) => computed(() => lt(typeof a === 'function' ? (...fnArgs) => unref(unref(a)(...fnArgs)) : unref(a), typeof b === 'function' ? (...fnArgs) => unref(unref(b)(...fnArgs)) : unref(b))))

export default useLt
