import { computed, unref } from 'vue'
import { compose } from 'ramda'

/**
 * Performs right-to-left function composition. The last argument may have
 * any arity; the remaining arguments must be unary.
 * 
 * **Note:** The result of compose is not automatically curried.
 *
 * @param {...import('./types').MaybeRef<Function>} ...functions The functions to compose
 * @return {import('vue').ComputedRef<Function>} 
*/
const useCompose = (...functions) => computed(() => compose(...functions.map(varArg => typeof varArg === 'function' ? (...fnArgs) => unref(unref(varArg)(...fnArgs)) : unref(varArg))))

export default useCompose
