import { computed, unref } from 'vue'
import { invoker, curryN } from 'ramda'

/**
 * Given an `arity` (Number) and a `name` (String) the `invoker` function
 * returns a curried function that takes `arity` arguments and a `context`
 * object. It will "invoke" the `name`'d function (a method) on the `context`
 * object.
 *
 * @param {import('./types').MaybeWatchSource<Number>} arity Number of arguments the returned function should take before the target object.
 * @param {import('./types').MaybeWatchSource<String>} method Name of any of the target object's methods to call.
 * @return {import('vue').ComputedRef<Function>} A new curried function.
*/
const useInvoker = curryN(2,(arity, method) => computed(() => invoker(typeof arity === 'function' ? arity() : unref(arity), typeof method === 'function' ? method() : unref(method))))

export default useInvoker
