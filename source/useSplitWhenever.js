import { computed, unref } from 'vue'
import { splitWhenever, curryN } from 'ramda'

/**
 * Splits an array into slices on every occurrence of a value.
 *
 * @param {import('./types').MaybeRef<Function>} pred The predicate that determines where the array is split.
 * @param {import('./types').MaybeWatchSource<Array>} list The array to be split.
 * @return {import('vue').ComputedRef<Array>} 
*/
const useSplitWhenever = curryN(2,(pred, list) => computed(() => splitWhenever(typeof pred === 'function' ? (...fnArgs) => unref(unref(pred)(...fnArgs)) : unref(pred), typeof list === 'function' ? list() : unref(list))))

export default useSplitWhenever
