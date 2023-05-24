import { computed, unref } from 'vue'
import { converge, curryN } from 'ramda'

/**
 * Accepts a converging function and a list of branching functions and returns
 * a new function. The arity of the new function is the same as the arity of
 * the longest branching function. When invoked, this new function is applied
 * to some arguments, and each branching function is applied to those same
 * arguments. The results of each branching function are passed as arguments
 * to the converging function to produce the return value.
 *
 * @param {import('./types').MaybeRef<Function>} after A function. `after` will be invoked with the return values of `fn1` and `fn2` as its arguments.
 * @param {import('./types').MaybeWatchSource<Array>} functions A list of functions.
 * @return {import('vue').ComputedRef<Function>} A new function.
*/
const useConverge = curryN(2,(after, functions) => computed(() => converge(typeof after === 'function' ? (...fnArgs) => unref(unref(after)(...fnArgs)) : unref(after), typeof functions === 'function' ? functions() : unref(functions))))

export default useConverge
