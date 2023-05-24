import { computed, unref } from 'vue'
import { sequence, curryN } from 'ramda'

/**
 * Transforms a [Traversable](https://github.com/fantasyland/fantasy-land#traversable)
 * of [Applicative](https://github.com/fantasyland/fantasy-land#applicative) into an
 * Applicative of Traversable.
 * 
 * Dispatches to the `"fantasy-land/traverse"` or the `traverse` method of the second argument, if present.
 *
 * @param {import('./types').MaybeRef<Object|Function>} TypeRepresentative with an `of` or `fantasy-land/of` method
 * @param {import('./types').MaybeRef<*>} traversable 
 * @return {import('vue').ComputedRef<*>} 
*/
const useSequence = curryN(2,(TypeRepresentative, traversable) => computed(() => sequence(typeof TypeRepresentative === 'function' ? (...fnArgs) => unref(unref(TypeRepresentative)(...fnArgs)) : unref(TypeRepresentative), typeof traversable === 'function' ? (...fnArgs) => unref(unref(traversable)(...fnArgs)) : unref(traversable))))

export default useSequence
