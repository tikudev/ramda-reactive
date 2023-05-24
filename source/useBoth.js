import { computed, unref } from 'vue'
import { both, curryN } from 'ramda'

/**
 * A function which calls the two provided functions and returns the `&&`
 * of the results.
 * It returns the result of the first function if it is false-y and the result
 * of the second function otherwise. Note that this is short-circuited,
 * meaning that the second function will not be invoked if the first returns a
 * false-y value.
 * 
 * In addition to functions, `R.both` also accepts any fantasy-land compatible
 * applicative functor.
 *
 * @param {import('./types').MaybeRef<Function>} f A predicate
 * @param {import('./types').MaybeRef<Function>} g Another predicate
 * @return {import('vue').ComputedRef<Function>} a function that applies its arguments to `f` and `g` and `&&`s their outputs together.
*/
const useBoth = curryN(2,(f, g) => computed(() => both(typeof f === 'function' ? (...fnArgs) => unref(unref(f)(...fnArgs)) : unref(f), typeof g === 'function' ? (...fnArgs) => unref(unref(g)(...fnArgs)) : unref(g))))

export default useBoth
