import { computed, unref } from 'vue'
import { update, curryN } from 'ramda'

/**
 * Returns a new copy of the array with the element at the provided index
 * replaced with the given value.
 *
 * @param {import('./types').MaybeWatchSource<Number>} idx The index to update.
 * @param {import('./types').MaybeRef<*>} x The value to exist at the given index of the returned array.
 * @param {import('./types').MaybeWatchSource<Array|Arguments>} list The source array-like object to be updated.
 * @return {import('vue').ComputedRef<Array>} A copy of `list` with the value at index `idx` replaced with `x`.
*/
const useUpdate = curryN(3,(idx, x, list) => computed(() => update(typeof idx === 'function' ? idx() : unref(idx), typeof x === 'function' ? (...fnArgs) => unref(unref(x)(...fnArgs)) : unref(x), typeof list === 'function' ? list() : unref(list))))

export default useUpdate
