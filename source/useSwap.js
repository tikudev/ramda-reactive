import { computed, unref } from 'vue'
import { swap, curryN } from 'ramda'

/**
 * Swap an item, at index `indexA` with another item, at index `indexB`, in an object or a list of elements.
 * A new result will be created containing the new elements order.
 *
 * @param {import('./types').MaybeWatchSource<Number|string|Object>} indexA The first index
 * @param {import('./types').MaybeWatchSource<Number|string|Object>} indexB The second index
 * @param {import('./types').MaybeWatchSource<Array|Object>} o Either the object or list which will serve to realise the swap
 * @return {import('vue').ComputedRef<Array|Object>} The new object or list reordered
*/
const useSwap = curryN(3,(indexA, indexB, _o) => computed(() => swap(typeof indexA === 'function' ? indexA() : unref(indexA), typeof indexB === 'function' ? indexB() : unref(indexB), typeof _o === 'function' ? _o() : unref(_o))))

export default useSwap
