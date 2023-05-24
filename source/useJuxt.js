import { computed, unref } from 'vue'
import { juxt } from 'ramda'

/**
 * juxt applies a list of functions to a list of values.
 *
 * @param {import('./types').MaybeWatchSource<Array>} fns An array of functions
 * @return {import('vue').ComputedRef<Function>} A function that returns a list of values after applying each of the original `fns` to its parameters.
*/
const useJuxt = (fns) => computed(() => juxt(typeof fns === 'function' ? fns() : unref(fns)))

export default useJuxt
