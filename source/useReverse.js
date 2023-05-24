import { computed, unref } from 'vue'
import { reverse } from 'ramda'

/**
 * Returns a new list or string with the elements or characters in reverse
 * order.
 *
 * @param {import('./types').MaybeWatchSource<Array|String>} list 
 * @return {import('vue').ComputedRef<Array|String>} 
*/
const useReverse = (list) => computed(() => reverse(typeof list === 'function' ? list() : unref(list)))

export default useReverse
