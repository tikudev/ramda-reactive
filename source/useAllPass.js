import { computed, unref } from 'vue'
import { allPass } from 'ramda'

/**
 * Takes a list of predicates and returns a predicate that returns true for a
 * given list of arguments if every one of the provided predicates is satisfied
 * by those arguments.
 * 
 * The function returned is a curried function whose arity matches that of the
 * highest-arity predicate.
 *
 * @param {import('./types').MaybeWatchSource<Array>} predicates An array of predicates to check
 * @return {import('vue').ComputedRef<Function>} The combined predicate
*/
const useAllPass = (predicates) => computed(() => allPass(typeof predicates === 'function' ? predicates() : unref(predicates)))

export default useAllPass
