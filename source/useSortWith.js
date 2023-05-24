import { computed, unref } from 'vue'
import { sortWith, curryN } from 'ramda'

/**
 * Sorts a list according to a list of comparators.
 *
 * @param {import('./types').MaybeWatchSource<Array>} functions A list of comparator functions.
 * @param {import('./types').MaybeWatchSource<Array>} list The list to sort.
 * @return {import('vue').ComputedRef<Array>} A new list sorted according to the comarator functions.
*/
const useSortWith = curryN(2,(functions, list) => computed(() => sortWith(typeof functions === 'function' ? functions() : unref(functions), typeof list === 'function' ? list() : unref(list))))

export default useSortWith
