import { computed, unref } from 'vue'
import { tail } from 'ramda'

/**
 * Returns all but the first element of the given list or string (or object
 * with a `tail` method).
 * 
 * Dispatches to the `slice` method of the first argument, if present.
 *
 * @param {import('./types').MaybeRef<*>} list 
 * @return {import('vue').ComputedRef<*>} 
*/
const useTail = (list) => computed(() => tail(typeof list === 'function' ? (...fnArgs) => unref(unref(list)(...fnArgs)) : unref(list)))

export default useTail
