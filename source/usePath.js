import { computed, unref } from 'vue'
import { path, curryN } from 'ramda'

/**
 * Retrieves the value at a given path. The nodes of the path can be arbitrary strings or non-negative integers.
 * For anything else, the value is unspecified. Integer paths are meant to index arrays, strings are meant for objects.
 *
 * @param {import('./types').MaybeWatchSource<Array>} path The path to use.
 * @param {import('./types').MaybeWatchSource<Object>} obj The object or array to retrieve the nested property from.
 * @return {import('vue').ComputedRef<*>} The data at `path`.
*/
const usePath = curryN(2,(_path, obj) => computed(() => path(typeof _path === 'function' ? _path() : unref(_path), typeof obj === 'function' ? obj() : unref(obj))))

export default usePath
