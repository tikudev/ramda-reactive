import { computed, unref } from 'vue'
import { findLast, curryN } from 'ramda'

/**
 * Returns the last element of the list which matches the predicate, or
 * `undefined` if no element matches.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param {import('./types').MaybeRef<Function>} fn The predicate function used to determine if the element is the desired one.
 * @param {import('./types').MaybeWatchSource<Array>} list The array to consider.
 * @return {import('vue').ComputedRef<Object>} The element found, or `undefined`.
*/
const useFindLast = curryN(2,(fn, list) => computed(() => findLast(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof list === 'function' ? list() : unref(list))))

export default useFindLast
