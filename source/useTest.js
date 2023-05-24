import { computed, unref } from 'vue'
import { test, curryN } from 'ramda'

/**
 * Determines whether a given string matches a given regular expression.
 *
 * @param {import('./types').MaybeWatchSource<RegExp>} pattern 
 * @param {import('./types').MaybeWatchSource<String>} str 
 * @return {import('vue').ComputedRef<Boolean>} 
*/
const useTest = curryN(2,(pattern, str) => computed(() => test(typeof pattern === 'function' ? pattern() : unref(pattern), typeof str === 'function' ? str() : unref(str))))

export default useTest
