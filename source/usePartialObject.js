import { computed, unref } from 'vue'
import { partialObject, curryN } from 'ramda'

/**
 * Takes a function `f` and an object, and returns a function `g`.
 * When applied, `g` returns the result of applying `f` to the object
 * provided initially merged deeply (right) with the object provided as an argument to `g`.
 *
 * @param {import('./types').MaybeRef<Function>} f 
 * @param {import('./types').MaybeWatchSource<Object>} props 
 * @return {import('vue').ComputedRef<Function>} 
*/
const usePartialObject = curryN(2,(f, _props) => computed(() => partialObject(typeof f === 'function' ? (...fnArgs) => unref(unref(f)(...fnArgs)) : unref(f), typeof _props === 'function' ? _props() : unref(_props))))

export default usePartialObject
