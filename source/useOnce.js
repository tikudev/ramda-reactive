import { computed, unref } from 'vue'
import { once } from 'ramda'

/**
 * Accepts a function `fn` and returns a function that guards invocation of
 * `fn` such that `fn` can only ever be called once, no matter how many times
 * the returned function is invoked. The first value calculated is returned in
 * subsequent invocations.
 *
 * @param {import('./types').MaybeRef<Function>} fn The function to wrap in a call-only-once wrapper.
 * @return {import('vue').ComputedRef<Function>} The wrapped function.
*/
const useOnce = (fn) => computed(() => once(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn)))

export default useOnce
