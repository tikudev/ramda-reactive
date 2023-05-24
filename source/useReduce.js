import { computed, unref } from 'vue'
import { reduce, curryN } from 'ramda'

/**
 * Returns a single item by iterating through the list, successively calling
 * the iterator function and passing it an accumulator value and the current
 * value from the array, and then passing the result to the next call.
 * 
 * The iterator function receives two values: *(acc, value)*. It may use
 * [`R.reduced`](#reduced) to shortcut the iteration.
 * 
 * The arguments' order of [`reduceRight`](#reduceRight)'s iterator function
 * is *(value, acc)*.
 * 
 * Note: `R.reduce` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.reduce` method. For more details
 * on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
 * 
 * Be cautious of mutating and returning the accumulator. If you reuse it across
 * invocations, it will continue to accumulate onto the same value. The general
 * recommendation is to always return a new value. If you can't do so for
 * performance reasons, then be sure to reinitialize the accumulator on each
 * invocation.
 * 
 * Dispatches to the `reduce` method of the third argument, if present. When
 * doing so, it is up to the user to handle the [`R.reduced`](#reduced)
 * shortcuting, as this is not implemented by `reduce`.
 *
 * @param {import('./types').MaybeRef<Function>} fn The iterator function. Receives two values, the accumulator and the current element from the array.
 * @param {import('./types').MaybeRef<*>} acc The accumulator value.
 * @param {import('./types').MaybeWatchSource<Array>} list The list to iterate over.
 * @return {import('vue').ComputedRef<*>} The final, accumulated value.
*/
const useReduce = curryN(3,(fn, acc, list) => computed(() => reduce(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof acc === 'function' ? (...fnArgs) => unref(unref(acc)(...fnArgs)) : unref(acc), typeof list === 'function' ? list() : unref(list))))

export default useReduce
