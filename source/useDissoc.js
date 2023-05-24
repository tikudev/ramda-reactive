import { computed, unref } from 'vue'
import { dissoc, curryN } from 'ramda'

/**
 * Returns a new object that does not contain a `prop` property.
 *
 * @param {import('./types').MaybeWatchSource<String>} prop The name of the property to dissociate
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to clone
 * @return {import('vue').ComputedRef<Object>} A new object equivalent to the original but without the specified property
*/
const useDissoc = curryN(2,(_prop, obj) => computed(() => dissoc(typeof _prop === 'function' ? _prop() : unref(_prop), typeof obj === 'function' ? obj() : unref(obj))))

export default useDissoc
