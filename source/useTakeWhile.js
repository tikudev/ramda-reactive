import { computed, unref } from 'vue'
import { takeWhile, curryN } from 'ramda'

/**
 * Returns a new list containing the first `n` elements of a given list,
 * passing each value to the supplied predicate function, and terminating when
 * the predicate function returns `false`. Excludes the element that caused the
 * predicate function to fail. The predicate function is passed one argument:
 * *(value)*.
 * 
 * Dispatches to the `takeWhile` method of the second argument, if present.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param {import('./types').MaybeRef<Function>} fn The function called per iteration.
 * @param {import('./types').MaybeWatchSource<Array>} xs The collection to iterate over.
 * @return {import('vue').ComputedRef<Array>} A new array.
*/
const useTakeWhile = curryN(2,(fn, xs) => computed(() => takeWhile(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof xs === 'function' ? xs() : unref(xs))))

export default useTakeWhile
