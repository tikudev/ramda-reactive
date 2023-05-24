import { computed, unref } from 'vue'
import { has, curryN } from 'ramda'

/**
 * Returns whether or not an object has an own property with the specified name
 *
 * @param {import('./types').MaybeWatchSource<String>} prop The name of the property to check for.
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to query.
 * @return {import('vue').ComputedRef<Boolean>} Whether the property exists.
*/
const useHas = curryN(2,(_prop, obj) => computed(() => has(typeof _prop === 'function' ? _prop() : unref(_prop), typeof obj === 'function' ? obj() : unref(obj))))

export default useHas
