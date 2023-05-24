import { computed, unref } from 'vue'
import { fromPairs } from 'ramda'

/**
 * Creates a new object from a list key-value pairs. If a key appears in
 * multiple pairs, the rightmost pair is included in the object.
 *
 * @param {import('./types').MaybeWatchSource<Array>} pairs An array of two-element arrays that will be the keys and values of the output object.
 * @return {import('vue').ComputedRef<Object>} The object made by pairing up `keys` and `values`.
*/
const useFromPairs = (pairs) => computed(() => fromPairs(typeof pairs === 'function' ? pairs() : unref(pairs)))

export default useFromPairs
