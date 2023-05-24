import { computed, unref } from 'vue'
import { reject, curryN } from 'ramda'

/**
 * The complement of [`filter`](#filter).
 * 
 * Acts as a transducer if a transformer is given in list position. Filterable
 * objects include plain objects or any object that has a filter method such
 * as `Array`.
 *
 * @param {import('./types').MaybeRef<Function>} pred 
 * @param {import('./types').MaybeWatchSource<Array>} filterable 
 * @return {import('vue').ComputedRef<Array>} 
*/
const useReject = curryN(2,(pred, filterable) => computed(() => reject(typeof pred === 'function' ? (...fnArgs) => unref(unref(pred)(...fnArgs)) : unref(pred), typeof filterable === 'function' ? filterable() : unref(filterable))))

export default useReject
