import { computed, unref } from 'vue'
import { forEach, curryN } from 'ramda'

/**
 * Iterate over an input `list`, calling a provided function `fn` for each
 * element in the list.
 * 
 * `fn` receives one argument: *(value)*.
 * 
 * Note: `R.forEach` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.forEach` method. For more
 * details on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Description
 * 
 * Also note that, unlike `Array.prototype.forEach`, Ramda's `forEach` returns
 * the original array. In some libraries this function is named `each`.
 * 
 * Dispatches to the `forEach` method of the second argument, if present.
 *
 * @param {import('./types').MaybeRef<Function>} fn The function to invoke. Receives one argument, `value`.
 * @param {import('./types').MaybeWatchSource<Array>} list The list to iterate over.
 * @return {import('vue').ComputedRef<Array>} The original list.
*/
const useForEach = curryN(2,(fn, list) => computed(() => forEach(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof list === 'function' ? list() : unref(list))))

export default useForEach
