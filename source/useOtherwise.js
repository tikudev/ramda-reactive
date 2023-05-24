import { computed, unref } from 'vue'
import { otherwise, curryN } from 'ramda'

/**
 * Returns the result of applying the onFailure function to the value inside
 * a failed promise. This is useful for handling rejected promises
 * inside function compositions.
 *
 * @param {import('./types').MaybeRef<Function>} onFailure The function to apply. Can return a value or a promise of a value.
 * @param {import('./types').MaybeWatchSource<Promise>} p 
 * @return {import('vue').ComputedRef<Promise>} The result of calling `p.then(null, onFailure)`
*/
const useOtherwise = curryN(2,(onFailure, p) => computed(() => otherwise(typeof onFailure === 'function' ? (...fnArgs) => unref(unref(onFailure)(...fnArgs)) : unref(onFailure), typeof p === 'function' ? p() : unref(p))))

export default useOtherwise
