import { computed, unref } from 'vue'
import { addIndexRight } from 'ramda'

/**
 * As with `addIndex`, `addIndexRight` creates a new list iteration function
 * from an existing one by adding two new parameters to its callback function:
 * the current index, and the entire list.
 * 
 * Unlike `addIndex`, `addIndexRight` iterates from the right to the left.
 *
 * @param {import('./types').MaybeRef<Function>} fn A list iteration function that does not pass index or list to its callback
 * @return {import('vue').ComputedRef<Function>} An altered list iteration function that passes (item, index, list) to its callback
*/
const useAddIndexRight = (fn) => computed(() => addIndexRight(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn)))

export default useAddIndexRight
