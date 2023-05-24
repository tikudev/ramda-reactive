import { computed, unref } from 'vue'
import { xprod, curryN } from 'ramda'

/**
 * Creates a new list out of the two supplied by creating each possible pair
 * from the lists.
 *
 * @param {import('./types').MaybeWatchSource<Array>} as The first list.
 * @param {import('./types').MaybeWatchSource<Array>} bs The second list.
 * @return {import('vue').ComputedRef<Array>} The list made by combining each possible pair from `as` and `bs` into pairs (`[a, b]`).
*/
const useXprod = curryN(2,(as, bs) => computed(() => xprod(typeof as === 'function' ? as() : unref(as), typeof bs === 'function' ? bs() : unref(bs))))

export default useXprod
