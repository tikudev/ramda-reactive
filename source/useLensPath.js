import { computed, unref } from 'vue'
import { lensPath } from 'ramda'

/**
 * Returns a lens whose focus is the specified path.
 *
 * @param {import('./types').MaybeWatchSource<Array>} path The path to use.
 * @return {import('vue').ComputedRef<Lens>} 
*/
const useLensPath = (_path) => computed(() => lensPath(typeof _path === 'function' ? _path() : unref(_path)))

export default useLensPath
