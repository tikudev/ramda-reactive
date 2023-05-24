import { computed, unref } from 'vue'
import { partition, curryN } from 'ramda'

/**
 * Takes a predicate and a list or other `Filterable` object and returns the
 * pair of filterable objects of the same type of elements which do and do not
 * satisfy, the predicate, respectively. Filterable objects include plain objects or any object
 * that has a filter method such as `Array`.
 *
 * @param {import('./types').MaybeRef<Function>} pred A predicate to determine which side the element belongs to.
 * @param {import('./types').MaybeWatchSource<Array>} filterable the list (or other filterable) to partition.
 * @return {import('vue').ComputedRef<Array>} An array, containing first the subset of elements that satisfy the predicate, and second the subset of elements that do not satisfy.
*/
const usePartition = curryN(2,(pred, filterable) => computed(() => partition(typeof pred === 'function' ? (...fnArgs) => unref(unref(pred)(...fnArgs)) : unref(pred), typeof filterable === 'function' ? filterable() : unref(filterable))))

export default usePartition
