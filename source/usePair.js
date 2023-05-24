import { computed, unref } from 'vue'
import { pair, curryN } from 'ramda'

/**
 * Takes two arguments, `fst` and `snd`, and returns `[fst, snd]`.
 *
 * @param {import('./types').MaybeRef<*>} fst 
 * @param {import('./types').MaybeRef<*>} snd 
 * @return {import('vue').ComputedRef<Array>} 
*/
const usePair = curryN(2,(fst, snd) => computed(() => pair(typeof fst === 'function' ? (...fnArgs) => unref(unref(fst)(...fnArgs)) : unref(fst), typeof snd === 'function' ? (...fnArgs) => unref(unref(snd)(...fnArgs)) : unref(snd))))

export default usePair
