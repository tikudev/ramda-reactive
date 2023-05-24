import { computed, unref } from 'vue'
import { none, curryN } from 'ramda'

/**
 * Returns `true` if no elements of the list match the predicate, `false`
 * otherwise.
 * 
 * Dispatches to the `all` method of the second argument, if present.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param {import('./types').MaybeRef<Function>} fn The predicate function.
 * @param {import('./types').MaybeWatchSource<Array>} list The array to consider.
 * @return {import('vue').ComputedRef<Boolean>} `true` if the predicate is not satisfied by every element, `false` otherwise.
*/
const useNone = curryN(2,(fn, list) => computed(() => none(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof list === 'function' ? list() : unref(list))))

export default useNone
