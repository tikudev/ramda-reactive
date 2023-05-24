import { computed, unref } from 'vue'
import { pickAll, curryN } from 'ramda'

/**
 * Similar to `pick` except that this one includes a `key: undefined` pair for
 * properties that don't exist.
 *
 * @param {import('./types').MaybeWatchSource<Array>} names an array of String property names to copy onto a new object
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to copy from
 * @return {import('vue').ComputedRef<Object>} A new object with only properties from `names` on it.
*/
const usePickAll = curryN(2,(names, obj) => computed(() => pickAll(typeof names === 'function' ? names() : unref(names), typeof obj === 'function' ? obj() : unref(obj))))

export default usePickAll
