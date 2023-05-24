import { computed, unref } from 'vue'
import { descend, curryN } from 'ramda'

/**
 * Makes a descending comparator function out of a function that returns a value
 * that can be compared with `<` and `>`.
 *
 * @param {import('./types').MaybeRef<Function>} fn A function of arity one that returns a value that can be compared
 * @param {import('./types').MaybeRef<*>} a The first item to be compared.
 * @param {import('./types').MaybeRef<*>} b The second item to be compared.
 * @return {import('vue').ComputedRef<Number>} `-1` if fn(a) > fn(b), `1` if fn(b) > fn(a), otherwise `0`
*/
const useDescend = curryN(3,(fn, a, b) => computed(() => descend(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof a === 'function' ? (...fnArgs) => unref(unref(a)(...fnArgs)) : unref(a), typeof b === 'function' ? (...fnArgs) => unref(unref(b)(...fnArgs)) : unref(b))))

export default useDescend
