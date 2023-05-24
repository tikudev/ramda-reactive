import { computed, unref } from 'vue'
import { append, curryN } from 'ramda'

/**
 * Returns a new list containing the contents of the given list, followed by
 * the given element.
 *
 * @param {import('./types').MaybeRef<*>} el The element to add to the end of the new list.
 * @param {import('./types').MaybeWatchSource<Array>} list The list of elements to add a new item to. list.
 * @return {import('vue').ComputedRef<Array>} A new list containing the elements of the old list followed by `el`.
*/
const useAppend = curryN(2,(el, list) => computed(() => append(typeof el === 'function' ? (...fnArgs) => unref(unref(el)(...fnArgs)) : unref(el), typeof list === 'function' ? list() : unref(list))))

export default useAppend
