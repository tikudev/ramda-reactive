import { computed, unref } from 'vue'
import { without, curryN } from 'ramda'

/**
 * Returns a new list without values in the first argument.
 * [`R.equals`](#equals) is used to determine equality.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param {import('./types').MaybeWatchSource<Array>} list1 The values to be removed from `list2`.
 * @param {import('./types').MaybeWatchSource<Array>} list2 The array to remove values from.
 * @return {import('vue').ComputedRef<Array>} The new array without values in `list1`.
*/
const useWithout = curryN(2,(list1, list2) => computed(() => without(typeof list1 === 'function' ? list1() : unref(list1), typeof list2 === 'function' ? list2() : unref(list2))))

export default useWithout
