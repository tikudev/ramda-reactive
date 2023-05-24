import { computed, unref } from 'vue'
import { aperture, curryN } from 'ramda'

/**
 * Returns a new list, composed of n-tuples of consecutive elements. If `n` is
 * greater than the length of the list, an empty list is returned.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param {import('./types').MaybeWatchSource<Number>} n The size of the tuples to create
 * @param {import('./types').MaybeWatchSource<Array>} list The list to split into `n`-length tuples
 * @return {import('vue').ComputedRef<Array>} The resulting list of `n`-length tuples
*/
const useAperture = curryN(2,(n, list) => computed(() => aperture(typeof n === 'function' ? n() : unref(n), typeof list === 'function' ? list() : unref(list))))

export default useAperture
