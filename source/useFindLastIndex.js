import { computed, unref } from 'vue'
import { findLastIndex, curryN } from 'ramda'

/**
 * Returns the index of the last element of the list which matches the
 * predicate, or `-1` if no element matches.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param {import('./types').MaybeRef<Function>} fn The predicate function used to determine if the element is the desired one.
 * @param {import('./types').MaybeWatchSource<Array>} list The array to consider.
 * @return {import('vue').ComputedRef<Number>} The index of the element found, or `-1`.
*/
const useFindLastIndex = curryN(2,(fn, list) => computed(() => findLastIndex(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof list === 'function' ? list() : unref(list))))

export default useFindLastIndex
