import { computed, unref } from 'vue'
import { isNotNil } from 'ramda'

/**
 * Checks if the input value is not `null` and not `undefined`.
 *
 * @param {import('./types').MaybeRef<*>} x The value to test.
 * @return {import('vue').ComputedRef<Boolean>} `true` if `x` is not `undefined` or not `null`, otherwise `false`.
*/
const useIsNotNil = (x) => computed(() => isNotNil(typeof x === 'function' ? (...fnArgs) => unref(unref(x)(...fnArgs)) : unref(x)))

export default useIsNotNil
