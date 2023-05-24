import { computed, unref } from 'vue'
import { unary } from 'ramda'

/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly 1 parameter. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * @param {import('./types').MaybeRef<Function>} fn The function to wrap.
 * @return {import('vue').ComputedRef<Function>} A new function wrapping `fn`. The new function is guaranteed to be of arity 1.
*/
const useUnary = (fn) => computed(() => unary(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn)))

export default useUnary
