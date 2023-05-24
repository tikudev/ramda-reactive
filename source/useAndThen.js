import { computed, unref } from 'vue'
import { andThen, curryN } from 'ramda'

/**
 * Returns the result of applying the onSuccess function to the value inside
 * a successfully resolved promise. This is useful for working with promises
 * inside function compositions.
 *
 * @param {import('./types').MaybeRef<Function>} onSuccess The function to apply. Can return a value or a promise of a value.
 * @param {import('./types').MaybeWatchSource<Promise>} p 
 * @return {import('vue').ComputedRef<Promise>} The result of calling `p.then(onSuccess)`
*/
const useAndThen = curryN(2,(onSuccess, p) => computed(() => andThen(typeof onSuccess === 'function' ? (...fnArgs) => unref(unref(onSuccess)(...fnArgs)) : unref(onSuccess), typeof p === 'function' ? p() : unref(p))))

export default useAndThen
