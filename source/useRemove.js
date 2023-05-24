import { computed, unref } from 'vue'
import { remove, curryN } from 'ramda'

/**
 * Removes the sub-list of `list` starting at index `start` and containing
 * `count` elements. _Note that this is not destructive_: it returns a copy of
 * the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @param {import('./types').MaybeWatchSource<Number>} start The position to start removing elements
 * @param {import('./types').MaybeWatchSource<Number>} count The number of elements to remove
 * @param {import('./types').MaybeWatchSource<Array>} list The list to remove from
 * @return {import('vue').ComputedRef<Array>} A new Array with `count` elements from `start` removed.
*/
const useRemove = curryN(3,(start, _count, list) => computed(() => remove(typeof start === 'function' ? start() : unref(start), typeof _count === 'function' ? _count() : unref(_count), typeof list === 'function' ? list() : unref(list))))

export default useRemove
