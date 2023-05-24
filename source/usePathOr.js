import { computed, unref } from 'vue'
import { pathOr, curryN } from 'ramda'

/**
 * If the given, non-null object has a value at the given path, returns the
 * value at that path. Otherwise returns the provided default value.
 *
 * @param {import('./types').MaybeRef<*>} d The default value.
 * @param {import('./types').MaybeWatchSource<Array>} p The path to use.
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to retrieve the nested property from.
 * @return {import('vue').ComputedRef<*>} The data at `path` of the supplied object or the default value.
*/
const usePathOr = curryN(3,(d, p, obj) => computed(() => pathOr(typeof d === 'function' ? (...fnArgs) => unref(unref(d)(...fnArgs)) : unref(d), typeof p === 'function' ? p() : unref(p), typeof obj === 'function' ? obj() : unref(obj))))

export default usePathOr
