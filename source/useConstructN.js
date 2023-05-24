import { computed, unref } from 'vue'
import { constructN, curryN } from 'ramda'

/**
 * Wraps a constructor function inside a curried function that can be called
 * with the same arguments and returns the same type. The arity of the function
 * returned is specified to allow using variadic constructor functions.
 *
 * @param {import('./types').MaybeWatchSource<Number>} n The arity of the constructor function.
 * @param {import('./types').MaybeRef<Function>} Fn The constructor function to wrap.
 * @return {import('vue').ComputedRef<Function>} A wrapped, curried constructor function.
*/
const useConstructN = curryN(2,(n, Fn) => computed(() => constructN(typeof n === 'function' ? n() : unref(n), typeof Fn === 'function' ? (...fnArgs) => unref(unref(Fn)(...fnArgs)) : unref(Fn))))

export default useConstructN
