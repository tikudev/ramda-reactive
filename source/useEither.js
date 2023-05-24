import { computed, unref } from 'vue'
import { either, curryN } from 'ramda'

/**
 * A function wrapping calls to the two functions in an `||` operation,
 * returning the result of the first function if it is truth-y and the result
 * of the second function otherwise. Note that this is short-circuited,
 * meaning that the second function will not be invoked if the first returns a
 * truth-y value.
 * 
 * In addition to functions, `R.either` also accepts any fantasy-land compatible
 * applicative functor.
 *
 * @param {import('./types').MaybeRef<Function>} f a predicate
 * @param {import('./types').MaybeRef<Function>} g another predicate
 * @return {import('vue').ComputedRef<Function>} a function that applies its arguments to `f` and `g` and `||`s their outputs together.
*/
const useEither = curryN(2,(f, g) => computed(() => either(typeof f === 'function' ? (...fnArgs) => unref(unref(f)(...fnArgs)) : unref(f), typeof g === 'function' ? (...fnArgs) => unref(unref(g)(...fnArgs)) : unref(g))))

export default useEither
