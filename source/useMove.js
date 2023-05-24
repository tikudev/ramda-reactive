import { computed, unref } from 'vue'
import { move, curryN } from 'ramda'

/**
 * Move an item, at index `from`, to index `to`, in a list of elements.
 * A new list will be created containing the new elements order.
 *
 * @param {import('./types').MaybeWatchSource<Number>} from The source index
 * @param {import('./types').MaybeWatchSource<Number>} to The destination index
 * @param {import('./types').MaybeWatchSource<Array>} list The list which will serve to realise the move
 * @return {import('vue').ComputedRef<Array>} The new list reordered
*/
const useMove = curryN(3,(from, to, list) => computed(() => move(typeof from === 'function' ? from() : unref(from), typeof to === 'function' ? to() : unref(to), typeof list === 'function' ? list() : unref(list))))

export default useMove
