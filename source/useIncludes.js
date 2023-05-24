import { computed, unref } from 'vue'
import { includes, curryN } from 'ramda'

/**
 * Returns `true` if the specified value is equal, in [`R.equals`](#equals)
 * terms, to at least one element of the given list; `false` otherwise.
 * Also works with strings.
 *
 * @param {import('./types').MaybeWatchSource<Object>} a The item to compare against.
 * @param {import('./types').MaybeWatchSource<Array>} list The array to consider.
 * @return {import('vue').ComputedRef<Boolean>} `true` if an equivalent item is in the list, `false` otherwise.
*/
const useIncludes = curryN(2,(a, list) => computed(() => includes(typeof a === 'function' ? a() : unref(a), typeof list === 'function' ? list() : unref(list))))

export default useIncludes
