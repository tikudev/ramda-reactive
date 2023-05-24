import { computed, unref } from 'vue'
import { lens, curryN } from 'ramda'

/**
 * Returns a lens for the given getter and setter functions. The getter "gets"
 * the value of the focus; the setter "sets" the value of the focus. The setter
 * should not mutate the data structure.
 *
 * @param {import('./types').MaybeRef<Function>} getter 
 * @param {import('./types').MaybeRef<Function>} setter 
 * @return {import('vue').ComputedRef<Lens>} 
*/
const useLens = curryN(2,(getter, setter) => computed(() => lens(typeof getter === 'function' ? (...fnArgs) => unref(unref(getter)(...fnArgs)) : unref(getter), typeof setter === 'function' ? (...fnArgs) => unref(unref(setter)(...fnArgs)) : unref(setter))))

export default useLens
