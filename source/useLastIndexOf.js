import { computed, unref } from 'vue'
import { lastIndexOf, curryN } from 'ramda'

/**
 * Returns the position of the last occurrence of an item in an array, or -1 if
 * the item is not included in the array. [`R.equals`](#equals) is used to
 * determine equality.
 *
 * @param {import('./types').MaybeRef<*>} target The item to find.
 * @param {import('./types').MaybeWatchSource<Array>} xs The array to search in.
 * @return {import('vue').ComputedRef<Number>} the index of the target, or -1 if the target is not found.
*/
const useLastIndexOf = curryN(2,(target, xs) => computed(() => lastIndexOf(typeof target === 'function' ? (...fnArgs) => unref(unref(target)(...fnArgs)) : unref(target), typeof xs === 'function' ? xs() : unref(xs))))

export default useLastIndexOf
