import { computed, unref } from 'vue'
import { last } from 'ramda'

/**
 * Returns the last element of the given list or string.
 *
 * @param {import('./types').MaybeRef<*>} list 
 * @return {import('vue').ComputedRef<*>} 
*/
const useLast = (list) => computed(() => last(typeof list === 'function' ? (...fnArgs) => unref(unref(list)(...fnArgs)) : unref(list)))

export default useLast
