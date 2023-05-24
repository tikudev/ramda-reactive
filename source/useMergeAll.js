import { computed, unref } from 'vue'
import { mergeAll } from 'ramda'

/**
 * Creates one new object with the own properties from a list of objects.
 * If a key exists in more than one object, the value from the last
 * object it exists in will be used.
 *
 * @param {import('./types').MaybeWatchSource<Array>} list An array of objects
 * @return {import('vue').ComputedRef<Object>} A merged object.
*/
const useMergeAll = (list) => computed(() => mergeAll(typeof list === 'function' ? list() : unref(list)))

export default useMergeAll
