import { computed, unref } from 'vue'
import { groupWith, curryN } from 'ramda'

/**
 * Takes a list and returns a list of lists where each sublist's elements are
 * all satisfied pairwise comparison according to the provided function.
 * Only adjacent elements are passed to the comparison function.
 *
 * @param {import('./types').MaybeRef<Function>} fn Function for determining whether two given (adjacent) elements should be in the same group
 * @param {import('./types').MaybeWatchSource<Array>} list The array to group. Also accepts a string, which will be treated as a list of characters.
 * @return {import('vue').ComputedRef<List>} A list that contains sublists of elements, whose concatenations are equal to the original list.
*/
const useGroupWith = curryN(2,(fn, list) => computed(() => groupWith(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof list === 'function' ? list() : unref(list))))

export default useGroupWith
