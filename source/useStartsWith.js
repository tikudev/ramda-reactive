import { computed, unref } from 'vue'
import { startsWith, curryN } from 'ramda'

/**
 * Checks if a list starts with the provided sublist.
 * 
 * Similarly, checks if a string starts with the provided substring.
 *
 * @param {import('./types').MaybeRef<*>} prefix 
 * @param {import('./types').MaybeRef<*>} list 
 * @return {import('vue').ComputedRef<Boolean>} 
*/
const useStartsWith = curryN(2,(prefix, list) => computed(() => startsWith(typeof prefix === 'function' ? (...fnArgs) => unref(unref(prefix)(...fnArgs)) : unref(prefix), typeof list === 'function' ? (...fnArgs) => unref(unref(list)(...fnArgs)) : unref(list))))

export default useStartsWith
