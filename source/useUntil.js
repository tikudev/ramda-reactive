import { computed, unref } from 'vue'
import { until, curryN } from 'ramda'

/**
 * Takes a predicate, a transformation function, and an initial value,
 * and returns a value of the same type as the initial value.
 * It does so by applying the transformation until the predicate is satisfied,
 * at which point it returns the satisfactory value.
 *
 * @param {import('./types').MaybeRef<Function>} pred A predicate function
 * @param {import('./types').MaybeRef<Function>} fn The iterator function
 * @param {import('./types').MaybeRef<*>} init Initial value
 * @return {import('vue').ComputedRef<*>} Final value that satisfies predicate
*/
const useUntil = curryN(3,(pred, fn, _init) => computed(() => until(typeof pred === 'function' ? (...fnArgs) => unref(unref(pred)(...fnArgs)) : unref(pred), typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof _init === 'function' ? (...fnArgs) => unref(unref(_init)(...fnArgs)) : unref(_init))))

export default useUntil
