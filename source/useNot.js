import { computed, unref } from 'vue'
import { not } from 'ramda'

/**
 * A function that returns the `!` of its argument. It will return `true` when
 * passed false-y value, and `false` when passed a truth-y one.
 *
 * @param {import('./types').MaybeRef<*>} a any value
 * @return {import('vue').ComputedRef<Boolean>} the logical inverse of passed argument.
*/
const useNot = (a) => computed(() => not(typeof a === 'function' ? (...fnArgs) => unref(unref(a)(...fnArgs)) : unref(a)))

export default useNot
