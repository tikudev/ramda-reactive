import { computed, unref } from 'vue'
import { mapObjIndexed, curryN } from 'ramda'

/**
 * An Object-specific version of [`map`](#map). The function is applied to three
 * arguments: *(value, key, obj)*. If only the value is significant, use
 * [`map`](#map) instead.
 *
 * @param {import('./types').MaybeRef<Function>} fn 
 * @param {import('./types').MaybeWatchSource<Object>} obj 
 * @return {import('vue').ComputedRef<Object>} 
*/
const useMapObjIndexed = curryN(2,(fn, obj) => computed(() => mapObjIndexed(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof obj === 'function' ? obj() : unref(obj))))

export default useMapObjIndexed
