import { computed, unref } from 'vue'
import { transpose } from 'ramda'

/**
 * Transposes the rows and columns of a 2D list.
 * When passed a list of `n` lists of length `x`,
 * returns a list of `x` lists of length `n`.
 *
 * @param {import('./types').MaybeWatchSource<Array>} list A 2D list
 * @return {import('vue').ComputedRef<Array>} A 2D list
*/
const useTranspose = (list) => computed(() => transpose(typeof list === 'function' ? list() : unref(list)))

export default useTranspose
