import { computed, unref } from 'vue'
import { innerJoin, curryN } from 'ramda'

/**
 * Takes a predicate `pred`, a list `xs`, and a list `ys`, and returns a list
 * `xs'` comprising each of the elements of `xs` which is equal to one or more
 * elements of `ys` according to `pred`.
 * 
 * `pred` must be a binary function expecting an element from each list.
 * 
 * `xs`, `ys`, and `xs'` are treated as sets, semantically, so ordering should
 * not be significant, but since `xs'` is ordered the implementation guarantees
 * that its values are in the same order as they appear in `xs`. Duplicates are
 * not removed, so `xs'` may contain duplicates if `xs` contains duplicates.
 *
 * @param {import('./types').MaybeRef<Function>} pred 
 * @param {import('./types').MaybeWatchSource<Array>} xs 
 * @param {import('./types').MaybeWatchSource<Array>} ys 
 * @return {import('vue').ComputedRef<Array>} 
*/
const useInnerJoin = curryN(3,(pred, xs, ys) => computed(() => innerJoin(typeof pred === 'function' ? (...fnArgs) => unref(unref(pred)(...fnArgs)) : unref(pred), typeof xs === 'function' ? xs() : unref(xs), typeof ys === 'function' ? ys() : unref(ys))))

export default useInnerJoin
