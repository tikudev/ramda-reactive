import { computed, unref } from 'vue'
import { toPairs } from 'ramda'

/**
 * Converts an object into an array of key, value arrays. Only the object's
 * own properties are used.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to extract from
 * @return {import('vue').ComputedRef<Array>} An array of key, value arrays from the object's own properties.
*/
const useToPairs = (obj) => computed(() => toPairs(typeof obj === 'function' ? obj() : unref(obj)))

export default useToPairs
