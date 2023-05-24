import { computed, unref } from 'vue'
import { addIndex } from 'ramda'

/**
 * Creates a new list iteration function from an existing one by adding two new
 * parameters to its callback function: the current index, and the entire list.
 * 
 * This would turn, for instance, [`R.map`](#map) function into one that
 * more closely resembles `Array.prototype.map`. Note that this will only work
 * for functions in which the iteration callback function is the first
 * parameter, and where the list is the last parameter. (This latter might be
 * unimportant if the list parameter is not used.)
 *
 * @param {import('./types').MaybeRef<Function>} fn A list iteration function that does not pass index or list to its callback
 * @return {import('vue').ComputedRef<Function>} An altered list iteration function that passes (item, index, list) to its callback
*/
const useAddIndex = (fn) => computed(() => addIndex(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn)))

export default useAddIndex
