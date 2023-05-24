import { computed, unref } from 'vue'
import { subtract, curryN } from 'ramda'

/**
 * Subtracts its second argument from its first argument.
 *
 * @param {import('./types').MaybeWatchSource<Number>} a The first value.
 * @param {import('./types').MaybeWatchSource<Number>} b The second value.
 * @return {import('vue').ComputedRef<Number>} The result of `a - b`.
*/
const useSubtract = curryN(2,(a, b) => computed(() => subtract(typeof a === 'function' ? a() : unref(a), typeof b === 'function' ? b() : unref(b))))

export default useSubtract
