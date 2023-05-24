import { computed, unref } from 'vue'
import { pluck, curryN } from 'ramda'

/**
 * Returns a new list by plucking the same named property off all objects in
 * the list supplied.
 * 
 * `pluck` will work on
 * any [functor](https://github.com/fantasyland/fantasy-land#functor) in
 * addition to arrays, as it is equivalent to `R.map(R.prop(k), f)`.
 *
 * @param {import('./types').MaybeWatchSource<Number|String>} key The key name to pluck off of each object.
 * @param {import('./types').MaybeWatchSource<Array>} f The array or functor to consider.
 * @return {import('vue').ComputedRef<Array>} The list of values for the given key.
*/
const usePluck = curryN(2,(key, f) => computed(() => pluck(typeof key === 'function' ? key() : unref(key), typeof f === 'function' ? f() : unref(f))))

export default usePluck
