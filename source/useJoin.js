import { computed, unref } from 'vue'
import { join, curryN } from 'ramda'

/**
 * Returns a string made by inserting the `separator` between each element and
 * concatenating all the elements into a single string.
 *
 * @param {import('./types').MaybeWatchSource<Number|String>} separator The string used to separate the elements.
 * @param {import('./types').MaybeWatchSource<Array>} xs The elements to join into a string.
 * @return {import('vue').ComputedRef<String>} str The string made by concatenating `xs` with `separator`.
*/
const useJoin = curryN(2,(separator, xs) => computed(() => join(typeof separator === 'function' ? separator() : unref(separator), typeof xs === 'function' ? xs() : unref(xs))))

export default useJoin
