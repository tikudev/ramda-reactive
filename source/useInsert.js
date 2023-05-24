import { computed, unref } from 'vue'
import { insert, curryN } from 'ramda'

/**
 * Inserts the supplied element into the list, at the specified `index`. _Note that
 * this is not destructive_: it returns a copy of the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @param {import('./types').MaybeWatchSource<Number>} index The position to insert the element
 * @param {import('./types').MaybeRef<*>} elt The element to insert into the Array
 * @param {import('./types').MaybeWatchSource<Array>} list The list to insert into
 * @return {import('vue').ComputedRef<Array>} A new Array with `elt` inserted at `index`.
*/
const useInsert = curryN(3,(index, elt, list) => computed(() => insert(typeof index === 'function' ? index() : unref(index), typeof elt === 'function' ? (...fnArgs) => unref(unref(elt)(...fnArgs)) : unref(elt), typeof list === 'function' ? list() : unref(list))))

export default useInsert
