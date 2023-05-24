import { computed, unref } from 'vue'
import { isNil } from 'ramda'

/**
 * Checks if the input value is `null` or `undefined`.
 *
 * @param {import('./types').MaybeRef<*>} x The value to test.
 * @return {import('vue').ComputedRef<Boolean>} `true` if `x` is `undefined` or `null`, otherwise `false`.
*/
const useIsNil = (x) => computed(() => isNil(typeof x === 'function' ? (...fnArgs) => unref(unref(x)(...fnArgs)) : unref(x)))

export default useIsNil
