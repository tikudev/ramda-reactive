import { computed, unref } from 'vue'
import { adjust, curryN } from 'ramda'

/**
 * Applies a function to the value at the given index of an array, returning a
 * new copy of the array with the element at the given index replaced with the
 * result of the function application.
 *
 * @param {import('./types').MaybeWatchSource<Number>} idx The index.
 * @param {import('./types').MaybeRef<Function>} fn The function to apply.
 * @param {import('./types').MaybeWatchSource<Array|Arguments>} list An array-like object whose value at the supplied index will be replaced.
 * @return {import('vue').ComputedRef<Array>} A copy of the supplied array-like object with the element at index `idx` replaced with the value returned by applying `fn` to the existing element.
*/
const useAdjust = curryN(3,(idx, fn, list) => computed(() => adjust(typeof idx === 'function' ? idx() : unref(idx), typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof list === 'function' ? list() : unref(list))))

export default useAdjust
