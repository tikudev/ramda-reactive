import { computed, unref } from 'vue'
import { cond } from 'ramda'

/**
 * Returns a function, `fn`, which encapsulates `if/else, if/else, ...` logic.
 * `R.cond` takes a list of [predicate, transformer] pairs. All of the arguments
 * to `fn` are applied to each of the predicates in turn until one returns a
 * "truthy" value, at which point `fn` returns the result of applying its
 * arguments to the corresponding transformer. If none of the predicates
 * matches, `fn` returns undefined.
 * 
 * **Please note**: This is not a direct substitute for a `switch` statement.
 * Remember that both elements of every pair passed to `cond` are *functions*,
 * and `cond` returns a function.
 *
 * @param {import('./types').MaybeWatchSource<Array>} pairs A list of [predicate, transformer]
 * @return {import('vue').ComputedRef<Function>} 
*/
const useCond = (pairs) => computed(() => cond(typeof pairs === 'function' ? pairs() : unref(pairs)))

export default useCond
