import { computed, unref } from 'vue'
import { take, curryN } from 'ramda'

/**
 * Returns the first `n` elements of the given list, string, or
 * transducer/transformer (or object with a `take` method).
 * 
 * Dispatches to the `take` method of the second argument, if present.
 *
 * @param {import('./types').MaybeWatchSource<Number>} n 
 * @param {import('./types').MaybeRef<*>} list 
 * @return {import('vue').ComputedRef<*>} 
*/
const useTake = curryN(2,(n, list) => computed(() => take(typeof n === 'function' ? n() : unref(n), typeof list === 'function' ? (...fnArgs) => unref(unref(list)(...fnArgs)) : unref(list))))

export default useTake
