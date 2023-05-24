import { computed, unref } from 'vue'
import { multiply, curryN } from 'ramda'

/**
 * Multiplies two numbers. Equivalent to `a * b` but curried.
 *
 * @param {import('./types').MaybeWatchSource<Number>} a The first value.
 * @param {import('./types').MaybeWatchSource<Number>} b The second value.
 * @return {import('vue').ComputedRef<Number>} The result of `ab`.
*/
const useMultiply = curryN(2,(a, b) => computed(() => multiply(typeof a === 'function' ? a() : unref(a), typeof b === 'function' ? b() : unref(b))))

export default useMultiply
