import { computed, unref } from 'vue'
import { toString } from 'ramda'

/**
 * Returns the string representation of the given value. `eval`'ing the output
 * should result in a value equivalent to the input value. Many of the built-in
 * `toString` methods do not satisfy this requirement.
 * 
 * If the given value is an `[object Object]` with a `toString` method other
 * than `Object.prototype.toString`, this method is invoked with no arguments
 * to produce the return value. This means user-defined constructor functions
 * can provide a suitable `toString` method. For example:
 * 
 * function Point(x, y) {
 * this.x = x;
 * this.y = y;
 * }
 * 
 * Point.prototype.toString = function() {
 * return 'new Point(' + this.x + ', ' + this.y + ')';
 * };
 * 
 * R.toString(new Point(1, 2)); //=> 'new Point(1, 2)'
 *
 * @param {import('./types').MaybeRef<*>} val 
 * @return {import('vue').ComputedRef<String>} 
*/
const useToString = (val) => computed(() => toString(typeof val === 'function' ? (...fnArgs) => unref(unref(val)(...fnArgs)) : unref(val)))

export default useToString
