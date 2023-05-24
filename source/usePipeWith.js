import { computed, unref } from 'vue'
import { pipeWith, curryN } from 'ramda'

/**
 * Performs left-to-right function composition using transforming function. The first function may have
 * any arity; the remaining functions must be unary.
 * 
 * **Note:** The result of pipeWith is not automatically curried. Transforming function is not used on the
 * first argument.
 *
 * @param {import('./types').MaybeRef<Function>} transformer The transforming function
 * @param {import('./types').MaybeWatchSource<Array>} functions The functions to pipe
 * @return {import('vue').ComputedRef<Function>} 
*/
const usePipeWith = curryN(2,(transformer, functions) => computed(() => pipeWith(typeof transformer === 'function' ? (...fnArgs) => unref(unref(transformer)(...fnArgs)) : unref(transformer), typeof functions === 'function' ? functions() : unref(functions))))

export default usePipeWith
