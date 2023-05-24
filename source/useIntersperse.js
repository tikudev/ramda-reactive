import { computed, unref } from 'vue'
import { intersperse, curryN } from 'ramda'

/**
 * Creates a new list with the separator interposed between elements.
 * 
 * Dispatches to the `intersperse` method of the second argument, if present.
 *
 * @param {import('./types').MaybeRef<*>} separator The element to add to the list.
 * @param {import('./types').MaybeWatchSource<Array>} list The list to be interposed.
 * @return {import('vue').ComputedRef<Array>} The new list.
*/
const useIntersperse = curryN(2,(separator, list) => computed(() => intersperse(typeof separator === 'function' ? (...fnArgs) => unref(unref(separator)(...fnArgs)) : unref(separator), typeof list === 'function' ? list() : unref(list))))

export default useIntersperse
