import { computed, unref } from 'vue'
import { mathMod, curryN } from 'ramda'

/**
 * `mathMod` behaves like the modulo operator should mathematically, unlike the
 * `%` operator (and by extension, [`R.modulo`](#modulo)). So while
 * `-17 % 5` is `-2`, `mathMod(-17, 5)` is `3`. `mathMod` requires Integer
 * arguments, and returns NaN when the modulus is zero or negative.
 *
 * @param {import('./types').MaybeWatchSource<Number>} m The dividend.
 * @param {import('./types').MaybeWatchSource<Number>} p the modulus.
 * @return {import('vue').ComputedRef<Number>} The result of `b mod a`.
*/
const useMathMod = curryN(2,(m, p) => computed(() => mathMod(typeof m === 'function' ? m() : unref(m), typeof p === 'function' ? p() : unref(p))))

export default useMathMod
