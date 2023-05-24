import { computed, unref } from 'vue'
import { propSatisfies, curryN } from 'ramda'

/**
 * Returns `true` if the specified object property satisfies the given
 * predicate; `false` otherwise. You can test multiple properties with
 * [`R.where`](#where).
 *
 * @param {import('./types').MaybeRef<Function>} pred 
 * @param {import('./types').MaybeWatchSource<String>} name 
 * @param {import('./types').MaybeRef<*>} obj 
 * @return {import('vue').ComputedRef<Boolean>} 
*/
const usePropSatisfies = curryN(3,(pred, name, obj) => computed(() => propSatisfies(typeof pred === 'function' ? (...fnArgs) => unref(unref(pred)(...fnArgs)) : unref(pred), typeof name === 'function' ? name() : unref(name), typeof obj === 'function' ? (...fnArgs) => unref(unref(obj)(...fnArgs)) : unref(obj))))

export default usePropSatisfies
