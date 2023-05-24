import { computed, unref } from 'vue'
import { split, curryN } from 'ramda'

/**
 * Splits a string into an array of strings based on the given
 * separator.
 *
 * @param {import('./types').MaybeWatchSource<String|RegExp>} sep The pattern.
 * @param {import('./types').MaybeWatchSource<String>} str The string to separate into an array.
 * @return {import('vue').ComputedRef<Array>} The array of strings from `str` separated by `sep`.
*/
const useSplit = curryN(2,(sep, str) => computed(() => split(typeof sep === 'function' ? sep() : unref(sep), typeof str === 'function' ? str() : unref(str))))

export default useSplit
