import { computed, unref } from 'vue'
import { dissocPath, curryN } from 'ramda'

/**
 * Makes a shallow clone of an object, omitting the property at the given path.
 * Note that this copies and flattens prototype properties onto the new object
 * as well. All non-primitive properties are copied by reference.
 *
 * @param {import('./types').MaybeWatchSource<Array>} path The path to the value to omit
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to clone
 * @return {import('vue').ComputedRef<Object>} A new object without the property at path
*/
const useDissocPath = curryN(2,(_path, obj) => computed(() => dissocPath(typeof _path === 'function' ? _path() : unref(_path), typeof obj === 'function' ? obj() : unref(obj))))

export default useDissocPath
