import { computed, unref } from 'vue'
import { pipe } from 'ramda'

/**
 * Performs left-to-right function composition. The first argument may have
 * any arity; the remaining arguments must be unary.
 * 
 * In some libraries this function is named `sequence`.
 * 
 * **Note:** The result of pipe is not automatically curried.
 *
 * @param {...import('./types').MaybeRef<Function>} functions 
 * @return {import('vue').ComputedRef<Function>} 
*/
const usePipe = (...functions) => computed(() => pipe(...functions.map(varArg => typeof varArg === 'function' ? (...fnArgs) => unref(unref(varArg)(...fnArgs)) : unref(varArg))))

export default usePipe
