import { computed, unref } from 'vue'
import { nthArg } from 'ramda'

/**
 * Returns a function which returns its nth argument.
 *
 * @param {import('./types').MaybeWatchSource<Number>} n 
 * @return {import('vue').ComputedRef<Function>} 
*/
const useNthArg = (n) => computed(() => nthArg(typeof n === 'function' ? n() : unref(n)))

export default useNthArg
