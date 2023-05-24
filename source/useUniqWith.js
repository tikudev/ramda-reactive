import { computed, unref } from 'vue'
import { uniqWith, curryN } from 'ramda'

/**
 * Returns a new list containing only one copy of each element in the original
 * list, based upon the value returned by applying the supplied predicate to
 * two list elements. Prefers the first item if two items compare equal based
 * on the predicate.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param {import('./types').MaybeRef<Function>} pred A predicate used to test whether two items are equal.
 * @param {import('./types').MaybeWatchSource<Array>} list The array to consider.
 * @return {import('vue').ComputedRef<Array>} The list of unique items.
*/
const useUniqWith = curryN(2,(pred, list) => computed(() => uniqWith(typeof pred === 'function' ? (...fnArgs) => unref(unref(pred)(...fnArgs)) : unref(pred), typeof list === 'function' ? list() : unref(list))))

export default useUniqWith
