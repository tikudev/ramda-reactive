import { computed, unref } from 'vue'
import { lift } from 'ramda'

/**
 * "lifts" a function of arity >= 1 so that it may "map over" a list, Function or other
 * object that satisfies the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
 *
 * @param {import('./types').MaybeRef<Function>} fn The function to lift into higher context
 * @return {import('vue').ComputedRef<Function>} The lifted function.
*/
const useLift = (fn) => computed(() => lift(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn)))

export default useLift
