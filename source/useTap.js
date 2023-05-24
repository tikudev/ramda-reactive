import { computed, unref } from 'vue'
import { tap, curryN } from 'ramda'

/**
 * Runs the given function with the supplied object, then returns the object.
 * 
 * Acts as a transducer if a transformer is given as second parameter.
 *
 * @param {import('./types').MaybeRef<Function>} fn The function to call with `x`. The return value of `fn` will be thrown away.
 * @param {import('./types').MaybeRef<*>} x 
 * @return {import('vue').ComputedRef<*>} `x`.
*/
const useTap = curryN(2,(fn, x) => computed(() => tap(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof x === 'function' ? (...fnArgs) => unref(unref(x)(...fnArgs)) : unref(x))))

export default useTap
