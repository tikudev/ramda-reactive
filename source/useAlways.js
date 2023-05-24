import { computed, unref } from 'vue'
import { always } from 'ramda'

/**
 * Returns a function that always returns the given value. Note that for
 * non-primitives the value returned is a reference to the original value.
 * 
 * This function is known as `const`, `constant`, or `K` (for K combinator) in
 * other languages and libraries.
 *
 * @param {import('./types').MaybeRef<*>} val The value to wrap in a function
 * @return {import('vue').ComputedRef<Function>} A Function ::-> val.
*/
const useAlways = (val) => computed(() => always(typeof val === 'function' ? (...fnArgs) => unref(unref(val)(...fnArgs)) : unref(val)))

export default useAlways
