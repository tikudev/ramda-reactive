import { computed, unref } from 'vue'
import { dropLastWhile, curryN } from 'ramda'

/**
 * Returns a new list excluding all the tailing elements of a given list which
 * satisfy the supplied predicate function. It passes each value from the right
 * to the supplied predicate function, skipping elements until the predicate
 * function returns a `falsy` value. The predicate function is applied to one argument:
 * *(value)*.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param {import('./types').MaybeRef<Function>} predicate The function to be called on each element
 * @param {import('./types').MaybeWatchSource<Array>} xs The collection to iterate over.
 * @return {import('vue').ComputedRef<Array>} A new array without any trailing elements that return `falsy` values from the `predicate`.
*/
const useDropLastWhile = curryN(2,(predicate, xs) => computed(() => dropLastWhile(typeof predicate === 'function' ? (...fnArgs) => unref(unref(predicate)(...fnArgs)) : unref(predicate), typeof xs === 'function' ? xs() : unref(xs))))

export default useDropLastWhile
