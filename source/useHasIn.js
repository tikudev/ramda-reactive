import { computed, unref } from 'vue'
import { hasIn, curryN } from 'ramda'

/**
 * Returns whether or not an object or its prototype chain has a property with
 * the specified name
 *
 * @param {import('./types').MaybeWatchSource<String>} prop The name of the property to check for.
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to query.
 * @return {import('vue').ComputedRef<Boolean>} Whether the property exists.
*/
const useHasIn = curryN(2,(_prop, obj) => computed(() => hasIn(typeof _prop === 'function' ? _prop() : unref(_prop), typeof obj === 'function' ? obj() : unref(obj))))

export default useHasIn
