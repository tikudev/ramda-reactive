import { computed, unref } from 'vue'
import { dropLast, curryN } from 'ramda'

/**
 * Returns a list containing all but the last `n` elements of the given `list`.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param {import('./types').MaybeWatchSource<Number>} n The number of elements of `list` to skip.
 * @param {import('./types').MaybeWatchSource<Array>} list The list of elements to consider.
 * @return {import('vue').ComputedRef<Array>} A copy of the list with only the first `list.length - n` elements
*/
const useDropLast = curryN(2,(n, list) => computed(() => dropLast(typeof n === 'function' ? n() : unref(n), typeof list === 'function' ? list() : unref(list))))

export default useDropLast
