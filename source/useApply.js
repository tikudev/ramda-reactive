import { computed, unref } from 'vue'
import { apply, curryN } from 'ramda'

/**
 * Applies function `fn` to the argument list `args`. This is useful for
 * creating a fixed-arity function from a variadic function. `fn` should be a
 * bound function if context is significant.
 *
 * @param {import('./types').MaybeRef<Function>} fn The function which will be called with `args`
 * @param {import('./types').MaybeWatchSource<Array>} args The arguments to call `fn` with
 * @return {import('vue').ComputedRef<*>} result The result, equivalent to `fn(...args)`
*/
const useApply = curryN(2,(fn, args) => computed(() => apply(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof args === 'function' ? args() : unref(args))))

export default useApply
