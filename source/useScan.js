import { computed, unref } from 'vue'
import { scan, curryN } from 'ramda'

/**
 * Scan is similar to [`reduce`](#reduce), but returns a list of successively
 * reduced values from the left.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param {import('./types').MaybeRef<Function>} fn The iterator function. Receives two values, the accumulator and the current element from the array
 * @param {import('./types').MaybeRef<*>} acc The accumulator value.
 * @param {import('./types').MaybeWatchSource<Array>} list The list to iterate over.
 * @return {import('vue').ComputedRef<Array>} A list of all intermediately reduced values.
*/
const useScan = curryN(3,(fn, acc, list) => computed(() => scan(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof acc === 'function' ? (...fnArgs) => unref(unref(acc)(...fnArgs)) : unref(acc), typeof list === 'function' ? list() : unref(list))))

export default useScan
