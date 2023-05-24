import { computed, unref } from 'vue'
import { values } from 'ramda'

/**
 * Returns a list of all the enumerable own properties of the supplied object.
 * Note that the order of the output array is not guaranteed across different
 * JS platforms.
 *
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to extract values from
 * @return {import('vue').ComputedRef<Array>} An array of the values of the object's own properties.
*/
const useValues = (obj) => computed(() => values(typeof obj === 'function' ? obj() : unref(obj)))

export default useValues
