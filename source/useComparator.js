import { computed, unref } from 'vue'
import { comparator } from 'ramda'

/**
 * Makes a comparator function out of a function that reports whether the first
 * element is less than the second.
 *
 * @param {import('./types').MaybeRef<Function>} pred A predicate function of arity two which will return `true` if the first argument is less than the second, `false` otherwise
 * @return {import('vue').ComputedRef<Function>} A Function :: a -> b -> Int that returns `-1` if a < b, `1` if b < a, otherwise `0`
*/
const useComparator = (pred) => computed(() => comparator(typeof pred === 'function' ? (...fnArgs) => unref(unref(pred)(...fnArgs)) : unref(pred)))

export default useComparator
