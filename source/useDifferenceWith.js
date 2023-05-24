import { computed, unref } from 'vue'
import { differenceWith, curryN } from 'ramda'

/**
 * Finds the set (i.e. no duplicates) of all elements in the first list not
 * contained in the second list. Duplication is determined according to the
 * value returned by applying the supplied predicate to two list elements.
 *
 * @param {import('./types').MaybeRef<Function>} pred A predicate used to test whether two items are equal.
 * @param {import('./types').MaybeWatchSource<Array>} list1 The first list.
 * @param {import('./types').MaybeWatchSource<Array>} list2 The second list.
 * @return {import('vue').ComputedRef<Array>} The elements in `list1` that are not in `list2`.
*/
const useDifferenceWith = curryN(3,(pred, list1, list2) => computed(() => differenceWith(typeof pred === 'function' ? (...fnArgs) => unref(unref(pred)(...fnArgs)) : unref(pred), typeof list1 === 'function' ? list1() : unref(list1), typeof list2 === 'function' ? list2() : unref(list2))))

export default useDifferenceWith
