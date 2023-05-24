import { computed, unref } from 'vue'
import { unnest } from 'ramda'

/**
 * Shorthand for `R.chain(R.identity)`, which removes one level of nesting from
 * any [Chain](https://github.com/fantasyland/fantasy-land#chain).
 *
 * @param {import('./types').MaybeRef<*>} list 
 * @return {import('vue').ComputedRef<*>} 
*/
const useUnnest = (list) => computed(() => unnest(typeof list === 'function' ? (...fnArgs) => unref(unref(list)(...fnArgs)) : unref(list)))

export default useUnnest
