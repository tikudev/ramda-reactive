import { computed, unref } from 'vue'
import { modify, curryN } from 'ramda'

/**
 * Creates a copy of the passed object by applying an `fn` function to the given `prop` property.
 * 
 * The function will not be invoked, and the object will not change
 * if its corresponding property does not exist in the object.
 * All non-primitive properties are copied to the new object by reference.
 *
 * @param {import('./types').MaybeWatchSource<String|Number>} prop The property to be modified.
 * @param {import('./types').MaybeRef<Function>} fn The function to apply to the property.
 * @param {import('./types').MaybeWatchSource<Object>} object The object to be transformed.
 * @return {import('vue').ComputedRef<Object>} The transformed object.
*/
const useModify = curryN(3,(_prop, fn, object) => computed(() => modify(typeof _prop === 'function' ? _prop() : unref(_prop), typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof object === 'function' ? object() : unref(object))))

export default useModify
