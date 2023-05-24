import { computed, unref } from 'vue'
import { match, curryN } from 'ramda'

/**
 * Tests a regular expression against a String. Note that this function will
 * return an empty array when there are no matches. This differs from
 * [`String.prototype.match`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)
 * which returns `null` when there are no matches.
 *
 * @param {import('./types').MaybeWatchSource<RegExp>} rx A regular expression.
 * @param {import('./types').MaybeWatchSource<String>} str The string to match against
 * @return {import('vue').ComputedRef<Array>} The list of matches or empty array.
*/
const useMatch = curryN(2,(rx, str) => computed(() => match(typeof rx === 'function' ? rx() : unref(rx), typeof str === 'function' ? str() : unref(str))))

export default useMatch
