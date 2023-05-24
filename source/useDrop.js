import { computed, unref } from 'vue'
import { drop, curryN } from 'ramda'

/**
 * Returns all but the first `n` elements of the given list, string, or
 * transducer/transformer (or object with a `drop` method).
 * 
 * Dispatches to the `drop` method of the second argument, if present.
 *
 * @param {import('./types').MaybeWatchSource<Number>} n 
 * @param {import('./types').MaybeRef<*>} list 
 * @return {import('vue').ComputedRef<*>} A copy of list without the first `n` elements
*/
const useDrop = curryN(2,(n, list) => computed(() => drop(typeof n === 'function' ? n() : unref(n), typeof list === 'function' ? (...fnArgs) => unref(unref(list)(...fnArgs)) : unref(list))))

export default useDrop
