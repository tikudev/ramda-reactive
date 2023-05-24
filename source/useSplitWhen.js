import { computed, unref } from 'vue'
import { splitWhen, curryN } from 'ramda'

/**
 * Takes a list and a predicate and returns a pair of lists with the following properties:
 * 
 * - the result of concatenating the two output lists is equivalent to the input list;
 * - none of the elements of the first output list satisfies the predicate; and
 * - if the second output list is non-empty, its first element satisfies the predicate.
 *
 * @param {import('./types').MaybeRef<Function>} pred The predicate that determines where the array is split.
 * @param {import('./types').MaybeWatchSource<Array>} list The array to be split.
 * @return {import('vue').ComputedRef<Array>} 
*/
const useSplitWhen = curryN(2,(pred, list) => computed(() => splitWhen(typeof pred === 'function' ? (...fnArgs) => unref(unref(pred)(...fnArgs)) : unref(pred), typeof list === 'function' ? list() : unref(list))))

export default useSplitWhen
