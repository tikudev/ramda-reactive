import { computed, unref } from 'vue'
import { curry } from 'ramda'

/**
 * Returns a curried equivalent of the provided function. The curried function
 * has two unusual capabilities. First, its arguments needn't be provided one
 * at a time. If `f` is a ternary function and `g` is `R.curry(f)`, the
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
 * Please note that default parameters don't count towards a [function arity](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
 * and therefore `curry` won't work well with those:
 * 
 * ```
 * const h = R.curry((a, b, c = 2) => a + b + c);
 * 
 * h(40);
 * //=> function (waits for `b`)
 * 
 * h(39)(1);
 * //=> 42
 * 
 * h(1)(2, 3);
 * //=> 6
 * 
 * h(1)(2)(7);
 * //=> Error! (`3` is not a function!)
 * ```
 *
 * @param {import('./types').MaybeRef<Function>} fn The function to curry.
 * @return {import('vue').ComputedRef<Function>} A new, curried function.
*/
const useCurry = (fn) => computed(() => curry(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn)))

export default useCurry
