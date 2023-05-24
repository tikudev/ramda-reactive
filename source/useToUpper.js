import { computed, unref } from 'vue'
import { toUpper } from 'ramda'

/**
 * The upper case version of a string.
 *
 * @param {import('./types').MaybeWatchSource<String>} str The string to upper case.
 * @return {import('vue').ComputedRef<String>} The upper case version of `str`.
*/
const useToUpper = (str) => computed(() => toUpper(typeof str === 'function' ? str() : unref(str)))

export default useToUpper
