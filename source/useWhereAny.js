import { computed, unref } from 'vue'
import { whereAny, curryN } from 'ramda'

/**
 * Takes a spec object and a test object; each of the spec's own properties must be a predicate function.
 * Each predicate is applied to the value of the corresponding property of the
 * test object. `whereAny` returns true if at least one of the predicates return true,
 * false otherwise.
 * 
 * `whereAny` is well suited to declaratively expressing constraints for other
 * functions such as [`filter`](#filter) and [`find`](#find).
 *
 * @param {import('./types').MaybeWatchSource<Object>} spec 
 * @param {import('./types').MaybeWatchSource<Object>} testObj 
 * @return {import('vue').ComputedRef<Boolean>} 
*/
const useWhereAny = curryN(2,(spec, testObj) => computed(() => whereAny(typeof spec === 'function' ? spec() : unref(spec), typeof testObj === 'function' ? testObj() : unref(testObj))))

export default useWhereAny
