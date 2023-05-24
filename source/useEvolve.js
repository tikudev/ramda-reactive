import { computed, unref } from 'vue'
import { evolve, curryN } from 'ramda'

/**
 * Creates a new object by recursively evolving a shallow copy of `object`,
 * according to the `transformation` functions. All non-primitive properties
 * are copied by reference.
 * 
 * A `transformation` function will not be invoked if its corresponding key
 * does not exist in the evolved object.
 *
 * @param {import('./types').MaybeWatchSource<Object>} transformations The object specifying transformation functions to apply to the object.
 * @param {import('./types').MaybeWatchSource<Object>} object The object to be transformed.
 * @return {import('vue').ComputedRef<Object>} The transformed object.
*/
const useEvolve = curryN(2,(transformations, object) => computed(() => evolve(typeof transformations === 'function' ? transformations() : unref(transformations), typeof object === 'function' ? object() : unref(object))))

export default useEvolve
