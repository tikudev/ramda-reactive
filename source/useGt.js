import { computed, unref } from 'vue'
import { gt, curryN } from 'ramda'

/**
 * Returns `true` if the first argument is greater than the second; `false`
 * otherwise.
 *
 * @param {import('./types').MaybeRef<*>} a 
 * @param {import('./types').MaybeRef<*>} b 
 * @return {import('vue').ComputedRef<Boolean>} 
*/
const useGt = curryN(2,(a, b) => computed(() => gt(typeof a === 'function' ? (...fnArgs) => unref(unref(a)(...fnArgs)) : unref(a), typeof b === 'function' ? (...fnArgs) => unref(unref(b)(...fnArgs)) : unref(b))))

export default useGt
