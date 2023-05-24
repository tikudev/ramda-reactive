import { computed, unref } from 'vue'
import { curryN } from 'ramda'

/**
 * Returns a curried equivalent of the provided function, with the specified
 * arity. The curried function has two unusual capabilities. First, its
 * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the
 * following are equivalent:
 * 
 * - `g(1)(2)(3)`
 * - `g(1)(2, 3)`
 * - `g(1, 2)(3)`
 * - `g(1, 2, 3)`
 * 
 * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
 * the following are equivalent:
 * 
 * - `g(1, 2, 3)`
 * - `g(_, 2, 3)(1)`
 * - `g(_, _, 3)(1)(2)`
 * - `g(_, _, 3)(1, 2)`
 * - `g(_, 2)(1)(3)`
 * - `g(_, 2)(1, 3)`
 * - `g(_, 2)(_, 3)(1)`
 *
 * @param {import('./types').MaybeWatchSource<Number>} length The arity for the returned function.
 * @param {import('./types').MaybeRef<Function>} fn The function to curry.
 * @return {import('vue').ComputedRef<Function>} A new, curried function.
*/
const useCurryN = curryN(2,(_length, fn) => computed(() => curryN(typeof _length === 'function' ? _length() : unref(_length), typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn))))

export default useCurryN
