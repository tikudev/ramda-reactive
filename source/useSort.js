import { computed, unref } from 'vue'
import { sort, curryN } from 'ramda'

/**
 * Returns a copy of the list, sorted according to the comparator function,
 * which should accept two values at a time and return a negative number if the
 * first value is smaller, a positive number if it's larger, and zero if they
 * are equal. Please note that this is a **copy** of the list. It does not
 * modify the original.
 *
 * @param {import('./types').MaybeRef<Function>} comparator A sorting function :: a -> b -> Int
 * @param {import('./types').MaybeWatchSource<Array>} list The list to sort
 * @return {import('vue').ComputedRef<Array>} a new array with its elements sorted by the comparator function.
*/
const useSort = curryN(2,(_comparator, list) => computed(() => sort(typeof _comparator === 'function' ? (...fnArgs) => unref(unref(_comparator)(...fnArgs)) : unref(_comparator), typeof list === 'function' ? list() : unref(list))))

export default useSort
