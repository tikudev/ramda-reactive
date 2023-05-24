import { computed, unref } from 'vue'
import { promap, curryN } from 'ramda'

/**
 * Takes two functions as pre- and post- processors respectively for a third function,
 * i.e. `promap(f, g, h)(x) === g(h(f(x)))`.
 * 
 * Dispatches to the `promap` method of the third argument, if present,
 * according to the [FantasyLand Profunctor spec](https://github.com/fantasyland/fantasy-land#profunctor).
 * 
 * Acts as a transducer if a transformer is given in profunctor position.
 *
 * @param {import('./types').MaybeRef<Function>} f The preprocessor function, a -> b
 * @param {import('./types').MaybeRef<Function>} g The postprocessor function, c -> d
 * @param {import('./types').MaybeWatchSource<Profunctor>} profunctor The profunctor instance to be promapped, e.g. b -> c
 * @return {import('vue').ComputedRef<Profunctor>} The new profunctor instance, e.g. a -> d
*/
const usePromap = curryN(3,(f, g, profunctor) => computed(() => promap(typeof f === 'function' ? (...fnArgs) => unref(unref(f)(...fnArgs)) : unref(f), typeof g === 'function' ? (...fnArgs) => unref(unref(g)(...fnArgs)) : unref(g), typeof profunctor === 'function' ? profunctor() : unref(profunctor))))

export default usePromap
