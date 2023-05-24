import { computed, unref } from 'vue'
import { applyTo, curryN } from 'ramda'

/**
 * Takes a value and applies a function to it.
 * 
 * This function is also known as the `thrush` combinator.
 *
 * @param {import('./types').MaybeRef<*>} x The value
 * @param {import('./types').MaybeRef<Function>} f The function to apply
 * @return {import('vue').ComputedRef<*>} The result of applying `f` to `x`
*/
const useApplyTo = curryN(2,(x, f) => computed(() => applyTo(typeof x === 'function' ? (...fnArgs) => unref(unref(x)(...fnArgs)) : unref(x), typeof f === 'function' ? (...fnArgs) => unref(unref(f)(...fnArgs)) : unref(f))))

export default useApplyTo
