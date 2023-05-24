import { computed, unref } from 'vue'
import { add, curryN } from 'ramda'

/**
 * Adds two values.
 *
 * @param {import('./types').MaybeWatchSource<Number>} a 
 * @param {import('./types').MaybeWatchSource<Number>} b 
 * @return {import('vue').ComputedRef<Number>} 
*/
const useAdd = curryN(2,(a, b) => computed(() => add(typeof a === 'function' ? a() : unref(a), typeof b === 'function' ? b() : unref(b))))

export default useAdd
