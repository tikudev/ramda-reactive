import { computed, unref } from 'vue'
import { invertObj } from 'ramda'

/**
 * Returns a new object with the keys of the given object as values, and the
 * values of the given object, which are coerced to strings, as keys. Note
 * that the last key found is preferred when handling the same value.
 *
 * @param {import('./types').MaybeWatchSource<Object>} obj The object or array to invert
 * @return {import('vue').ComputedRef<Object>} out A new object
*/
const useInvertObj = (obj) => computed(() => invertObj(typeof obj === 'function' ? obj() : unref(obj)))

export default useInvertObj
