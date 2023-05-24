import { computed, unref } from 'vue'
import { keysIn } from 'ramda'

/**
 * Returns a list containing the names of all the properties of the supplied
 * object, including prototype properties.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to extract properties from
 * @return {import('vue').ComputedRef<Array>} An array of the object's own and prototype properties.
*/
const useKeysIn = (obj) => computed(() => keysIn(typeof obj === 'function' ? obj() : unref(obj)))

export default useKeysIn
