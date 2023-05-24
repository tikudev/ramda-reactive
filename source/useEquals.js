import { computed, unref } from 'vue'
import { equals, curryN } from 'ramda'

/**
 * Returns `true` if its arguments are equivalent, `false` otherwise. Handles
 * cyclical data structures.
 * 
 * Dispatches symmetrically to the `equals` methods of both arguments, if
 * present.
 *
 * @param {import('./types').MaybeRef<*>} a 
 * @param {import('./types').MaybeRef<*>} b 
 * @return {import('vue').ComputedRef<Boolean>} 
*/
const useEquals = curryN(2,(a, b) => computed(() => equals(typeof a === 'function' ? (...fnArgs) => unref(unref(a)(...fnArgs)) : unref(a), typeof b === 'function' ? (...fnArgs) => unref(unref(b)(...fnArgs)) : unref(b))))

export default useEquals
