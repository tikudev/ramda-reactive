import { computed, unref } from 'vue'
import { empty } from 'ramda'

/**
 * Returns the empty value of its argument's type. Ramda defines the empty
 * value of Array (`[]`), Object (`{}`), String (`''`),
 * TypedArray (`Uint8Array []`, `Float32Array []`, etc), and Arguments. Other
 * types are supported if they define `<Type>.empty`,
 * `<Type>.prototype.empty` or implement the
 * [FantasyLand Monoid spec](https://github.com/fantasyland/fantasy-land#monoid).
 * 
 * Dispatches to the `empty` method of the first argument, if present.
 *
 * @param {import('./types').MaybeRef<*>} x 
 * @return {import('vue').ComputedRef<*>} 
*/
const useEmpty = (x) => computed(() => empty(typeof x === 'function' ? (...fnArgs) => unref(unref(x)(...fnArgs)) : unref(x)))

export default useEmpty
