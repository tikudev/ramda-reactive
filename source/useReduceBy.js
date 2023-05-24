import { computed, unref } from 'vue'
import { reduceBy, curryN } from 'ramda'

/**
 * Groups the elements of the list according to the result of calling
 * the String-returning function `keyFn` on each element and reduces the elements
 * of each group to a single value via the reducer function `valueFn`.
 * 
 * The value function receives two values: *(acc, value)*. It may use
 * [`R.reduced`](#reduced) to short circuit the iteration.
 * 
 * This function is basically a more general [`groupBy`](#groupBy) function.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param {import('./types').MaybeRef<Function>} valueFn The function that reduces the elements of each group to a single value. Receives two values, accumulator for a particular group and the current element.
 * @param {import('./types').MaybeRef<*>} acc The (initial) accumulator value for each group.
 * @param {import('./types').MaybeRef<Function>} keyFn The function that maps the list's element into a key.
 * @param {import('./types').MaybeWatchSource<Array>} list The array to group.
 * @return {import('vue').ComputedRef<Object>} An object with the output of `keyFn` for keys, mapped to the output of `valueFn` for elements which produced that key when passed to `keyFn`.
*/
const useReduceBy = curryN(4,(valueFn, acc, keyFn, list) => computed(() => reduceBy(typeof valueFn === 'function' ? (...fnArgs) => unref(unref(valueFn)(...fnArgs)) : unref(valueFn), typeof acc === 'function' ? (...fnArgs) => unref(unref(acc)(...fnArgs)) : unref(acc), typeof keyFn === 'function' ? (...fnArgs) => unref(unref(keyFn)(...fnArgs)) : unref(keyFn), typeof list === 'function' ? list() : unref(list))))

export default useReduceBy
