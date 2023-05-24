import { computed, unref } from 'vue'
import { lensIndex } from 'ramda'

/**
 * Returns a lens whose focus is the specified index.
 *
 * @param {import('./types').MaybeWatchSource<Number>} n 
 * @return {import('vue').ComputedRef<Lens>} 
*/
const useLensIndex = (n) => computed(() => lensIndex(typeof n === 'function' ? n() : unref(n)))

export default useLensIndex
