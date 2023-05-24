import { computed, unref } from 'vue'
import { insertAll, curryN } from 'ramda'

/**
 * Inserts the sub-list into the list, at the specified `index`. _Note that this is not
 * destructive_: it returns a copy of the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @param {import('./types').MaybeWatchSource<Number>} index The position to insert the sub-list
 * @param {import('./types').MaybeWatchSource<Array>} elts The sub-list to insert into the Array
 * @param {import('./types').MaybeWatchSource<Array>} list The list to insert the sub-list into
 * @return {import('vue').ComputedRef<Array>} A new Array with `elts` inserted starting at `index`.
*/
const useInsertAll = curryN(3,(index, elts, list) => computed(() => insertAll(typeof index === 'function' ? index() : unref(index), typeof elts === 'function' ? elts() : unref(elts), typeof list === 'function' ? list() : unref(list))))

export default useInsertAll
