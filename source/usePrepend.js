import { computed, unref } from 'vue'
import { prepend, curryN } from 'ramda'

/**
 * Returns a new list with the given element at the front, followed by the
 * contents of the list.
 *
 * @param {import('./types').MaybeRef<*>} el The item to add to the head of the output list.
 * @param {import('./types').MaybeWatchSource<Array>} list The array to add to the tail of the output list.
 * @return {import('vue').ComputedRef<Array>} A new array.
*/
const usePrepend = curryN(2,(el, list) => computed(() => prepend(typeof el === 'function' ? (...fnArgs) => unref(unref(el)(...fnArgs)) : unref(el), typeof list === 'function' ? list() : unref(list))))

export default usePrepend
