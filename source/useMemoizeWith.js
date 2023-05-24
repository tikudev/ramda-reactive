import { computed, unref } from 'vue'
import { memoizeWith, curryN } from 'ramda'

/**
 * Takes a string-returning function `keyGen` and a function `fn` and returns
 * a new function that returns cached results for subsequent
 * calls with the same arguments.
 * 
 * When the function is invoked, `keyGen` is applied to the same arguments
 * and its result becomes the cache key. If the cache contains something
 * under that key, the function simply returns it and does not invoke `fn` at all.
 * 
 * Otherwise `fn` is applied to the same arguments and its return value
 * is cached under that key and returned by the function.
 * 
 * Care must be taken when implementing `keyGen` to avoid key collision,
 * or if tracking references, memory leaks and mutating arguments.
 *
 * @param {import('./types').MaybeRef<Function>} keyGen The function to generate the cache key.
 * @param {import('./types').MaybeRef<Function>} fn The function to memoize.
 * @return {import('vue').ComputedRef<Function>} Memoized version of `fn`.
*/
const useMemoizeWith = curryN(2,(keyGen, fn) => computed(() => memoizeWith(typeof keyGen === 'function' ? (...fnArgs) => unref(unref(keyGen)(...fnArgs)) : unref(keyGen), typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn))))

export default useMemoizeWith
