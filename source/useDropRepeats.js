import { computed, unref } from 'vue'
import { dropRepeats } from 'ramda'

/**
 * Returns a new list without any consecutively repeating elements.
 * [`R.equals`](#equals) is used to determine equality.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param {import('./types').MaybeWatchSource<Array>} list The array to consider.
 * @return {import('vue').ComputedRef<Array>} `list` without repeating elements.
*/
const useDropRepeats = (list) => computed(() => dropRepeats(typeof list === 'function' ? list() : unref(list)))

export default useDropRepeats
