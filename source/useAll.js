import { computed, unref } from 'vue'
import { all, curryN } from 'ramda'

/**
 * Returns `true` if all elements of the list match the predicate, `false` if
 * there are any that don't.
 * 
 * Dispatches to the `all` method of the second argument, if present.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param {import('./types').MaybeRef<Function>} fn The predicate function.
 * @param {import('./types').MaybeWatchSource<Array>} list The array to consider.
 * @return {import('vue').ComputedRef<Boolean>} `true` if the predicate is satisfied by every element, `false` otherwise.
*/
const useAll = curryN(2,(fn, list) => computed(() => all(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof list === 'function' ? list() : unref(list))))

export default useAll
