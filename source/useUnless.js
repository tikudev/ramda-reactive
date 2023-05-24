import { computed, unref } from 'vue'
import { unless, curryN } from 'ramda'

/**
 * Tests the final argument by passing it to the given predicate function. If
 * the predicate is not satisfied, the function will return the result of
 * calling the `whenFalseFn` function with the same argument. If the predicate
 * is satisfied, the argument is returned as is.
 *
 * @param {import('./types').MaybeRef<Function>} pred A predicate function
 * @param {import('./types').MaybeRef<Function>} whenFalseFn A function to invoke when the `pred` evaluates to a falsy value.
 * @param {import('./types').MaybeRef<*>} x An object to test with the `pred` function and pass to `whenFalseFn` if necessary.
 * @return {import('vue').ComputedRef<*>} Either `x` or the result of applying `x` to `whenFalseFn`.
*/
const useUnless = curryN(3,(pred, whenFalseFn, x) => computed(() => unless(typeof pred === 'function' ? (...fnArgs) => unref(unref(pred)(...fnArgs)) : unref(pred), typeof whenFalseFn === 'function' ? (...fnArgs) => unref(unref(whenFalseFn)(...fnArgs)) : unref(whenFalseFn), typeof x === 'function' ? (...fnArgs) => unref(unref(x)(...fnArgs)) : unref(x))))

export default useUnless
