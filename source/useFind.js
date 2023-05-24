import { computed, unref } from 'vue'
import { find, curryN } from 'ramda'

/**
 * Returns the first element of the list which matches the predicate, or
 * `undefined` if no element matches.
 * 
 * Dispatches to the `find` method of the second argument, if present.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param {import('./types').MaybeRef<Function>} fn The predicate function used to determine if the element is the desired one.
 * @param {import('./types').MaybeWatchSource<Array>} list The array to consider.
 * @return {import('vue').ComputedRef<Object>} The element found, or `undefined`.
*/
const useFind = curryN(2,(fn, list) => computed(() => find(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof list === 'function' ? list() : unref(list))))

export default useFind
