import { computed, unref } from 'vue'
import { assoc, curryN } from 'ramda'

/**
 * Makes a shallow clone of an object, setting or overriding the specified
 * property with the given value. Note that this copies and flattens prototype
 * properties onto the new object as well. All non-primitive properties are
 * copied by reference.
 *
 * @param {import('./types').MaybeWatchSource<String|Number>} prop The property name to set
 * @param {import('./types').MaybeRef<*>} val The new value
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to clone
 * @return {import('vue').ComputedRef<Object>} A new object equivalent to the original except for the changed property.
*/
const useAssoc = curryN(3,(_prop, val, obj) => computed(() => assoc(typeof _prop === 'function' ? _prop() : unref(_prop), typeof val === 'function' ? (...fnArgs) => unref(unref(val)(...fnArgs)) : unref(val), typeof obj === 'function' ? obj() : unref(obj))))

export default useAssoc
