import { computed, unref } from 'vue'
import { splitEvery, curryN } from 'ramda'

/**
 * Splits a collection into slices of the specified length.
 *
 * @param {import('./types').MaybeWatchSource<Number>} n 
 * @param {import('./types').MaybeWatchSource<Array>} list 
 * @return {import('vue').ComputedRef<Array>} 
*/
const useSplitEvery = curryN(2,(n, list) => computed(() => splitEvery(typeof n === 'function' ? n() : unref(n), typeof list === 'function' ? list() : unref(list))))

export default useSplitEvery
