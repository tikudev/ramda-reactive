import { computed, unref } from 'vue'
import { objOf, curryN } from 'ramda'

/**
 * Creates an object containing a single key:value pair.
 *
 * @param {import('./types').MaybeWatchSource<String>} key 
 * @param {import('./types').MaybeRef<*>} val 
 * @return {import('vue').ComputedRef<Object>} 
*/
const useObjOf = curryN(2,(key, val) => computed(() => objOf(typeof key === 'function' ? key() : unref(key), typeof val === 'function' ? (...fnArgs) => unref(unref(val)(...fnArgs)) : unref(val))))

export default useObjOf
