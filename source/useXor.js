import { computed, unref } from 'vue'
import { xor, curryN } from 'ramda'

/**
 * Exclusive disjunction logical operation.
 * Returns `true` if one of the arguments is truthy and the other is falsy.
 * Otherwise, it returns `false`.
 *
 * @param {import('./types').MaybeRef<Any>} a 
 * @param {import('./types').MaybeRef<Any>} b 
 * @return {import('vue').ComputedRef<Boolean>} true if one of the arguments is truthy and the other is falsy
*/
const useXor = curryN(2,(a, b) => computed(() => xor(typeof a === 'function' ? (...fnArgs) => unref(unref(a)(...fnArgs)) : unref(a), typeof b === 'function' ? (...fnArgs) => unref(unref(b)(...fnArgs)) : unref(b))))

export default useXor
