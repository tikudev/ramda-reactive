import { computed, unref } from 'vue'
import { uncurryN, curryN } from 'ramda'

/**
 * Returns a function of arity `n` from a (manually) curried function.
 * Note that, the returned function is actually a ramda style
 * curryied function, which can accept one or more arguments in each
 * function calling.
 *
 * @param {import('./types').MaybeWatchSource<Number>} length The arity for the returned function.
 * @param {import('./types').MaybeRef<Function>} fn The function to uncurry.
 * @return {import('vue').ComputedRef<Function>} A new function.
*/
const useUncurryN = curryN(2,(_length, fn) => computed(() => uncurryN(typeof _length === 'function' ? _length() : unref(_length), typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn))))

export default useUncurryN
