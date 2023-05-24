import { computed, unref } from 'vue'
import { any, curryN } from 'ramda'

/**
 * Returns `true` if at least one of the elements of the list match the predicate,
 * `false` otherwise.
 * 
 * Dispatches to the `any` method of the second argument, if present.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param {import('./types').MaybeRef<Function>} fn The predicate function.
 * @param {import('./types').MaybeWatchSource<Array>} list The array to consider.
 * @return {import('vue').ComputedRef<Boolean>} `true` if the predicate is satisfied by at least one element, `false` otherwise.
*/
const useAny = curryN(2,(fn, list) => computed(() => any(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof list === 'function' ? list() : unref(list))))

export default useAny
