import { computed, unref } from 'vue'
import { prop, curryN } from 'ramda'

/**
 * Returns a function that when supplied an object returns the indicated
 * property of that object, if it exists.
 *
 * @param {import('./types').MaybeWatchSource<String|Number>} p The property name or array index
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to query
 * @return {import('vue').ComputedRef<*>} The value at `obj.p`.
*/
const useProp = curryN(2,(p, obj) => computed(() => prop(typeof p === 'function' ? p() : unref(p), typeof obj === 'function' ? obj() : unref(obj))))

export default useProp
