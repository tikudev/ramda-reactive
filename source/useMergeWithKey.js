import { computed, unref } from 'vue'
import { mergeWithKey, curryN } from 'ramda'

/**
 * Creates a new object with the own properties of the two provided objects. If
 * a key exists in both objects, the provided function is applied to the key
 * and the values associated with the key in each object, with the result being
 * used as the value associated with the key in the returned object.
 *
 * @param {import('./types').MaybeRef<Function>} fn 
 * @param {import('./types').MaybeWatchSource<Object>} l 
 * @param {import('./types').MaybeWatchSource<Object>} r 
 * @return {import('vue').ComputedRef<Object>} 
*/
const useMergeWithKey = curryN(3,(fn, l, r) => computed(() => mergeWithKey(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof l === 'function' ? l() : unref(l), typeof r === 'function' ? r() : unref(r))))

export default useMergeWithKey
