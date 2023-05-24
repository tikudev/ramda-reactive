import { computed, unref } from 'vue'
import { valuesIn } from 'ramda'

/**
 * Returns a list of all the properties, including prototype properties, of the
 * supplied object.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to extract values from
 * @return {import('vue').ComputedRef<Array>} An array of the values of the object's own and prototype properties.
*/
const useValuesIn = (obj) => computed(() => valuesIn(typeof obj === 'function' ? obj() : unref(obj)))

export default useValuesIn
