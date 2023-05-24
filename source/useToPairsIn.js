import { computed, unref } from 'vue'
import { toPairsIn } from 'ramda'

/**
 * Converts an object into an array of key, value arrays. The object's own
 * properties and prototype properties are used. Note that the order of the
 * output array is not guaranteed to be consistent across different JS
 * platforms.
 *
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to extract from
 * @return {import('vue').ComputedRef<Array>} An array of key, value arrays from the object's own and prototype properties.
*/
const useToPairsIn = (obj) => computed(() => toPairsIn(typeof obj === 'function' ? obj() : unref(obj)))

export default useToPairsIn
