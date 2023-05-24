import { computed, unref } from 'vue'
import { mergeDeepWithKey, curryN } from 'ramda'

/**
 * Creates a new object with the own properties of the two provided objects.
 * If a key exists in both objects:
 * - and both associated values are also objects then the values will be
 * recursively merged.
 * - otherwise the provided function is applied to the key and associated values
 * using the resulting value as the new value associated with the key.
 * If a key only exists in one object, the value will be associated with the key
 * of the resulting object.
 *
 * @param {import('./types').MaybeRef<Function>} fn 
 * @param {import('./types').MaybeWatchSource<Object>} lObj 
 * @param {import('./types').MaybeWatchSource<Object>} rObj 
 * @return {import('vue').ComputedRef<Object>} 
*/
const useMergeDeepWithKey = curryN(3,(fn, lObj, rObj) => computed(() => mergeDeepWithKey(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof lObj === 'function' ? lObj() : unref(lObj), typeof rObj === 'function' ? rObj() : unref(rObj))))

export default useMergeDeepWithKey
