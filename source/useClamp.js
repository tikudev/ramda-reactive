import { computed, unref } from 'vue'
import { clamp, curryN } from 'ramda'

/**
 * Restricts a number to be within a range.
 * 
 * Also works for other ordered types such as Strings and Dates.
 *
 * @param {import('./types').MaybeWatchSource<Number>} minimum The lower limit of the clamp (inclusive)
 * @param {import('./types').MaybeWatchSource<Number>} maximum The upper limit of the clamp (inclusive)
 * @param {import('./types').MaybeWatchSource<Number>} value Value to be clamped
 * @return {import('vue').ComputedRef<Number>} Returns `minimum` when `val < minimum`, `maximum` when `val > maximum`, returns `val` otherwise
*/
const useClamp = curryN(3,(minimum, maximum, value) => computed(() => clamp(typeof minimum === 'function' ? minimum() : unref(minimum), typeof maximum === 'function' ? maximum() : unref(maximum), typeof value === 'function' ? value() : unref(value))))

export default useClamp
