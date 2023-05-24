import { computed, unref } from 'vue'
import { binary } from 'ramda'

/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly 2 parameters. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * @param {import('./types').MaybeRef<Function>} fn The function to wrap.
 * @return {import('vue').ComputedRef<Function>} A new function wrapping `fn`. The new function is guaranteed to be of arity 2.
*/
const useBinary = (fn) => computed(() => binary(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn)))

export default useBinary
