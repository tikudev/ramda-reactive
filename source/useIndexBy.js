import { computed, unref } from 'vue'
import { indexBy, curryN } from 'ramda'

/**
 * Given a function that generates a key, turns a list of objects into an
 * object indexing the objects by the given key. Note that if multiple
 * objects generate the same value for the indexing key only the last value
 * will be included in the generated object.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param {import('./types').MaybeRef<Function>} fn Function :: a -> Idx
 * @param {import('./types').MaybeWatchSource<Array>} array The array of objects to index
 * @return {import('vue').ComputedRef<Object>} An object indexing each array element by the given property.
*/
const useIndexBy = curryN(2,(fn, array) => computed(() => indexBy(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof array === 'function' ? array() : unref(array))))

export default useIndexBy
