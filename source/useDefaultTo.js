import { computed, unref } from 'vue'
import { defaultTo, curryN } from 'ramda'

/**
 * Returns the second argument if it is not `null`, `undefined` or `NaN`;
 * otherwise the first argument is returned.
 *
 * @param {import('./types').MaybeWatchSource<a>} default The default value.
 * @param {import('./types').MaybeWatchSource<b>} val `val` will be returned instead of `default` unless `val` is `null`, `undefined` or `NaN`.
 * @return {import('vue').ComputedRef<*>} The second value if it is not `null`, `undefined` or `NaN`, otherwise the default value
*/
const useDefaultTo = curryN(2,(_default, val) => computed(() => defaultTo(typeof _default === 'function' ? _default() : unref(_default), typeof val === 'function' ? val() : unref(val))))

export default useDefaultTo
