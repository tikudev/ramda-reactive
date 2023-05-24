import { computed, unref } from 'vue'
import { thunkify } from 'ramda'

/**
 * Creates a thunk out of a function. A thunk delays a calculation until
 * its result is needed, providing lazy evaluation of arguments.
 *
 * @param {import('./types').MaybeRef<Function>} fn A function to wrap in a thunk
 * @return {import('vue').ComputedRef<Function>} Expects arguments for `fn` and returns a new function that, when called, applies those arguments to `fn`.
*/
const useThunkify = (fn) => computed(() => thunkify(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn)))

export default useThunkify
