import { computed, unref } from 'vue'
import { pickBy, curryN } from 'ramda'

/**
 * Returns a partial copy of an object containing only the keys that satisfy
 * the supplied predicate.
 *
 * @param {import('./types').MaybeRef<Function>} pred A predicate to determine whether or not a key should be included on the output object.
 * @param {import('./types').MaybeWatchSource<Object>} obj The object to copy from
 * @return {import('vue').ComputedRef<Object>} A new object with only properties that satisfy `pred` on it.
*/
const usePickBy = curryN(2,(pred, obj) => computed(() => pickBy(typeof pred === 'function' ? (...fnArgs) => unref(unref(pred)(...fnArgs)) : unref(pred), typeof obj === 'function' ? obj() : unref(obj))))

export default usePickBy
