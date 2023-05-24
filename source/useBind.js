import { computed, unref } from 'vue'
import { bind, curryN } from 'ramda'

/**
 * Creates a function that is bound to a context.
 * Note: `R.bind` does not provide the additional argument-binding capabilities of
 * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
 *
 * @param {import('./types').MaybeRef<Function>} fn The function to bind to context
 * @param {import('./types').MaybeWatchSource<Object>} thisObj The context to bind `fn` to
 * @return {import('vue').ComputedRef<Function>} A function that will execute in the context of `thisObj`.
*/
const useBind = curryN(2,(fn, thisObj) => computed(() => bind(typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof thisObj === 'function' ? thisObj() : unref(thisObj))))

export default useBind
