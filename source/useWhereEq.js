import { computed, unref } from 'vue'
import { whereEq, curryN } from 'ramda'

/**
 * Takes a spec object and a test object; returns true if the test satisfies
 * the spec, false otherwise. An object satisfies the spec if, for each of the
 * spec's own properties, accessing that property of the object gives the same
 * value (in [`R.equals`](#equals) terms) as accessing that property of the
 * spec.
 * 
 * `whereEq` is a specialization of [`where`](#where).
 *
 * @param {import('./types').MaybeWatchSource<Object>} spec 
 * @param {import('./types').MaybeWatchSource<Object>} testObj 
 * @return {import('vue').ComputedRef<Boolean>} 
*/
const useWhereEq = curryN(2,(spec, testObj) => computed(() => whereEq(typeof spec === 'function' ? spec() : unref(spec), typeof testObj === 'function' ? testObj() : unref(testObj))))

export default useWhereEq
