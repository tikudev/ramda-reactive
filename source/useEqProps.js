import { computed, unref } from 'vue'
import { eqProps, curryN } from 'ramda'

/**
 * Reports whether two objects have the same value, in [`R.equals`](#equals)
 * terms, for the specified property. Useful as a curried predicate.
 *
 * @param {import('./types').MaybeWatchSource<String>} prop The name of the property to compare
 * @param {import('./types').MaybeWatchSource<Object>} obj1 
 * @param {import('./types').MaybeWatchSource<Object>} obj2 
 * @return {import('vue').ComputedRef<Boolean>} *
*/
const useEqProps = curryN(3,(_prop, obj1, obj2) => computed(() => eqProps(typeof _prop === 'function' ? _prop() : unref(_prop), typeof obj1 === 'function' ? obj1() : unref(obj1), typeof obj2 === 'function' ? obj2() : unref(obj2))))

export default useEqProps
