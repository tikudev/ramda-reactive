import { computed, unref } from 'vue'
import { unwind, curryN } from 'ramda'

/**
 * Deconstructs an array field from the input documents to output a document for each element.
 * Each output document is the input document with the value of the array field replaced by the element.
 *
 * @param {import('./types').MaybeWatchSource<String>} key The key to determine which property of the object should be unwind
 * @param {import('./types').MaybeWatchSource<Object>} object The object containing list under property named as key which is to unwind
 * @return {import('vue').ComputedRef<List>} A new list of object containing the value of input key having list replaced by each element in the object.
*/
const useUnwind = curryN(2,(key, object) => computed(() => unwind(typeof key === 'function' ? key() : unref(key), typeof object === 'function' ? object() : unref(object))))

export default useUnwind
