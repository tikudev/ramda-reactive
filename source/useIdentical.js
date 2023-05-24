import { computed, unref } from 'vue'
import { identical, curryN } from 'ramda'

/**
 * Returns true if its arguments are identical, false otherwise. Values are
 * identical if they reference the same memory. `NaN` is identical to `NaN`;
 * `0` and `-0` are not identical.
 * 
 * Note this is merely a curried version of ES6 `Object.is`.
 * 
 * `identical` does not support the `__` placeholder.
 *
 * @param {import('./types').MaybeRef<*>} a 
 * @param {import('./types').MaybeRef<*>} b 
 * @return {import('vue').ComputedRef<Boolean>} 
*/
const useIdentical = curryN(2,(a, b) => computed(() => identical(typeof a === 'function' ? (...fnArgs) => unref(unref(a)(...fnArgs)) : unref(a), typeof b === 'function' ? (...fnArgs) => unref(unref(b)(...fnArgs)) : unref(b))))

export default useIdentical
