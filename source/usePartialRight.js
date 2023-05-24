import { computed, unref } from 'vue'
import { partialRight, curryN } from 'ramda'

/**
 * Takes a function `f` and a list of arguments, and returns a function `g`.
 * When applied, `g` returns the result of applying `f` to the arguments
 * provided to `g` followed by the arguments provided initially.
 *
 * @param {import('./types').MaybeRef<Function>} f 
 * @param {import('./types').MaybeWatchSource<Array>} args 
 * @return {import('vue').ComputedRef<Function>} 
*/
const usePartialRight = curryN(2,(f, args) => computed(() => partialRight(typeof f === 'function' ? (...fnArgs) => unref(unref(f)(...fnArgs)) : unref(f), typeof args === 'function' ? args() : unref(args))))

export default usePartialRight
