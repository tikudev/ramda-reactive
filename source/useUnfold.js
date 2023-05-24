import { computed, unref } from 'vue'
import { unfold, curryN } from 'ramda'

/**
 * Builds a list from a seed value. Accepts an iterator function, which returns
 * either false to stop iteration or an array of length 2 containing the value
 * to add to the resulting list and the seed to be used in the next call to the
 * iterator function.
 * 
 * The iterator function receives one argument: *(seed)*.
 *
 * @param {import('./types').MaybeRef<Function>} fn The iterator function. receives one argument, `seed`, and returns either false to quit iteration or an array of length two to proceed. The element at index 0 of this array will be added to the resulting array, and the element at index 1 will be passed to the next call to `fn`.
 * @param {import('./types').MaybeRef<*>} seed The seed value.
 * @return {import('vue').ComputedRef<Array>} The final list.
*/
const useUnfold = curryN(2,(fn, seed) => computed(() => unfold(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof seed === 'function' ? (...fnArgs) => unref(unref(seed)(...fnArgs)) : unref(seed))))

export default useUnfold
