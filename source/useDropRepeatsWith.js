import { computed, unref } from 'vue'
import { dropRepeatsWith, curryN } from 'ramda'

/**
 * Returns a new list without any consecutively repeating elements. Equality is
 * determined by applying the supplied predicate to each pair of consecutive elements. The
 * first element in a series of equal elements will be preserved.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param {import('./types').MaybeRef<Function>} pred A predicate used to test whether two items are equal.
 * @param {import('./types').MaybeWatchSource<Array>} list The array to consider.
 * @return {import('vue').ComputedRef<Array>} `list` without repeating elements.
*/
const useDropRepeatsWith = curryN(2,(pred, list) => computed(() => dropRepeatsWith(typeof pred === 'function' ? (...fnArgs) => unref(unref(pred)(...fnArgs)) : unref(pred), typeof list === 'function' ? list() : unref(list))))

export default useDropRepeatsWith
