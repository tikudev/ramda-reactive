import { computed, unref } from 'vue'
import { invert } from 'ramda'

/**
 * Same as [`R.invertObj`](#invertObj), however this accounts for objects with
 * duplicate values by putting the values into an array.
 *
 * @param {import('./types').MaybeWatchSource<Object>} obj The object or array to invert
 * @return {import('vue').ComputedRef<Object>} out A new object with keys in an array.
*/
const useInvert = (obj) => computed(() => invert(typeof obj === 'function' ? obj() : unref(obj)))

export default useInvert
