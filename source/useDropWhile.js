import { computed, unref } from 'vue'
import { dropWhile, curryN } from 'ramda'

/**
 * Returns a new list excluding the leading elements of a given list which
 * satisfy the supplied predicate function. It passes each value to the supplied
 * predicate function, skipping elements while the predicate function returns
 * `true`. The predicate function is applied to one argument: *(value)*.
 * 
 * Dispatches to the `dropWhile` method of the second argument, if present.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param {import('./types').MaybeRef<Function>} fn The function called per iteration.
 * @param {import('./types').MaybeWatchSource<Array>} xs The collection to iterate over.
 * @return {import('vue').ComputedRef<Array>} A new array.
*/
const useDropWhile = curryN(2,(fn, xs) => computed(() => dropWhile(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof xs === 'function' ? xs() : unref(xs))))

export default useDropWhile
