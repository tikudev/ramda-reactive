import { computed, unref } from 'vue'
import { takeLastWhile, curryN } from 'ramda'

/**
 * Returns a new list containing the last `n` elements of a given list, passing
 * each value to the supplied predicate function, and terminating when the
 * predicate function returns `false`. Excludes the element that caused the
 * predicate function to fail. The predicate function is passed one argument:
 * *(value)*.
 *
 * @param {import('./types').MaybeRef<Function>} fn The function called per iteration.
 * @param {import('./types').MaybeWatchSource<Array>} xs The collection to iterate over.
 * @return {import('vue').ComputedRef<Array>} A new array.
*/
const useTakeLastWhile = curryN(2,(fn, xs) => computed(() => takeLastWhile(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof xs === 'function' ? xs() : unref(xs))))

export default useTakeLastWhile
