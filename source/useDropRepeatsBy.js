import { computed, unref } from 'vue'
import { dropRepeatsBy, curryN } from 'ramda'

/**
 * Returns a new list without any consecutively repeating elements,
 * based upon the value returned by applying the supplied function to
 * each list element. [`R.equals`](#equals) is used to determine equality.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param {import('./types').MaybeRef<Function>} fn A function used to produce a value to use during comparisons.
 * @param {import('./types').MaybeWatchSource<Array>} list The array to consider.
 * @return {import('vue').ComputedRef<Array>} `list` without repeating elements.
*/
const useDropRepeatsBy = curryN(2,(fn, list) => computed(() => dropRepeatsBy(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof list === 'function' ? list() : unref(list))))

export default useDropRepeatsBy
