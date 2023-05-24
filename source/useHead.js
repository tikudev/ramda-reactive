import { computed, unref } from 'vue'
import { head } from 'ramda'

/**
 * Returns the first element of the given list or string. In some libraries
 * this function is named `first`.
 *
 * @param {import('./types').MaybeWatchSource<Array|String>} list 
 * @return {import('vue').ComputedRef<*>} 
*/
const useHead = (list) => computed(() => head(typeof list === 'function' ? list() : unref(list)))

export default useHead
