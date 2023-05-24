import { computed, unref } from 'vue'
import { of, curryN } from 'ramda'

/**
 * Given a constructor and a value, returns a new instance of that constructor
 * containing the value.
 * 
 * Dispatches to the `fantasy-land/of` method of the constructor first (if present)
 * or to the `of` method last (if present). When neither are present, wraps the
 * value in an array.
 * 
 * Note this `of` is different from the ES6 `of`; See
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of
 *
 * @param {import('./types').MaybeWatchSource<Object>} Ctor A constructor
 * @param {import('./types').MaybeRef<*>} val any value
 * @return {import('vue').ComputedRef<*>} An instance of the `Ctor` wrapping `val`.
*/
const useOf = curryN(2,(Ctor, val) => computed(() => of(typeof Ctor === 'function' ? Ctor() : unref(Ctor), typeof val === 'function' ? (...fnArgs) => unref(unref(val)(...fnArgs)) : unref(val))))

export default useOf
