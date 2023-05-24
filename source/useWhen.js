import { computed, unref } from 'vue'
import { when, curryN } from 'ramda'

/**
 * Tests the final argument by passing it to the given predicate function. If
 * the predicate is satisfied, the function will return the result of calling
 * the `whenTrueFn` function with the same argument. If the predicate is not
 * satisfied, the argument is returned as is.
 *
 * @param {import('./types').MaybeRef<Function>} pred A predicate function
 * @param {import('./types').MaybeRef<Function>} whenTrueFn A function to invoke when the `condition` evaluates to a truthy value.
 * @param {import('./types').MaybeRef<*>} x An object to test with the `pred` function and pass to `whenTrueFn` if necessary.
 * @return {import('vue').ComputedRef<*>} Either `x` or the result of applying `x` to `whenTrueFn`.
*/
const useWhen = curryN(3,(pred, whenTrueFn, x) => computed(() => when(typeof pred === 'function' ? (...fnArgs) => unref(unref(pred)(...fnArgs)) : unref(pred), typeof whenTrueFn === 'function' ? (...fnArgs) => unref(unref(whenTrueFn)(...fnArgs)) : unref(whenTrueFn), typeof x === 'function' ? (...fnArgs) => unref(unref(x)(...fnArgs)) : unref(x))))

export default useWhen
