import { computed, unref } from 'vue'
import { flip } from 'ramda'

/**
 * Returns a new function much like the supplied one, except that the first two
 * arguments' order is reversed.
 *
 * @param {import('./types').MaybeRef<Function>} fn The function to invoke with its first two parameters reversed.
 * @return {import('vue').ComputedRef<*>} The result of invoking `fn` with its first two parameters' order reversed.
*/
const useFlip = (fn) => computed(() => flip(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn)))

export default useFlip
