import { computed, unref } from 'vue'
import { identity } from 'ramda'

/**
 * A function that does nothing but return the parameter supplied to it. Good
 * as a default or placeholder function.
 *
 * @param {import('./types').MaybeRef<*>} x The value to return.
 * @return {import('vue').ComputedRef<*>} The input value, `x`.
*/
const useIdentity = (x) => computed(() => identity(typeof x === 'function' ? (...fnArgs) => unref(unref(x)(...fnArgs)) : unref(x)))

export default useIdentity
