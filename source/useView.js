import { computed, unref } from 'vue'
import { view, curryN } from 'ramda'

/**
 * Returns a "view" of the given data structure, determined by the given lens.
 * The lens's focus determines which portion of the data structure is visible.
 *
 * @param {import('./types').MaybeWatchSource<Lens>} lens 
 * @param {import('./types').MaybeRef<*>} x 
 * @return {import('vue').ComputedRef<*>} 
*/
const useView = curryN(2,(_lens, x) => computed(() => view(typeof _lens === 'function' ? _lens() : unref(_lens), typeof x === 'function' ? (...fnArgs) => unref(unref(x)(...fnArgs)) : unref(x))))

export default useView
