import { computed, unref } from 'vue'
import { reduced } from 'ramda'

/**
 * Returns a value wrapped to indicate that it is the final value of the reduce
 * and transduce functions. The returned value should be considered a black
 * box: the internal structure is not guaranteed to be stable.
 * 
 * This optimization is available to the below functions:
 * - [`reduce`](#reduce)
 * - [`reduceWhile`](#reduceWhile)
 * - [`reduceBy`](#reduceBy)
 * - [`reduceRight`](#reduceRight)
 * - [`transduce`](#transduce)
 *
 * @param {import('./types').MaybeRef<*>} x The final value of the reduce.
 * @return {import('vue').ComputedRef<*>} The wrapped value.
*/
const useReduced = (x) => computed(() => reduced(typeof x === 'function' ? (...fnArgs) => unref(unref(x)(...fnArgs)) : unref(x)))

export default useReduced
