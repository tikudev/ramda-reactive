import { computed, unref } from 'vue'
import { map, curryN } from 'ramda'

/**
 * Takes a function and
 * a [functor](https://github.com/fantasyland/fantasy-land#functor),
 * applies the function to each of the functor's values, and returns
 * a functor of the same shape.
 * 
 * Ramda provides suitable `map` implementations for `Array` and `Object`,
 * so this function may be applied to `[1, 2, 3]` or `{x: 1, y: 2, z: 3}`.
 * 
 * Dispatches to the `map` method of the second argument, if present.
 * 
 * Acts as a transducer if a transformer is given in list position.
 * 
 * Also treats functions as functors and will compose them together.
 *
 * @param {import('./types').MaybeRef<Function>} fn The function to be called on every element of the input `list`.
 * @param {import('./types').MaybeWatchSource<Array>} list The list to be iterated over.
 * @return {import('vue').ComputedRef<Array>} The new list.
*/
const useMap = curryN(2,(fn, list) => computed(() => map(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof list === 'function' ? list() : unref(list))))

export default useMap
