import { computed, unref } from 'vue'
import { zipObj, curryN } from 'ramda'

/**
 * Creates a new object out of a list of keys and a list of values.
 * Key/value pairing is truncated to the length of the shorter of the two lists.
 * Note: `zipObj` is equivalent to `pipe(zip, fromPairs)`.
 *
 * @param {import('./types').MaybeWatchSource<Array>} keys The array that will be properties on the output object.
 * @param {import('./types').MaybeWatchSource<Array>} values The list of values on the output object.
 * @return {import('vue').ComputedRef<Object>} The object made by pairing up same-indexed elements of `keys` and `values`.
*/
const useZipObj = curryN(2,(_keys, _values) => computed(() => zipObj(typeof _keys === 'function' ? _keys() : unref(_keys), typeof _values === 'function' ? _values() : unref(_values))))

export default useZipObj
