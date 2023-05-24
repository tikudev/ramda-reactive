import { computed, unref } from 'vue'
import { project, curryN } from 'ramda'

/**
 * Reasonable analog to SQL `select` statement.
 *
 * @param {import('./types').MaybeWatchSource<Array>} props The property names to project
 * @param {import('./types').MaybeWatchSource<Array>} objs The objects to query
 * @return {import('vue').ComputedRef<Array>} An array of objects with just the `props` properties.
*/
const useProject = curryN(2,(_props, objs) => computed(() => project(typeof _props === 'function' ? _props() : unref(_props), typeof objs === 'function' ? objs() : unref(objs))))

export default useProject
