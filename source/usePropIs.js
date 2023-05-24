import { computed, unref } from 'vue'
import { propIs, curryN } from 'ramda'

/**
 * Returns `true` if the specified object property is of the given type;
 * `false` otherwise.
 *
 * @param {import('./types').MaybeRef<Function>} type 
 * @param {import('./types').MaybeWatchSource<String>} name 
 * @param {import('./types').MaybeRef<*>} obj 
 * @return {import('vue').ComputedRef<Boolean>} 
*/
const usePropIs = curryN(3,(_type, name, obj) => computed(() => propIs(typeof _type === 'function' ? (...fnArgs) => unref(unref(_type)(...fnArgs)) : unref(_type), typeof name === 'function' ? name() : unref(name), typeof obj === 'function' ? (...fnArgs) => unref(unref(obj)(...fnArgs)) : unref(obj))))

export default usePropIs
