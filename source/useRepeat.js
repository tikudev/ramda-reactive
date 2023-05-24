import { computed, unref } from 'vue'
import { repeat, curryN } from 'ramda'

/**
 * Returns a fixed list of size `n` containing a specified identical value.
 *
 * @param {import('./types').MaybeRef<*>} value The value to repeat.
 * @param {import('./types').MaybeWatchSource<Number>} n The desired size of the output list.
 * @return {import('vue').ComputedRef<Array>} A new array containing `n` `value`s.
*/
const useRepeat = curryN(2,(value, n) => computed(() => repeat(typeof value === 'function' ? (...fnArgs) => unref(unref(value)(...fnArgs)) : unref(value), typeof n === 'function' ? n() : unref(n))))

export default useRepeat
