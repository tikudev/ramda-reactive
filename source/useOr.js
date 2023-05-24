import { computed, unref } from 'vue'
import { or, curryN } from 'ramda'

/**
 * Returns the first argument if it is truthy, otherwise the second argument.
 * Acts as the boolean `or` statement if both inputs are `Boolean`s.
 *
 * @param {import('./types').MaybeRef<Any>} a 
 * @param {import('./types').MaybeRef<Any>} b 
 * @return {import('vue').ComputedRef<Any>} 
*/
const useOr = curryN(2,(a, b) => computed(() => or(typeof a === 'function' ? (...fnArgs) => unref(unref(a)(...fnArgs)) : unref(a), typeof b === 'function' ? (...fnArgs) => unref(unref(b)(...fnArgs)) : unref(b))))

export default useOr
