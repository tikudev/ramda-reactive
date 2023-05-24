import { computed, unref } from 'vue'
import { concat, curryN } from 'ramda'

/**
 * Returns the result of concatenating the given lists or strings.
 * 
 * Note: `R.concat` expects both arguments to be of the same type,
 * unlike the native `Array.prototype.concat` method. It will throw
 * an error if you `concat` an Array with a non-Array value.
 * 
 * Dispatches to the `concat` method of the first argument, if present.
 * Can also concatenate two members of a [fantasy-land
 * compatible semigroup](https://github.com/fantasyland/fantasy-land#semigroup).
 *
 * @param {import('./types').MaybeWatchSource<Array|String>} firstList The first list
 * @param {import('./types').MaybeWatchSource<Array|String>} secondList The second list
 * @return {import('vue').ComputedRef<Array|String>} A list consisting of the elements of `firstList` followed by the elements of `secondList`.  *
*/
const useConcat = curryN(2,(firstList, secondList) => computed(() => concat(typeof firstList === 'function' ? firstList() : unref(firstList), typeof secondList === 'function' ? secondList() : unref(secondList))))

export default useConcat
