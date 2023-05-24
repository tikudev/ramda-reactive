import { computed, unref } from 'vue'
import { mapAccum, curryN } from 'ramda'

/**
 * The `mapAccum` function behaves like a combination of map and reduce; it
 * applies a function to each element of a list, passing an accumulating
 * parameter from left to right, and returning a final value of this
 * accumulator together with the new list.
 * 
 * The iterator function receives two arguments, *acc* and *value*, and should
 * return a tuple *[acc, value]*.
 *
 * @param {import('./types').MaybeRef<Function>} fn The function to be called on every element of the input `list`.
 * @param {import('./types').MaybeRef<*>} acc The accumulator value.
 * @param {import('./types').MaybeWatchSource<Array>} list The list to iterate over.
 * @return {import('vue').ComputedRef<*>} The final, accumulated value.
*/
const useMapAccum = curryN(3,(fn, acc, list) => computed(() => mapAccum(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof acc === 'function' ? (...fnArgs) => unref(unref(acc)(...fnArgs)) : unref(acc), typeof list === 'function' ? list() : unref(list))))

export default useMapAccum
