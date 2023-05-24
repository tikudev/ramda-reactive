import { computed, unref } from 'vue'
import { isEmpty } from 'ramda'

/**
 * Returns `true` if the given value is its type's empty value; `false`
 * otherwise.
 *
 * @param {import('./types').MaybeRef<*>} x 
 * @return {import('vue').ComputedRef<Boolean>} 
*/
const useIsEmpty = (x) => computed(() => isEmpty(typeof x === 'function' ? (...fnArgs) => unref(unref(x)(...fnArgs)) : unref(x)))

export default useIsEmpty
