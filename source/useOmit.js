import { computed, unref } from 'vue'
import { omit, curryN } from 'ramda'

/**
 * Returns a partial copy of an object omitting the keys specified.
 *
 * @param {import('./types').MaybeWatchSource<Array>} names an array of String property names to omit from the new object
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to copy from
 * @return {import('vue').ComputedRef<Object>} A new object with properties from `names` not on it.
*/
const useOmit = curryN(2,(names, obj) => computed(() => omit(typeof names === 'function' ? names() : unref(names), typeof obj === 'function' ? obj() : unref(obj))))

export default useOmit
