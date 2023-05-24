import { computed, unref } from 'vue'
import { pathSatisfies, curryN } from 'ramda'

/**
 * Returns `true` if the specified object property at given path satisfies the
 * given predicate; `false` otherwise.
 *
 * @param {import('./types').MaybeRef<Function>} pred 
 * @param {import('./types').MaybeWatchSource<Array>} propPath 
 * @param {import('./types').MaybeRef<*>} obj 
 * @return {import('vue').ComputedRef<Boolean>} 
*/
const usePathSatisfies = curryN(3,(pred, propPath, obj) => computed(() => pathSatisfies(typeof pred === 'function' ? (...fnArgs) => unref(unref(pred)(...fnArgs)) : unref(pred), typeof propPath === 'function' ? propPath() : unref(propPath), typeof obj === 'function' ? (...fnArgs) => unref(unref(obj)(...fnArgs)) : unref(obj))))

export default usePathSatisfies
