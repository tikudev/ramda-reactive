import { computed, unref } from 'vue'
import { chain, curryN } from 'ramda'

/**
 * `chain` maps a function over a list and concatenates the results. `chain`
 * is also known as `flatMap` in some libraries.
 * 
 * Dispatches to the `chain` method of the second argument, if present,
 * according to the [FantasyLand Chain spec](https://github.com/fantasyland/fantasy-land#chain).
 * 
 * If second argument is a function, `chain(f, g)(x)` is equivalent to `f(g(x), x)`.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param {import('./types').MaybeRef<Function>} fn The function to map with
 * @param {import('./types').MaybeWatchSource<Array>} list The list to map over
 * @return {import('vue').ComputedRef<Array>} The result of flat-mapping `list` with `fn`
*/
const useChain = curryN(2,(fn, list) => computed(() => chain(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof list === 'function' ? list() : unref(list))))

export default useChain
