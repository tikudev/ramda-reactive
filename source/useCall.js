import { computed, unref } from 'vue'
import { call, curryN } from 'ramda'

/**
 * Returns the result of calling its first argument with the remaining
 * arguments. This is occasionally useful as a converging function for
 * [`R.converge`](#converge): the first branch can produce a function while the
 * remaining branches produce values to be passed to that function as its
 * arguments.
 *
 * @param {import('./types').MaybeRef<Function>} fn The function to apply to the remaining arguments.
 * @param {...import('./types').MaybeRef<*>} args Any number of positional arguments.
 * @return {import('vue').ComputedRef<*>} 
*/
const useCall = curryN(2,(fn, ...args) => computed(() => call(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), ...args.map(varArg => typeof varArg === 'function' ? (...fnArgs) => unref(unref(varArg)(...fnArgs)) : unref(varArg)))))

export default useCall
