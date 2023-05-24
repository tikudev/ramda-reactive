import { computed, unref } from 'vue'
import { useWith, curryN } from 'ramda'

/**
 * Accepts a function `fn` and a list of transformer functions and returns a
 * new curried function. When the new function is invoked, it calls the
 * function `fn` with parameters consisting of the result of calling each
 * supplied handler on successive arguments to the new function.
 * 
 * If more arguments are passed to the returned function than transformer
 * functions, those arguments are passed directly to `fn` as additional
 * parameters. If you expect additional arguments that don't need to be
 * transformed, although you can ignore them, it's best to pass an identity
 * function so that the new function reports the correct arity.
 *
 * @param {import('./types').MaybeRef<Function>} fn The function to wrap.
 * @param {import('./types').MaybeWatchSource<Array>} transformers A list of transformer functions
 * @return {import('vue').ComputedRef<Function>} The wrapped function.
*/
const useUseWith = curryN(2,(fn, transformers) => computed(() => useWith(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof transformers === 'function' ? transformers() : unref(transformers))))

export default useUseWith
