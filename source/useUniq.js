import { computed, unref } from 'vue'
import { uniq } from 'ramda'

/**
 * Returns a new list containing only one copy of each element in the original
 * list. [`R.equals`](#equals) is used to determine equality.
 *
 * @param {import('./types').MaybeWatchSource<Array>} list The array to consider.
 * @return {import('vue').ComputedRef<Array>} The list of unique items.
*/
const useUniq = (list) => computed(() => uniq(typeof list === 'function' ? list() : unref(list)))

export default useUniq
