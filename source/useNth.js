import { computed, unref } from 'vue'
import { nth, curryN } from 'ramda'

/**
 * Returns the nth element of the given list or string. If n is negative the
 * element at index length + n is returned.
 *
 * @param {import('./types').MaybeWatchSource<Number>} offset 
 * @param {import('./types').MaybeRef<*>} list 
 * @return {import('vue').ComputedRef<*>} 
*/
const useNth = curryN(2,(offset, list) => computed(() => nth(typeof offset === 'function' ? offset() : unref(offset), typeof list === 'function' ? (...fnArgs) => unref(unref(list)(...fnArgs)) : unref(list))))

export default useNth
