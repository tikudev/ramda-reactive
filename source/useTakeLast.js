import { computed, unref } from 'vue'
import { takeLast, curryN } from 'ramda'

/**
 * Returns a new list containing the last `n` elements of the given list.
 * If `n > list.length`, returns a list of `list.length` elements.
 *
 * @param {import('./types').MaybeWatchSource<Number>} n The number of elements to return.
 * @param {import('./types').MaybeWatchSource<Array>} xs The collection to consider.
 * @return {import('vue').ComputedRef<Array>} 
*/
const useTakeLast = curryN(2,(n, xs) => computed(() => takeLast(typeof n === 'function' ? n() : unref(n), typeof xs === 'function' ? xs() : unref(xs))))

export default useTakeLast
