import { computed, unref } from 'vue'
import { composeWith, curryN } from 'ramda'

/**
 * Performs right-to-left function composition using transforming function. The last function may have
 * any arity; the remaining functions must be unary. Unlike `compose`, functions are passed in an array.
 * 
 * **Note:** The result of composeWith is not automatically curried. Transforming function is not used
 * on the last argument.
 *
 * @param {import('./types').MaybeRef<Function>} transformer The transforming function
 * @param {import('./types').MaybeWatchSource<Array>} functions The functions to compose
 * @return {import('vue').ComputedRef<Function>} 
*/
const useComposeWith = curryN(2,(transformer, functions) => computed(() => composeWith(typeof transformer === 'function' ? (...fnArgs) => unref(unref(transformer)(...fnArgs)) : unref(transformer), typeof functions === 'function' ? functions() : unref(functions))))

export default useComposeWith
