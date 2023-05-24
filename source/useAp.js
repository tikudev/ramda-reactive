import { computed, unref } from 'vue'
import { ap, curryN } from 'ramda'

/**
 * ap applies a list of functions to a list of values.
 * 
 * Dispatches to the `ap` method of the first argument, if present. Also
 * treats curried functions as applicatives.
 *
 * @param {import('./types').MaybeRef<*>} applyF 
 * @param {import('./types').MaybeRef<*>} applyX 
 * @return {import('vue').ComputedRef<*>} 
*/
const useAp = curryN(2,(applyF, applyX) => computed(() => ap(typeof applyF === 'function' ? (...fnArgs) => unref(unref(applyF)(...fnArgs)) : unref(applyF), typeof applyX === 'function' ? (...fnArgs) => unref(unref(applyX)(...fnArgs)) : unref(applyX))))

export default useAp
