import { computed, unref } from 'vue'
import { lensProp } from 'ramda'

/**
 * Returns a lens whose focus is the specified property.
 *
 * @param {import('./types').MaybeWatchSource<String>} k 
 * @return {import('vue').ComputedRef<Lens>} 
*/
const useLensProp = (k) => computed(() => lensProp(typeof k === 'function' ? k() : unref(k)))

export default useLensProp
