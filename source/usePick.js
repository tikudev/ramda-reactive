import { computed, unref } from 'vue'
import { pick, curryN } from 'ramda'

/**
 * Returns a partial copy of an object containing only the keys specified. If
 * the key does not exist, the property is ignored.
 *
 * @param {import('./types').MaybeWatchSource<Array>} names an array of String property names to copy onto a new object
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to copy from
 * @return {import('vue').ComputedRef<Object>} A new object with only properties from `names` on it.
*/
const usePick = curryN(2,(names, obj) => computed(() => pick(typeof names === 'function' ? names() : unref(names), typeof obj === 'function' ? obj() : unref(obj))))

export default usePick
