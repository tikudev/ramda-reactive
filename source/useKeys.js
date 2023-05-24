import { computed, unref } from 'vue'
import { keys } from 'ramda'

/**
 * Returns a list containing the names of all the enumerable own properties of
 * the supplied object.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to extract properties from
 * @return {import('vue').ComputedRef<Array>} An array of the object's own properties.
*/
const useKeys = (obj) => computed(() => keys(typeof obj === 'function' ? obj() : unref(obj)))

export default useKeys
