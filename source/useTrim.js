import { computed, unref } from 'vue'
import { trim } from 'ramda'

/**
 * Removes (strips) whitespace from both ends of the string.
 *
 * @param {import('./types').MaybeWatchSource<String>} str The string to trim.
 * @return {import('vue').ComputedRef<String>} Trimmed version of `str`.
*/
const useTrim = (str) => computed(() => trim(typeof str === 'function' ? str() : unref(str)))

export default useTrim
