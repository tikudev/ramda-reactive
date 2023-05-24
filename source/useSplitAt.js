import { computed, unref } from 'vue'
import { splitAt, curryN } from 'ramda'

/**
 * Splits a given list or string at a given index.
 *
 * @param {import('./types').MaybeWatchSource<Number>} index The index where the array/string is split.
 * @param {import('./types').MaybeWatchSource<Array|String>} array The array/string to be split.
 * @return {import('vue').ComputedRef<Array>} 
*/
const useSplitAt = curryN(2,(index, array) => computed(() => splitAt(typeof index === 'function' ? index() : unref(index), typeof array === 'function' ? array() : unref(array))))

export default useSplitAt
