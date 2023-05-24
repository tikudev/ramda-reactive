import { computed, unref } from 'vue'
import { is, curryN } from 'ramda'

/**
 * See if an object (i.e. `val`) is an instance of the supplied constructor. This
 * function will check up the inheritance chain, if any.
 * If `val` was created using `Object.create`, `R.is(Object, val) === true`.
 *
 * @param {import('./types').MaybeWatchSource<Object>} ctor A constructor
 * @param {import('./types').MaybeRef<*>} val The value to test
 * @return {import('vue').ComputedRef<Boolean>} 
*/
const useIs = curryN(2,(ctor, val) => computed(() => is(typeof ctor === 'function' ? ctor() : unref(ctor), typeof val === 'function' ? (...fnArgs) => unref(unref(val)(...fnArgs)) : unref(val))))

export default useIs
