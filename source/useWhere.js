import { computed, unref } from 'vue'
import { where, curryN } from 'ramda'

/**
 * Takes a spec object and a test object; returns true if the test satisfies
 * the spec. Each of the spec's own properties must be a predicate function.
 * Each predicate is applied to the value of the corresponding property of the
 * test object. `where` returns true if all the predicates return true, false
 * otherwise.
 * 
 * `where` is well suited to declaratively expressing constraints for other
 * functions such as [`filter`](#filter) and [`find`](#find).
 *
 * @param {import('./types').MaybeWatchSource<Object>} spec 
 * @param {import('./types').MaybeWatchSource<Object>} testObj 
 * @return {import('vue').ComputedRef<Boolean>} 
*/
const useWhere = curryN(2,(spec, testObj) => computed(() => where(typeof spec === 'function' ? spec() : unref(spec), typeof testObj === 'function' ? testObj() : unref(testObj))))

export default useWhere
