import { computed, unref } from 'vue'
import { paths, curryN } from 'ramda'

/**
 * Retrieves the values at given paths of an object.
 *
 * @param {import('./types').MaybeWatchSource<Array>} pathsArray The array of paths to be fetched.
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to retrieve the nested properties from.
 * @return {import('vue').ComputedRef<Array>} A list consisting of values at paths specified by "pathsArray".
*/
const usePaths = curryN(2,(pathsArray, obj) => computed(() => paths(typeof pathsArray === 'function' ? pathsArray() : unref(pathsArray), typeof obj === 'function' ? obj() : unref(obj))))

export default usePaths
