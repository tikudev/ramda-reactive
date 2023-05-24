import { computed, unref } from 'vue'
import { forEachObjIndexed, curryN } from 'ramda'

/**
 * Iterate over an input `object`, calling a provided function `fn` for each
 * key and value in the object.
 * 
 * `fn` receives three argument: *(value, key, obj)*.
 *
 * @param {import('./types').MaybeRef<Function>} fn The function to invoke. Receives three argument, `value`, `key`, `obj`.
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to iterate over.
 * @return {import('vue').ComputedRef<Object>} The original object.
*/
const useForEachObjIndexed = curryN(2,(fn, obj) => computed(() => forEachObjIndexed(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof obj === 'function' ? obj() : unref(obj))))

export default useForEachObjIndexed
