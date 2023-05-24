import { computed, unref } from 'vue'
import { filter, curryN } from 'ramda'

/**
 * Takes a predicate and a `Filterable`, and returns a new filterable of the
 * same type containing the members of the given filterable which satisfy the
 * given predicate. Filterable objects include plain objects or any object
 * that has a filter method such as `Array`.
 * 
 * Dispatches to the `filter` method of the second argument, if present.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param {import('./types').MaybeRef<Function>} pred 
 * @param {import('./types').MaybeWatchSource<Array>} filterable 
 * @return {import('vue').ComputedRef<Array>} Filterable
*/
const useFilter = curryN(2,(pred, filterable) => computed(() => filter(typeof pred === 'function' ? (...fnArgs) => unref(unref(pred)(...fnArgs)) : unref(pred), typeof filterable === 'function' ? filterable() : unref(filterable))))

export default useFilter
