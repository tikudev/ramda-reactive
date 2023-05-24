import { computed, unref } from 'vue'
import { divide, curryN } from 'ramda'

/**
 * Divides two numbers. Equivalent to `a / b`.
 *
 * @param {import('./types').MaybeWatchSource<Number>} a The first value.
 * @param {import('./types').MaybeWatchSource<Number>} b The second value.
 * @return {import('vue').ComputedRef<Number>} The result of `a / b`.
*/
const useDivide = curryN(2,(a, b) => computed(() => divide(typeof a === 'function' ? a() : unref(a), typeof b === 'function' ? b() : unref(b))))

export default useDivide
