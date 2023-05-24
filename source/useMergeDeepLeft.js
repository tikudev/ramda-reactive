import { computed, unref } from 'vue'
import { mergeDeepLeft, curryN } from 'ramda'

/**
 * Creates a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects:
 * - and both values are objects, the two values will be recursively merged
 * - otherwise the value from the first object will be used.
 *
 * @param {import('./types').MaybeWatchSource<Object>} lObj 
 * @param {import('./types').MaybeWatchSource<Object>} rObj 
 * @return {import('vue').ComputedRef<Object>} 
*/
const useMergeDeepLeft = curryN(2,(lObj, rObj) => computed(() => mergeDeepLeft(typeof lObj === 'function' ? lObj() : unref(lObj), typeof rObj === 'function' ? rObj() : unref(rObj))))

export default useMergeDeepLeft
