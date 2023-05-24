import { computed, unref } from 'vue'
import { range, curryN } from 'ramda'

/**
 * Returns a list of numbers from `from` (inclusive) to `to` (exclusive).
 *
 * @param {import('./types').MaybeWatchSource<Number>} from The first number in the list.
 * @param {import('./types').MaybeWatchSource<Number>} to One more than the last number in the list.
 * @return {import('vue').ComputedRef<Array>} The list of numbers in the set `[a, b)`.
*/
const useRange = curryN(2,(from, to) => computed(() => range(typeof from === 'function' ? from() : unref(from), typeof to === 'function' ? to() : unref(to))))

export default useRange
