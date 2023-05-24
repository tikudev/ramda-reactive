import { computed, unref } from 'vue'
import { mergeRight, curryN } from 'ramda'

/**
 * Create a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects,
 * the value from the second object will be used.
 *
 * @param {import('./types').MaybeWatchSource<Object>} l 
 * @param {import('./types').MaybeWatchSource<Object>} r 
 * @return {import('vue').ComputedRef<Object>} 
*/
const useMergeRight = curryN(2,(l, r) => computed(() => mergeRight(typeof l === 'function' ? l() : unref(l), typeof r === 'function' ? r() : unref(r))))

export default useMergeRight
