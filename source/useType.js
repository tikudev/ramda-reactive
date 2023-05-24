import { computed, unref } from 'vue'
import { type } from 'ramda'

/**
 * Gives a single-word string description of the (native) type of a value,
 * returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not
 * attempt to distinguish user Object types any further, reporting them all as
 * 'Object'.
 *
 * @param {import('./types').MaybeRef<*>} val The value to test
 * @return {import('vue').ComputedRef<String>} 
*/
const useType = (val) => computed(() => type(typeof val === 'function' ? (...fnArgs) => unref(unref(val)(...fnArgs)) : unref(val)))

export default useType
