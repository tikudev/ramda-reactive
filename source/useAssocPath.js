import { computed, unref } from 'vue'
import { assocPath, curryN } from 'ramda'

/**
 * Makes a shallow clone of an object, setting or overriding the nodes required
 * to create the given path, and placing the specific value at the tail end of
 * that path. Note that this copies and flattens prototype properties onto the
 * new object as well. All non-primitive properties are copied by reference.
 *
 * @param {import('./types').MaybeWatchSource<Array>} path the path to set
 * @param {import('./types').MaybeRef<*>} val The new value
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to clone
 * @return {import('vue').ComputedRef<Object>} A new object equivalent to the original except along the specified path.
*/
const useAssocPath = curryN(3,(_path, val, obj) => computed(() => assocPath(typeof _path === 'function' ? _path() : unref(_path), typeof val === 'function' ? (...fnArgs) => unref(unref(val)(...fnArgs)) : unref(val), typeof obj === 'function' ? obj() : unref(obj))))

export default useAssocPath
