import { computed, unref } from 'vue'
import { construct } from 'ramda'

/**
 * Wraps a constructor function inside a curried function that can be called
 * with the same arguments and returns the same type.
 *
 * @param {import('./types').MaybeRef<Function>} fn The constructor function to wrap.
 * @return {import('vue').ComputedRef<Function>} A wrapped, curried constructor function.
*/
const useConstruct = (fn) => computed(() => construct(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn)))

export default useConstruct
