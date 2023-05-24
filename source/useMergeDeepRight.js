import { computed, unref } from 'vue'
import { mergeDeepRight, curryN } from 'ramda'

/**
 * Creates a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects:
 * - and both values are objects, the two values will be recursively merged
 * - otherwise the value from the second object will be used.
 *
 * @param {import('./types').MaybeWatchSource<Object>} lObj 
 * @param {import('./types').MaybeWatchSource<Object>} rObj 
 * @return {import('vue').ComputedRef<Object>} 
*/
const useMergeDeepRight = curryN(2,(lObj, rObj) => computed(() => mergeDeepRight(typeof lObj === 'function' ? lObj() : unref(lObj), typeof rObj === 'function' ? rObj() : unref(rObj))))

export default useMergeDeepRight
