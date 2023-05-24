import { computed, unref } from 'vue'
import { complement } from 'ramda'

/**
 * Takes a function `f` and returns a function `g` such that if called with the same arguments
 * when `f` returns a "truthy" value, `g` returns `false` and when `f` returns a "falsy" value `g` returns `true`.
 * 
 * `R.complement` may be applied to any functor
 *
 * @param {import('./types').MaybeRef<Function>} f 
 * @return {import('vue').ComputedRef<Function>} 
*/
const useComplement = (f) => computed(() => complement(typeof f === 'function' ? (...fnArgs) => unref(unref(f)(...fnArgs)) : unref(f)))

export default useComplement
