import { computed, unref } from 'vue'
import { modifyPath, curryN } from 'ramda'

/**
 * Creates a shallow clone of the passed object by applying an `fn` function
 * to the value at the given path.
 * 
 * The function will not be invoked, and the object will not change
 * if its corresponding path does not exist in the object.
 * All non-primitive properties are copied to the new object by reference.
 *
 * @param {import('./types').MaybeWatchSource<Array>} path The path to be modified.
 * @param {import('./types').MaybeRef<Function>} fn The function to apply to the path.
 * @param {import('./types').MaybeWatchSource<Object>} object The object to be transformed.
 * @return {import('vue').ComputedRef<Object>} The transformed object.
*/
const useModifyPath = curryN(3,(_path, fn, object) => computed(() => modifyPath(typeof _path === 'function' ? _path() : unref(_path), typeof fn === 'function' ? (...fnArgs) => unref(unref(fn)(...fnArgs)) : unref(fn), typeof object === 'function' ? object() : unref(object))))

export default useModifyPath
