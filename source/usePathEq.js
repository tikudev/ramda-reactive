import { computed, unref } from 'vue'
import { pathEq, curryN } from 'ramda'

/**
 * Determines whether a nested path on an object has a specific value, in
 * [`R.equals`](#equals) terms. Most likely used to filter a list.
 *
 * @param {import('./types').MaybeRef<*>} val The value to compare the nested property with
 * @param {import('./types').MaybeWatchSource<Array>} path The path of the nested property to use
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to check the nested property in
 * @return {import('vue').ComputedRef<Boolean>} `true` if the value equals the nested object property, `false` otherwise.
*/
const usePathEq = curryN(3,(val, _path, obj) => computed(() => pathEq(typeof val === 'function' ? (...fnArgs) => unref(unref(val)(...fnArgs)) : unref(val), typeof _path === 'function' ? _path() : unref(_path), typeof obj === 'function' ? obj() : unref(obj))))

export default usePathEq
