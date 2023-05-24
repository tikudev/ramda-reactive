import { computed, unref } from 'vue'
import { hasPath, curryN } from 'ramda'

/**
 * Returns whether or not a path exists in an object. Only the object's
 * own properties are checked.
 *
 * @param {import('./types').MaybeWatchSource<Array>} path The path to use.
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to check the path in.
 * @return {import('vue').ComputedRef<Boolean>} Whether the path exists.
*/
const useHasPath = curryN(2,(_path, obj) => computed(() => hasPath(typeof _path === 'function' ? _path() : unref(_path), typeof obj === 'function' ? obj() : unref(obj))))

export default useHasPath
