import { computed, unref } from 'vue'
import { unapply } from 'ramda'

/**
 * Takes a function `fn`, which takes a single array argument, and returns a
 * function which:
 * 
 * - takes any number of positional arguments;
 * - passes these arguments to `fn` as an array; and
 * - returns the result.
 * 
 * In other words, `R.unapply` derives a variadic function from a function which
 * takes an array. `R.unapply` is the inverse of [`R.apply`](#apply).
 *
 * @param {import('./types').MaybeRef<Function>} fn 
 * @return {import('vue').ComputedRef<Function>} 
*/
const useUnapply = (fn) => computed(() => unapply(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn)))

export default useUnapply
