import { computed, unref } from 'vue'
import { on, curryN } from 'ramda'

/**
 * Takes a binary function `f`, a unary function `g`, and two values.
 * Applies `g` to each value, then applies the result of each to `f`.
 * 
 * Also known as the P combinator.
 *
 * @param {import('./types').MaybeRef<Function>} f a binary function
 * @param {import('./types').MaybeRef<Function>} g a unary function
 * @param {import('./types').MaybeRef<any>} a any value
 * @param {import('./types').MaybeRef<any>} b any value
 * @return {import('vue').ComputedRef<any>} The result of `f`
*/
const useOn = curryN(4,(f, g, a, b) => computed(() => on(typeof f === 'function' ? (...fnArgs) => unref(unref(f)(...fnArgs)) : unref(f), typeof g === 'function' ? (...fnArgs) => unref(unref(g)(...fnArgs)) : unref(g), typeof a === 'function' ? (...fnArgs) => unref(unref(a)(...fnArgs)) : unref(a), typeof b === 'function' ? (...fnArgs) => unref(unref(b)(...fnArgs)) : unref(b))))

export default useOn
