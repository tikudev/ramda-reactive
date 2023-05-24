import { computed, unref } from 'vue'
import { replace, curryN } from 'ramda'

/**
 * Replace a substring or regex match in a string with a replacement.
 * 
 * The first two parameters correspond to the parameters of the
 * `String.prototype.replace()` function, so the second parameter can also be a
 * function.
 *
 * @param {import('./types').MaybeWatchSource<RegExp|String>} pattern A regular expression or a substring to match.
 * @param {import('./types').MaybeWatchSource<String>} replacement The string to replace the matches with.
 * @param {import('./types').MaybeWatchSource<String>} str The String to do the search and replacement in.
 * @return {import('vue').ComputedRef<String>} The result.
*/
const useReplace = curryN(3,(pattern, replacement, str) => computed(() => replace(typeof pattern === 'function' ? pattern() : unref(pattern), typeof replacement === 'function' ? replacement() : unref(replacement), typeof str === 'function' ? str() : unref(str))))

export default useReplace
