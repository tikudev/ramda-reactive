import { computed, unref } from 'vue'
import { o, curryN } from 'ramda'

/**
 * `o` is a curried composition function that returns a unary function.
 * Like [`compose`](#compose), `o` performs right-to-left function composition.
 * Unlike [`compose`](#compose), the rightmost function passed to `o` will be
 * invoked with only one argument. Also, unlike [`compose`](#compose), `o` is
 * limited to accepting only 2 unary functions. The name o was chosen because
 * of its similarity to the mathematical composition operator ∘.
 *
 * @param {import('./types').MaybeRef<Function>} f 
 * @param {import('./types').MaybeRef<Function>} g 
 * @return {import('vue').ComputedRef<Function>} 
*/
const useO = curryN(2,(f, g) => computed(() => o(typeof f === 'function' ? (...fnArgs) => unref(unref(f)(...fnArgs)) : unref(f), typeof g === 'function' ? (...fnArgs) => unref(unref(g)(...fnArgs)) : unref(g))))

export default useO
