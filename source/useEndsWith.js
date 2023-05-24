import { computed, unref } from 'vue'
import { endsWith, curryN } from 'ramda'

/**
 * Checks if a list ends with the provided sublist.
 * 
 * Similarly, checks if a string ends with the provided substring.
 *
 * @param {import('./types').MaybeRef<*>} suffix 
 * @param {import('./types').MaybeRef<*>} list 
 * @return {import('vue').ComputedRef<Boolean>} 
*/
const useEndsWith = curryN(2,(suffix, list) => computed(() => endsWith(typeof suffix === 'function' ? (...fnArgs) => unref(unref(suffix)(...fnArgs)) : unref(suffix), typeof list === 'function' ? (...fnArgs) => unref(unref(list)(...fnArgs)) : unref(list))))

export default useEndsWith
