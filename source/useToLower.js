import { computed, unref } from 'vue'
import { toLower } from 'ramda'

/**
 * The lower case version of a string.
 *
 * @param {import('./types').MaybeWatchSource<String>} str The string to lower case.
 * @return {import('vue').ComputedRef<String>} The lower case version of `str`.
*/
const useToLower = (str) => computed(() => toLower(typeof str === 'function' ? str() : unref(str)))

export default useToLower
