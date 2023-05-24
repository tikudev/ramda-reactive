import { computed, unref } from 'vue'
import { times, curryN } from 'ramda'

/**
 * Calls an input function `n` times, returning an array containing the results
 * of those function calls.
 * 
 * `fn` is passed one argument: The current value of `n`, which begins at `0`
 * and is gradually incremented to `n - 1`.
 *
 * @param {import('./types').MaybeRef<Function>} fn The function to invoke. Passed one argument, the current value of `n`.
 * @param {import('./types').MaybeWatchSource<Number>} n A value between `0` and `n - 1`. Increments after each function call.
 * @return {import('vue').ComputedRef<Array>} An array containing the return values of all calls to `fn`.
*/
const useTimes = curryN(2,(fn, n) => computed(() => times(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof n === 'function' ? n() : unref(n))))

export default useTimes
