import { computed, unref } from 'vue'
import { clone } from 'ramda'

/**
 * Creates a deep copy of the source that can be used in place of the source
 * object without retaining any references to it.
 * The source object may contain (nested) `Array`s and `Object`s,
 * `Number`s, `String`s, `Boolean`s and `Date`s.
 * `Function`s are assigned by reference rather than copied.
 * 
 * Dispatches to a `clone` method if present.
 * 
 * Note that if the source object has multiple nodes that share a reference,
 * the returned object will have the same structure, but the references will
 * be pointed to the location within the cloned value.
 *
 * @param {import('./types').MaybeRef<*>} value The object or array to clone
 * @return {import('vue').ComputedRef<*>} A deeply cloned copy of `val`
*/
const useClone = (value) => computed(() => clone(typeof value === 'function' ? (...fnArgs) => unref(unref(value)(...fnArgs)) : unref(value)))

export default useClone
