import { computed, unref } from 'vue'
import { traverse, curryN } from 'ramda'

/**
 * Maps an [Applicative](https://github.com/fantasyland/fantasy-land#applicative)-returning
 * function over a [Traversable](https://github.com/fantasyland/fantasy-land#traversable),
 * then uses [`sequence`](#sequence) to transform the resulting Traversable of Applicative
 * into an Applicative of Traversable.
 * 
 * Dispatches to the `traverse` method of the third argument, if present.
 *
 * @param {import('./types').MaybeRef<Object|Function>} TypeRepresentative with an `of` or `fantasy-land/of` method
 * @param {import('./types').MaybeRef<Function>} f 
 * @param {import('./types').MaybeRef<*>} traversable 
 * @return {import('vue').ComputedRef<*>} 
*/
const useTraverse = curryN(3,(TypeRepresentative, f, traversable) => computed(() => traverse(typeof TypeRepresentative === 'function' ? (...fnArgs) => unref(unref(TypeRepresentative)(...fnArgs)) : unref(TypeRepresentative), typeof f === 'function' ? (...fnArgs) => unref(unref(f)(...fnArgs)) : unref(f), typeof traversable === 'function' ? (...fnArgs) => unref(unref(traversable)(...fnArgs)) : unref(traversable))))

export default useTraverse
