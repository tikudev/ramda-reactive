import { computed, unref } from 'vue'
import { propOr, curryN } from 'ramda'

/**
 * Return the specified property of the given non-null object if the property
 * is present and it's value is not `null`, `undefined` or `NaN`.
 * 
 * Otherwise the first argument is returned.
 *
 * @param {import('./types').MaybeRef<*>} val The default value.
 * @param {import('./types').MaybeWatchSource<String>} p The name of the property to return.
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to query.
 * @return {import('vue').ComputedRef<*>} The value of given property of the supplied object or the default value.
*/
const usePropOr = curryN(3,(val, p, obj) => computed(() => propOr(typeof val === 'function' ? (...fnArgs) => unref(unref(val)(...fnArgs)) : unref(val), typeof p === 'function' ? p() : unref(p), typeof obj === 'function' ? obj() : unref(obj))))

export default usePropOr
