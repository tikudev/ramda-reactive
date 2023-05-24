import { computed, unref } from 'vue'
import { modulo, curryN } from 'ramda'

/**
 * Divides the first parameter by the second and returns the remainder. Note
 * that this function preserves the JavaScript-style behavior for modulo. For
 * mathematical modulo see [`mathMod`](#mathMod).
 *
 * @param {import('./types').MaybeWatchSource<Number>} a The value to the divide.
 * @param {import('./types').MaybeWatchSource<Number>} b The pseudo-modulus
 * @return {import('vue').ComputedRef<Number>} The result of `b % a`.
*/
const useModulo = curryN(2,(a, b) => computed(() => modulo(typeof a === 'function' ? a() : unref(a), typeof b === 'function' ? b() : unref(b))))

export default useModulo
