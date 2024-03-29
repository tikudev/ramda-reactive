import { computed, unref } from 'vue'
import { transduce, curryN } from 'ramda'

/**
 * Initializes a transducer using supplied iterator function. Returns a single
 * item by iterating through the list, successively calling the transformed
 * iterator function and passing it an accumulator value and the current value
 * from the array, and then passing the result to the next call.
 * 
 * The iterator function receives two values: *(acc, value)*. It will be
 * wrapped as a transformer to initialize the transducer. A transformer can be
 * passed directly in place of an iterator function. In both cases, iteration
 * may be stopped early with the [`R.reduced`](#reduced) function.
 * 
 * A transducer is a function that accepts a transformer and returns a
 * transformer and can be composed directly.
 * 
 * A transformer is an object that provides a 2-arity reducing iterator
 * function, step, 0-arity initial value function, init, and 1-arity result
 * extraction function, result. The step function is used as the iterator
 * function in reduce. The result function is used to convert the final
 * accumulator into the return type and in most cases is
 * [`R.identity`](#identity). The init function can be used to provide an
 * initial accumulator, but is ignored by transduce.
 * 
 * The iteration is performed with [`R.reduce`](#reduce) after initializing the transducer.
 *
 * @param {import('./types').MaybeRef<Function>} xf The transducer function. Receives a transformer and returns a transformer.
 * @param {import('./types').MaybeRef<Function>} fn The iterator function. Receives two values, the accumulator and the current element from the array. Wrapped as transformer, if necessary, and used to initialize the transducer
 * @param {import('./types').MaybeRef<*>} acc The initial accumulator value.
 * @param {import('./types').MaybeWatchSource<Array>} list The list to iterate over.
 * @return {import('vue').ComputedRef<*>} The final, accumulated value.
*/
const useTransduce = curryN(4,(xf, fn, acc, list) => computed(() => transduce(typeof xf === 'function' ? (...fnArgs) => unref(unref(xf)(...fnArgs)) : unref(xf), typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof acc === 'function' ? (...fnArgs) => unref(unref(acc)(...fnArgs)) : unref(acc), typeof list === 'function' ? list() : unref(list))))

export default useTransduce
