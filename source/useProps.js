import { computed, unref } from 'vue'
import { props, curryN } from 'ramda'

/**
 * Acts as multiple `prop`: array of keys in, array of values out. Preserves
 * order.
 *
 * @param {import('./types').MaybeWatchSource<Array>} ps The property names to fetch
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to query
 * @return {import('vue').ComputedRef<Array>} The corresponding values or partially applied function.
*/
const useProps = curryN(2,(ps, obj) => computed(() => props(typeof ps === 'function' ? ps() : unref(ps), typeof obj === 'function' ? obj() : unref(obj))))

export default useProps
