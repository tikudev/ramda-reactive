import { computed, unref } from 'vue'
import { ifElse, curryN } from 'ramda'

/**
 * Creates a function that will process either the `onTrue` or the `onFalse`
 * function depending upon the result of the `condition` predicate.
 * 
 * Note that `ifElse` takes its arity from the longest of the three functions passed to it.
 *
 * @param {import('./types').MaybeRef<Function>} condition A predicate function
 * @param {import('./types').MaybeRef<Function>} onTrue A function to invoke when the `condition` evaluates to a truthy value.
 * @param {import('./types').MaybeRef<Function>} onFalse A function to invoke when the `condition` evaluates to a falsy value.
 * @return {import('vue').ComputedRef<Function>} A new function that will process either the `onTrue` or the `onFalse` function depending upon the result of the `condition` predicate.
*/
const useIfElse = curryN(3,(condition, onTrue, onFalse) => computed(() => ifElse(typeof condition === 'function' ? (...fnArgs) => unref(unref(condition)(...fnArgs)) : unref(condition), typeof onTrue === 'function' ? (...fnArgs) => unref(unref(onTrue)(...fnArgs)) : unref(onTrue), typeof onFalse === 'function' ? (...fnArgs) => unref(unref(onFalse)(...fnArgs)) : unref(onFalse))))

export default useIfElse
