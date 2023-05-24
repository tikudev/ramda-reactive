import { computed, unref } from 'vue'
import { liftN } from 'ramda'

/**
 * "lifts" a function to be the specified arity, so that it may "map over" that
 * many lists, Functions or other objects that satisfy the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
 *
 * @param {import('./types').MaybeRef<Function>} fn The function to lift into higher context
 * @return {import('vue').ComputedRef<Function>} The lifted function.
*/
const useLiftN = (fn) => computed(() => liftN(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn)))

export default useLiftN
