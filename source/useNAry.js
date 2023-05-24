import { computed, unref } from 'vue'
import { nAry, curryN } from 'ramda'

/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly `n` parameters. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * @param {import('./types').MaybeWatchSource<Number>} n The desired arity of the new function.
 * @param {import('./types').MaybeRef<Function>} fn The function to wrap.
 * @return {import('vue').ComputedRef<Function>} A new function wrapping `fn`. The new function is guaranteed to be of arity `n`.
*/
const useNAry = curryN(2,(n, fn) => computed(() => nAry(typeof n === 'function' ? n() : unref(n), typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn))))

export default useNAry
