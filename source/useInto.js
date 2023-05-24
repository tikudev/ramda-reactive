import { computed, unref } from 'vue'
import { into, curryN } from 'ramda'

/**
 * Transforms the items of the list with the transducer and appends the
 * transformed items to the accumulator using an appropriate iterator function
 * based on the accumulator type.
 * 
 * The accumulator can be an array, string, object or a transformer. Iterated
 * items will be appended to arrays and concatenated to strings. Objects will
 * be merged directly or 2-item arrays will be merged as key, value pairs.
 * 
 * The accumulator can also be a transformer object that provides a 2-arity
 * reducing iterator function, step, 0-arity initial value function, init, and
 * 1-arity result extraction function result. The step function is used as the
 * iterator function in reduce. The result function is used to convert the
 * final accumulator into the return type and in most cases is R.identity. The
 * init function is used to provide the initial accumulator.
 * 
 * The iteration is performed with [`R.reduce`](#reduce) after initializing the
 * transducer.
 *
 * @param {import('./types').MaybeRef<*>} acc The initial accumulator value.
 * @param {import('./types').MaybeRef<Function>} xf The transducer function. Receives a transformer and returns a transformer.
 * @param {import('./types').MaybeWatchSource<Array>} list The list to iterate over.
 * @return {import('vue').ComputedRef<*>} The final, accumulated value.
*/
const useInto = curryN(3,(acc, xf, list) => computed(() => into(typeof acc === 'function' ? (...fnArgs) => unref(unref(acc)(...fnArgs)) : unref(acc), typeof xf === 'function' ? (...fnArgs) => unref(unref(xf)(...fnArgs)) : unref(xf), typeof list === 'function' ? list() : unref(list))))

export default useInto
