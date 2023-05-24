import { computed, unref } from 'vue'
import { and, curryN } from 'ramda'

/**
 * Returns the first argument if it is falsy, otherwise the second argument.
 * Acts as the boolean `and` statement if both inputs are `Boolean`s.
 *
 * @param {import('./types').MaybeRef<Any>} a 
 * @param {import('./types').MaybeRef<Any>} b 
 * @return {import('vue').ComputedRef<Any>} 
*/
const useAnd = curryN(2,(a, b) => computed(() => and(typeof a === 'function' ? (...fnArgs) => unref(unref(a)(...fnArgs)) : unref(a), typeof b === 'function' ? (...fnArgs) => unref(unref(b)(...fnArgs)) : unref(b))))

export default useAnd
