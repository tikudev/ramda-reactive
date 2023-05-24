import { computed, unref } from 'vue'
import { set, curryN } from 'ramda'

/**
 * Returns the result of "setting" the portion of the given data structure
 * focused by the given lens to the given value.
 *
 * @param {import('./types').MaybeWatchSource<Lens>} lens 
 * @param {import('./types').MaybeRef<*>} v 
 * @param {import('./types').MaybeRef<*>} x 
 * @return {import('vue').ComputedRef<*>} 
*/
const useSet = curryN(3,(_lens, v, x) => computed(() => set(typeof _lens === 'function' ? _lens() : unref(_lens), typeof v === 'function' ? (...fnArgs) => unref(unref(v)(...fnArgs)) : unref(v), typeof x === 'function' ? (...fnArgs) => unref(unref(x)(...fnArgs)) : unref(x))))

export default useSet
