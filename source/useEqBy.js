import { computed, unref } from 'vue'
import { eqBy, curryN } from 'ramda'

/**
 * Takes a function and two values in its domain and returns `true` if the
 * values map to the same value in the codomain; `false` otherwise.
 *
 * @param {import('./types').MaybeRef<Function>} f 
 * @param {import('./types').MaybeRef<*>} x 
 * @param {import('./types').MaybeRef<*>} y 
 * @return {import('vue').ComputedRef<Boolean>} 
*/
const useEqBy = curryN(3,(f, x, y) => computed(() => eqBy(typeof f === 'function' ? (...fnArgs) => unref(unref(f)(...fnArgs)) : unref(f), typeof x === 'function' ? (...fnArgs) => unref(unref(x)(...fnArgs)) : unref(x), typeof y === 'function' ? (...fnArgs) => unref(unref(y)(...fnArgs)) : unref(y))))

export default useEqBy
