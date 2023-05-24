import { computed, unref } from 'vue'
import { applySpec } from 'ramda'

/**
 * Given a spec object recursively mapping properties to functions, creates a
 * function producing an object of the same structure, by mapping each property
 * to the result of calling its associated function with the supplied arguments.
 *
 * @param {import('./types').MaybeWatchSource<Object>} spec an object recursively mapping properties to functions for producing the values for these properties.
 * @return {import('vue').ComputedRef<Function>} A function that returns an object of the same structure as `spec', with each property set to the value returned by calling its associated function with the supplied arguments.
*/
const useApplySpec = (spec) => computed(() => applySpec(typeof spec === 'function' ? spec() : unref(spec)))

export default useApplySpec
