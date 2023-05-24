import { computed, unref } from 'vue'
import { tryCatch, curryN } from 'ramda'

/**
 * `tryCatch` takes two functions, a `tryer` and a `catcher`. The returned
 * function evaluates the `tryer`; if it does not throw, it simply returns the
 * result. If the `tryer` *does* throw, the returned function evaluates the
 * `catcher` function and returns its result. Note that for effective
 * composition with this function, both the `tryer` and `catcher` functions
 * must return the same type of results.
 *
 * @param {import('./types').MaybeRef<Function>} tryer The function that may throw.
 * @param {import('./types').MaybeRef<Function>} catcher The function that will be evaluated if `tryer` throws.
 * @return {import('vue').ComputedRef<Function>} A new function that will catch exceptions and send them to the catcher.
*/
const useTryCatch = curryN(2,(tryer, catcher) => computed(() => tryCatch(typeof tryer === 'function' ? (...fnArgs) => unref(unref(tryer)(...fnArgs)) : unref(tryer), typeof catcher === 'function' ? (...fnArgs) => unref(unref(catcher)(...fnArgs)) : unref(catcher))))

export default useTryCatch
