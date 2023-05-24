import { computed, unref } from 'vue'
import { init } from 'ramda'

/**
 * Returns all but the last element of the given list or string.
 *
 * @param {import('./types').MaybeRef<*>} list 
 * @return {import('vue').ComputedRef<*>} 
*/
const useInit = (list) => computed(() => init(typeof list === 'function' ? (...fnArgs) => unref(unref(list)(...fnArgs)) : unref(list)))

export default useInit
