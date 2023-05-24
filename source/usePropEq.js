import { computed, unref } from 'vue'
import { propEq, curryN } from 'ramda'

/**
 * Returns `true` if the specified object property is equal, in
 * [`R.equals`](#equals) terms, to the given value; `false` otherwise.
 * You can test multiple properties with [`R.whereEq`](#whereEq),
 * and test nested path property with [`R.pathEq`](#pathEq).
 *
 * @param {import('./types').MaybeRef<*>} val The value to compare the property with
 * @param {import('./types').MaybeWatchSource<String>} name the specified object property's key
 * @param {import('./types').MaybeRef<*>} obj The object to check the property in
 * @return {import('vue').ComputedRef<Boolean>} `true` if the value equals the specified object property, `false` otherwise.
*/
const usePropEq = curryN(3,(val, name, obj) => computed(() => propEq(typeof val === 'function' ? (...fnArgs) => unref(unref(val)(...fnArgs)) : unref(val), typeof name === 'function' ? name() : unref(name), typeof obj === 'function' ? (...fnArgs) => unref(unref(obj)(...fnArgs)) : unref(obj))))

export default usePropEq
