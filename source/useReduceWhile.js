import { computed, unref } from 'vue'
import { reduceWhile, curryN } from 'ramda'

/**
 * Like [`reduce`](#reduce), `reduceWhile` returns a single item by iterating
 * through the list, successively calling the iterator function. `reduceWhile`
 * also takes a predicate that is evaluated before each step. If the predicate
 * returns `false`, it "short-circuits" the iteration and returns the current
 * value of the accumulator. `reduceWhile` may alternatively be short-circuited
 * via [`reduced`](#reduced).
 *
 * @param {import('./types').MaybeRef<Function>} pred The predicate. It is passed the accumulator and the current element.
 * @param {import('./types').MaybeRef<Function>} fn The iterator function. Receives two values, the accumulator and the current element.
 * @param {import('./types').MaybeRef<*>} a The accumulator value.
 * @param {import('./types').MaybeWatchSource<Array>} list The list to iterate over.
 * @return {import('vue').ComputedRef<*>} The final, accumulated value.
*/
const useReduceWhile = curryN(4,(pred, fn, a, list) => computed(() => reduceWhile(typeof pred === 'function' ? (...fnArgs) => unref(unref(pred)(...fnArgs)) : unref(pred), typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof a === 'function' ? (...fnArgs) => unref(unref(a)(...fnArgs)) : unref(a), typeof list === 'function' ? list() : unref(list))))

export default useReduceWhile
