import { computed, unref } from 'vue'
import { slice, curryN } from 'ramda'

/**
 * Returns the elements of the given list or string (or object with a `slice`
 * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
 * 
 * Dispatches to the `slice` method of the third argument, if present.
 *
 * @param {import('./types').MaybeWatchSource<Number>} fromIndex The start index (inclusive).
 * @param {import('./types').MaybeWatchSource<Number>} toIndex The end index (exclusive).
 * @param {import('./types').MaybeRef<*>} list 
 * @return {import('vue').ComputedRef<*>} 
*/
const useSlice = curryN(3,(fromIndex, toIndex, list) => computed(() => slice(typeof fromIndex === 'function' ? fromIndex() : unref(fromIndex), typeof toIndex === 'function' ? toIndex() : unref(toIndex), typeof list === 'function' ? (...fnArgs) => unref(unref(list)(...fnArgs)) : unref(list))))

export default useSlice
