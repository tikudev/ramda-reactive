import { Ref, WatchSource, ComputedRef } from 'vue'
import * as _ from 'ts-toolbelt'
import {
  AtLeastOneFunctionsFlow,
  AtLeastOneFunctionsFlowFromRightToLeft,
  CondPair,
  CondPairTypeguard,
  Evolvable,
  Evolve,
  Evolver,
  Falsy,
  Functor,
  InferAnyAType,
  KeyValuePair,
  Lens,
  InferAllAType,
  mergeArrWithLeft,
  LargestArgumentsList,
  IfFunctionsArgumentsDoNotOverlap,
  ObjPred,
  Ord,
  LT,
  EQ,
  GT,
  Ordering,
  ObjectHavingSome,
  PartialRecord,
  Path,
  Placeholder,
  Pred,
  PredTypeguard,
  Reduced,
  Fn,
  ReturnTypesOfFns,
  InputTypesOfFns,
  ValueOfUnion,
  Take,
  Tuple,
  ToTupleOfArray,
  ToTupleOfFunction,
  Prop,
  DeepModify,
} from '@types/ramda'

/**
 * Either a Ref containing a type or the type itself
 */
type MaybeRef<T> = Ref<T> | T

/**
 * Either a Watchsource with the type or the type itself
 */
type MaybeWatchSource<T> = WatchSource<T> | T




/**
 * Adds two values.
 *
 * See also {@link subtract}
 *
 * @example
 * ```typescript
 * R.add(2, 3);       //=>  5
 * R.add(7)(10);      //=> 17
 * ```
 */
export function useAdd(a: MaybeWatchSource<number>): (b: MaybeWatchSource<number>) => ComputedRef<number>;
export function useAdd(a: MaybeWatchSource<number>, b: MaybeWatchSource<number>): ComputedRef<number>;


/**
 * Creates a new list iteration function from an existing one by adding two new
 * parameters to its callback function: the current index, and the entire list.
 * 
 * This would turn, for instance, [`R.map`](#map) function into one that
 * more closely resembles `Array.prototype.map`. Note that this will only work
 * for functions in which the iteration callback function is the first
 * parameter, and where the list is the last parameter. (This latter might be
 * unimportant if the list parameter is not used.)
 *
 * @example
 * ```typescript
 * const mapIndexed = R.addIndex(R.map);
 * mapIndexed((val, idx) => idx + '-' + val, ['f', 'o', 'o', 'b', 'a', 'r']);
 * //=> ['0-f', '1-o', '2-o', '3-b', '4-a', '5-r']
 * ```
 */
export function useAddIndex<T>(
  fn: MaybeRef<(f: (item: T) => void, list: readonly T[]) => T[]>,
): ComputedRef<_.F.Curry<(a: (item: T, idx: number, list: T[]) => void, b: readonly T[]) => T[]>>;
// Special case for filter
export function useAddIndex<T>(
  fn: MaybeRef<(f: (item: T) => boolean, list: readonly T[]) => T[]>,
): ComputedRef<_.F.Curry<(a: (item: T, idx: number, list: T[]) => boolean, b: readonly T[]) => T[]>>;
// Special case for map
export function useAddIndex<T, U>(
  fn: MaybeRef<(f: (item: T) => U, list: readonly T[]) => U[]>,
): ComputedRef<_.F.Curry<(a: (item: T, idx: number, list: T[]) => U, b: readonly T[]) => U[]>>;
// Special case for reduce
export function useAddIndex<T, U>(
  fn: MaybeRef<(f: (acc: U, item: T) => U, aci: U, list: readonly T[]) => U>,
): ComputedRef<_.F.Curry<(a: (acc: U, item: T, idx: number, list: T[]) => U, b: U, c: readonly T[]) => U>>;


/**
 * Applies a function to the value at the given index of an array, returning a
 * new copy of the array with the element at the given index replaced with the
 * result of the function application.
 *
 * See also {@link update}
 *
 * @example
 * ```typescript
 * R.adjust(1, R.toUpper, ['a', 'b', 'c', 'd']);      //=> ['a', 'B', 'c', 'd']
 * R.adjust(-1, R.toUpper, ['a', 'b', 'c', 'd']);     //=> ['a', 'b', 'c', 'D']
 * ```
 */
export function useAdjust(index: MaybeWatchSource<number>): {
  // adjust(index)(fn, list)
  <T>(fn: MaybeRef<(a: T) => T>, list: MaybeWatchSource<readonly T[]>): ComputedRef<T[]>;
  // adjust(index)(__, list)(fn)
  <T>(__: Placeholder, list: MaybeRef<readonly T[]>): (fn: MaybeWatchSource<(a: T) => T>) => ComputedRef<T[]>;
  // adjust(index)(fn)(list)
  <T>(fn: MaybeRef<(a: T) => T>): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<T[]>;
};

// adjust(__, fn)
export function useAdjust<T>(__: Placeholder, fn: MaybeWatchSource<(a: T) => T>): {
  // adjust(__, fn)(list)(index)
  (list: MaybeRef<readonly T[]>): (index: MaybeWatchSource<number>) => ComputedRef<T[]>;
  // adjust(__, fn)(__, index)(list)
  (__: Placeholder, index: MaybeRef<number>): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<T[]>;
  // adjust(__, fn)(list, index)
  (list: MaybeRef<readonly T[]>, index: MaybeWatchSource<number>): ComputedRef<T[]>;
};

export function useAdjust<T>(index: MaybeWatchSource<number>, fn: MaybeRef<(a: T) => T>): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<T[]>;

// adjust(index, fn)(list)
export function useAdjust<T>(index: MaybeWatchSource<number>, fn: MaybeRef<(a: T) => T>): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<T[]>;
// adjust(index, fn)(list)
export function useAdjust<T>(index: MaybeWatchSource<number>, fn: MaybeRef<(a: T) => T>): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<T[]>;


// adjust(__, __, list)
export function useAdjust<T>(__: Placeholder, __2: Placeholder, list: MaybeWatchSource<readonly T[]>): {
  // adjust(__, __, list)(index)(fn)
  (index: MaybeRef<number>): (fn: MaybeWatchSource<(a: T) => T>) => ComputedRef<T[]>;
  // adjust(__, __, list)(__, fn)(index)
  (__3: Placeholder, fn: MaybeRef<(a: T) => T>): (index: MaybeWatchSource<number>) => ComputedRef<T[]>;
  // adjust(__, __, list)(index, fn)
  (index: MaybeRef<number>, fn: MaybeWatchSource<(a: T) => T>): ComputedRef<T[]>;
};
// adjust(index, __, list)(fn)
export function useAdjust<T>(index: MaybeWatchSource<number>, __: Placeholder, list: MaybeRef<readonly T[]>): (fn: MaybeWatchSource<(a: T) => T>) => ComputedRef<T[]>;
// adjust(__, fn, list)(index)
export function useAdjust<T>(__: Placeholder, fn: MaybeWatchSource<(a: T) => T>, list: MaybeRef<readonly T[]>): (index: MaybeWatchSource<number>) => ComputedRef<T[]>;

// adjust(index, fn, list)
export function useAdjust<T>(index: MaybeWatchSource<number>, fn: MaybeRef<(a: T) => T>, list: MaybeWatchSource<readonly T[]>): ComputedRef<T[]>;


/**
 * Returns `true` if all elements of the list match the predicate, `false` if
 * there are any that don't.
 * 
 * Dispatches to the `all` method of the second argument, if present.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * See also {@link any}, {@link none}, {@link transduce}
 *
 * @example
 * ```typescript
 * const equals3 = R.equals(3);
 * R.all(equals3)([3, 3, 3, 3]); //=> true
 * R.all(equals3)([3, 3, 1, 3]); //=> false
 * ```
 */
export function useAll<T>(fn: MaybeRef<(a: T) => boolean>): {
  // all (fn)({ all })
  <U extends { all: (fn: (a: T) => boolean) => boolean }>(obj: MaybeWatchSource<U>): ComputedRef<boolean>;
  // all (fn)(list)
  (list: MaybeWatchSource<readonly T[]>): ComputedRef<boolean>;
};

// all(__, { all })(fn)
export function useAll<U extends { all: (fn: (a: any) => boolean) => boolean }>(__: Placeholder, obj: MaybeRef<U>): (fn: MaybeWatchSource<(a: InferAllAType<U>) => boolean>) => ComputedRef<boolean>;
// all(__, list)(fn)
export function useAll<T>(__: Placeholder, list: MaybeRef<readonly T[]>): (fn: MaybeWatchSource<(a: T) => boolean>) => ComputedRef<boolean>;

// all(fn, { all })
export function useAll<T, U extends { all: (fn: (a: T) => boolean) => boolean }>(fn: MaybeRef<(a: T) => boolean>, obj: MaybeWatchSource<U>): ComputedRef<boolean>;
// all(fn, list)
export function useAll<T>(fn: MaybeRef<(a: T) => boolean>, list: MaybeWatchSource<readonly T[]>): ComputedRef<boolean>;


/**
 * Takes a list of predicates and returns a predicate that returns true for a
 * given list of arguments if every one of the provided predicates is satisfied
 * by those arguments.
 * 
 * The function returned is a curried function whose arity matches that of the
 * highest-arity predicate.
 *
 * See also {@link anyPass}, {@link both}
 *
 * @example
 * ```typescript
 * const isQueen = R.propEq('rank', 'Q');
 * const isSpade = R.propEq('suit', '♠︎');
 * const isQueenOfSpades = R.allPass([isQueen, isSpade]);
 * 
 * isQueenOfSpades({rank: 'Q', suit: '♣︎'}); //=> false
 * isQueenOfSpades({rank: 'Q', suit: '♠︎'}); //=> true
 * ```
 */
export function useAllPass<T, TF1 extends T, TF2 extends T>(
  preds: MaybeWatchSource<[PredTypeguard<T, TF1>, PredTypeguard<T, TF2>]>,
): ComputedRef<(a: T) => a is TF1 & TF2>;
export function useAllPass<T, TF1 extends T, TF2 extends T, TF3 extends T>(
  preds: MaybeWatchSource<[PredTypeguard<T, TF1>, PredTypeguard<T, TF2>, PredTypeguard<T, TF3>]>,
): ComputedRef<(a: T) => a is TF1 & TF2 & TF3>;
export function useAllPass<T, TF1 extends T, TF2 extends T, TF3 extends T>(
  preds: MaybeWatchSource<[PredTypeguard<T, TF1>, PredTypeguard<T, TF2>, PredTypeguard<T, TF3>]>,
): ComputedRef<(a: T) => a is TF1 & TF2 & TF3>;
export function useAllPass<T, TF1 extends T, TF2 extends T, TF3 extends T, TF4 extends T>(
  preds: MaybeWatchSource<[PredTypeguard<T, TF1>, PredTypeguard<T, TF2>, PredTypeguard<T, TF3>, PredTypeguard<T, TF4>]>,
): ComputedRef<(a: T) => a is TF1 & TF2 & TF3 & TF4>;
export function useAllPass<T, TF1 extends T, TF2 extends T, TF3 extends T, TF4 extends T, TF5 extends T>(
  preds: MaybeWatchSource<[
    PredTypeguard<T, TF1>,
    PredTypeguard<T, TF2>,
    PredTypeguard<T, TF3>,
    PredTypeguard<T, TF4>,
    PredTypeguard<T, TF5>
  ]>,
): ComputedRef<PredTypeguard<T, TF1 & TF2 & TF3 & TF4 & TF5>>;
export function useAllPass<T, TF1 extends T, TF2 extends T, TF3 extends T, TF4 extends T, TF5 extends T, TF6 extends T>(
  preds: MaybeWatchSource<[
    PredTypeguard<T, TF1>,
    PredTypeguard<T, TF2>,
    PredTypeguard<T, TF3>,
    PredTypeguard<T, TF4>,
    PredTypeguard<T, TF5>,
    PredTypeguard<T, TF6>
  ]>,
): ComputedRef<PredTypeguard<T, TF1 & TF2 & TF3 & TF4 & TF5 & TF6>>;
export function useAllPass<F extends Pred>(preds: MaybeWatchSource<readonly F[]>): ComputedRef<F>;


/**
 * Returns a function that always returns the given value. Note that for
 * non-primitives the value returned is a reference to the original value.
 * 
 * This function is known as `const`, `constant`, or `K` (for K combinator) in
 * other languages and libraries.
 *
 * @example
 * ```typescript
 * const t = R.always('Tee');
 * t(); //=> 'Tee'
 * ```
 */
export function useAlways<T>(val: MaybeRef<T>): ComputedRef<(...args: unknown[]) => T>;


/**
 * Returns the first argument if it is falsy, otherwise the second argument.
 * Acts as the boolean `and` statement if both inputs are `Boolean`s.
 *
 * See also {@link both}, {@link or}
 *
 * @example
 * ```typescript
 * R.and(true, true); //=> true
 * R.and(true, false); //=> false
 * R.and(false, true); //=> false
 * R.and(false, false); //=> false
 * ```
 */
export function useAnd<A>(a: MaybeRef<A>): <B>(b: MaybeRef<B>) => ComputedRef<A | B>;
export function useAnd<B>(__: Placeholder, b: MaybeRef<B>): <A>(a: MaybeRef<A>) => ComputedRef<A | B>;
export function useAnd<A, B>(a: MaybeRef<A>, b: MaybeRef<B>): ComputedRef<A | B>;


/**
 * Returns the result of applying the onSuccess function to the value inside
 * a successfully resolved promise. This is useful for working with promises
 * inside function compositions.
 *
 * See also {@link otherwise}
 *
 * @example
 * ```typescript
 * const makeQuery = email => ({ query: { email }});
 * const fetchMember = request =>
 *   Promise.resolve({ firstName: 'Bob', lastName: 'Loblaw', id: 42 });
 * 
 * //getMemberName :: String -> Promise ({ firstName, lastName })
 * const getMemberName = R.pipe(
 *   makeQuery,
 *   fetchMember,
 *   R.andThen(R.pick(['firstName', 'lastName']))
 * );
 * 
 * getMemberName('bob@gmail.com').then(console.log);
 * ```
 */
export function useAndThen<A, B>(onSuccess: MaybeRef<(a: A) => B | Promise<B>>): (promise: MaybeWatchSource<Promise<A>>) => ComputedRef<Promise<B>>;
export function useAndThen<A>(__: Placeholder, promise: MaybeRef<Promise<A>>): <B>(onSuccess: MaybeWatchSource<(a: A) => B | Promise<B>>) => ComputedRef<Promise<B>>;
export function useAndThen<A, B>(onSuccess: MaybeRef<(a: A) => B | Promise<B>>, promise: MaybeWatchSource<Promise<A>>): ComputedRef<Promise<B>>;


/**
 * Returns `true` if at least one of the elements of the list match the predicate,
 * `false` otherwise.
 * 
 * Dispatches to the `any` method of the second argument, if present.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * See also {@link all}, {@link none}, {@link transduce}
 *
 * @example
 * ```typescript
 * const lessThan0 = R.flip(R.lt)(0);
 * const lessThan2 = R.flip(R.lt)(2);
 * R.any(lessThan0)([1, 2]); //=> false
 * R.any(lessThan2)([1, 2]); //=> true
 * ```
 */
export function useAny<T>(fn: MaybeRef<(a: T) => boolean>): {
  // any(fn)(list)
  (list: MaybeWatchSource<readonly T[]>): ComputedRef<boolean>;
  // all (fn)({ any })
  <U extends { any: (fn: (a: T) => boolean) => boolean }>(obj: MaybeWatchSource<U>): ComputedRef<boolean>;
};

// any(__, list)(fn)
export function useAny<T>(__: Placeholder, list: MaybeRef<readonly T[]>): (fn: MaybeWatchSource<(a: T) => boolean>) => ComputedRef<boolean>;
// any(__, { any })(fn)
export function useAny<U extends { any: (fn: (a: any) => boolean) => boolean }>(___: Placeholder, obj: MaybeRef<U>): (fn: MaybeWatchSource<(a: InferAnyAType<U>) => boolean>) => ComputedRef<boolean>;

// any(fn, list)
export function useAny<T>(fn: MaybeRef<(a: T) => boolean>, list: MaybeWatchSource<readonly T[]>): ComputedRef<boolean>;
// any(fn, { any })
export function useAny<T, U extends { any: (fn: (a: T) => boolean) => boolean }>(fn: MaybeRef<(a: T) => boolean>, obj: MaybeWatchSource<U>): ComputedRef<boolean>;


/**
 * Takes a list of predicates and returns a predicate that returns true for a
 * given list of arguments if at least one of the provided predicates is
 * satisfied by those arguments.
 * 
 * The function returned is a curried function whose arity matches that of the
 * highest-arity predicate.
 *
 * See also {@link allPass}, {@link either}
 *
 * @example
 * ```typescript
 * const isClub = R.propEq('suit', '♣');
 * const isSpade = R.propEq('suit', '♠');
 * const isBlackCard = R.anyPass([isClub, isSpade]);
 * 
 * isBlackCard({rank: '10', suit: '♣'}); //=> true
 * isBlackCard({rank: 'Q', suit: '♠'}); //=> true
 * isBlackCard({rank: 'Q', suit: '♦'}); //=> false
 * ```
 */
export function useAnyPass<T, TF1 extends T, TF2 extends T>(
  preds: MaybeWatchSource<[PredTypeguard<T, TF1>, PredTypeguard<T, TF2>]>,
): ComputedRef<(a: T) => a is TF1 | TF2>;
export function useAnyPass<T, TF1 extends T, TF2 extends T, TF3 extends T>(
  preds: MaybeWatchSource<[PredTypeguard<T, TF1>, PredTypeguard<T, TF2>, PredTypeguard<T, TF3>]>,
): ComputedRef<(a: T) => a is TF1 | TF2 | TF3>;
export function useAnyPass<T, TF1 extends T, TF2 extends T, TF3 extends T>(
  preds: MaybeWatchSource<[PredTypeguard<T, TF1>, PredTypeguard<T, TF2>, PredTypeguard<T, TF3>]>,
): ComputedRef<(a: T) => a is TF1 | TF2 | TF3>;
export function useAnyPass<T, TF1 extends T, TF2 extends T, TF3 extends T, TF4 extends T>(
  preds: MaybeWatchSource<[PredTypeguard<T, TF1>, PredTypeguard<T, TF2>, PredTypeguard<T, TF3>, PredTypeguard<T, TF4>]>,
): ComputedRef<(a: T) => a is TF1 | TF2 | TF3 | TF4>;
export function useAnyPass<T, TF1 extends T, TF2 extends T, TF3 extends T, TF4 extends T, TF5 extends T>(
  preds: MaybeWatchSource<[
    PredTypeguard<T, TF1>,
    PredTypeguard<T, TF2>,
    PredTypeguard<T, TF3>,
    PredTypeguard<T, TF4>,
    PredTypeguard<T, TF5>
  ]>,
): ComputedRef<PredTypeguard<T, TF1 | TF2 | TF3 | TF4 | TF5>>;
export function useAnyPass<T, TF1 extends T, TF2 extends T, TF3 extends T, TF4 extends T, TF5 extends T, TF6 extends T>(
  preds: MaybeWatchSource<[
    PredTypeguard<T, TF1>,
    PredTypeguard<T, TF2>,
    PredTypeguard<T, TF3>,
    PredTypeguard<T, TF4>,
    PredTypeguard<T, TF5>,
    PredTypeguard<T, TF6>
  ]>,
): ComputedRef<PredTypeguard<T, TF1 | TF2 | TF3 | TF4 | TF5 | TF6>>;
export function useAnyPass<F extends Pred>(preds: MaybeWatchSource<readonly F[]>): ComputedRef<F>;


/**
 * ap applies a list of functions to a list of values.
 * 
 * Dispatches to the `ap` method of the first argument, if present. Also
 * treats curried functions as applicatives.
 *
 * @example
 * ```typescript
 * R.ap([R.multiply(2), R.add(3)], [1,2,3]); //=> [2, 4, 6, 4, 5, 6]
 * R.ap([R.concat('tasty '), R.toUpper], ['pizza', 'salad']); //=> ["tasty pizza", "tasty salad", "PIZZA", "SALAD"]
 * 
 * // R.ap can also be used as S combinator
 * // when only two functions are passed
 * R.ap(R.concat, R.toUpper)('Ramda') //=> 'RamdaRAMDA'
 * ```
 */
export function useAp<T, U>(fns: MaybeRef<ReadonlyArray<(a: T) => U>>): (vs: MaybeRef<readonly T[]>) => ComputedRef<U[]>;
export function useAp<R, A, B>(fn: MaybeRef<(r: R, a: A) => B>, fn1: MaybeRef<(r: R) => A>): ComputedRef<(r: R) => B>;
export function useAp<T, U>(fns: MaybeRef<ReadonlyArray<(a: T) => U>>, vs: MaybeRef<readonly T[]>): ComputedRef<U[]>;


/**
 * Returns a new list, composed of n-tuples of consecutive elements. If `n` is
 * greater than the length of the list, an empty list is returned.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * See also {@link transduce}
 *
 * @example
 * ```typescript
 * R.aperture(2, [1, 2, 3, 4, 5]); //=> [[1, 2], [2, 3], [3, 4], [4, 5]]
 * R.aperture(3, [1, 2, 3, 4, 5]); //=> [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
 * R.aperture(7, [1, 2, 3, 4, 5]); //=> []
 * ```
 */
export function useAperture<N extends number>(n: MaybeWatchSource<N>): <T>(list: MaybeWatchSource<readonly T[]>) => ComputedRef<Array<Tuple<T, N>> | []>;
export function useAperture<T>(__: Placeholder, list: MaybeWatchSource<readonly T[]>): <N extends number>(n: MaybeWatchSource<N>) => ComputedRef<Array<Tuple<T, N>> | []>;
export function useAperture<N extends number, T>(n: MaybeWatchSource<N>, list: MaybeWatchSource<readonly T[]>): ComputedRef<Array<Tuple<T, N>> | []>;


/**
 * Returns a new list containing the contents of the given list, followed by
 * the given element.
 *
 * See also {@link prepend}
 *
 * @example
 * ```typescript
 * R.append('tests', ['write', 'more']); //=> ['write', 'more', 'tests']
 * R.append('tests', []); //=> ['tests']
 * R.append(['tests'], ['write', 'more']); //=> ['write', 'more', ['tests']]
 * ```
 */
export function useAppend<T>(el: MaybeRef<T>): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<T[]>;
// append(__, list)(el)
export function useAppend<T>(__: Placeholder, list: MaybeRef<readonly T[]>): (el: MaybeWatchSource<T>) => ComputedRef<T[]>;
// append(el, list)
export function useAppend<T>(el: MaybeRef<T>, list: MaybeWatchSource<readonly T[]>): ComputedRef<T[]>;


/**
 * Applies function `fn` to the argument list `args`. This is useful for
 * creating a fixed-arity function from a variadic function. `fn` should be a
 * bound function if context is significant.
 *
 * See also {@link call}, {@link unapply}
 *
 * @example
 * ```typescript
 * const nums = [1, 2, 3, -99, 42, 6, 7];
 * R.apply(Math.max, nums); //=> 42
 * ```
 */
export function useApply<F extends (...args: readonly any[]) => any>(fn: MaybeRef<F>): (args: MaybeWatchSource<Parameters<F>>) => ComputedRef<ReturnType<F>>;
// apply(args, fn)
// overload Placeholder options with versions for 1-to-5 args for best constraining
export function useApply<A extends readonly [any]>(__: Placeholder, args: MaybeRef<A>): <F extends (...args: A) => any>(fn: MaybeWatchSource<F>) => ComputedRef<ReturnType<F>>;
export function useApply<A extends readonly [any, any]>(__: Placeholder, args: MaybeRef<A>): <F extends (...args: A) => any>(fn: MaybeWatchSource<F>) => ComputedRef<ReturnType<F>>;
export function useApply<A extends readonly [any, any, any]>(__: Placeholder, args: MaybeRef<A>): <F extends (...args: A) => any>(fn: MaybeWatchSource<F>) => ComputedRef<ReturnType<F>>;
export function useApply<A extends readonly [any, any, any, any]>(__: Placeholder, args: MaybeRef<A>): <F extends (...args: A) => any>(fn: MaybeWatchSource<F>) => ComputedRef<ReturnType<F>>;
export function useApply<A extends readonly [any, any, any, any, any]>(__: Placeholder, args: MaybeRef<A>): <F extends (...args: A) => any>(fn: MaybeWatchSource<F>) => ComputedRef<ReturnType<F>>;
export function useApply<A extends readonly any[]>(__: Placeholder, args: MaybeRef<A>): <F extends (...args: A) => any>(fn: MaybeWatchSource<F>) => ComputedRef<ReturnType<F>>;
// apply(args, fn)
export function useApply<F extends (...args: readonly any[]) => any>(fn: MaybeRef<F>, args: MaybeWatchSource<Parameters<F>>): ComputedRef<ReturnType<F>>;


/**
 * Given a spec object recursively mapping properties to functions, creates a
 * function producing an object of the same structure, by mapping each property
 * to the result of calling its associated function with the supplied arguments.
 *
 * See also {@link converge}, {@link juxt}
 *
 * @example
 * ```typescript
 * const getMetrics = R.applySpec({
 *   sum: R.add,
 *   nested: { mul: R.multiply }
 * });
 * getMetrics(2, 4); // => { sum: 6, nested: { mul: 8 } }
 * ```
 */
export function useApplySpec<Obj extends Record<string, (...args: readonly any[]) => any>>(
  obj: MaybeWatchSource<Obj>,
): ComputedRef<(...args: Parameters<Obj[keyof Obj]>) => { [Key in keyof Obj]: ReturnType<Obj[Key]> }>;
export function useApplySpec<T>(obj: MaybeWatchSource<any>): ComputedRef<(...args: readonly any[]) => T>;


/**
 * Takes a value and applies a function to it.
 * 
 * This function is also known as the `thrush` combinator.
 *
 * @example
 * ```typescript
 * const t42 = R.applyTo(42);
 * t42(R.identity); //=> 42
 * t42(R.add(1)); //=> 43
 * ```
 */
export function useApplyTo<T>(el: MaybeRef<T>): <U>(fn: MaybeRef<(t: T) => U>) => ComputedRef<U>;
export function useApplyTo<T, U>(el: MaybeRef<T>, fn: MaybeRef<(t: T) => U>): ComputedRef<U>;


/**
 * Makes an ascending comparator function out of a function that returns a value
 * that can be compared with `<` and `>`.
 *
 * See also {@link descend}
 *
 * @example
 * ```typescript
 * const byAge = R.ascend(R.prop('age'));
 * const people = [
 *   { name: 'Emma', age: 70 },
 *   { name: 'Peter', age: 78 },
 *   { name: 'Mikhail', age: 62 },
 * ];
 * const peopleByYoungestFirst = R.sort(byAge, people);
 *   //=> [{ name: 'Mikhail', age: 62 },{ name: 'Emma', age: 70 }, { name: 'Peter', age: 78 }]
 * ```
 */
export function useAscend<T>(fn: MaybeRef<(obj: T) => Ord>): (a: MaybeRef<T>, b: MaybeRef<T>) => ComputedRef<Ordering>;
export function useAscend<T>(fn: MaybeRef<(obj: T) => Ord>, a: MaybeRef<T>, b: MaybeRef<T>): ComputedRef<Ordering>;


/**
 * Makes a shallow clone of an object, setting or overriding the specified
 * property with the given value. Note that this copies and flattens prototype
 * properties onto the new object as well. All non-primitive properties are
 * copied by reference.
 *
 * See also {@link dissoc}, {@link pick}
 *
 * @example
 * ```typescript
 * R.assoc('c', 3, {a: 1, b: 2}); //=> {a: 1, b: 2, c: 3}
 * ```
 */
export function useAssoc<T, U>(__: Placeholder, val: MaybeWatchSource<T>, obj: MaybeRef<U>): <K extends string>(prop: MaybeWatchSource<K>) => ComputedRef<K extends keyof U ? T extends U[K] ? U : Record<K, T> & Omit<U, K> : U & Record<K, T>>;
// assoc(prop, __, obj)(val), when K is keyof obj, tests if val is typeof obj[prop] for best return type
export function useAssoc<U, K extends keyof U>(prop: MaybeWatchSource<K>, __: Placeholder, obj: MaybeRef<U>): <T>(val: MaybeWatchSource<T>) => ComputedRef<T extends U[K] ? U : Record<K, T> & Omit<U, K>>;
// assoc(prop, __, obj)(val), when prop is not keyof obj
export function useAssoc<U, K extends string>(prop: MaybeWatchSource<K>, __: Placeholder, obj: MaybeRef<U>): <T>(val: MaybeWatchSource<T>) => ComputedRef<U & Record<K, T>>;
// assoc(prop, val, obj) when prop is keyof obj and val is same type
export function useAssoc<K extends keyof U, U>(prop: MaybeWatchSource<K>, val: MaybeRef<U[K]>, obj: MaybeWatchSource<U>): ComputedRef<U>;
// assoc(prop, val, obj) when prop is keyof obj  and val is not same type
export function useAssoc<T, K extends keyof U, U>(prop: MaybeWatchSource<K>, val: MaybeRef<T>, obj: MaybeWatchSource<U>): ComputedRef<Record<K, T> & Omit<U, K>>;
// assoc(prop, val, obj) when prop is not keyof obj
export function useAssoc<T, U, K extends string>(prop: MaybeWatchSource<K>, val: MaybeRef<T>, obj: MaybeWatchSource<U>): ComputedRef<U & Record<K, T>>;

// assoc(__, val)
export function useAssoc<T>(__: Placeholder, val: MaybeWatchSource<T>) : {
  // assoc(__, val)(__, obj)
  <U>(__2: Placeholder, obj: MaybeRef<U>): {
    // assoc(__, val)(__, obj)(prop), prop is keyof obj, tests if val is typeof obj[prop] for best return type
    <K extends keyof U>(prop: MaybeWatchSource<K>): ComputedRef<U[K] extends T ? U : Record<K, T> & Omit<U, K>>;
    // assoc(__, val)(__, obj)(prop), prop is not keyof obj
    <K extends string>(prop: MaybeWatchSource<K>): ComputedRef<U & Record<K, T>>;
  };
  // assoc(__, val)(prop, obj), when obj has key prop, tests if val is typeof obj[prop] for best return type
  <K extends keyof U, U>(prop: MaybeRef<K>, obj: MaybeWatchSource<U>): ComputedRef<U[K] extends T ? U : Record<K, T> & Omit<U, K>>;
  // assoc(__, val)(prop, obj), when obj does not have key prop
  <K extends string, U>(prop: MaybeRef<K>, obj: MaybeWatchSource<U>): ComputedRef<U & Record<K, T>>;

  // assoc(__, val)(prop)
  <K extends string>(prop: MaybeRef<K>): {
    // assoc(__, val)(prop)(obj) when obj has key prop, tests if val is typeof obj[prop] for best return type
    <U extends Record<K, any>>(obj: MaybeWatchSource<U>): ComputedRef<U[K] extends T ? U : Record<K, T> & Omit<U, K>>;
    // assoc(__, val)(prop)(obj) when obj does not have key prop
    <U>(obj: MaybeWatchSource<U>): ComputedRef<U & Record<K, T>>;
  }
};

// assoc(prop, val)
export function useAssoc<T, K extends string>(prop: MaybeWatchSource<K>, val: MaybeRef<T>) : {
  // assoc(prop, val)(obj), when obj has key prop, tests if val is typeof obj[prop] for best return type
  <U extends Record<K, any>>(obj: MaybeWatchSource<U>): ComputedRef<U[K] extends T ? U : Record<K, T> & Omit<U, K>>;
  // assoc(prop, val)(obj), when obj does not have key prop
  <U>(obj: MaybeWatchSource<U>): ComputedRef<U & Record<K, T>>;
};

// assoc(prop)
export function useAssoc<K extends string>(prop: MaybeWatchSource<K>): {
  // assoc(prop)(__, obj) when prop is keyof obj
  <U extends Record<K, any>>(__: Placeholder, obj: MaybeRef<U>): {
    // assoc(prop)(__, obj)(val) if val is typeof obj[prop]
    <T extends U[K]>(val: MaybeWatchSource<T>): ComputedRef<U>;
    // assoc(prop)(__, obj)(val) if val is not typeof obj[prop]
    <T>(val: MaybeWatchSource<T>): ComputedRef<Record<K, T> & Omit<U, K>>;
  }
  // assoc(prop)(__, obj) when prop is not keyof obj
  <U>(__: Placeholder, obj: MaybeRef<U>): <T>(val: MaybeWatchSource<T>) => ComputedRef<U & Record<K, T>>;

  // assoc(prop)(val, obj) when obj has key prop, tests if val is typeof obj[prop] for best return type
  <T, U extends Record<K, any>>(val: MaybeRef<T>, obj: MaybeWatchSource<U>): ComputedRef<U[K] extends T ? U : Record<K, T> & Omit<U, K>>;
  // assoc(prop)(val, obj) when obj does not have a key prop
  <T, U>(val: MaybeRef<T>, obj: MaybeWatchSource<U>): ComputedRef<U & Record<K, T>>;

  // assoc(prop)(val)
  <T>(val: MaybeRef<T>): {
    // assoc(prop)(val)(obj) when obj has key prop and val is typeof obj[prop]
    <U extends Record<K, T>>(obj: MaybeWatchSource<U>): ComputedRef<U>;
    // assoc(prop)(val)(obj) when obj has key prop and val is not typeof obj[prop]
    <U extends Record<K, any>>(obj: MaybeWatchSource<U>): ComputedRef<Record<K, T> & Omit<U, K>>;
    // assoc(prop)(val)(obj) when obj does not have key prop
    <U>(obj: MaybeWatchSource<U>): ComputedRef<U & Record<K, T>>;
  }
};


/**
 * Makes a shallow clone of an object, setting or overriding the nodes required
 * to create the given path, and placing the specific value at the tail end of
 * that path. Note that this copies and flattens prototype properties onto the
 * new object as well. All non-primitive properties are copied by reference.
 *
 * See also {@link dissocPath}
 *
 * @example
 * ```typescript
 * R.assocPath(['a', 'b', 'c'], 42, {a: {b: {c: 0}}}); //=> {a: {b: {c: 42}}}
 * 
 * // Any missing or non-object keys in path will be overridden
 * R.assocPath(['a', 'b', 'c'], 42, {a: 5}); //=> {a: {b: {c: 42}}}
 * ```
 */
export function useAssocPath<T, U>(path: MaybeWatchSource<Path>): _.F.Curry<(a: MaybeRef<T>, b: MaybeWatchSource<U>) => ComputedRef<U>>;
export function useAssocPath<T, U>(path: MaybeWatchSource<Path>, val: MaybeRef<T>): (obj: MaybeWatchSource<U>) => ComputedRef<U>;
export function useAssocPath<T, U>(__: Placeholder, val: MaybeWatchSource<T>, obj: MaybeRef<U>): (path: MaybeWatchSource<Path>) => ComputedRef<U>;
export function useAssocPath<T, U>(path: MaybeWatchSource<Path>, __: Placeholder, obj: MaybeRef<U>): (val: MaybeWatchSource<T>) => ComputedRef<U>;
export function useAssocPath<T, U>(path: MaybeWatchSource<Path>, val: MaybeRef<T>, obj: MaybeWatchSource<U>): ComputedRef<U>;


/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly 2 parameters. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * See also {@link nAry}, {@link unary}
 *
 * @example
 * ```typescript
 * const takesThreeArgs = function(a, b, c) {
 *   return [a, b, c];
 * };
 * takesThreeArgs.length; //=> 3
 * takesThreeArgs(1, 2, 3); //=> [1, 2, 3]
 * 
 * const takesTwoArgs = R.binary(takesThreeArgs);
 * takesTwoArgs.length; //=> 2
 * // Only 2 arguments are passed to the wrapped function
 * takesTwoArgs(1, 2, 3); //=> [1, 2, undefined]
 * ```
 */
export function useBinary<T extends (...arg: any) => any>(fn: MaybeRef<T>): ComputedRef<(...arg: _.T.Take<Parameters<T>, 2>) => ReturnType<T>>;


/**
 * Creates a function that is bound to a context.
 * Note: `R.bind` does not provide the additional argument-binding capabilities of
 * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
 *
 * See also {@link partial}
 *
 * @example
 * ```typescript
 * const log = R.bind(console.log, console);
 * R.pipe(R.assoc('a', 2), R.tap(log), R.assoc('a', 3))({a: 1}); //=> {a: 3}
 * // logs {a: 2}
 * ```
 */
export function useBind<F extends (...args: readonly any[]) => any, T>(
  fn: MaybeRef<F>,
): (thisObj: MaybeWatchSource<T>) => ComputedRef<(...args: Parameters<F>) => ReturnType<F>>;
export function useBind<F extends (...args: readonly any[]) => any, T>(
  fn: MaybeRef<F>,
  thisObj: MaybeWatchSource<T>,
): ComputedRef<(...args: Parameters<F>) => ReturnType<F>>;


/**
 * A function which calls the two provided functions and returns the `&&`
 * of the results.
 * It returns the result of the first function if it is false-y and the result
 * of the second function otherwise. Note that this is short-circuited,
 * meaning that the second function will not be invoked if the first returns a
 * false-y value.
 * 
 * In addition to functions, `R.both` also accepts any fantasy-land compatible
 * applicative functor.
 *
 * See also {@link either}, {@link allPass}, {@link and}
 *
 * @example
 * ```typescript
 * const gt10 = R.gt(R.__, 10)
 * const lt20 = R.lt(R.__, 20)
 * const f = R.both(gt10, lt20);
 * f(15); //=> true
 * f(30); //=> false
 * 
 * R.both(Maybe.Just(false), Maybe.Just(55)); // => Maybe.Just(false)
 * R.both([false, false, 'a'], [11]); //=> [false, false, 11]
 * ```
 */
export function useBoth<T extends Pred>(pred1: MaybeRef<T>): (pred2: MaybeRef<T>) => ComputedRef<T>;
export function useBoth<T, TF1 extends T, TF2 extends T>(
  pred1: MaybeRef<PredTypeguard<T, TF1>>,
  pred2: MaybeRef<PredTypeguard<T, TF2>>,
): ComputedRef<(a: T) => a is TF1 & TF2>;
export function useBoth<T extends Pred>(pred1: MaybeRef<T>, pred2: MaybeRef<T>): ComputedRef<T>;


/**
 * Returns the result of calling its first argument with the remaining
 * arguments. This is occasionally useful as a converging function for
 * [`R.converge`](#converge): the first branch can produce a function while the
 * remaining branches produce values to be passed to that function as its
 * arguments.
 *
 * See also {@link apply}
 *
 * @example
 * ```typescript
 * R.call(R.add, 1, 2); //=> 3
 * 
 * const indentN = R.pipe(
 *   R.repeat(' '),
 *   R.join(''),
 *   R.replace(/^(?!$)/gm)
 * );
 * 
 * const format = R.converge(
 *   R.call,
 *   [
 *     R.pipe(R.prop('indent'), indentN),
 *     R.prop('value')
 *   ]
 * );
 * 
 * format({indent: 2, value: 'foo\nbar\nbaz\n'}); //=> '  foo\n  bar\n  baz\n'
 * ```
 */
export function useCall<T extends (...args: readonly any[]) => any>(fn: MaybeRef<T>, ...args: MaybeRef<Parameters<T>>): ComputedRef<ReturnType<T>>;


/**
 * `chain` maps a function over a list and concatenates the results. `chain`
 * is also known as `flatMap` in some libraries.
 * 
 * Dispatches to the `chain` method of the second argument, if present,
 * according to the [FantasyLand Chain spec](https://github.com/fantasyland/fantasy-land#chain).
 * 
 * If second argument is a function, `chain(f, g)(x)` is equivalent to `f(g(x), x)`.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @example
 * ```typescript
 * const duplicate = n => [n, n];
 * R.chain(duplicate, [1, 2, 3]); //=> [1, 1, 2, 2, 3, 3]
 * 
 * R.chain(R.append, R.head)([1, 2, 3]); //=> [1, 2, 3, 1]
 * ```
 */
export function useChain<A, B>(fn: MaybeRef<(n: A) => readonly B[]>, list: MaybeWatchSource<readonly A[]>): ComputedRef<B[]>;
// chain(fn)(list)
export function useChain<A, B>(fn: MaybeRef<(n: A) => readonly B[]>): (list: MaybeWatchSource<readonly A[]>) => ComputedRef<B[]>;

// chain(fn, monad)
export function useChain<A, Ma extends { chain: (fn: (a: A) => Mb) => Mb }, Mb>(fn: MaybeRef<(a: A) => Mb>, monad: MaybeWatchSource<Ma>): ComputedRef<Mb>;
// chain(fn)(monad)
export function useChain<A, Ma extends { chain: (fn: (a: A) => Mb) => Mb }, Mb>(fn: MaybeRef<(a: A) => Mb>): (monad: MaybeWatchSource<Ma>) => ComputedRef<Mb>;

// chain (f, g)(x)
export function useChain<A, B, R>(aToMb: MaybeRef<(a: A, r: R) => B>, Ma: MaybeWatchSource<(r: R) => A>): ComputedRef<(r: R) => B>;
// chain (f)(g)(x)
export function useChain<A, B, R>(aToMb: MaybeRef<(a: A, r: R) => B>): (Ma: MaybeWatchSource<(r: R) => A>) => ComputedRef<(r: R) => B>;

// TODO: types for transducer variation


/**
 * Restricts a number to be within a range.
 * 
 * Also works for other ordered types such as Strings and Dates.
 *
 * @example
 * ```typescript
 * R.clamp(1, 10, -5) // => 1
 * R.clamp(1, 10, 15) // => 10
 * R.clamp(1, 10, 4)  // => 4
 * ```
 */
export function useClamp<T>(min: MaybeWatchSource<T>): {
  (max: MaybeWatchSource<T>): (value: MaybeWatchSource<T>) => ComputedRef<T>;
  (max: MaybeWatchSource<T>, value: MaybeWatchSource<T>): ComputedRef<T>
};
export function useClamp<T>(min: MaybeWatchSource<T>, max: MaybeWatchSource<T>): (value: MaybeWatchSource<T>) => ComputedRef<T>;
export function useClamp<T>(min: MaybeWatchSource<T>, max: MaybeWatchSource<T>, value: MaybeWatchSource<T>): ComputedRef<T>;


/**
 * Creates a deep copy of the source that can be used in place of the source
 * object without retaining any references to it.
 * The source object may contain (nested) `Array`s and `Object`s,
 * `Number`s, `String`s, `Boolean`s and `Date`s.
 * `Function`s are assigned by reference rather than copied.
 * 
 * Dispatches to a `clone` method if present.
 * 
 * Note that if the source object has multiple nodes that share a reference,
 * the returned object will have the same structure, but the references will
 * be pointed to the location within the cloned value.
 *
 * @example
 * ```typescript
 * const objects = [{}, {}, {}];
 * const objectsClone = R.clone(objects);
 * objects === objectsClone; //=> false
 * objects[0] === objectsClone[0]; //=> false
 * ```
 */
export function useClone<T>(value: MaybeRef<readonly T[]>): ComputedRef<T[]>;
export function useClone<T>(value: MaybeRef<T>): ComputedRef<T>;


/**
 * Splits a list into sub-lists, based on the result of calling a key-returning function on each element,
 * and grouping the results according to values returned.
 *
 * See also {@link groupBy}, {@link partition}
 *
 * @example
 * ```typescript
 * R.collectBy(R.prop('type'), [
 *   {type: 'breakfast', item: '☕️'},
 *   {type: 'lunch', item: '🌯'},
 *   {type: 'dinner', item: '🍝'},
 *   {type: 'breakfast', item: '🥐'},
 *   {type: 'lunch', item: '🍕'}
 * ]);
 * 
 * // [ [ {type: 'breakfast', item: '☕️'},
 * //     {type: 'breakfast', item: '🥐'} ],
 * //   [ {type: 'lunch', item: '🌯'},
 * //     {type: 'lunch', item: '🍕'} ],
 * //   [ {type: 'dinner', item: '🍝'} ] ]
 * ```
 */
export function useCollectBy<T, K extends PropertyKey>(keyFn: MaybeRef<(value: T) => K>): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<T[][]>;
export function useCollectBy<T, K extends PropertyKey>(keyFn: MaybeRef<(value: T) => K>, list: MaybeWatchSource<readonly T[]>): ComputedRef<T[][]>;


/**
 * Makes a comparator function out of a function that reports whether the first
 * element is less than the second.
 *
 * @example
 * ```typescript
 * const byAge = R.comparator((a, b) => a.age < b.age);
 * const people = [
 *   { name: 'Emma', age: 70 },
 *   { name: 'Peter', age: 78 },
 *   { name: 'Mikhail', age: 62 },
 * ];
 * const peopleByIncreasingAge = R.sort(byAge, people);
 *   //=> [{ name: 'Mikhail', age: 62 },{ name: 'Emma', age: 70 }, { name: 'Peter', age: 78 }]
 * ```
 */
export function useComparator<T>(pred: MaybeRef<(a: T, b: T) => boolean>): ComputedRef<(x: T, y: T) => Ordering>;


/**
 * Takes a function `f` and returns a function `g` such that if called with the same arguments
 * when `f` returns a "truthy" value, `g` returns `false` and when `f` returns a "falsy" value `g` returns `true`.
 * 
 * `R.complement` may be applied to any functor
 *
 * See also {@link not}
 *
 * @example
 * ```typescript
 * const isNotNil = R.complement(R.isNil);
 * R.isNil(null); //=> true
 * isNotNil(null); //=> false
 * R.isNil(7); //=> false
 * isNotNil(7); //=> true
 * ```
 */
export function useComplement<T, TFiltered extends T>(
  pred: MaybeRef<(value: T) => value is TFiltered>,
): ComputedRef<(value: T) => value is Exclude<T, TFiltered>>;
export function useComplement<TArgs extends any[]>(pred: MaybeRef<(...args: TArgs) => unknown>): ComputedRef<(...args: TArgs) => boolean>;


/**
 * Performs right-to-left function composition. The last argument may have
 * any arity; the remaining arguments must be unary.
 * 
 * **Note:** The result of compose is not automatically curried.
 *
 * See also {@link pipe}
 *
 * @example
 * ```typescript
 * const classyGreeting = (firstName, lastName) => "The name's " + lastName + ", " + firstName + " " + lastName
 * const yellGreeting = R.compose(R.toUpper, classyGreeting);
 * yellGreeting('James', 'Bond'); //=> "THE NAME'S BOND, JAMES BOND"
 * 
 * R.compose(Math.abs, R.add(1), R.multiply(2))(-4) //=> 7
 * ```
 */
export function useCompose<TArgs extends any[], R1, R2, R3, R4, R5, R6, R7, TResult>(
  ...func: MaybeRef<[
        fnLast: (a: any) => TResult,
        ...func: Array<(a: any) => any>,
        f7: (a: R6) => R7,
        f6: (a: R5) => R6,
        f5: (a: R4) => R5,
        f4: (a: R3) => R4,
        f3: (a: R2) => R3,
        f2: (a: R1) => R2,
        f1: (...args: TArgs) => R1
  ]>
): ComputedRef<(...args: TArgs) => TResult>;
// fallback overload if number of composed functions greater than 7
export function useCompose<TArgs extends any[], R1, R2, R3, R4, R5, R6, R7>(
  f7: MaybeRef<(a: R6) => R7>,
  f6: (a: R5) => R6,
  f5: (a: R4) => R5,
  f4: (a: R3) => R4,
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (...args: TArgs) => R1,
): ComputedRef<(...args: TArgs) => R7>;
export function useCompose<TArgs extends any[], R1, R2, R3, R4, R5, R6, R7>(
  f7: MaybeRef<(a: R6) => R7>,
  f6: (a: R5) => R6,
  f5: (a: R4) => R5,
  f4: (a: R3) => R4,
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (...args: TArgs) => R1,
): ComputedRef<(...args: TArgs) => R7>;
export function useCompose<TArgs extends any[], R1, R2, R3, R4, R5, R6>(
  f6: MaybeRef<(a: R5) => R6>,
  f5: (a: R4) => R5,
  f4: (a: R3) => R4,
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (...args: TArgs) => R1,
): ComputedRef<(...args: TArgs) => R6>;
export function useCompose<TArgs extends any[], R1, R2, R3, R4, R5>(
  f5: MaybeRef<(a: R4) => R5>,
  f4: (a: R3) => R4,
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (...args: TArgs) => R1,
): ComputedRef<(...args: TArgs) => R5>;
export function useCompose<TArgs extends any[], R1, R2, R3, R4>(
  f4: MaybeRef<(a: R3) => R4>,
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (...args: TArgs) => R1,
): ComputedRef<(...args: TArgs) => R4>;
export function useCompose<TArgs extends any[], R1, R2, R3>(
  f3: MaybeRef<(a: R2) => R3>,
  f2: (a: R1) => R2,
  f1: (...args: TArgs) => R1,
): ComputedRef<(...args: TArgs) => R3>;
export function useCompose<TArgs extends any[], R1, R2>(
  f2: MaybeRef<(a: R1) => R2>,
  f1: (...args: TArgs) => R1,
): ComputedRef<(...args: TArgs) => R2>;
export function useCompose<TArgs extends any[], R1>(f1: MaybeRef<(...args: TArgs) => R1>): ComputedRef<(...args: TArgs) => R1>;


/**
 * Performs right-to-left function composition using transforming function. The last function may have
 * any arity; the remaining functions must be unary. Unlike `compose`, functions are passed in an array.
 * 
 * **Note:** The result of composeWith is not automatically curried. Transforming function is not used
 * on the last argument.
 *
 * See also {@link compose}, {@link pipeWith}
 *
 * @example
 * ```typescript
 * const composeWhileNotNil = R.composeWith((f, res) => R.isNil(res) ? res : f(res));
 * 
 * composeWhileNotNil([R.inc, R.prop('age')])({age: 1}) //=> 2
 * composeWhileNotNil([R.inc, R.prop('age')])({}) //=> undefined
 * ```
 */
export function useComposeWith(
  transformer: MaybeRef<(fn: (...args: any[]) => any, intermediatResult: any) => any>,
): <TArgs extends any[], TResult>(
  fns: MaybeWatchSource<AtLeastOneFunctionsFlowFromRightToLeft<TArgs, TResult>>,
) => ComputedRef<(...args: TArgs) => TResult>;
export function useComposeWith<TArgs extends any[], TResult>(
  transformer: MaybeRef<(fn: (...args: any[]) => any, intermediatResult: any) => any>,
  fns: MaybeWatchSource<AtLeastOneFunctionsFlowFromRightToLeft<TArgs, TResult>>,
): ComputedRef<(...args: TArgs) => TResult>;


/**
 * Returns the result of concatenating the given lists or strings.
 * 
 * Note: `R.concat` expects both arguments to be of the same type,
 * unlike the native `Array.prototype.concat` method. It will throw
 * an error if you `concat` an Array with a non-Array value.
 * 
 * Dispatches to the `concat` method of the first argument, if present.
 * Can also concatenate two members of a [fantasy-land
 * compatible semigroup](https://github.com/fantasyland/fantasy-land#semigroup).
 *
 * @example
 * ```typescript
 * R.concat('ABC', 'DEF'); // 'ABCDEF'
 * R.concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
 * R.concat([], []); //=> []
 * ```
 */
export function useConcat<S1 extends string>(s1: MaybeWatchSource<S1>): <S2 extends string>(s2: MaybeWatchSource<S2>) => ComputedRef<string extends (S1 | S2) ? string : `${S1}${S2}`>;
// concat(list)(list)
export function useConcat<T>(list1: MaybeWatchSource<readonly T[]>): (list2: MaybeWatchSource<readonly T[]>) => ComputedRef<T[]>;
// concat(__, string)(string)
export function useConcat<S2 extends string>(__: Placeholder, s2: MaybeWatchSource<S2>): <S1 extends string>(s1: MaybeWatchSource<S1>) => ComputedRef<string extends (S1 | S2) ? string : `${S1}${S2}`>;
// concat(__, list)(list)
export function useConcat<T2>(__: Placeholder, list2: MaybeWatchSource<readonly T2[]>): <T1>(list1: MaybeWatchSource<(readonly T2[] extends readonly T1[] ? readonly T1[] : never)>) => ComputedRef<T1[]>;
// concat(string, string)
export function useConcat<S1 extends string, S2 extends string>(s1: MaybeWatchSource<S1>, s2: MaybeWatchSource<S2>): ComputedRef<string extends (S1 | S2) ? string : `${S1}${S2}`>;
// concat(list, list)
// if you don't do 2 types here the single T will collapse list1 and list2 when you have tuples of the same type, which is incorrect behavior
export function useConcat<T1, T2 extends T1>(list1: MaybeWatchSource<readonly T1[]>, list2: MaybeWatchSource<readonly T2[]>): ComputedRef<T1[]>;


/**
 * Returns a function, `fn`, which encapsulates `if/else, if/else, ...` logic.
 * `R.cond` takes a list of [predicate, transformer] pairs. All of the arguments
 * to `fn` are applied to each of the predicates in turn until one returns a
 * "truthy" value, at which point `fn` returns the result of applying its
 * arguments to the corresponding transformer. If none of the predicates
 * matches, `fn` returns undefined.
 * 
 * **Please note**: This is not a direct substitute for a `switch` statement.
 * Remember that both elements of every pair passed to `cond` are *functions*,
 * and `cond` returns a function.
 *
 * See also {@link ifElse}, {@link unless}, {@link when}
 *
 * @example
 * ```typescript
 * const fn = R.cond([
 *   [R.equals(0),   R.always('water freezes at 0°C')],
 *   [R.equals(100), R.always('water boils at 100°C')],
 *   [R.T,           temp => 'nothing special happens at ' + temp + '°C']
 * ]);
 * fn(0); //=> 'water freezes at 0°C'
 * fn(50); //=> 'nothing special happens at 50°C'
 * fn(100); //=> 'water boils at 100°C'
 * ```
 */
export function useCond<T, TF1 extends T, R>(pairs: MaybeWatchSource<[CondPairTypeguard<T, TF1, R>]>): ComputedRef<(value: T) => R>;
export function useCond<T, TF1 extends T, TF2 extends T, R>(
  pairs: MaybeWatchSource<[CondPairTypeguard<T, TF1, R>, CondPairTypeguard<T, TF2, R>]>,
): ComputedRef<(value: T) => R>;
export function useCond<T, TF1 extends T, TF2 extends T, TF3 extends T, R>(
  pairs: MaybeWatchSource<[CondPairTypeguard<T, TF1, R>, CondPairTypeguard<T, TF2, R>, CondPairTypeguard<T, TF3, R>]>,
): ComputedRef<(value: T) => R>;
export function useCond<T, TF1 extends T, TF2 extends T, TF3 extends T, TF4 extends T, R>(
  pairs: MaybeWatchSource<[
    CondPairTypeguard<T, TF1, R>,
    CondPairTypeguard<T, TF2, R>,
    CondPairTypeguard<T, TF3, R>,
    CondPairTypeguard<T, TF4, R>
  ]>,
): ComputedRef<(value: T) => R>;
export function useCond<T, TF1 extends T, TF2 extends T, TF3 extends T, TF4 extends T, TF5 extends T, R>(
  pairs: MaybeWatchSource<[
    CondPairTypeguard<T, TF1, R>,
    CondPairTypeguard<T, TF2, R>,
    CondPairTypeguard<T, TF3, R>,
    CondPairTypeguard<T, TF4, R>,
    CondPairTypeguard<T, TF5, R>
  ]>,
): ComputedRef<(value: T) => R>;
export function useCond<T, TF1 extends T, TF2 extends T, TF3 extends T, TF4 extends T, TF5 extends T, TF6 extends T, R>(
  pairs: MaybeWatchSource<[
    CondPairTypeguard<T, TF1, R>,
    CondPairTypeguard<T, TF2, R>,
    CondPairTypeguard<T, TF3, R>,
    CondPairTypeguard<T, TF4, R>,
    CondPairTypeguard<T, TF5, R>,
    CondPairTypeguard<T, TF6, R>
  ]>,
): ComputedRef<(value: T) => R>;
export function useCond<
  T,
  TF1 extends T,
  TF2 extends T,
  TF3 extends T,
  TF4 extends T,
  TF5 extends T,
  TF6 extends T,
  TF7 extends T,
  R
>(
  pairs: MaybeWatchSource<[
    CondPairTypeguard<T, TF1, R>,
    CondPairTypeguard<T, TF2, R>,
    CondPairTypeguard<T, TF3, R>,
    CondPairTypeguard<T, TF4, R>,
    CondPairTypeguard<T, TF5, R>,
    CondPairTypeguard<T, TF6, R>,
    CondPairTypeguard<T, TF7, R>
  ]>,
): ComputedRef<(value: T) => R>;
export function useCond<
  T,
  TF1 extends T,
  TF2 extends T,
  TF3 extends T,
  TF4 extends T,
  TF5 extends T,
  TF6 extends T,
  TF7 extends T,
  TF8 extends T,
  R
>(
  pairs: MaybeWatchSource<[
    CondPairTypeguard<T, TF1, R>,
    CondPairTypeguard<T, TF2, R>,
    CondPairTypeguard<T, TF3, R>,
    CondPairTypeguard<T, TF4, R>,
    CondPairTypeguard<T, TF5, R>,
    CondPairTypeguard<T, TF6, R>,
    CondPairTypeguard<T, TF7, R>,
    CondPairTypeguard<T, TF8, R>
  ]>,
): ComputedRef<(value: T) => R>;
export function useCond<
  T,
  TF1 extends T,
  TF2 extends T,
  TF3 extends T,
  TF4 extends T,
  TF5 extends T,
  TF6 extends T,
  TF7 extends T,
  TF8 extends T,
  TF9 extends T,
  R
>(
  pairs: MaybeWatchSource<[
    CondPairTypeguard<T, TF1, R>,
    CondPairTypeguard<T, TF2, R>,
    CondPairTypeguard<T, TF3, R>,
    CondPairTypeguard<T, TF4, R>,
    CondPairTypeguard<T, TF5, R>,
    CondPairTypeguard<T, TF6, R>,
    CondPairTypeguard<T, TF7, R>,
    CondPairTypeguard<T, TF8, R>,
    CondPairTypeguard<T, TF9, R>
  ]>,
): ComputedRef<(value: T) => R>;
export function useCond<
  T,
  TF1 extends T,
  TF2 extends T,
  TF3 extends T,
  TF4 extends T,
  TF5 extends T,
  TF6 extends T,
  TF7 extends T,
  TF8 extends T,
  TF9 extends T,
  TF10 extends T,
  R
>(
  pairs: MaybeWatchSource<[
    CondPairTypeguard<T, TF1, R>,
    CondPairTypeguard<T, TF2, R>,
    CondPairTypeguard<T, TF3, R>,
    CondPairTypeguard<T, TF4, R>,
    CondPairTypeguard<T, TF5, R>,
    CondPairTypeguard<T, TF6, R>,
    CondPairTypeguard<T, TF7, R>,
    CondPairTypeguard<T, TF8, R>,
    CondPairTypeguard<T, TF9, R>,
    CondPairTypeguard<T, TF10, R>
  ]>,
): ComputedRef<(value: T) => R>;
export function useCond<T extends any[], R>(pairs: MaybeWatchSource<Array<CondPair<T, R>>>): ComputedRef<(...args: T) => R>;


/**
 * Wraps a constructor function inside a curried function that can be called
 * with the same arguments and returns the same type.
 *
 * See also {@link invoker}
 *
 * @example
 * ```typescript
 * // Constructor function
 * function Animal(kind) {
 *   this.kind = kind;
 * };
 * Animal.prototype.sighting = function() {
 *   return "It's a " + this.kind + "!";
 * }
 * 
 * const AnimalConstructor = R.construct(Animal)
 * 
 * // Notice we no longer need the 'new' keyword:
 * AnimalConstructor('Pig'); //=> {"kind": "Pig", "sighting": function (){...}};
 * 
 * const animalTypes = ["Lion", "Tiger", "Bear"];
 * const animalSighting = R.invoker(0, 'sighting');
 * const sightNewAnimal = R.compose(animalSighting, AnimalConstructor);
 * R.map(sightNewAnimal, animalTypes); //=> ["It's a Lion!", "It's a Tiger!", "It's a Bear!"]
 * ```
 */
export function useConstruct<A extends any[], T>(
  constructor: MaybeRef<{ new (...a: A): T } | ((...a: A) => T)>,
): ComputedRef<_.F.Curry<(...a: A) => T>>;


/**
 * Wraps a constructor function inside a curried function that can be called
 * with the same arguments and returns the same type. The arity of the function
 * returned is specified to allow using variadic constructor functions.
 *
 * @example
 * ```typescript
 * // Variadic Constructor function
 * function Salad() {
 *   this.ingredients = arguments;
 * }
 * 
 * Salad.prototype.recipe = function() {
 *   const instructions = R.map(ingredient => 'Add a dollop of ' + ingredient, this.ingredients);
 *   return R.join('\n', instructions);
 * };
 * 
 * const ThreeLayerSalad = R.constructN(3, Salad);
 * 
 * // Notice we no longer need the 'new' keyword, and the constructor is curried for 3 arguments.
 * const salad = ThreeLayerSalad('Mayonnaise')('Potato Chips')('Ketchup');
 * 
 * console.log(salad.recipe());
 * // Add a dollop of Mayonnaise
 * // Add a dollop of Potato Chips
 * // Add a dollop of Ketchup
 * ```
 */
export function useConstructN<A extends any[], T, N extends number>(
  n: MaybeWatchSource<N>,
  constructor: MaybeRef<{ new (...a: A): T } | ((...a: A) => T)>,
): ComputedRef<_.F.Curry<(...a: mergeArrWithLeft<Tuple<any, N>, A>) => T>>;


/**
 * Accepts a converging function and a list of branching functions and returns
 * a new function. The arity of the new function is the same as the arity of
 * the longest branching function. When invoked, this new function is applied
 * to some arguments, and each branching function is applied to those same
 * arguments. The results of each branching function are passed as arguments
 * to the converging function to produce the return value.
 *
 * See also {@link useWith}
 *
 * @example
 * ```typescript
 * const average = R.converge(R.divide, [R.sum, R.length])
 * average([1, 2, 3, 4, 5, 6, 7]) //=> 4
 * 
 * const strangeConcat = R.converge(R.concat, [R.toUpper, R.toLower])
 * strangeConcat("Yodel") //=> "YODELyodel"
 * ```
 */
export function useConverge<
  TResult,
  FunctionsList extends ReadonlyArray<Fn> &
  IfFunctionsArgumentsDoNotOverlap<_Fns, 'Functions arguments types must overlap'>,
  _Fns extends ReadonlyArray<Fn> = FunctionsList
>(
  converging: MaybeRef<(...args: ReturnTypesOfFns<FunctionsList>) => TResult>,
  branches: MaybeWatchSource<FunctionsList>,
): ComputedRef<_.F.Curry<(...args: LargestArgumentsList<FunctionsList>) => TResult>>;
export function useConverge<
  CArgs extends ReadonlyArray<any>,
  TResult,
  FunctionsList extends readonly [
    ...{
      [Index in keyof CArgs]: (...args: ReadonlyArray<any>) => CArgs[Index];
    }
  ] &
  IfFunctionsArgumentsDoNotOverlap<_Fns, 'Functions arguments types must overlap'>,
  _Fns extends ReadonlyArray<Fn> = FunctionsList
>(
  converging: MaybeRef<(...args: CArgs) => TResult>,
  branches: MaybeWatchSource<FunctionsList>,
): ComputedRef<_.F.Curry<(...args: LargestArgumentsList<FunctionsList>) => TResult>>;


/**
 * Returns the number of items in a given `list` matching the predicate `f`
 *
 * @example
 * ```typescript
 * const even = x => x % 2 == 0;
 * 
 * R.count(even, [1, 2, 3, 4, 5]); // => 2
 * R.map(R.count(even), [[1, 1, 1], [2, 3, 4, 5], [6]]); // => [0, 2, 1]
 * ```
 */
export function useCount<T>(fn: MaybeRef<(a: T) => boolean>): ComputedRef<(list: readonly T[]) => number>;
export function useCount<T>(fn: MaybeRef<(a: T) => boolean>, list: readonly T[]): ComputedRef<number>;


/**
 * Counts the elements of a list according to how many match each value of a
 * key generated by the supplied function. Returns an object mapping the keys
 * produced by `fn` to the number of occurrences in the list. Note that all
 * keys are coerced to strings because of how JavaScript objects work.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @example
 * ```typescript
 * const numbers = [1.0, 1.1, 1.2, 2.0, 3.0, 2.2];
 * R.countBy(Math.floor)(numbers);    //=> {'1': 3, '2': 2, '3': 1}
 * 
 * const letters = ['a', 'b', 'A', 'a', 'B', 'c'];
 * R.countBy(R.toLower)(letters);   //=> {'a': 3, 'b': 2, 'c': 1}
 * ```
 */
export function useCountBy<T>(fn: MaybeRef<(a: T) => string | number>): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<{ [index: string]: number }>;
export function useCountBy<T>(fn: MaybeRef<(a: T) => string | number>, list: MaybeWatchSource<readonly T[]>): ComputedRef<{ [index: string]: number }>;


/**
 * Returns a curried equivalent of the provided function. The curried function
 * has two unusual capabilities. First, its arguments needn't be provided one
 * at a time. If `f` is a ternary function and `g` is `R.curry(f)`, the
 * following are equivalent:
 * 
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 * 
 * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
 * the following are equivalent:
 * 
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 * 
 * Please note that default parameters don't count towards a [function arity](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
 * and therefore `curry` won't work well with those:
 * 
 * ```
 * const h = R.curry((a, b, c = 2) => a + b + c);
 * 
 * h(40);
 * //=> function (waits for `b`)
 * 
 * h(39)(1);
 * //=> 42
 * 
 * h(1)(2, 3);
 * //=> 6
 * 
 * h(1)(2)(7);
 * //=> Error! (`3` is not a function!)
 * ```
 *
 * See also {@link curryN}, {@link partial}
 *
 * @example
 * ```typescript
 * const addFourNumbers = (a, b, c, d) => a + b + c + d;
 * 
 * const curriedAddFourNumbers = R.curry(addFourNumbers);
 * const f = curriedAddFourNumbers(1, 2);
 * const g = f(3);
 * g(4); //=> 10
 * ```
 */
export function useCurry<F extends (...args: any) => any>(f: MaybeRef<F>): ComputedRef<_.F.Curry<F>>;


/**
 * Returns a curried equivalent of the provided function, with the specified
 * arity. The curried function has two unusual capabilities. First, its
 * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the
 * following are equivalent:
 * 
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 * 
 * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
 * the following are equivalent:
 * 
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * See also {@link curry}
 *
 * @example
 * ```typescript
 * const sumArgs = (...args) => R.sum(args);
 * 
 * const curriedAddFourNumbers = R.curryN(4, sumArgs);
 * const f = curriedAddFourNumbers(1, 2);
 * const g = f(3);
 * g(4); //=> 10
 * ```
 */
export function useCurryN<N extends number>(
  length: MaybeWatchSource<N>,
): <F extends (...args: any) => any>(
  fn: MaybeRef<F>,
) => ComputedRef<_.F.Curry<(...a: _.T.Take<Parameters<F>, N>) => ReturnType<F>>>;
export function useCurryN<N extends number, F extends (...args: any) => any>(
  length: MaybeWatchSource<N>,
  fn: MaybeRef<F>,
): ComputedRef<_.F.Curry<(...a: _.T.Take<Parameters<F>, N>) => ReturnType<F>>>;


/**
 * Decrements its argument.
 *
 * See also {@link inc}
 *
 * @example
 * ```typescript
 * R.dec(42); //=> 41
 * ```
 */
export function useDec(n: MaybeWatchSource<number>): ComputedRef<number>;


/**
 * Returns the second argument if it is not `null`, `undefined` or `NaN`;
 * otherwise the first argument is returned.
 *
 * @example
 * ```typescript
 * const defaultTo42 = R.defaultTo(42);
 * 
 * defaultTo42(null);  //=> 42
 * defaultTo42(undefined);  //=> 42
 * defaultTo42(false);  //=> false
 * defaultTo42('Ramda');  //=> 'Ramda'
 * // parseInt('string') results in NaN
 * defaultTo42(parseInt('string')); //=> 42
 * ```
 */
export function useDefaultTo<Fallback>(a: MaybeWatchSource<Fallback>): <Value>(b: MaybeWatchSource<Value>) => ComputedRef<DefaultTo<Fallback, Value>>;
export function useDefaultTo<Value>(__: Placeholder, b: MaybeWatchSource<Value>): <Fallback>(a: MaybeWatchSource<Fallback>) => ComputedRef<DefaultTo<Fallback, Value>>;
export function useDefaultTo<Fallback, Value>(a: MaybeWatchSource<Fallback>, b: MaybeWatchSource<Value>): ComputedRef<DefaultTo<Fallback, Value>>;


/**
 * Makes a descending comparator function out of a function that returns a value
 * that can be compared with `<` and `>`.
 *
 * See also {@link ascend}
 *
 * @example
 * ```typescript
 * const byAge = R.descend(R.prop('age'));
 * const people = [
 *   { name: 'Emma', age: 70 },
 *   { name: 'Peter', age: 78 },
 *   { name: 'Mikhail', age: 62 },
 * ];
 * const peopleByOldestFirst = R.sort(byAge, people);
 *   //=> [{ name: 'Peter', age: 78 }, { name: 'Emma', age: 70 }, { name: 'Mikhail', age: 62 }]
 * ```
 */
export function useDescend<T>(fn: MaybeRef<(obj: T) => Ord>): (a: MaybeRef<T>, b: MaybeRef<T>) => ComputedRef<Ordering>;
export function useDescend<T>(fn: MaybeRef<(obj: T) => Ord>, a: MaybeRef<T>, b: MaybeRef<T>): ComputedRef<Ordering>;


/**
 * Finds the set (i.e. no duplicates) of all elements in the first list not
 * contained in the second list. Objects and Arrays are compared in terms of
 * value equality, not reference equality.
 *
 * See also {@link differenceWith}, {@link symmetricDifference}, {@link symmetricDifferenceWith}, {@link without}
 *
 * @example
 * ```typescript
 * R.difference([1,2,3,4], [7,6,5,4,3]); //=> [1,2]
 * R.difference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5]
 * R.difference([{a: 1}, {b: 2}], [{a: 1}, {c: 3}]) //=> [{b: 2}]
 * ```
 */
export function useDifference<T>(list1: MaybeWatchSource<readonly T[]>): (list2: MaybeWatchSource<readonly T[]>) => ComputedRef<T[]>;
export function useDifference<T>(list1: MaybeWatchSource<readonly T[]>, list2: MaybeWatchSource<readonly T[]>): ComputedRef<T[]>;


/**
 * Finds the set (i.e. no duplicates) of all elements in the first list not
 * contained in the second list. Duplication is determined according to the
 * value returned by applying the supplied predicate to two list elements.
 *
 * See also {@link difference}, {@link symmetricDifference}, {@link symmetricDifferenceWith}
 *
 * @example
 * ```typescript
 * const cmp = (x, y) => x.a === y.a;
 * const l1 = [{a: 1}, {a: 2}, {a: 3}];
 * const l2 = [{a: 3}, {a: 4}];
 * R.differenceWith(cmp, l1, l2); //=> [{a: 1}, {a: 2}]
 * 
 * R.differenceWith(R.equals, [1, 2, 3, 3, 3], []); //=> [1, 2, 3]
 * R.differenceWith(R.equals, [1, 2, 3, 3, 3], [1]); //=> [2, 3]
 * ```
 */
export function useDifferenceWith<T1, T2>(
  pred: MaybeRef<(a: T1, b: T2) => boolean>,
): (list1: MaybeWatchSource<readonly T1[]>, list2: MaybeWatchSource<readonly T2[]>) => ComputedRef<T1[]>;
export function useDifferenceWith<T1, T2>(
  pred: MaybeRef<(a: T1, b: T2) => boolean>,
  list1: MaybeWatchSource<readonly T1[]>,
): (list2: MaybeWatchSource<readonly T2[]>) => ComputedRef<T1[]>;
export function useDifferenceWith<T1, T2>(
  pred: MaybeRef<(a: T1, b: T2) => boolean>,
  list1: MaybeWatchSource<readonly T1[]>,
  list2: MaybeWatchSource<readonly T2[]>,
): ComputedRef<T1[]>;


/**
 * Returns a new object that does not contain a `prop` property.
 *
 * See also {@link assoc}, {@link omit}
 *
 * @example
 * ```typescript
 * R.dissoc('b', {a: 1, b: 2, c: 3}); //=> {a: 1, c: 3}
 * ```
 */
export function useDissoc<K extends string | number>(prop: MaybeWatchSource<K>): <T extends object>(obj: MaybeWatchSource<T>) => ComputedRef<Omit<T, K>>;
export function useDissoc<T extends object, K extends keyof T>(prop: MaybeWatchSource<K>, obj: MaybeWatchSource<T>): ComputedRef<Omit<T, K>>;


/**
 * Makes a shallow clone of an object. Note that this copies and flattens
 * prototype properties onto the new object as well. All non-primitive
 * properties are copied by reference.
 */
export function useDissocPath<T>(path: MaybeWatchSource<Path>): (obj: MaybeWatchSource<any>) => ComputedRef<T>;
export function useDissocPath<T>(path: MaybeWatchSource<Path>, obj: MaybeWatchSource<any>): ComputedRef<T>;


/**
 * Divides two numbers. Equivalent to `a / b`.
 *
 * See also {@link multiply}
 *
 * @example
 * ```typescript
 * R.divide(71, 100); //=> 0.71
 * 
 * const half = R.divide(R.__, 2);
 * half(42); //=> 21
 * 
 * const reciprocal = R.divide(1);
 * reciprocal(4);   //=> 0.25
 * ```
 */
export function useDivide(a: MaybeWatchSource<number>): (b: MaybeWatchSource<number>) => ComputedRef<number>;
export function useDivide(__: Placeholder, b: MaybeWatchSource<number>): (a: MaybeWatchSource<number>) => ComputedRef<number>;
export function useDivide(a: MaybeWatchSource<number>, b: MaybeWatchSource<number>): ComputedRef<number>;


/**
 * Returns all but the first `n` elements of the given list, string, or
 * transducer/transformer (or object with a `drop` method).
 * 
 * Dispatches to the `drop` method of the second argument, if present.
 *
 * See also {@link take}, {@link transduce}, {@link dropLast}, {@link dropWhile}
 *
 * @example
 * ```typescript
 * R.drop(1, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
 * R.drop(2, ['foo', 'bar', 'baz']); //=> ['baz']
 * R.drop(3, ['foo', 'bar', 'baz']); //=> []
 * R.drop(4, ['foo', 'bar', 'baz']); //=> []
 * R.drop(3, 'ramda');               //=> 'da'
 * ```
 */
export function useDrop<T>(n: MaybeWatchSource<number>): {
  (xs: MaybeRef<string>): ComputedRef<string>;
  (xs: MaybeRef<readonly T[]>): ComputedRef<T[]>;
};
export function useDrop(n: MaybeWatchSource<number>, xs: MaybeRef<string>): ComputedRef<string>;
export function useDrop<T>(n: MaybeWatchSource<number>, xs: MaybeRef<readonly T[]>): ComputedRef<T[]>;


/**
 * Returns a list containing all but the last `n` elements of the given `list`.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * See also {@link takeLast}, {@link drop}, {@link dropWhile}, {@link dropLastWhile}
 *
 * @example
 * ```typescript
 * R.dropLast(1, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
 * R.dropLast(2, ['foo', 'bar', 'baz']); //=> ['foo']
 * R.dropLast(3, ['foo', 'bar', 'baz']); //=> []
 * R.dropLast(4, ['foo', 'bar', 'baz']); //=> []
 * R.dropLast(3, 'ramda');               //=> 'ra'
 * ```
 */
export function useDropLast<T>(n: MaybeWatchSource<number>): {
  (xs: MaybeWatchSource<string>): ComputedRef<string>;
  (xs: MaybeWatchSource<readonly T[]>): ComputedRef<T[]>;
};
export function useDropLast<T>(n: MaybeWatchSource<number>, xs: MaybeWatchSource<readonly T[]>): ComputedRef<T[]>;
export function useDropLast(n: MaybeWatchSource<number>, xs: MaybeWatchSource<string>): ComputedRef<string>;


/**
 * Returns a new list excluding all the tailing elements of a given list which
 * satisfy the supplied predicate function. It passes each value from the right
 * to the supplied predicate function, skipping elements until the predicate
 * function returns a `falsy` value. The predicate function is applied to one argument:
 * *(value)*.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * See also {@link takeLastWhile}, {@link addIndex}, {@link drop}, {@link dropWhile}
 *
 * @example
 * ```typescript
 * const lteThree = x => x <= 3;
 * 
 * R.dropLastWhile(lteThree, [1, 2, 3, 4, 3, 2, 1]); //=> [1, 2, 3, 4]
 * 
 * R.dropLastWhile(x => x !== 'd' , 'Ramda'); //=> 'Ramd'
 * ```
 */
export function useDropLastWhile<T>(fn: MaybeRef<(a: T) => boolean>): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<T[]>;
export function useDropLastWhile<T>(fn: MaybeRef<(a: T) => boolean>, list: MaybeWatchSource<readonly T[]>): ComputedRef<T[]>;


/**
 * Returns a new list without any consecutively repeating elements.
 * [`R.equals`](#equals) is used to determine equality.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * See also {@link transduce}
 *
 * @example
 * ```typescript
 * R.dropRepeats([1, 1, 1, 2, 3, 4, 4, 2, 2]); //=> [1, 2, 3, 4, 2]
 * ```
 */
export function useDropRepeats<T>(list: MaybeWatchSource<readonly T[]>): ComputedRef<T[]>;


/**
 * Returns a new list without any consecutively repeating elements,
 * based upon the value returned by applying the supplied function to
 * each list element. [`R.equals`](#equals) is used to determine equality.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * See also {@link transduce}
 *
 * @example
 * ```typescript
 * R.dropRepeatsBy(Math.abs, [1, -1, -1, 2, 3, -4, 4, 2, 2]); //=> [1, 2, 3, -4, 2]
 * ```
 */
export function useDropRepeatsBy<T, U>(fn: MaybeRef<(a: T) => U>): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<T[]>;
export function useDropRepeatsBy<T, U>(fn: MaybeRef<(a: T) => U>, list: MaybeWatchSource<readonly T[]>): ComputedRef<T[]>;



/**
 * Returns a new list without any consecutively repeating elements. Equality is
 * determined by applying the supplied predicate to each pair of consecutive elements. The
 * first element in a series of equal elements will be preserved.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * See also {@link transduce}
 *
 * @example
 * ```typescript
 * const l = [1, -1, 1, 3, 4, -4, -4, -5, 5, 3, 3];
 * R.dropRepeatsWith(R.eqBy(Math.abs), l); //=> [1, 3, 4, -5, 3]
 * ```
 */
export function useDropRepeatsWith<T>(predicate: MaybeRef<(left: T, right: T) => boolean>): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<T[]>;
export function useDropRepeatsWith<T>(predicate: MaybeRef<(left: T, right: T) => boolean>, list: MaybeWatchSource<readonly T[]>): ComputedRef<T[]>;


/**
 * Returns a new list excluding the leading elements of a given list which
 * satisfy the supplied predicate function. It passes each value to the supplied
 * predicate function, skipping elements while the predicate function returns
 * `true`. The predicate function is applied to one argument: *(value)*.
 * 
 * Dispatches to the `dropWhile` method of the second argument, if present.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * See also {@link takeWhile}, {@link transduce}, {@link addIndex}
 *
 * @example
 * ```typescript
 * const lteTwo = x => x <= 2;
 * 
 * R.dropWhile(lteTwo, [1, 2, 3, 4, 3, 2, 1]); //=> [3, 4, 3, 2, 1]
 * 
 * R.dropWhile(x => x !== 'd' , 'Ramda'); //=> 'da'
 * ```
 */
export function useDropWhile<T>(fn: MaybeRef<(a: T) => boolean>): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<T[]>;
export function useDropWhile<T>(fn: MaybeRef<(a: T) => boolean>, list: MaybeWatchSource<readonly T[]>): ComputedRef<T[]>;


/**
 * A function wrapping calls to the two functions in an `||` operation,
 * returning the result of the first function if it is truth-y and the result
 * of the second function otherwise. Note that this is short-circuited,
 * meaning that the second function will not be invoked if the first returns a
 * truth-y value.
 * 
 * In addition to functions, `R.either` also accepts any fantasy-land compatible
 * applicative functor.
 *
 * See also {@link both}, {@link anyPass}, {@link or}
 *
 * @example
 * ```typescript
 * const gt10 = x => x > 10;
 * const even = x => x % 2 === 0;
 * const f = R.either(gt10, even);
 * f(101); //=> true
 * f(8); //=> true
 * 
 * R.either(Maybe.Just(false), Maybe.Just(55)); // => Maybe.Just(55)
 * R.either([false, false, 'a'], [11]) // => [11, 11, "a"]
 * ```
 */
export function useEither<T extends Pred>(pred1: MaybeRef<T>): (pred2: MaybeRef<T>) => ComputedRef<T>;
export function useEither<T extends Pred>(pred1: MaybeRef<T>, pred2: MaybeRef<T>): ComputedRef<T>;


/**
 * Returns the empty value of its argument's type. Ramda defines the empty
 * value of Array (`[]`), Object (`{}`), String (`''`),
 * TypedArray (`Uint8Array []`, `Float32Array []`, etc), and Arguments. Other
 * types are supported if they define `<Type>.empty`,
 * `<Type>.prototype.empty` or implement the
 * [FantasyLand Monoid spec](https://github.com/fantasyland/fantasy-land#monoid).
 * 
 * Dispatches to the `empty` method of the first argument, if present.
 *
 * @example
 * ```typescript
 * R.empty(Just(42));               //=> Nothing()
 * R.empty([1, 2, 3]);              //=> []
 * R.empty('unicorns');             //=> ''
 * R.empty({x: 1, y: 2});           //=> {}
 * R.empty(Uint8Array.from('123')); //=> Uint8Array []
 * ```
 */
export function useEmpty<T>(x: MaybeRef<T>): ComputedRef<T>;


/**
 * Checks if a list ends with the provided sublist.
 * 
 * Similarly, checks if a string ends with the provided substring.
 *
 * See also {@link startsWith}
 *
 * @example
 * ```typescript
 * R.endsWith('c', 'abc')                //=> true
 * R.endsWith('b', 'abc')                //=> false
 * R.endsWith(['c'], ['a', 'b', 'c'])    //=> true
 * R.endsWith(['b'], ['a', 'b', 'c'])    //=> false
 * ```
 */
export function useEndsWith(substr: MaybeRef<string>): (str: MaybeRef<string>) => ComputedRef<boolean>;
export function useEndsWith<T>(subList: MaybeRef<readonly T[]>): (list: MaybeRef<readonly T[]>) => ComputedRef<boolean>;
export function useEndsWith(substr: MaybeRef<string>, str: MaybeRef<string>): ComputedRef<boolean>;
export function useEndsWith<T>(subList: MaybeRef<readonly T[]>, list: MaybeRef<readonly T[]>): ComputedRef<boolean>;


/**
 * Takes a function and two values in its domain and returns `true` if the
 * values map to the same value in the codomain; `false` otherwise.
 *
 * @example
 * ```typescript
 * R.eqBy(Math.abs, 5, -5); //=> true
 * ```
 */
export function useEqBy<T>(fn: MaybeRef<(a: T) => unknown>): {
  (a: MaybeRef<T>): (b: MaybeRef<T>) => ComputedRef<boolean>;
  (a: MaybeRef<T>, b: MaybeRef<T>): ComputedRef<boolean>;
};
export function useEqBy<T>(fn: MaybeRef<(a: T) => unknown>, a: MaybeRef<T>): (b: MaybeRef<T>) => ComputedRef<boolean>;
export function useEqBy<T>(fn: MaybeRef<(a: T) => unknown>, a: MaybeRef<T>, b: MaybeRef<T>): ComputedRef<boolean>;


/**
 * Reports whether two objects have the same value, in [`R.equals`](#equals)
 * terms, for the specified property. Useful as a curried predicate.
 *
 * @example
 * ```typescript
 * const o1 = { a: 1, b: 2, c: 3, d: 4 };
 * const o2 = { a: 10, b: 20, c: 3, d: 40 };
 * R.eqProps('a', o1, o2); //=> false
 * R.eqProps('c', o1, o2); //=> true
 * ```
 */
export function useEqProps<P extends string>(prop: MaybeWatchSource<P>): <T, U>(obj1: MaybeWatchSource<Record<P, T>>, obj2: MaybeWatchSource<Record<P, U>>) => ComputedRef<boolean>;
export function useEqProps<T>(prop: MaybeWatchSource<string>, obj1: MaybeWatchSource<T>): <U>(obj2: MaybeWatchSource<U>) => ComputedRef<boolean>;
export function useEqProps<T, U>(prop: MaybeWatchSource<string>, obj1: MaybeWatchSource<T>, obj2: MaybeWatchSource<U>): ComputedRef<boolean>;


/**
 * Returns `true` if its arguments are equivalent, `false` otherwise. Handles
 * cyclical data structures.
 * 
 * Dispatches symmetrically to the `equals` methods of both arguments, if
 * present.
 *
 * @example
 * ```typescript
 * R.equals(1, 1); //=> true
 * R.equals(1, '1'); //=> false
 * R.equals([1, 2, 3], [1, 2, 3]); //=> true
 * 
 * const a = {}; a.v = a;
 * const b = {}; b.v = b;
 * R.equals(a, b); //=> true
 * ```
 */
export function useEquals<T>(a: MaybeRef<T>): (b: MaybeRef<T>) => ComputedRef<boolean>;
export function useEquals<T>(__: Placeholder, b: MaybeRef<T>): (a: MaybeRef<T>) => ComputedRef<boolean>;
export function useEquals<T>(a: MaybeRef<T>, b: MaybeRef<T>): ComputedRef<boolean>;


/**
 * Creates a new object by recursively evolving a shallow copy of `object`,
 * according to the `transformation` functions. All non-primitive properties
 * are copied by reference.
 * 
 * A `transformation` function will not be invoked if its corresponding key
 * does not exist in the evolved object.
 *
 * @example
 * ```typescript
 * const tomato = {firstName: '  Tomato ', data: {elapsed: 100, remaining: 1400}, id:123};
 * const transformations = {
 *   firstName: R.trim,
 *   lastName: R.trim, // Will not get invoked.
 *   data: {elapsed: R.add(1), remaining: R.add(-1)}
 * };
 * R.evolve(transformations, tomato); //=> {firstName: 'Tomato', data: {elapsed: 101, remaining: 1399}, id:123}
 * ```
 */
export function useEvolve<E extends Evolver>(transformations: MaybeWatchSource<E>): <V extends Evolvable<E>>(obj: MaybeWatchSource<V>) => ComputedRef<Evolve<V, E>>;
export function useEvolve<E extends Evolver, V extends Evolvable<E>>(transformations: MaybeWatchSource<E>, obj: MaybeWatchSource<V>): ComputedRef<Evolve<V, E>>;


/**
 * Takes a predicate and a `Filterable`, and returns a new filterable of the
 * same type containing the members of the given filterable which satisfy the
 * given predicate. Filterable objects include plain objects or any object
 * that has a filter method such as `Array`.
 * 
 * Dispatches to the `filter` method of the second argument, if present.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * See also {@link reject}, {@link transduce}, {@link addIndex}
 *
 * @example
 * ```typescript
 * const isEven = n => n % 2 === 0;
 * 
 * R.filter(isEven, [1, 2, 3, 4]); //=> [2, 4]
 * 
 * R.filter(isEven, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 * ```
 */
export function useFilter<A, P extends A>(
  pred: MaybeRef<(val: A) => val is P>,
): {
  <B extends A>(list: MaybeWatchSource<readonly B[]>): ComputedRef<P[]>;
  <B extends A>(dict: MaybeWatchSource<Record<string, B>>): ComputedRef<Record<string, P>>;
};
export function useFilter<T>(
  pred: MaybeRef<(value: T) => boolean>,
): <P extends T, C extends readonly P[] | Record<string, P>>(collection: MaybeWatchSource<C>) => ComputedRef<C>;
export function useFilter<T, P extends T>(pred: MaybeRef<(val: T) => val is P>, list: MaybeWatchSource<readonly T[]>): ComputedRef<P[]>;
export function useFilter<T, P extends T>(pred: MaybeRef<(val: T) => val is P>, dict: MaybeWatchSource<Record<string, T>>): ComputedRef<Record<string, P>>;
export function useFilter<T, C extends readonly T[] | Record<string, T>>(pred: MaybeRef<(value: T) => boolean>, collection: MaybeWatchSource<C>): ComputedRef<C>;


/**
 * Returns the first element of the list which matches the predicate, or
 * `undefined` if no element matches.
 * 
 * Dispatches to the `find` method of the second argument, if present.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * See also {@link transduce}
 *
 * @example
 * ```typescript
 * const xs = [{a: 1}, {a: 2}, {a: 3}];
 * R.find(R.propEq('a', 2))(xs); //=> {a: 2}
 * R.find(R.propEq('a', 4))(xs); //=> undefined
 * ```
 */
export function useFind<T, P extends T>(pred: MaybeRef<(val: T) => val is P>): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<P | undefined>;
export function useFind<T>(pred: MaybeRef<(val: T) => boolean>): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<T | undefined>;
export function useFind<T, P extends T>(pred: MaybeRef<(val: T) => val is P>, list: MaybeWatchSource<readonly T[]>): ComputedRef<P | undefined>;
export function useFind<T>(pred: MaybeRef<(val: T) => boolean>, list: MaybeWatchSource<readonly T[]>): ComputedRef<T | undefined>;


/**
 * Returns the index of the first element of the list which matches the
 * predicate, or `-1` if no element matches.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * See also {@link transduce}, {@link indexOf}
 *
 * @example
 * ```typescript
 * const xs = [{a: 1}, {a: 2}, {a: 3}];
 * R.findIndex(R.propEq('a', 2))(xs); //=> 1
 * R.findIndex(R.propEq('a', 4))(xs); //=> -1
 * ```
 */
export function useFindIndex<T>(fn: MaybeRef<(a: T) => boolean>): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<number>;
export function useFindIndex<T>(fn: MaybeRef<(a: T) => boolean>, list: MaybeWatchSource<readonly T[]>): ComputedRef<number>;


/**
 * Returns the last element of the list which matches the predicate, or
 * `undefined` if no element matches.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * See also {@link transduce}
 *
 * @example
 * ```typescript
 * const xs = [{a: 1, b: 0}, {a:1, b: 1}];
 * R.findLast(R.propEq('a', 1))(xs); //=> {a: 1, b: 1}
 * R.findLast(R.propEq('a', 4))(xs); //=> undefined
 * ```
 */
export function useFindLast<T, P extends T>(pred: MaybeRef<(val: T) => val is P>): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<P | undefined>;
export function useFindLast<T>(pred: MaybeRef<(val: T) => boolean>): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<T | undefined>;
export function useFindLast<T, P extends T>(pred: MaybeRef<(val: T) => val is P>, list: MaybeWatchSource<readonly T[]>): ComputedRef<P | undefined>;
export function useFindLast<T>(pred: MaybeRef<(val: T) => boolean>, list: MaybeWatchSource<readonly T[]>): ComputedRef<T | undefined>;


/**
 * Returns the index of the last element of the list which matches the
 * predicate, or `-1` if no element matches.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * See also {@link transduce}, {@link lastIndexOf}
 *
 * @example
 * ```typescript
 * const xs = [{a: 1, b: 0}, {a:1, b: 1}];
 * R.findLastIndex(R.propEq('a', 1))(xs); //=> 1
 * R.findLastIndex(R.propEq('a', 4))(xs); //=> -1
 * ```
 */
export function useFindLastIndex<T>(fn: MaybeRef<(a: T) => boolean>): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<number>;
export function useFindLastIndex<T>(fn: MaybeRef<(a: T) => boolean>, list: MaybeWatchSource<readonly T[]>): ComputedRef<number>;


/**
 * Returns a new list by pulling every item out of it (and all its sub-arrays)
 * and putting them in a new array, depth-first.
 *
 * See also {@link unnest}
 *
 * @example
 * ```typescript
 * R.flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]);
 * //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
 * ```
 */
export function useFlatten<T extends readonly any[]>(list: MaybeWatchSource<T>): ComputedRef<_.T.Flatten<T>>;


/**
 * Returns a new function much like the supplied one, except that the first two
 * arguments' order is reversed.
 *
 * @example
 * ```typescript
 * const mergeThree = (a, b, c) => [].concat(a, b, c);
 * 
 * mergeThree(1, 2, 3); //=> [1, 2, 3]
 * 
 * R.flip(mergeThree)(1, 2, 3); //=> [2, 1, 3]
 * ```
 */
export function useFlip<T, U, TResult>(fn: MaybeRef<(arg0: T, arg1: U) => TResult>): ComputedRef<{
  (arg1: U): (arg0: T) => TResult;
  (arg1: U, arg0: T): TResult;
}>;
export function useFlip<F extends (...args: any) => any, P extends _.F.Parameters<F>>(
  fn: MaybeRef<F>,
): ComputedRef<_.F.Curry<(...args: _.T.Merge<[P[1], P[0]], P>) => _.F.Return<F>>>;


/**
 * Iterate over an input `list`, calling a provided function `fn` for each
 * element in the list.
 * 
 * `fn` receives one argument: *(value)*.
 * 
 * Note: `R.forEach` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.forEach` method. For more
 * details on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Description
 * 
 * Also note that, unlike `Array.prototype.forEach`, Ramda's `forEach` returns
 * the original array. In some libraries this function is named `each`.
 * 
 * Dispatches to the `forEach` method of the second argument, if present.
 *
 * See also {@link addIndex}
 *
 * @example
 * ```typescript
 * const printXPlusFive = x => console.log(x + 5);
 * R.forEach(printXPlusFive, [1, 2, 3]); //=> [1, 2, 3]
 * // logs 6
 * // logs 7
 * // logs 8
 * ```
 */
export function useForEach<T>(fn: MaybeRef<(x: T) => void>): <U extends readonly T[]>(list: MaybeWatchSource<U>) => ComputedRef<U>;
export function useForEach<U extends readonly any[] = readonly any[]>(__: Placeholder, list: MaybeRef<U>): (fn: MaybeWatchSource<(x: U extends readonly (infer T)[] ? T : never) => void>) => ComputedRef<U>;
export function useForEach<T, U extends readonly T[] = readonly T[]>(fn: MaybeRef<(x: T) => void>, list: MaybeWatchSource<U>): ComputedRef<U>;


/**
 * Iterate over an input `object`, calling a provided function `fn` for each
 * key and value in the object.
 * 
 * `fn` receives three argument: *(value, key, obj)*.
 *
 * @example
 * ```typescript
 * const printKeyConcatValue = (value, key) => console.log(key + ':' + value);
 * R.forEachObjIndexed(printKeyConcatValue, {x: 1, y: 2}); //=> {x: 1, y: 2}
 * // logs x:1
 * // logs y:2
 * ```
 */
export function useForEachObjIndexed<T>(fn: MaybeRef<(value: T[keyof T], key: keyof T, obj: T) => void>): (obj: MaybeWatchSource<T>) => ComputedRef<T>;
export function useForEachObjIndexed<T>(fn: MaybeRef<(value: T[keyof T], key: keyof T, obj: T) => void>, obj: MaybeWatchSource<T>): ComputedRef<T>;


/**
 * Creates a new object from a list key-value pairs. If a key appears in
 * multiple pairs, the rightmost pair is included in the object.
 *
 * See also {@link toPairs}, {@link pair}
 *
 * @example
 * ```typescript
 * R.fromPairs([['a', 1], ['b', 2], ['c', 3]]); //=> {a: 1, b: 2, c: 3}
 * ```
 */
export function useFromPairs<V>(
  pairs: MaybeWatchSource<ReadonlyArray<Readonly<KeyValuePair<string, V>>> | ReadonlyArray<Readonly<KeyValuePair<number, V>>>>,
): ComputedRef<{ [index: string]: V }>;


/**
 * Splits a list into sub-lists stored in an object, based on the result of
 * calling a key-returning function on each element, and grouping the
 * results according to values returned.
 * 
 * Dispatches to the `groupBy` method of the second argument, if present.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * See also {@link reduceBy}, {@link transduce}, {@link indexBy}, {@link collectBy}
 *
 * @example
 * ```typescript
 * const byGrade = R.groupBy(function(student) {
 *   const score = student.score;
 *   return score < 65 ? 'F' :
 *          score < 70 ? 'D' :
 *          score < 80 ? 'C' :
 *          score < 90 ? 'B' : 'A';
 * });
 * const students = [{name: 'Abby', score: 84},
 *                 {name: 'Eddy', score: 58},
 *                 // ...
 *                 {name: 'Jack', score: 69}];
 * byGrade(students);
 * // {
 * //   'A': [{name: 'Dianne', score: 99}],
 * //   'B': [{name: 'Abby', score: 84}]
 * //   // ...,
 * //   'F': [{name: 'Eddy', score: 58}]
 * // }
 * ```
 */
export function useGroupBy<T, K extends string = string>(fn: MaybeRef<(a: T) => K>): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<Partial<Record<K, T[]>>>;
export function useGroupBy<T>(__: Placeholder, list: MaybeRef<readonly T[]>): <K extends string = string>(fn: MaybeWatchSource<(a: T) => K>) => ComputedRef<Partial<Record<K, T[]>>>;
export function useGroupBy<T, K extends string = string>(fn: MaybeRef<(a: T) => K>, list: MaybeWatchSource<readonly T[]>): ComputedRef<Partial<Record<K, T[]>>>;


/**
 * Takes a list and returns a list of lists where each sublist's elements are
 * all satisfied pairwise comparison according to the provided function.
 * Only adjacent elements are passed to the comparison function.
 *
 * @example
 * ```typescript
 * R.groupWith(R.equals, [0, 1, 1, 2, 3, 5, 8, 13, 21])
 * //=> [[0], [1, 1], [2], [3], [5], [8], [13], [21]]
 * 
 * R.groupWith((a, b) => a + 1 === b, [0, 1, 1, 2, 3, 5, 8, 13, 21])
 * //=> [[0, 1], [1, 2, 3], [5], [8], [13], [21]]
 * 
 * R.groupWith((a, b) => a % 2 === b % 2, [0, 1, 1, 2, 3, 5, 8, 13, 21])
 * //=> [[0], [1, 1], [2], [3, 5], [8], [13, 21]]
 * 
 * const isVowel = R.test(/^[aeiou]$/i);
 * R.groupWith(R.eqBy(isVowel), 'aestiou')
 * //=> ['ae', 'st', 'iou']
 * ```
 */
export function useGroupWith<T>(fn: MaybeRef<(a: T, b: T) => boolean>): {
  (list: MaybeWatchSource<string>): ComputedRef<string[]>;
  (list: MaybeWatchSource<readonly T[]>): ComputedRef<T[][]>;
};
export function useGroupWith<T>(fn: MaybeRef<(a: T, b: T) => boolean>, list: MaybeWatchSource<string>): ComputedRef<string[]>;
export function useGroupWith<T>(fn: MaybeRef<(a: T, b: T) => boolean>, list: MaybeWatchSource<readonly T[]>): ComputedRef<T[][]>;


/**
 * Returns `true` if the first argument is greater than the second; `false`
 * otherwise.
 *
 * See also {@link lt}
 *
 * @example
 * ```typescript
 * R.gt(2, 1); //=> true
 * R.gt(2, 2); //=> false
 * R.gt(2, 3); //=> false
 * R.gt('a', 'z'); //=> false
 * R.gt('z', 'a'); //=> true
 * ```
 */
export function useGt<T extends Ord>(a: MaybeRef<T>): (b: MaybeRef<WidenLiterals<T>>) => ComputedRef<boolean>;
export function useGt<T extends Ord>(__: Placeholder, b: MaybeRef<T>): (a: MaybeRef<WidenLiterals<T>>) => ComputedRef<boolean>;
export function useGt<T extends Ord>(a: MaybeRef<T>, b: MaybeRef<T>): ComputedRef<boolean>;


/**
 * Returns `true` if the first argument is greater than or equal to the second;
 * `false` otherwise.
 *
 * See also {@link lte}
 *
 * @example
 * ```typescript
 * R.gte(2, 1); //=> true
 * R.gte(2, 2); //=> true
 * R.gte(2, 3); //=> false
 * R.gte('a', 'z'); //=> false
 * R.gte('z', 'a'); //=> true
 * ```
 */
export function useGte<T extends Ord>(a: MaybeWatchSource<T>): (b: MaybeWatchSource<WidenLiterals<T>>) => ComputedRef<boolean>;
export function useGte<T extends Ord>(__: Placeholder, b: MaybeWatchSource<T>): (a: MaybeWatchSource<WidenLiterals<T>>) => ComputedRef<boolean>;
export function useGte<T extends Ord>(a: MaybeWatchSource<T>, b: MaybeWatchSource<T>): ComputedRef<boolean>;


/**
 * Returns whether or not an object has an own property with the specified name
 *
 * @example
 * ```typescript
 * const hasName = R.has('name');
 * hasName({name: 'alice'});   //=> true
 * hasName({name: 'bob'});     //=> true
 * hasName({});                //=> false
 * 
 * const point = {x: 0, y: 0};
 * const pointHas = R.has(R.__, point);
 * pointHas('x');  //=> true
 * pointHas('y');  //=> true
 * pointHas('z');  //=> false
 * ```
 */
export function useHas<K extends PropertyKey>(prop: MaybeWatchSource<K>): (obj: MaybeWatchSource<unknown>) => obj is ComputedRef<ObjectHavingSome<K>>;
export function useHas(__: Placeholder, obj: MaybeWatchSource<unknown>): <P extends PropertyKey>(s: MaybeWatchSource<P>) => ComputedRef<boolean>;
export function useHas<K extends PropertyKey>(prop: MaybeWatchSource<K>, obj: MaybeWatchSource<unknown>): obj is ComputedRef<ObjectHavingSome<K>>;



/**
 * Returns whether or not an object or its prototype chain has a property with
 * the specified name
 *
 * @example
 * ```typescript
 * function Rectangle(width, height) {
 *   this.width = width;
 *   this.height = height;
 * }
 * Rectangle.prototype.area = function() {
 *   return this.width * this.height;
 * };
 * 
 * const square = new Rectangle(2, 2);
 * R.hasIn('width', square);  //=> true
 * R.hasIn('area', square);  //=> true
 * ```
 */
export function useHasIn(s: MaybeWatchSource<string>): <T>(obj: MaybeWatchSource<T>) => ComputedRef<boolean>;
export function useHasIn<T>(s: MaybeWatchSource<string>, obj: MaybeWatchSource<T>): ComputedRef<boolean>;


/**
 * Returns whether or not a path exists in an object. Only the object's
 * own properties are checked.
 *
 * See also {@link has}
 *
 * @example
 * ```typescript
 * R.hasPath(['a', 'b'], {a: {b: 2}});         // => true
 * R.hasPath(['a', 'b'], {a: {b: undefined}}); // => true
 * R.hasPath(['a', 'b'], {a: {c: 2}});         // => false
 * R.hasPath(['a', 'b'], {});                  // => false
 * ```
 */
export function useHasPath(list: MaybeWatchSource<readonly string[]>): <T>(obj: MaybeWatchSource<T>) => ComputedRef<boolean>;
export function useHasPath<T>(list: MaybeWatchSource<readonly string[]>, obj: MaybeWatchSource<T>): ComputedRef<boolean>;


/**
 * Returns the first element of the given list or string. In some libraries
 * this function is named `first`.
 *
 * See also {@link tail}, {@link init}, {@link last}
 *
 * @example
 * ```typescript
 * R.head(['fi', 'fo', 'fum']); //=> 'fi'
 * R.head([]); //=> undefined
 * 
 * R.head('abc'); //=> 'a'
 * R.head(''); //=> ''
 * ```
 */
export function useHead(str: MaybeWatchSource<string>): ComputedRef<string>;
// empty tuple - purposefully `never`. `head` should never work on tuple type with no length
export function useHead(list: MaybeWatchSource<readonly []>): ComputedRef<never>;
// non-empty tuple
export function useHead<T1, TRest>(list: MaybeWatchSource<readonly [T1, ...TRest[]]>): ComputedRef<T1>;
// arrays, because these could be empty, they return `T | undefined`
// this is no different than the tuple form since `T[]` can be empty at runtime
export function useHead<T>(list: MaybeWatchSource<readonly T[]>): ComputedRef<T | undefined>;


/**
 * Returns true if its arguments are identical, false otherwise. Values are
 * identical if they reference the same memory. `NaN` is identical to `NaN`;
 * `0` and `-0` are not identical.
 * 
 * Note this is merely a curried version of ES6 `Object.is`.
 * 
 * `identical` does not support the `__` placeholder.
 *
 * @example
 * ```typescript
 * const o = {};
 * R.identical(o, o); //=> true
 * R.identical(1, 1); //=> true
 * R.identical(1, '1'); //=> false
 * R.identical([], []); //=> false
 * R.identical(0, -0); //=> false
 * R.identical(NaN, NaN); //=> true
 * ```
 */
export function useIdentical<T>(a: MaybeRef<T>): (b: MaybeRef<T>) => ComputedRef<boolean>;
export function useIdentical<T>(a: MaybeRef<T>, b: MaybeRef<T>): ComputedRef<boolean>;


/**
 * A function that does nothing but return the parameter supplied to it. Good
 * as a default or placeholder function.
 *
 * @example
 * ```typescript
 * R.identity(1); //=> 1
 * 
 * const obj = {};
 * R.identity(obj) === obj; //=> true
 * ```
 */
export function useIdentity<T>(a: MaybeRef<T>): ComputedRef<T>;


/**
 * Creates a function that will process either the `onTrue` or the `onFalse`
 * function depending upon the result of the `condition` predicate.
 * 
 * Note that `ifElse` takes its arity from the longest of the three functions passed to it.
 *
 * See also {@link unless}, {@link when}, {@link cond}
 *
 * @example
 * ```typescript
 * const incCount = R.ifElse(
 *   R.has('count'),
 *   R.over(R.lensProp('count'), R.inc),
 *   R.assoc('count', 1)
 * );
 * incCount({ count: 1 }); //=> { count: 2 }
 * incCount({});           //=> { count: 1 }
 * ```
 */
export function useIfElse<T, TF extends T, TOnTrueResult, TOnFalseResult>(
  pred: MaybeRef<PredTypeguard<T, TF>>,
  onTrue: MaybeRef<(a: TF) => TOnTrueResult>,
  onFalse: MaybeRef<(a: Exclude<T, TF>) => TOnFalseResult>,
): ComputedRef<(a: T) => TOnTrueResult | TOnFalseResult>;
export function useIfElse<TArgs extends any[], TOnTrueResult, TOnFalseResult>(
  fn: MaybeRef<Pred<TArgs>>,
  onTrue: MaybeRef<(...args: TArgs) => TOnTrueResult>,
  onFalse: MaybeRef<(...args: TArgs) => TOnFalseResult>,
): ComputedRef<(...args: TArgs) => TOnTrueResult | TOnFalseResult>;


/**
 * Increments its argument.
 *
 * See also {@link dec}
 *
 * @example
 * ```typescript
 * R.inc(42); //=> 43
 * ```
 */
export function useInc(n: MaybeWatchSource<number>): ComputedRef<number>;


/**
 * Returns `true` if the specified value is equal, in [`R.equals`](#equals)
 * terms, to at least one element of the given list; `false` otherwise.
 * Also works with strings.
 *
 * See also {@link any}
 *
 * @example
 * ```typescript
 * R.includes(3, [1, 2, 3]); //=> true
 * R.includes(4, [1, 2, 3]); //=> false
 * R.includes({ name: 'Fred' }, [{ name: 'Fred' }]); //=> true
 * R.includes([42], [[42]]); //=> true
 * R.includes('ba', 'banana'); //=>true
 * ```
 */
export function useIncludes(s: MaybeWatchSource<string>): (list: MaybeWatchSource<readonly string[] | string>) => ComputedRef<boolean>;
export function useIncludes<T>(target: MaybeWatchSource<T>): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<boolean>;

export function useIncludes(__: Placeholder, list: MaybeWatchSource<string>): (s: MaybeWatchSource<string>) => ComputedRef<boolean>;
export function useIncludes<T>(__: Placeholder, list: MaybeWatchSource<readonly T[]>): (target: MaybeWatchSource<T>) => ComputedRef<boolean>;

export function useIncludes(s: MaybeWatchSource<string>, list: MaybeWatchSource<string>): ComputedRef<boolean>;
export function useIncludes<T>(target: MaybeWatchSource<T>, list: MaybeWatchSource<readonly T[]>): ComputedRef<boolean>;


/**
 * Given a function that generates a key, turns a list of objects into an
 * object indexing the objects by the given key. Note that if multiple
 * objects generate the same value for the indexing key only the last value
 * will be included in the generated object.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * See also {@link groupBy}
 *
 * @example
 * ```typescript
 * const list = [{id: 'xyz', title: 'A'}, {id: 'abc', title: 'B'}];
 * R.indexBy(R.prop('id'), list);
 * //=> {abc: {id: 'abc', title: 'B'}, xyz: {id: 'xyz', title: 'A'}}
 * ```
 */
export function useIndexBy<T, K extends string | number = string>(
  fn: MaybeRef<(a: T) => K>,
): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<{ [key in K]: T }>;
export function useIndexBy<T, K extends string | number | undefined = string>(
  fn: MaybeRef<(a: T) => K | undefined>,
): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<{ [key in NonNullable<K>]?: T }>;
export function useIndexBy<T, K extends string | number = string>(fn: MaybeRef<(a: T) => K>, list: MaybeWatchSource<readonly T[]>): ComputedRef<{ [key in K]: T }>;
export function useIndexBy<T, K extends string | number | undefined = string>(
  fn: MaybeRef<(a: T) => K>,
  list: MaybeWatchSource<readonly T[]>,
): ComputedRef<{ [key in NonNullable<K>]?: T }>;


/**
 * Returns the position of the first occurrence of an item in an array, or -1
 * if the item is not included in the array. [`R.equals`](#equals) is used to
 * determine equality.
 *
 * See also {@link lastIndexOf}, {@link findIndex}
 *
 * @example
 * ```typescript
 * R.indexOf(3, [1,2,3,4]); //=> 2
 * R.indexOf(10, [1,2,3,4]); //=> -1
 * ```
 */
export function useIndexOf(target: MaybeRef<string>): (list: MaybeWatchSource<readonly string[] | string>) => ComputedRef<number>;
export function useIndexOf<T>(target: MaybeRef<T>): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<number>;
export function useIndexOf(target: MaybeRef<string>, list: MaybeWatchSource<readonly string[] | string>): ComputedRef<number>;
export function useIndexOf<T>(target: MaybeRef<T>, list: MaybeWatchSource<readonly T[]>): ComputedRef<number>;


/**
 * Returns all but the last element of the given list or string.
 *
 * See also {@link last}, {@link head}, {@link tail}
 *
 * @example
 * ```typescript
 * R.init([1, 2, 3]);  //=> [1, 2]
 * R.init([1, 2]);     //=> [1]
 * R.init([1]);        //=> []
 * R.init([]);         //=> []
 * 
 * R.init('abc');  //=> 'ab'
 * R.init('ab');   //=> 'a'
 * R.init('a');    //=> ''
 * R.init('');     //=> ''
 * ```
 */
export function useInit(list: MaybeRef<string>): ComputedRef<string>;
export function useInit<T>(list: MaybeRef<readonly T[]>): ComputedRef<T[]>;


/**
 * Takes a predicate `pred`, a list `xs`, and a list `ys`, and returns a list
 * `xs'` comprising each of the elements of `xs` which is equal to one or more
 * elements of `ys` according to `pred`.
 * 
 * `pred` must be a binary function expecting an element from each list.
 * 
 * `xs`, `ys`, and `xs'` are treated as sets, semantically, so ordering should
 * not be significant, but since `xs'` is ordered the implementation guarantees
 * that its values are in the same order as they appear in `xs`. Duplicates are
 * not removed, so `xs'` may contain duplicates if `xs` contains duplicates.
 *
 * See also {@link intersection}
 *
 * @example
 * ```typescript
 * R.innerJoin(
 *   (record, id) => record.id === id,
 *   [{id: 824, name: 'Richie Furay'},
 *    {id: 956, name: 'Dewey Martin'},
 *    {id: 313, name: 'Bruce Palmer'},
 *    {id: 456, name: 'Stephen Stills'},
 *    {id: 177, name: 'Neil Young'}],
 *   [177, 456, 999]
 * );
 * //=> [{id: 456, name: 'Stephen Stills'}, {id: 177, name: 'Neil Young'}]
 * ```
 */
export function useInnerJoin<T1, T2>(
  pred: MaybeRef<(a: T1, b: T2) => boolean>,
): (list1: MaybeWatchSource<readonly T1[]>, list2: MaybeWatchSource<readonly T2[]>) => ComputedRef<T1[]>;
export function useInnerJoin<T1, T2>(
  pred: MaybeRef<(a: T1, b: T2) => boolean>,
  list1: MaybeWatchSource<readonly T1[]>,
): (list2: MaybeWatchSource<readonly T2[]>) => ComputedRef<T1[]>;
export function useInnerJoin<T1, T2>(pred: MaybeRef<(a: T1, b: T2) => boolean>, list1: MaybeWatchSource<readonly T1[]>, list2: MaybeWatchSource<readonly T2[]>): ComputedRef<T1[]>;


/**
 * Inserts the supplied element into the list, at the specified `index`. _Note that
 * 
 * this is not destructive_: it returns a copy of the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @example
 * ```typescript
 * R.insert(2, 'x', [1,2,3,4]); //=> [1,2,'x',3,4]
 * ```
 */
export function useInsert(index: MaybeWatchSource<number>): <T>(elt: MaybeRef<T>, list: MaybeWatchSource<readonly T[]>) => ComputedRef<T[]>;
export function useInsert<T>(index: MaybeWatchSource<number>, elt: MaybeRef<T>): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<T[]>;
export function useInsert<T>(index: MaybeWatchSource<number>, elt: MaybeRef<T>, list: MaybeWatchSource<readonly T[]>): ComputedRef<T[]>;


/**
 * Inserts the sub-list into the list, at the specified `index`. _Note that this is not
 * destructive_: it returns a copy of the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @example
 * ```typescript
 * R.insertAll(2, ['x','y','z'], [1,2,3,4]); //=> [1,2,'x','y','z',3,4]
 * ```
 */
export function useInsertAll(index: MaybeWatchSource<number>): <T>(elts: MaybeWatchSource<readonly T[]>, list: MaybeWatchSource<readonly T[]>) => ComputedRef<T[]>;
export function useInsertAll<T>(index: MaybeWatchSource<number>, elts: MaybeWatchSource<readonly T[]>): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<T[]>;
export function useInsertAll<T>(index: MaybeWatchSource<number>, elts: MaybeWatchSource<readonly T[]>, list: MaybeWatchSource<readonly T[]>): ComputedRef<T[]>;


/**
 * Combines two lists into a set (i.e. no duplicates) composed of those
 * elements common to both lists.
 *
 * See also {@link innerJoin}
 *
 * @example
 * ```typescript
 * R.intersection([1,2,3,4], [7,6,5,4,3]); //=> [4, 3]
 * ```
 */
export function useIntersection<T>(list1: MaybeWatchSource<readonly T[]>): (list2: MaybeWatchSource<readonly T[]>) => ComputedRef<T[]>;
export function useIntersection<T>(list1: MaybeWatchSource<readonly T[]>, list2: MaybeWatchSource<readonly T[]>): ComputedRef<T[]>;


/**
 * Creates a new list with the separator interposed between elements.
 * 
 * Dispatches to the `intersperse` method of the second argument, if present.
 *
 * @example
 * ```typescript
 * R.intersperse('a', ['b', 'n', 'n', 's']); //=> ['b', 'a', 'n', 'a', 'n', 'a', 's']
 * ```
 */
export function useIntersperse<T>(separator: MaybeRef<T>): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<T[]>;
export function useIntersperse<T>(separator: MaybeRef<T>, list: MaybeWatchSource<readonly T[]>): ComputedRef<T[]>;


/**
 * Transforms the items of the list with the transducer and appends the
 * transformed items to the accumulator using an appropriate iterator function
 * based on the accumulator type.
 * 
 * The accumulator can be an array, string, object or a transformer. Iterated
 * items will be appended to arrays and concatenated to strings. Objects will
 * be merged directly or 2-item arrays will be merged as key, value pairs.
 * 
 * The accumulator can also be a transformer object that provides a 2-arity
 * reducing iterator function, step, 0-arity initial value function, init, and
 * 1-arity result extraction function result. The step function is used as the
 * iterator function in reduce. The result function is used to convert the
 * final accumulator into the return type and in most cases is R.identity. The
 * init function is used to provide the initial accumulator.
 * 
 * The iteration is performed with [`R.reduce`](#reduce) after initializing the
 * transducer.
 *
 * See also {@link transduce}
 *
 * @example
 * ```typescript
 * const numbers = [1, 2, 3, 4];
 * const transducer = R.compose(R.map(R.add(1)), R.take(2));
 * 
 * R.into([], transducer, numbers); //=> [2, 3]
 * 
 * const intoArray = R.into([]);
 * intoArray(transducer, numbers); //=> [2, 3]
 * ```
 */
export function useInto(acc: MaybeRef<any>): <T>(xf: MaybeRef<(...a: readonly any[]) => any>, list: MaybeWatchSource<readonly T[]>) => ComputedRef<T[]>;
export function useInto<T>(acc: MaybeRef<any>, xf: MaybeRef<(...a: readonly any[]) => any>, list: MaybeWatchSource<readonly T[]>): ComputedRef<T[]>;
export function useInto<T, R>(acc: MaybeRef<any>, xf: MaybeRef<(...a: readonly any[]) => R[]>, list: MaybeWatchSource<readonly T[]>): ComputedRef<R[]>;
export function useInto(acc: MaybeRef<any>, xf: MaybeRef<(...a: readonly any[]) => any>): <T>(list: MaybeWatchSource<readonly T[]>) => ComputedRef<T[]>;


/**
 * Same as [`R.invertObj`](#invertObj), however this accounts for objects with
 * duplicate values by putting the values into an array.
 *
 * See also {@link invertObj}
 *
 * @example
 * ```typescript
 * const raceResultsByFirstName = {
 *   first: 'alice',
 *   second: 'jake',
 *   third: 'alice',
 * };
 * R.invert(raceResultsByFirstName);
 * //=> { 'alice': ['first', 'third'], 'jake':['second'] }
 * ```
 */
export function useInvert<T>(obj: MaybeWatchSource<T>): ComputedRef<{ [index: string]: string[] }>;


/**
 * Returns a new object with the keys of the given object as values, and the
 * values of the given object, which are coerced to strings, as keys. Note
 * that the last key found is preferred when handling the same value.
 *
 * See also {@link invert}
 *
 * @example
 * ```typescript
 * const raceResults = {
 *   first: 'alice',
 *   second: 'jake'
 * };
 * R.invertObj(raceResults);
 * //=> { 'alice': 'first', 'jake':'second' }
 * 
 * // Alternatively:
 * const raceResults = ['alice', 'jake'];
 * R.invertObj(raceResults);
 * //=> { 'alice': '0', 'jake':'1' }
 * ```
 */
export function useInvertObj(obj: MaybeWatchSource<{ [index: string]: string } | { [index: number]: string }>): ComputedRef<{ [index: string]: string }>;


/**
 * Given an `arity` (Number) and a `name` (String) the `invoker` function
 * returns a curried function that takes `arity` arguments and a `context`
 * object. It will "invoke" the `name`'d function (a method) on the `context`
 * object.
 *
 * See also {@link construct}
 *
 * @example
 * ```typescript
 * // A function with no arguments
 * const asJson = invoker(0, "json")
 * // Just like calling .then((response) => response.json())
 * fetch("http://example.com/index.json").then(asJson)
 * 
 * // A function with one argument
 * const sliceFrom = invoker(1, 'slice');
 * sliceFrom(6, 'abcdefghijklm'); //=> 'ghijklm'
 * 
 * // A function with two arguments
 * const sliceFrom6 = invoker(2, 'slice')(6);
 * sliceFrom6(8, 'abcdefghijklm'); //=> 'gh'
 * 
 * // NOTE: You can't simply pass some of the arguments to the initial invoker function.
 * const firstCreditCardSection = invoker(2, "slice", 0, 4)
 * firstCreditCardSection("4242 4242 4242 4242") // => Function<...>
 * 
 * // Since invoker returns a curried function, you may partially apply it to create the function you need.
 * const firstCreditCardSection = invoker(2, "slice")(0, 4)
 * firstCreditCardSection("4242 4242 4242 4242") // => "4242"
 * ```
 */
export function useInvoker(arity: MaybeWatchSource<number>, method: MaybeWatchSource<string>): ComputedRef<(...a: readonly any[]) => any>;


/**
 * See if an object (i.e. `val`) is an instance of the supplied constructor. This
 * function will check up the inheritance chain, if any.
 * If `val` was created using `Object.create`, `R.is(Object, val) === true`.
 *
 * @example
 * ```typescript
 * R.is(Object, {}); //=> true
 * R.is(Number, 1); //=> true
 * R.is(Object, 1); //=> false
 * R.is(String, 's'); //=> true
 * R.is(String, new String('')); //=> true
 * R.is(Object, new String('')); //=> true
 * R.is(Object, 's'); //=> false
 * R.is(Number, {}); //=> false
 * ```
 */
export function useIs<C extends (...args: any[]) => any>(ctor: MaybeWatchSource<C>): (val: MaybeRef<any>) => val is ComputedRef<ReturnType<C>>;
export function useIs<C extends new (...args: any[]) => any>(ctor: MaybeWatchSource<C>): (val: MaybeRef<any>) => val is ComputedRef<InstanceType<C>>;
export function useIs<C extends (...args: any[]) => any>(ctor: MaybeWatchSource<C>, val: MaybeRef<any>): val is ComputedRef<ReturnType<C>>;
export function useIs<C extends new (...args: any[]) => any>(ctor: MaybeWatchSource<C>, val: MaybeRef<any>): val is ComputedRef<InstanceType<C>>;


/**
 * Returns `true` if the given value is its type's empty value; `false`
 * otherwise.
 *
 * See also {@link empty}
 *
 * @example
 * ```typescript
 * R.isEmpty([1, 2, 3]);           //=> false
 * R.isEmpty([]);                  //=> true
 * R.isEmpty('');                  //=> true
 * R.isEmpty(null);                //=> false
 * R.isEmpty({});                  //=> true
 * R.isEmpty({length: 0});         //=> false
 * R.isEmpty(Uint8Array.from('')); //=> true
 * ```
 */
export function useIsEmpty(value: MaybeRef<any>): ComputedRef<boolean>;


/**
 * Checks if the input value is `null` or `undefined`.
 *
 * @example
 * ```typescript
 * R.isNil(null); //=> true
 * R.isNil(undefined); //=> true
 * R.isNil(0); //=> false
 * R.isNil([]); //=> false
 * ```
 */
export function useIsNil(value: MaybeRef<any>): value is ComputedRef<null | undefined>;


/**
 * Checks if the input value is not `null` and not `undefined`.
 *
 * @example
 * ```typescript
 * R.isNotNil(null); //=> false
 * R.isNotNil(undefined); //=> false
 * R.isNotNil(0); //=> true
 * R.isNotNil([]); //=> true
 * ```
 */
export function useIsNotNil<T>(value: MaybeRef<T>): value is ComputedRef<NonNullable<T>>;


/**
 * Returns a string made by inserting the `separator` between each element and
 * concatenating all the elements into a single string.
 *
 * See also {@link split}
 *
 * @example
 * ```typescript
 * const spacer = R.join(' ');
 * spacer(['a', 2, 3.4]);   //=> 'a 2 3.4'
 * R.join('|', [1, 2, 3]);    //=> '1|2|3'
 * ```
 */
export function useJoin(x: MaybeWatchSource<string>): (xs: MaybeWatchSource<readonly any[]>) => ComputedRef<string>;
export function useJoin(x: MaybeWatchSource<string>, xs: MaybeWatchSource<readonly any[]>): ComputedRef<string>;


/**
 * juxt applies a list of functions to a list of values.
 *
 * See also {@link applySpec}
 *
 * @example
 * ```typescript
 * const getRange = R.juxt([Math.min, Math.max]);
 * getRange(3, 4, 9, -3); //=> [-3, 9]
 * ```
 */
export function useJuxt<A extends any[], R1>(fns: MaybeWatchSource<[(...a: A) => R1]>): ComputedRef<(...a: A) => [R1]>;
export function useJuxt<A extends any[], R1, R2>(fns: MaybeWatchSource<[(...a: A) => R1, (...a: A) => R2]>): ComputedRef<(...a: A) => [R1, R2]>;
export function useJuxt<A extends any[], R1, R2, R3>(
  fns: MaybeWatchSource<[(...a: A) => R1, (...a: A) => R2, (...a: A) => R3]>,
): ComputedRef<(...a: A) => [R1, R2, R3]>;
export function useJuxt<A extends any[], R1, R2, R3, R4>(
  fns: MaybeWatchSource<[(...a: A) => R1, (...a: A) => R2, (...a: A) => R3, (...a: A) => R4]>,
): ComputedRef<(...a: A) => [R1, R2, R3, R4]>;
export function useJuxt<A extends any[], R1, R2, R3, R4, R5>(
  fns: MaybeWatchSource<[(...a: A) => R1, (...a: A) => R2, (...a: A) => R3, (...a: A) => R4, (...a: A) => R5]>,
): ComputedRef<(...a: A) => [R1, R2, R3, R4, R5]>;
export function useJuxt<A extends any[], U>(fns: MaybeWatchSource<Array<(...args: A) => U>>): ComputedRef<(...args: A) => U[]>;


/**
 * #__PURE__
 */
export function useKeys<T extends object>(x: MaybeWatchSource<T>): ComputedRef<Array<keyof T>>;
export function useKeys<T>(x: MaybeWatchSource<T>): ComputedRef<string[]>;


/**
 * Returns a list containing the names of all the properties of the supplied
 * object, including prototype properties.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * See also {@link keys}, {@link valuesIn}
 *
 * @example
 * ```typescript
 * const F = function() { this.x = 'X'; };
 * F.prototype.y = 'Y';
 * const f = new F();
 * R.keysIn(f); //=> ['x', 'y']
 * ```
 */
export function useKeysIn<T>(obj: MaybeWatchSource<T>): ComputedRef<string[]>;


/**
 * Returns the last element of the given list or string.
 *
 * See also {@link init}, {@link head}, {@link tail}
 *
 * @example
 * ```typescript
 * R.last(['fi', 'fo', 'fum']); //=> 'fum'
 * R.last([]); //=> undefined
 * 
 * R.last('abc'); //=> 'c'
 * R.last(''); //=> ''
 * ```
 */
export function useLast(str: MaybeRef<string>): ComputedRef<string>;
export function useLast(list: MaybeRef<readonly []>): ComputedRef<undefined>;
export function useLast<T extends any>(list: MaybeRef<readonly T[]>): ComputedRef<T | undefined>;


/**
 * Returns the position of the last occurrence of an item in an array, or -1 if
 * the item is not included in the array. [`R.equals`](#equals) is used to
 * determine equality.
 *
 * See also {@link indexOf}, {@link findLastIndex}
 *
 * @example
 * ```typescript
 * R.lastIndexOf(3, [-1,3,3,0,1,2,3,4]); //=> 6
 * R.lastIndexOf(10, [1,2,3,4]); //=> -1
 * ```
 */
export function useLastIndexOf(target: MaybeRef<string>): (list: MaybeWatchSource<readonly string[] | string>) => ComputedRef<number>;
export function useLastIndexOf<T>(target: MaybeRef<T>): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<number>;
export function useLastIndexOf(target: MaybeRef<string>, list: MaybeWatchSource<readonly string[] | string>): ComputedRef<number>;
export function useLastIndexOf<T>(target: MaybeRef<T>, list: MaybeWatchSource<readonly T[]>): ComputedRef<number>;


/**
 * Returns the number of elements in the array by returning `list.length`.
 *
 * @example
 * ```typescript
 * R.length([]); //=> 0
 * R.length([1, 2, 3]); //=> 3
 * ```
 */
export function useLength<T extends { length: number }>(list: MaybeWatchSource<T>): ComputedRef<number>;


/**
 * Returns a lens for the given getter and setter functions. The getter "gets"
 * the value of the focus; the setter "sets" the value of the focus. The setter
 * should not mutate the data structure.
 *
 * See also {@link view}, {@link set}, {@link over}, {@link lensIndex}, {@link lensProp}
 *
 * @example
 * ```typescript
 * const xLens = R.lens(R.prop('x'), R.assoc('x'));
 * 
 * R.view(xLens, {x: 1, y: 2});            //=> 1
 * R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
 * R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
 * ```
 */
export function useLens<S, A>(getter: MaybeRef<(s: S) => A>, setter: MaybeRef<(a: A, s: S) => S>): ComputedRef<Lens<S, A>>;


/**
 * Returns a lens whose focus is the specified index.
 *
 * See also {@link view}, {@link set}, {@link over}, {@link nth}
 *
 * @example
 * ```typescript
 * const headLens = R.lensIndex(0);
 * 
 * R.view(headLens, ['a', 'b', 'c']);            //=> 'a'
 * R.set(headLens, 'x', ['a', 'b', 'c']);        //=> ['x', 'b', 'c']
 * R.over(headLens, R.toUpper, ['a', 'b', 'c']); //=> ['A', 'b', 'c']
 * ```
 */
export function useLensIndex<A>(n: MaybeWatchSource<number>): ComputedRef<Lens<A[], A>>;
export function useLensIndex<A extends any[], N extends number>(n: MaybeWatchSource<N>): ComputedRef<Lens<A, A[N]>>;


/**
 * Returns a lens whose focus is the specified path.
 *
 * See also {@link view}, {@link set}, {@link over}
 *
 * @example
 * ```typescript
 * const xHeadYLens = R.lensPath(['x', 0, 'y']);
 * 
 * R.view(xHeadYLens, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
 * //=> 2
 * R.set(xHeadYLens, 1, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
 * //=> {x: [{y: 1, z: 3}, {y: 4, z: 5}]}
 * R.over(xHeadYLens, R.negate, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
 * //=> {x: [{y: -2, z: 3}, {y: 4, z: 5}]}
 * ```
 */
export function useLensPath<S, K0 extends keyof S = keyof S>(path: MaybeWatchSource<[K0]>): ComputedRef<Lens<S, S[K0]>>;
export function useLensPath<S, K0 extends keyof S = keyof S, K1 extends keyof S[K0] = keyof S[K0]>(
  path: MaybeWatchSource<[K0, K1]>,
): ComputedRef<Lens<S, S[K0][K1]>>;
export function useLensPath<
  S,
  K0 extends keyof S = keyof S,
  K1 extends keyof S[K0] = keyof S[K0],
  K2 extends keyof S[K0][K1] = keyof S[K0][K1]
>(path: MaybeWatchSource<[K0, K1, K2]>): ComputedRef<Lens<S, S[K0][K1][K2]>>;
export function useLensPath<
  S,
  K0 extends keyof S = keyof S,
  K1 extends keyof S[K0] = keyof S[K0],
  K2 extends keyof S[K0][K1] = keyof S[K0][K1],
  K3 extends keyof S[K0][K1][K2] = keyof S[K0][K1][K2]
>(path: MaybeWatchSource<[K0, K1, K2, K3]>): ComputedRef<Lens<S, S[K0][K1][K2][K3]>>;
export function useLensPath<
  S,
  K0 extends keyof S = keyof S,
  K1 extends keyof S[K0] = keyof S[K0],
  K2 extends keyof S[K0][K1] = keyof S[K0][K1],
  K3 extends keyof S[K0][K1][K2] = keyof S[K0][K1][K2],
  K4 extends keyof S[K0][K1][K2][K3] = keyof S[K0][K1][K2][K3]
>(path: MaybeWatchSource<[K0, K1, K2, K3, K4]>): ComputedRef<Lens<S, S[K0][K1][K2][K3][K4]>>;
export function useLensPath<
  S,
  K0 extends keyof S = keyof S,
  K1 extends keyof S[K0] = keyof S[K0],
  K2 extends keyof S[K0][K1] = keyof S[K0][K1],
  K3 extends keyof S[K0][K1][K2] = keyof S[K0][K1][K2],
  K4 extends keyof S[K0][K1][K2][K3] = keyof S[K0][K1][K2][K3],
  K5 extends keyof S[K0][K1][K2][K3][K4] = keyof S[K0][K1][K2][K3][K4]
>(path: MaybeWatchSource<[K0, K1, K2, K3, K4, K5]>): ComputedRef<Lens<S, S[K0][K1][K2][K3][K4][K5]>>;
export function useLensPath<S = any, A = any>(path: MaybeWatchSource<Path>): ComputedRef<Lens<S, A>>;


/**
 * Returns a lens whose focus is the specified property.
 *
 * See also {@link view}, {@link set}, {@link over}
 *
 * @example
 * ```typescript
 * const xLens = R.lensProp('x');
 * 
 * R.view(xLens, {x: 1, y: 2});            //=> 1
 * R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
 * R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
 * ```
 */
export function useLensProp<S, K extends keyof S = keyof S>(prop: MaybeWatchSource<K>): ComputedRef<Lens<S, S[K]>>;


/**
 * "lifts" a function of arity >= 1 so that it may "map over" a list, Function or other
 * object that satisfies the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
 *
 * See also {@link liftN}
 *
 * @example
 * ```typescript
 * const madd3 = R.lift((a, b, c) => a + b + c);
 * 
 * madd3([100, 200], [30, 40], [5, 6, 7]); //=> [135, 136, 137, 145, 146, 147, 235, 236, 237, 245, 246, 247]
 * 
 * const madd5 = R.lift((a, b, c, d, e) => a + b + c + d + e);
 * 
 * madd5([10, 20], [1], [2, 3], [4], [100, 200]); //=> [117, 217, 118, 218, 127, 227, 128, 228]
 * ```
 */
export function useLift<F extends (...args: readonly any[]) => any>(
  fn: MaybeRef<F>,
): ComputedRef<{
  (...args: ToTupleOfArray<Parameters<F>>): Array<ReturnType<F>>;
  <R>(...args: ToTupleOfFunction<R, Parameters<F>>): (arg: R) => ReturnType<F>;
}>;


/**
 * "lifts" a function to be the specified arity, so that it may "map over" that
 * many lists, Functions or other objects that satisfy the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
 *
 * See also {@link lift}, {@link ap}
 *
 * @example
 * ```typescript
 * const madd3 = R.liftN(3, (...args) => R.sum(args));
 * madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
 * ```
 */
export function useLiftN<N extends number, F extends (...args: readonly any[]) => any>(
  n: MaybeRef<N>,
  fn: F,
): ComputedRef<{
  (...args: Take<N, ToTupleOfArray<Parameters<F>>>): Array<ReturnType<F>>;
  <R>(...args: Take<N, ToTupleOfFunction<R, Parameters<F>>>): (arg: R) => ReturnType<F>;
}>;


/**
 * Returns `true` if the first argument is less than the second; `false`
 * otherwise.
 *
 * See also {@link gt}
 *
 * @example
 * ```typescript
 * R.lt(2, 1); //=> false
 * R.lt(2, 2); //=> false
 * R.lt(2, 3); //=> true
 * R.lt('a', 'z'); //=> true
 * R.lt('z', 'a'); //=> false
 * ```
 */
export function useLt<T extends Ord>(a: MaybeRef<T>): (b: MaybeRef<WidenLiterals<T>>) => ComputedRef<boolean>;
export function useLt<T extends Ord>(__: Placeholder, b: MaybeRef<T>): (a: MaybeRef<WidenLiterals<T>>) => ComputedRef<boolean>;
export function useLt<T extends Ord>(a: MaybeRef<T>, b: MaybeRef<T>): ComputedRef<boolean>;


/**
 * Returns `true` if the first argument is less than or equal to the second;
 * `false` otherwise.
 *
 * See also {@link gte}
 *
 * @example
 * ```typescript
 * R.lte(2, 1); //=> false
 * R.lte(2, 2); //=> true
 * R.lte(2, 3); //=> true
 * R.lte('a', 'z'); //=> true
 * R.lte('z', 'a'); //=> false
 * ```
 */
export function useLte<T extends Ord>(a: MaybeWatchSource<T>): (b: MaybeWatchSource<WidenLiterals<T>>) => ComputedRef<boolean>;
export function useLte<T extends Ord>(__: Placeholder, b: MaybeWatchSource<T>): (a: MaybeWatchSource<WidenLiterals<T>>) => ComputedRef<boolean>;
export function useLte<T extends Ord>(a: MaybeWatchSource<T>, b: MaybeWatchSource<T>): ComputedRef<boolean>;


/**
 * Takes a function and
 * a [functor](https://github.com/fantasyland/fantasy-land#functor),
 * applies the function to each of the functor's values, and returns
 * a functor of the same shape.
 * 
 * Ramda provides suitable `map` implementations for `Array` and `Object`,
 * so this function may be applied to `[1, 2, 3]` or `{x: 1, y: 2, z: 3}`.
 * 
 * Dispatches to the `map` method of the second argument, if present.
 * 
 * Acts as a transducer if a transformer is given in list position.
 * 
 * Also treats functions as functors and will compose them together.
 *
 * See also {@link transduce}, {@link addIndex}, {@link pluck}, {@link project}
 *
 * @example
 * ```typescript
 * const double = x => x * 2;
 * 
 * R.map(double, [1, 2, 3]); //=> [2, 4, 6]
 * 
 * R.map(double, {x: 1, y: 2, z: 3}); //=> {x: 2, y: 4, z: 6}
 * ```
 */
export function useMap<A, B>(fn: MaybeRef<(x: A) => B>): {
  // first and last def are the same and are here on purpose
  // the list variant needs to come before the FunctorMap ones, because `T[]` is a `FunctorMap<T>`
  (list: MaybeWatchSource<readonly A[]>): ComputedRef<B[]>;
  (functor: MaybeWatchSource<FunctorFantasyLand<A>>): ComputedRef<FunctorFantasyLand<B>>;
  (functor: MaybeWatchSource<FunctorMap<A>>): ComputedRef<FunctorMap<B>>;
  <U extends Record<PropertyKey, A>>(dict: MaybeWatchSource<U>): ComputedRef<Record<keyof U, B>>;
  // it also needs to be here when you pass map as an argument to a function, eg `compose(map(fn))`
  (list: MaybeWatchSource<readonly A[]>): ComputedRef<B[]>;
};

// map(__, list)
export function useMap<A>(__: Placeholder, list: MaybeRef<readonly A[]>): <B>(fn: MaybeWatchSource<(x: A) => B>) => ComputedRef<B[]>;
export function useMap<A>(__: Placeholder, obj: MaybeRef<FunctorFantasyLand<A>>): <B>(fn: MaybeWatchSource<(a: A) => B>) => ComputedRef<FunctorFantasyLand<B>>;
export function useMap<A>(__: Placeholder, obj: MaybeRef<FunctorMap<A>>): <B>(fn: MaybeWatchSource<(a: A) => B>) => ComputedRef<FunctorMap<B>>;
export function useMap<U extends object>(__: Placeholder, dict: MaybeRef<U>): <B>(fn: MaybeWatchSource<(x: ValueOfUnion<B>) => B>) => ComputedRef<Record<keyof U, B>>;
// map(fn, list)
// first and last def are the same and are here on purpose
// the list variant needs to come before the FunctorMap ones, because `T[]` is a `FunctorMap<T>`
export function useMap<A, B>(fn: MaybeRef<(x: A) => B>, list: MaybeWatchSource<readonly A[]>): ComputedRef<B[]>;
export function useMap<A, B>(fn: MaybeRef<(x: A) => B>, obj: MaybeWatchSource<FunctorFantasyLand<A>>): ComputedRef<FunctorFantasyLand<B>>;
export function useMap<A, B>(fn: MaybeRef<(x: A) => B>, obj: MaybeWatchSource<FunctorMap<A>>): ComputedRef<FunctorMap<B>>;
export function useMap<U extends object, B>(fn: MaybeRef<(x: ValueOfUnion<U>) => B>, dict: MaybeWatchSource<U>): ComputedRef<Record<keyof U, B>>;
// it also needs to be here when you pass map as an argument to a function, eg `flip(map)`
export function useMap<A, B>(fn: MaybeRef<(x: A) => B>, list: MaybeWatchSource<readonly A[]>): ComputedRef<B[]>;


/**
 * The `mapAccum` function behaves like a combination of map and reduce; it
 * applies a function to each element of a list, passing an accumulating
 * parameter from left to right, and returning a final value of this
 * accumulator together with the new list.
 * 
 * The iterator function receives two arguments, *acc* and *value*, and should
 * return a tuple *[acc, value]*.
 *
 * See also {@link scan}, {@link addIndex}, {@link mapAccumRight}
 *
 * @example
 * ```typescript
 * const digits = ['1', '2', '3', '4'];
 * const appender = (a, b) => [a + b, a + b];
 * 
 * R.mapAccum(appender, 0, digits); //=> ['01234', ['01', '012', '0123', '01234']]
 * ```
 */
export function useMapAccum<T, U, TResult>(
  fn: MaybeRef<(acc: U, value: T) => [U, TResult]>,
): (acc: MaybeRef<U>, list: MaybeWatchSource<readonly T[]>) => ComputedRef<[U, TResult[]]>;
export function useMapAccum<T, U, TResult>(
  fn: MaybeRef<(acc: U, value: T) => [U, TResult]>,
  acc: MaybeRef<U>,
): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<[U, TResult[]]>;
export function useMapAccum<T, U, TResult>(
  fn: MaybeRef<(acc: U, value: T) => [U, TResult]>,
  acc: MaybeRef<U>,
  list: MaybeWatchSource<readonly T[]>,
): ComputedRef<[U, TResult[]]>;


/**
 * The `mapAccumRight` function behaves like a combination of map and reduce; it
 * applies a function to each element of a list, passing an accumulating
 * parameter from right to left, and returning a final value of this
 * accumulator together with the new list.
 * 
 * Similar to [`mapAccum`](#mapAccum), except moves through the input list from
 * the right to the left.
 * 
 * The iterator function receives two arguments, *acc* and *value*, and should
 * return a tuple *[acc, value]*.
 *
 * See also {@link addIndex}, {@link mapAccum}
 *
 * @example
 * ```typescript
 * const digits = ['1', '2', '3', '4'];
 * const appender = (a, b) => [b + a, b + a];
 * 
 * R.mapAccumRight(appender, 5, digits); //=> ['12345', ['12345', '2345', '345', '45']]
 * ```
 */
export function useMapAccumRight<T, U, TResult>(
  fn: MaybeRef<(acc: U, value: T) => [U, TResult]>,
): (acc: MaybeRef<U>, list: MaybeWatchSource<readonly T[]>) => ComputedRef<[U, TResult[]]>;
export function useMapAccumRight<T, U, TResult>(
  fn: MaybeRef<(acc: U, value: T) => [U, TResult]>,
  acc: MaybeRef<U>,
): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<[U, TResult[]]>;
export function useMapAccumRight<T, U, TResult>(
  fn: MaybeRef<(acc: U, value: T) => [U, TResult]>,
  acc: MaybeRef<U>,
  list: MaybeWatchSource<readonly T[]>,
): ComputedRef<[U, TResult[]]>;


/**
 * An Object-specific version of [`map`](#map). The function is applied to three
 * arguments: *(value, key, obj)*. If only the value is significant, use
 * [`map`](#map) instead.
 *
 * See also {@link map}
 *
 * @example
 * ```typescript
 * const xyz = { x: 1, y: 2, z: 3 };
 * const prependKeyAndDouble = (num, key, obj) => key + (num * 2);
 * 
 * R.mapObjIndexed(prependKeyAndDouble, xyz); //=> { x: 'x2', y: 'y4', z: 'z6' }
 * ```
 */
export function useMapObjIndexed<T, TResult, TKey extends string>(
  fn: MaybeRef<(value: T, key: TKey, obj?: Record<TKey, T>) => TResult>,
): (obj: MaybeWatchSource<Record<TKey, T>>) => ComputedRef<Record<TKey, TResult>>;
export function useMapObjIndexed<T, TResult, TKey extends string>(
  fn: MaybeRef<(value: T, key: TKey, obj?: PartialRecord<TKey, T>) => TResult>,
): (obj: MaybeWatchSource<Record<TKey, T>>) => ComputedRef<PartialRecord<TKey, TResult>>;
export function useMapObjIndexed<T, TResult, TKey extends string>(
  fn: MaybeRef<(value: T, key: TKey, obj?: Record<TKey, T>) => TResult>,
  obj: MaybeWatchSource<Record<TKey, T>>,
): ComputedRef<Record<TKey, TResult>>;
export function useMapObjIndexed<T, TResult, TKey extends string>(
  fn: MaybeRef<(value: T, key: TKey, obj?: Record<TKey, T>) => TResult>,
  obj: MaybeWatchSource<PartialRecord<TKey, T>>,
): ComputedRef<PartialRecord<TKey, TResult>>;
export function useMapObjIndexed<T, TResult>(
  fn: MaybeRef<(
    value: T,
    key: string,
    obj?: {
      [key: string]: T;
    },
  ) => TResult>,
  obj: MaybeWatchSource<{
    [key: string]: T;
  }>,
): ComputedRef<{
  [key: string]: TResult;
}>;


/**
 * Tests a regular expression against a String. Note that this function will
 * return an empty array when there are no matches. This differs from
 * [`String.prototype.match`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)
 * which returns `null` when there are no matches.
 *
 * See also {@link test}
 *
 * @example
 * ```typescript
 * R.match(/([a-z]a)/g, 'bananas'); //=> ['ba', 'na', 'na']
 * R.match(/a/, 'b'); //=> []
 * R.match(/a/, null); //=> TypeError: null does not have a method named "match"
 * ```
 */
export function useMatch(regexp: MaybeWatchSource<RegExp>): (str: MaybeWatchSource<string>) => ComputedRef<string[]>;
export function useMatch(regexp: MaybeWatchSource<RegExp>, str: MaybeWatchSource<string>): ComputedRef<string[]>;


/**
 * `mathMod` behaves like the modulo operator should mathematically, unlike the
 * `%` operator (and by extension, [`R.modulo`](#modulo)). So while
 * `-17 % 5` is `-2`, `mathMod(-17, 5)` is `3`. `mathMod` requires Integer
 * arguments, and returns NaN when the modulus is zero or negative.
 *
 * See also {@link modulo}
 *
 * @example
 * ```typescript
 * R.mathMod(-17, 5);  //=> 3
 * R.mathMod(17, 5);   //=> 2
 * R.mathMod(17, -5);  //=> NaN
 * R.mathMod(17, 0);   //=> NaN
 * R.mathMod(17.2, 5); //=> NaN
 * R.mathMod(17, 5.3); //=> NaN
 * 
 * const clock = R.mathMod(R.__, 12);
 * clock(15); //=> 3
 * clock(24); //=> 0
 * 
 * const seventeenMod = R.mathMod(17);
 * seventeenMod(3);  //=> 2
 * seventeenMod(4);  //=> 1
 * seventeenMod(10); //=> 7
 * ```
 */
export function useMathMod(a: MaybeWatchSource<number>): (b: MaybeWatchSource<number>) => ComputedRef<number>;
export function useMathMod(__: Placeholder, b: MaybeWatchSource<number>): (a: MaybeWatchSource<number>) => ComputedRef<number>;
export function useMathMod(a: MaybeWatchSource<number>, b: MaybeWatchSource<number>): ComputedRef<number>;


/**
 * Returns the larger of its two arguments.
 *
 * See also {@link maxBy}, {@link min}
 *
 * @example
 * ```typescript
 * R.max(789, 123); //=> 789
 * R.max('a', 'b'); //=> 'b'
 * ```
 */
export function useMax<T extends Ord>(a: MaybeRef<T>): (b: MaybeRef<T>) => ComputedRef<T>;
export function useMax<T extends Ord>(a: MaybeRef<T>, b: MaybeRef<T>): ComputedRef<T>;


/**
 * Takes a function and two values, and returns whichever value produces the
 * larger result when passed to the provided function.
 *
 * See also {@link max}, {@link minBy}
 *
 * @example
 * ```typescript
 * //  square :: Number -> Number
 * const square = n => n * n;
 * 
 * R.maxBy(square, -3, 2); //=> -3
 * 
 * R.reduce(R.maxBy(square), 0, [3, -5, 4, 1, -2]); //=> -5
 * R.reduce(R.maxBy(square), 0, []); //=> 0
 * ```
 */
export function useMaxBy<T>(keyFn: MaybeRef<(a: T) => Ord>): _.F.Curry<(a: MaybeRef<T>, b: MaybeRef<T>) => ComputedRef<T>>;
export function useMaxBy<T>(keyFn: MaybeRef<(a: T) => Ord>, a: MaybeRef<T>): (b: MaybeRef<T>) => ComputedRef<T>;
export function useMaxBy<T>(keyFn: MaybeRef<(a: T) => Ord>, a: MaybeRef<T>, b: MaybeRef<T>): ComputedRef<T>;


/**
 * Returns the mean of the given list of numbers.
 *
 * See also {@link median}
 *
 * @example
 * ```typescript
 * R.mean([2, 7, 9]); //=> 6
 * R.mean([]); //=> NaN
 * ```
 */
export function useMean(list: MaybeWatchSource<readonly number[]>): ComputedRef<number>;


/**
 * Returns the median of the given list of numbers.
 *
 * See also {@link mean}
 *
 * @example
 * ```typescript
 * R.median([2, 9, 7]); //=> 7
 * R.median([7, 2, 10, 9]); //=> 8
 * R.median([]); //=> NaN
 * ```
 */
export function useMedian(list: MaybeWatchSource<readonly number[]>): ComputedRef<number>;


/**
 * Takes a string-returning function `keyGen` and a function `fn` and returns
 * a new function that returns cached results for subsequent
 * calls with the same arguments.
 * 
 * When the function is invoked, `keyGen` is applied to the same arguments
 * and its result becomes the cache key. If the cache contains something
 * under that key, the function simply returns it and does not invoke `fn` at all.
 * 
 * Otherwise `fn` is applied to the same arguments and its return value
 * is cached under that key and returned by the function.
 * 
 * Care must be taken when implementing `keyGen` to avoid key collision,
 * or if tracking references, memory leaks and mutating arguments.
 *
 * @example
 * ```typescript
 * const withAge = memoizeWith(o => `${o.birth}/${o.death}`, ({birth, death}) => {
 * //                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^  ^^^^^^^^^^^^^^^^^^^^^
 * //                          keyGen                        fn
 *   console.log(`computing age for ${birth}/${death}`);
 *   return ({birth, death, age: death - birth});
 * });
 * 
 * withAge({birth: 1921, death: 1999});
 * //=> LOG: computing age for 1921/1999
 * //=> {birth: 1921, death: 1999, age: 78} (returned from fn)
 * 
 * withAge({birth: 1921, death: 1999});
 * //=> {birth: 1921, death: 1999, age: 78} (returned from cache)
 * ```
 */
export function useMemoizeWith<T extends (...args: readonly any[]) => any>(
  keyFn: MaybeRef<(...v: Parameters<T>) => string>,
  fn: MaybeRef<T>,
): ComputedRef<T>;


/**
 * Creates one new object with the own properties from a list of objects.
 * If a key exists in more than one object, the value from the last
 * object it exists in will be used.
 *
 * See also {@link reduce}
 *
 * @example
 * ```typescript
 * R.mergeAll([{foo:1},{bar:2},{baz:3}]); //=> {foo:1,bar:2,baz:3}
 * R.mergeAll([{foo:1},{foo:2},{bar:2}]); //=> {foo:2,bar:2}
 * ```
 */
export function useMergeAll<T extends object, Ts extends readonly object[]>(list: MaybeWatchSource<[T, ...Ts]>): ComputedRef<_.O.Assign<T, Ts>>;
// for when passing in an `T[]` where all the objects are the same shape `mergeAll([obj1, obj2, obj3]: T[])
// this just returns T
export function useMergeAll<T>(list: MaybeWatchSource<readonly T[]>): ComputedRef<T>;


/**
 * Creates a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects:
 * - and both values are objects, the two values will be recursively merged
 * - otherwise the value from the first object will be used.
 *
 * See also {@link merge}, {@link mergeDeepRight}, {@link mergeDeepWith}, {@link mergeDeepWithKey}
 *
 * @example
 * ```typescript
 * R.mergeDeepLeft({ name: 'fred', age: 10, contact: { email: 'moo@example.com' }},
 *                 { age: 40, contact: { email: 'baa@example.com' }});
 * //=> { name: 'fred', age: 10, contact: { email: 'moo@example.com' }}
 * ```
 */
export function useMergeDeepLeft<L extends object>(l: MaybeWatchSource<L>): <R extends object>(r: MaybeWatchSource<R>) => ComputedRef<_.O.Assign<R, [L], 'deep'>>;
export function useMergeDeepLeft<L extends object, R extends object>(l: MaybeWatchSource<L>, r: MaybeWatchSource<R>): ComputedRef<_.O.Assign<R, [L], 'deep'>>;


/**
 * Creates a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects:
 * - and both values are objects, the two values will be recursively merged
 * - otherwise the value from the second object will be used.
 *
 * See also {@link merge}, {@link mergeDeepLeft}, {@link mergeDeepWith}, {@link mergeDeepWithKey}
 *
 * @example
 * ```typescript
 * R.mergeDeepRight({ name: 'fred', age: 10, contact: { email: 'moo@example.com' }},
 *                  { age: 40, contact: { email: 'baa@example.com' }});
 * //=> { name: 'fred', age: 40, contact: { email: 'baa@example.com' }}
 * ```
 */
export function useMergeDeepRight<L extends object>(l: MaybeWatchSource<L>): <R extends object>(r: MaybeWatchSource<R>) => ComputedRef<_.O.Assign<L, [R], 'deep'>>;
export function useMergeDeepRight<L extends object, R extends object>(l: MaybeWatchSource<L>, r: MaybeWatchSource<R>): ComputedRef<_.O.Assign<L, [R], 'deep'>>;


/**
 * Creates a new object with the own properties of the two provided objects.
 * If a key exists in both objects:
 * - and both associated values are also objects then the values will be
 *   recursively merged.
 * - otherwise the provided function is applied to associated values using the
 *   resulting value as the new value associated with the key.
 * If a key only exists in one object, the value will be associated with the key
 * of the resulting object.
 *
 * See also {@link mergeWith}, {@link mergeDeepWithKey}
 *
 * @example
 * ```typescript
 * R.mergeDeepWith(R.concat,
 *                 { a: true, c: { values: [10, 20] }},
 *                 { b: true, c: { values: [15, 35] }});
 * //=> { a: true, b: true, c: { values: [10, 20, 15, 35] }}
 * ```
 */
export function useMergeDeepWith<T1, T2>(fn: MaybeRef<(x: any, z: any) => any>): (a: MaybeWatchSource<T1>, b: MaybeWatchSource<T2>) => ComputedRef<any>;
export function useMergeDeepWith<T1, T2>(fn: MaybeRef<(x: any, z: any) => any>, a: MaybeWatchSource<T1>): (b: MaybeWatchSource<T2>) => ComputedRef<any>;
export function useMergeDeepWith<T1, T2>(fn: MaybeRef<(x: any, z: any) => any>, a: MaybeWatchSource<T1>, b: MaybeWatchSource<T2>): ComputedRef<any>;


/**
 * Creates a new object with the own properties of the two provided objects.
 * If a key exists in both objects:
 * - and both associated values are also objects then the values will be
 *   recursively merged.
 * - otherwise the provided function is applied to the key and associated values
 *   using the resulting value as the new value associated with the key.
 * If a key only exists in one object, the value will be associated with the key
 * of the resulting object.
 *
 * See also {@link mergeWithKey}, {@link mergeDeepWith}
 *
 * @example
 * ```typescript
 * let concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r
 * R.mergeDeepWithKey(concatValues,
 *                    { a: true, c: { thing: 'foo', values: [10, 20] }},
 *                    { b: true, c: { thing: 'bar', values: [15, 35] }});
 * //=> { a: true, b: true, c: { thing: 'bar', values: [10, 20, 15, 35] }}
 * ```
 */
export function useMergeDeepWithKey<T1, T2>(fn: MaybeRef<(k: string, x: any, z: any) => any>): (a: MaybeWatchSource<T1>, b: MaybeWatchSource<T2>) => ComputedRef<any>;
export function useMergeDeepWithKey<T1, T2>(fn: MaybeRef<(k: string, x: any, z: any) => any>, a: MaybeWatchSource<T1>): (b: MaybeWatchSource<T2>) => ComputedRef<any>;
export function useMergeDeepWithKey<T1, T2>(fn: MaybeRef<(k: string, x: any, z: any) => any>, a: MaybeWatchSource<T1>, b: MaybeWatchSource<T2>): ComputedRef<any>;


/**
 * Create a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects,
 * the value from the first object will be used.
 *
 * See also {@link mergeRight}, {@link mergeDeepLeft}, {@link mergeWith}, {@link mergeWithKey}
 *
 * @example
 * ```typescript
 * R.mergeLeft({ 'age': 40 }, { 'name': 'fred', 'age': 10 });
 * //=> { 'name': 'fred', 'age': 40 }
 * 
 * const resetToDefault = R.mergeLeft({x: 0});
 * resetToDefault({x: 5, y: 2}); //=> {x: 0, y: 2}
 * ```
 */
export function useMergeLeft<L extends object>(l: MaybeWatchSource<L>): <R extends object>(r: MaybeWatchSource<R>) => ComputedRef<_.O.Assign<R, [L], 'flat'>>;
export function useMergeLeft<L extends object, R extends object>(l: MaybeWatchSource<L>, r: MaybeWatchSource<R>): ComputedRef<_.O.Assign<R, [L], 'flat'>>;


/**
 * Create a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects,
 * the value from the second object will be used.
 *
 * See also {@link mergeLeft}, {@link mergeDeepRight}, {@link mergeWith}, {@link mergeWithKey}
 *
 * @example
 * ```typescript
 * R.mergeRight({ 'name': 'fred', 'age': 10 }, { 'age': 40 });
 * //=> { 'name': 'fred', 'age': 40 }
 * 
 * const withDefaults = R.mergeRight({x: 0, y: 0});
 * withDefaults({y: 2}); //=> {x: 0, y: 2}
 * ```
 */
export function useMergeRight<L extends object>(l: MaybeWatchSource<L>): <R extends object>(r: MaybeWatchSource<R>) => ComputedRef<_.O.Assign<L, [R], 'flat'>>;
export function useMergeRight<L extends object, R extends object>(l: MaybeWatchSource<L>, r: MaybeWatchSource<R>): ComputedRef<_.O.Assign<L, [R], 'flat'>>;


/**
 * Creates a new object with the own properties of the two provided objects. If
 * a key exists in both objects, the provided function is applied to the values
 * associated with the key in each object, with the result being used as the
 * value associated with the key in the returned object.
 *
 * See also {@link mergeDeepWith}, {@link merge}, {@link mergeWithKey}
 *
 * @example
 * ```typescript
 * R.mergeWith(R.concat,
 *             { a: true, values: [10, 20] },
 *             { b: true, values: [15, 35] });
 * //=> { a: true, b: true, values: [10, 20, 15, 35] }
 * ```
 */
export function useMergeWith(fn: MaybeRef<(x: any, z: any) => any>): <U, V>(a: MaybeWatchSource<U>, b: MaybeWatchSource<V>) => ComputedRef<any>;
export function useMergeWith<U>(fn: MaybeRef<(x: any, z: any) => any>, a: MaybeWatchSource<U>): <V>(b: MaybeWatchSource<V>) => ComputedRef<any>;
export function useMergeWith<U, V>(fn: MaybeRef<(x: any, z: any) => any>, a: MaybeWatchSource<U>, b: MaybeWatchSource<V>): ComputedRef<any>;


/**
 * Creates a new object with the own properties of the two provided objects. If
 * a key exists in both objects, the provided function is applied to the key
 * and the values associated with the key in each object, with the result being
 * used as the value associated with the key in the returned object.
 *
 * See also {@link mergeDeepWithKey}, {@link merge}, {@link mergeWith}
 *
 * @example
 * ```typescript
 * let concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r
 * R.mergeWithKey(concatValues,
 *                { a: true, thing: 'foo', values: [10, 20] },
 *                { b: true, thing: 'bar', values: [15, 35] });
 * //=> { a: true, b: true, thing: 'bar', values: [10, 20, 15, 35] }
 * ```
 */
export function useMergeWithKey(fn: MaybeRef<(str: string, x: any, z: any) => any>): <U, V>(a: MaybeWatchSource<U>, b: MaybeWatchSource<V>) => ComputedRef<any>;
export function useMergeWithKey<U>(fn: MaybeRef<(str: string, x: any, z: any) => any>, a: MaybeWatchSource<U>): <V>(b: MaybeWatchSource<V>) => ComputedRef<any>;
export function useMergeWithKey<U, V>(fn: MaybeRef<(str: string, x: any, z: any) => any>, a: MaybeWatchSource<U>, b: MaybeWatchSource<V>): ComputedRef<any>;


/**
 * Returns the smaller of its two arguments.
 *
 * See also {@link minBy}, {@link max}
 *
 * @example
 * ```typescript
 * R.min(789, 123); //=> 123
 * R.min('a', 'b'); //=> 'a'
 * ```
 */
export function useMin<T extends Ord>(a: MaybeRef<T>): (b: MaybeRef<T>) => ComputedRef<T>;
export function useMin<T extends Ord>(a: MaybeRef<T>, b: MaybeRef<T>): ComputedRef<T>;


/**
 * Takes a function and two values, and returns whichever value produces the
 * smaller result when passed to the provided function.
 *
 * See also {@link min}, {@link maxBy}
 *
 * @example
 * ```typescript
 * //  square :: Number -> Number
 * const square = n => n * n;
 * 
 * R.minBy(square, -3, 2); //=> 2
 * 
 * R.reduce(R.minBy(square), Infinity, [3, -5, 4, 1, -2]); //=> 1
 * R.reduce(R.minBy(square), Infinity, []); //=> Infinity
 * ```
 */
export function useMinBy<T>(keyFn: MaybeRef<(a: T) => Ord>): _.F.Curry<(a: MaybeRef<T>, b: MaybeRef<T>) => ComputedRef<T>>;
export function useMinBy<T>(keyFn: MaybeRef<(a: T) => Ord>, a: MaybeRef<T>): (b: MaybeRef<T>) => ComputedRef<T>;
export function useMinBy<T>(keyFn: MaybeRef<(a: T) => Ord>, a: MaybeRef<T>, b: MaybeRef<T>): ComputedRef<T>;


/**
 * Creates a copy of the passed object by applying an `fn` function to the given `prop` property.
 * 
 * The function will not be invoked, and the object will not change
 * if its corresponding property does not exist in the object.
 * All non-primitive properties are copied to the new object by reference.
 *
 * @example
 * ```typescript
 * const person = {name: 'James', age: 20, pets: ['dog', 'cat']};
 * R.modify('age', R.add(1), person); //=> {name: 'James', age: 21, pets: ['dog', 'cat']}
 * R.modify('pets', R.append('turtle'), person); //=> {name: 'James', age: 20, pets: ['dog', 'cat', 'turtle']}
 * ```
 */
export function useModify<K extends string, A, P>(
  prop: MaybeWatchSource<K>,
  fn: MaybeRef<(a: A) => P>,
): <T extends Record<K, A>>(target: MaybeWatchSource<T>) => ComputedRef<Omit<T, K> & Record<K, P>>;

export function useModify<T extends object, K extends keyof T, P>(
  prop: MaybeWatchSource<K>,
  fn: MaybeRef<(a: T[K]) => P>,
  obj: MaybeWatchSource<T>,
): ComputedRef<Omit<T, K> & Record<K, P>>;


/**
 * Creates a shallow clone of the passed object by applying an `fn` function
 * to the value at the given path.
 * 
 * The function will not be invoked, and the object will not change
 * if its corresponding path does not exist in the object.
 * All non-primitive properties are copied to the new object by reference.
 *
 * @example
 * ```typescript
 * const person = {name: 'James', address: { zipCode: '90216' }};
 * R.modifyPath(['address', 'zipCode'], R.reverse, person); //=> {name: 'James', address: { zipCode: '61209' }}
 * 
 * // Can handle arrays too
 * const person = {name: 'James', addresses: [{ zipCode: '90216' }]};
 * R.modifyPath(['addresses', 0, 'zipCode'], R.reverse, person); //=> {name: 'James', addresses: [{ zipCode: '61209' }]}
 * ```
 */
export function useModifyPath<K0 extends keyof U, U, T>(path: MaybeWatchSource<[K0]>, fn: MaybeRef<(value: U[K0]) => T>, obj: MaybeWatchSource<U>): ComputedRef<DeepModify<[K0], U, T>>;
export function useModifyPath<
  K0 extends keyof U,
  K1 extends keyof U[K0],
  U,
  T
>(path: MaybeWatchSource<[K0, K1]>, fn: MaybeRef<(value: U[K0][K1]) => T>, obj: MaybeWatchSource<U>): ComputedRef<DeepModify<[K0, K1], U, T>>;
export function useModifyPath<
  K0 extends keyof U,
  K1 extends keyof U[K0],
  K2 extends keyof U[K0][K1],
  U,
  T
>(path: MaybeWatchSource<[K0, K1, K2]>, fn: MaybeRef<(value: U[K0][K1][K2]) => T>, obj: MaybeWatchSource<U>): ComputedRef<DeepModify<[K0, K1, K2], U, T>>;
export function useModifyPath<
  K0 extends keyof U,
  K1 extends keyof U[K0],
  K2 extends keyof U[K0][K1],
  K3 extends keyof U[K0][K1][K2],
  U,
  T
>(path: MaybeWatchSource<[K0, K1, K2, K3]>, fn: MaybeRef<(value: U[K0][K1][K2][K3]) => T>, obj: MaybeWatchSource<U>): ComputedRef<DeepModify<[K0, K1, K2, K3], U, T>>;
export function useModifyPath<
  K0 extends keyof U,
  K1 extends keyof U[K0],
  K2 extends keyof U[K0][K1],
  K3 extends keyof U[K0][K1][K2],
  K4 extends keyof U[K0][K1][K2][K3],
  U,
  T
>(path: MaybeWatchSource<[K0, K1, K2, K3, K4]>, fn: MaybeRef<(value: U[K0][K1][K2][K3][K4]) => T>, obj: MaybeWatchSource<U>): ComputedRef<DeepModify<[K0, K1, K2, K3, K4], U, T>>;
export function useModifyPath<
  K0 extends keyof U,
  K1 extends keyof U[K0],
  K2 extends keyof U[K0][K1],
  K3 extends keyof U[K0][K1][K2],
  K4 extends keyof U[K0][K1][K2][K3],
  K5 extends keyof U[K0][K1][K2][K3][K4],
  U,
  T
>(path: MaybeWatchSource<[K0, K1, K2, K3, K4, K5]>, fn: MaybeRef<(value: U[K0][K1][K2][K3][K4][K5]) => T>, obj: MaybeWatchSource<U>): ComputedRef<DeepModify<[K0, K1, K2, K3, K4, K5], U, T>>;
export function useModifyPath<
  K0 extends keyof U,
  K1 extends keyof U[K0],
  K2 extends keyof U[K0][K1],
  K3 extends keyof U[K0][K1][K2],
  K4 extends keyof U[K0][K1][K2][K3],
  K5 extends keyof U[K0][K1][K2][K3][K4],
  K6 extends keyof U[K0][K1][K2][K3][K4][K5],
  U,
  T
>(path: MaybeWatchSource<[K0, K1, K2, K3, K4, K5, K6]>, fn: MaybeRef<(value: U[K0][K1][K2][K3][K4][K5][K6]) => T>, obj: MaybeWatchSource<U>): ComputedRef<DeepModify<[K0, K1, K2, K3, K4, K5, K6], U, T>>;
// backup type
// for unknown path, or key-chain larger than 6, allow user to set output type B and input type A
export function useModifyPath<B, A = any>(path: MaybeWatchSource<Path>, fn: MaybeRef<(a: any) => any>, obj: MaybeWatchSource<A>): ComputedRef<B>;


/**
 * Divides the first parameter by the second and returns the remainder. Note
 * that this function preserves the JavaScript-style behavior for modulo. For
 * mathematical modulo see [`mathMod`](#mathMod).
 *
 * See also {@link mathMod}
 *
 * @example
 * ```typescript
 * R.modulo(17, 3); //=> 2
 * // JS behavior:
 * R.modulo(-17, 3); //=> -2
 * R.modulo(17, -3); //=> 2
 * 
 * const isOdd = R.modulo(R.__, 2);
 * isOdd(42); //=> 0
 * isOdd(21); //=> 1
 * ```
 */
export function useModulo(a: MaybeWatchSource<number>): (b: MaybeWatchSource<number>) => ComputedRef<number>;
export function useModulo(__: Placeholder, b: MaybeWatchSource<number>): (a: MaybeWatchSource<number>) => ComputedRef<number>;
export function useModulo(a: MaybeWatchSource<number>, b: MaybeWatchSource<number>): ComputedRef<number>;


/**
 * Move an item, at index `from`, to index `to`, in a list of elements.
 * A new list will be created containing the new elements order.
 *
 * @example
 * ```typescript
 * R.move(0, 2, ['a', 'b', 'c', 'd', 'e', 'f']); //=> ['b', 'c', 'a', 'd', 'e', 'f']
 * R.move(-1, 0, ['a', 'b', 'c', 'd', 'e', 'f']); //=> ['f', 'a', 'b', 'c', 'd', 'e'] list rotation
 * ```
 */
export function useMove(from: MaybeWatchSource<number>): {
  (to: MaybeWatchSource<number>): <T>(list: MaybeWatchSource<readonly T[]>) => ComputedRef<T[]>;
  <T>(to: MaybeWatchSource<number>, list: MaybeWatchSource<readonly T[]>): ComputedRef<T[]>;
};
export function useMove(from: MaybeWatchSource<number>, to: MaybeWatchSource<number>): <T>(list: MaybeWatchSource<readonly T[]>) => ComputedRef<T[]>;
export function useMove<T>(from: MaybeWatchSource<number>, to: MaybeWatchSource<number>, list: MaybeWatchSource<readonly T[]>): ComputedRef<T[]>;


/**
 * Multiplies two numbers. Equivalent to `a * b` but curried.
 *
 * See also {@link divide}
 *
 * @example
 * ```typescript
 * const double = R.multiply(2);
 * const triple = R.multiply(3);
 * double(3);       //=>  6
 * triple(4);       //=> 12
 * R.multiply(2, 5);  //=> 10
 * ```
 */
export function useMultiply(a: MaybeWatchSource<number>): (b: MaybeWatchSource<number>) => ComputedRef<number>;
export function useMultiply(a: MaybeWatchSource<number>, b: MaybeWatchSource<number>): ComputedRef<number>;


/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly `n` parameters. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * See also {@link binary}, {@link unary}
 *
 * @example
 * ```typescript
 * const takesTwoArgs = (a, b) => [a, b];
 * 
 * takesTwoArgs.length; //=> 2
 * takesTwoArgs(1, 2); //=> [1, 2]
 * 
 * const takesOneArg = R.nAry(1, takesTwoArgs);
 * takesOneArg.length; //=> 1
 * // Only `n` arguments are passed to the wrapped function
 * takesOneArg(1, 2); //=> [1, undefined]
 * ```
 */
export function useNAry<N extends number>(
  n: MaybeWatchSource<N>,
): <T extends (...arg: any) => unknown>(fn: MaybeRef<T>) => ComputedRef<(...arg: _.T.Take<Parameters<T>, N>) => ReturnType<T>>;
export function useNAry<N extends number, T extends (...arg: any) => unknown>(
  n: MaybeWatchSource<N>,
  fn: MaybeRef<T>,
): ComputedRef<(...arg: _.T.Take<Parameters<T>, N>) => ReturnType<T>>;


/**
 * Negates its argument.
 *
 * @example
 * ```typescript
 * R.negate(42); //=> -42
 * ```
 */
export function useNegate(n: MaybeWatchSource<number>): ComputedRef<number>;


/**
 * Returns `true` if no elements of the list match the predicate, `false`
 * otherwise.
 * 
 * Dispatches to the `all` method of the second argument, if present.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * See also {@link all}, {@link any}
 *
 * @example
 * ```typescript
 * const isEven = n => n % 2 === 0;
 * const isOdd = n => n % 2 !== 0;
 * 
 * R.none(isEven, [1, 3, 5, 7, 9, 11]); //=> true
 * R.none(isOdd, [1, 3, 5, 7, 8, 11]); //=> false
 * ```
 */
export function useNone<T>(fn: MaybeRef<(a: T) => boolean>): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<boolean>;
export function useNone<T>(fn: MaybeRef<(a: T) => boolean>, list: MaybeWatchSource<readonly T[]>): ComputedRef<boolean>;


/**
 * A function that returns the `!` of its argument. It will return `true` when
 * passed false-y value, and `false` when passed a truth-y one.
 *
 * See also {@link complement}
 *
 * @example
 * ```typescript
 * R.not(true); //=> false
 * R.not(false); //=> true
 * R.not(0); //=> true
 * R.not(1); //=> false
 * ```
 */
export function useNot(value: MaybeRef<any>): ComputedRef<boolean>;


/**
 * Returns the nth element of the given list or string. If n is negative the
 * element at index length + n is returned.
 *
 * @example
 * ```typescript
 * const list = ['foo', 'bar', 'baz', 'quux'];
 * R.nth(1, list); //=> 'bar'
 * R.nth(-1, list); //=> 'quux'
 * R.nth(-99, list); //=> undefined
 * 
 * R.nth(2, 'abc'); //=> 'c'
 * R.nth(3, 'abc'); //=> ''
 * ```
 */
export function useNth(n: MaybeWatchSource<number>): <T extends readonly any[] | string>(list: MaybeRef<T>) => ComputedRef<(T extends Array<infer E> ? E : string) | undefined>;
export function useNth(n: MaybeWatchSource<number>, list: MaybeRef<string>): ComputedRef<string>;
export function useNth<T>(n: MaybeWatchSource<number>, list: MaybeRef<readonly T[]>): ComputedRef<T | undefined>;


/**
 * Returns a function which returns its nth argument.
 *
 * @example
 * ```typescript
 * R.nthArg(1)('a', 'b', 'c'); //=> 'b'
 * R.nthArg(-1)('a', 'b', 'c'); //=> 'c'
 * ```
 */
export function useNthArg(n: MaybeWatchSource<number>): ComputedRef<(...a: readonly any[]) => any>;


/**
 * `o` is a curried composition function that returns a unary function.
 * Like [`compose`](#compose), `o` performs right-to-left function composition.
 * Unlike [`compose`](#compose), the rightmost function passed to `o` will be
 * invoked with only one argument. Also, unlike [`compose`](#compose), `o` is
 * limited to accepting only 2 unary functions. The name o was chosen because
 * of its similarity to the mathematical composition operator ∘.
 *
 * See also {@link compose}, {@link pipe}
 *
 * @example
 * ```typescript
 * const classyGreeting = name => "The name's " + name.last + ", " + name.first + " " + name.last
 * const yellGreeting = R.o(R.toUpper, classyGreeting);
 * yellGreeting({first: 'James', last: 'Bond'}); //=> "THE NAME'S BOND, JAMES BOND"
 * 
 * R.o(R.multiply(10), R.add(10))(-4) //=> 60
 * ```
 */
export function useO<T2, R>(f: MaybeRef<(x: T2) => R>): {
  <T1>(g: MaybeRef<(x: T1) => T2>): ComputedRef<(v: T1) => R>;
  <T1>(g: MaybeRef<(x: T1) => T2>, v: T1): ComputedRef<R>;
};
export function useO<T1, T2, R>(f: MaybeRef<(x: T2) => R>, g: MaybeRef<(x: T1) => T2>): ComputedRef<(v: T1) => R>;
export function useO<T1, T2, R>(f: MaybeRef<(x: T2) => R>, g: MaybeRef<(x: T1) => T2>, v: T1): ComputedRef<R>;


/**
 * Creates an object containing a single key:value pair.
 *
 * See also {@link pair}
 *
 * @example
 * ```typescript
 * const matchPhrases = R.compose(
 *   R.objOf('must'),
 *   R.map(R.objOf('match_phrase'))
 * );
 * matchPhrases(['foo', 'bar', 'baz']); //=> {must: [{match_phrase: 'foo'}, {match_phrase: 'bar'}, {match_phrase: 'baz'}]}
 * ```
 */
export function useObjOf<K extends string>(key: MaybeWatchSource<K>): <T>(value: MaybeRef<T>) => ComputedRef<Record<K, T>>;
export function useObjOf<T, K extends string>(key: MaybeWatchSource<K>, value: MaybeRef<T>): ComputedRef<Record<K, T>>;


/**
 * Given a constructor and a value, returns a new instance of that constructor
 * containing the value.
 * 
 * Dispatches to the `fantasy-land/of` method of the constructor first (if present)
 * or to the `of` method last (if present). When neither are present, wraps the
 * value in an array.
 * 
 * Note this `of` is different from the ES6 `of`; See
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of
 *
 * @example
 * ```typescript
 * R.of(Array, 42);   //=> [42]
 * R.of(Array, [42]); //=> [[42]]
 * R.of(Maybe, 42);   //=> Maybe.Just(42)
 * ```
 */
export function useOf<Ctor extends { of: (value: any) => any; }>(ctor: MaybeWatchSource<Ctor>): <T extends Parameters<Ctor['of']>[0]>(val: MaybeRef<T>) => ComputedRef<Ctor extends ArrayConstructor ? T[] : ReturnType<Ctor['of']>>;
// of(__, val)(ctor)
export function useOf<T>(__: Placeholder, val: MaybeWatchSource<T>): <Ctor extends { of: (value: any) => any; }>(ctor: MaybeRef<Ctor>) => ComputedRef<Ctor extends ArrayConstructor ? T[] : ReturnType<Ctor['of']>>;
// of(ctor, val)
export function useOf<Ctor extends { of: (value: any) => any; }, T extends Parameters<Ctor['of']>[0]>(ctor: MaybeWatchSource<Ctor>, val: MaybeRef<T>): ComputedRef<Ctor extends ArrayConstructor ? T[] : ReturnType<Ctor['of']>>;


/**
 * Returns a partial copy of an object omitting the keys specified.
 *
 * See also {@link pick}
 *
 * @example
 * ```typescript
 * R.omit(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, c: 3}
 * ```
 */
export function useOmit<K extends string>(names: MaybeWatchSource<readonly K[]>): <T>(obj: MaybeWatchSource<T>) => ComputedRef<Omit<T, K>>;
export function useOmit<T, K extends string>(names: MaybeWatchSource<readonly K[]>, obj: MaybeWatchSource<T>): ComputedRef<Omit<T, K>>;


/**
 * Takes a binary function `f`, a unary function `g`, and two values.
 * Applies `g` to each value, then applies the result of each to `f`.
 * 
 * Also known as the P combinator.
 *
 * @example
 * ```typescript
 * const eqBy = R.on((a, b) => a === b);
 * eqBy(R.prop('a'), {b:0, a:1}, {a:1}) //=> true;
 * 
 * const containsInsensitive = R.on(R.includes, R.toLower);
 * containsInsensitive('o', 'FOO'); //=> true
 * ```
 */
export function useOn<U, R>(combine: MaybeRef<(a: U, b: U) => R>): {
  <T>(transform: MaybeRef<(value: T) => U>): {
    (a: MaybeRef<T>): (b: MaybeRef<T>) => ComputedRef<R>;
    (a: MaybeRef<T>, b: MaybeRef<T>): ComputedRef<R>;
  };
  <T>(transform: MaybeRef<(value: T) => U>, a: MaybeRef<T>): (b: MaybeRef<T>) => ComputedRef<R>;
  <T>(transform: MaybeRef<(value: T) => U>, a: MaybeRef<T>, b: MaybeRef<T>): ComputedRef<R>;
};

// For manually specifying overloads
export function useOn<T, U, R>(combine: MaybeRef<(a: U, b: U) => R>): {
  (transform: MaybeRef<(value: T) => U>): {
    (a: MaybeRef<T>): (b: MaybeRef<T>) => ComputedRef<R>;
    (a: MaybeRef<T>, b: MaybeRef<T>): ComputedRef<R>;
  };
  (transform: MaybeRef<(value: T) => U>, a: MaybeRef<T>): (b: MaybeRef<T>) => ComputedRef<R>;
  (transform: MaybeRef<(value: T) => U>, a: MaybeRef<T>, b: MaybeRef<T>): ComputedRef<R>;
};

export function useOn<T, U, R>(combine: MaybeRef<(a: U, b: U) => R>, transform: MaybeRef<(value: T) => U>): {
  (a: MaybeRef<T>): (b: MaybeRef<T>) => ComputedRef<R>;
  (a: MaybeRef<T>, b: MaybeRef<T>): ComputedRef<R>;
};
export function useOn<T, U, R>(combine: MaybeRef<(a: U, b: U) => R>, transform: MaybeRef<(value: T) => U>, a: MaybeRef<T>): (b: MaybeRef<T>) => ComputedRef<R>;
export function useOn<T, U, R>(combine: MaybeRef<(a: U, b: U) => R>, transform: MaybeRef<(value: T) => U>, a: MaybeRef<T>, b: MaybeRef<T>): ComputedRef<R>;


/**
 * Accepts a function `fn` and returns a function that guards invocation of
 * `fn` such that `fn` can only ever be called once, no matter how many times
 * the returned function is invoked. The first value calculated is returned in
 * subsequent invocations.
 *
 * @example
 * ```typescript
 * const addOneOnce = R.once(x => x + 1);
 * addOneOnce(10); //=> 11
 * addOneOnce(addOneOnce(50)); //=> 11
 * ```
 */
export function useOnce<F extends (...a: readonly any[]) => any>(fn: MaybeRef<F>): ComputedRef<F>;


/**
 * Returns the first argument if it is truthy, otherwise the second argument.
 * Acts as the boolean `or` statement if both inputs are `Boolean`s.
 *
 * See also {@link either}, {@link and}
 *
 * @example
 * ```typescript
 * R.or(true, true); //=> true
 * R.or(true, false); //=> true
 * R.or(false, true); //=> true
 * R.or(false, false); //=> false
 * ```
 */
export function useOr<T>(a: MaybeRef<T | Falsy>): <U>(b: MaybeRef<U>) => ComputedRef<T | U>;
export function useOr<T, U>(a: MaybeRef<T | Falsy>, b: MaybeRef<U>): ComputedRef<T | U>;


/**
 * Returns the result of applying the onFailure function to the value inside
 * a failed promise. This is useful for handling rejected promises
 * inside function compositions.
 *
 * See also {@link andThen}
 *
 * @example
 * ```typescript
 * const failedFetch = id => Promise.reject('bad ID');
 * const useDefault = () => ({ firstName: 'Bob', lastName: 'Loblaw' });
 * 
 * //recoverFromFailure :: String -> Promise ({ firstName, lastName })
 * const recoverFromFailure = R.pipe(
 *   failedFetch,
 *   R.otherwise(useDefault),
 *   R.andThen(R.pick(['firstName', 'lastName'])),
 * );
 * recoverFromFailure(12345).then(console.log);
 * ```
 */
export function useOtherwise<A, B>(onError: MaybeRef<(error: any) => B | Promise<B>>): (promise: MaybeWatchSource<Promise<A>>) => ComputedRef<Promise<B>>;
export function useOtherwise<A, B>(onError: MaybeRef<(error: any) => B | Promise<B>>, promise: MaybeWatchSource<Promise<A>>): ComputedRef<Promise<B>>;


/**
 * Returns the result of "setting" the portion of the given data structure
 * focused by the given lens to the result of applying the given function to
 * the focused value.
 *
 * See also {@link view}, {@link set}, {@link lens}, {@link lensIndex}, {@link lensProp}, {@link lensPath}
 *
 * @example
 * ```typescript
 * const headLens = R.lensIndex(0);
 * 
 * R.over(headLens, R.toUpper, ['foo', 'bar', 'baz']); //=> ['FOO', 'bar', 'baz']
 * ```
 */
export function useOver<S, A>(lens: MaybeWatchSource<Lens<S, A>>): {
  (fn: MaybeRef<(a: A) => A>): (value: MaybeRef<S>) => ComputedRef<S>;
  (fn: MaybeRef<(a: A) => A>, value: MaybeRef<S>): ComputedRef<S>;
};
export function useOver<S, A>(lens: MaybeWatchSource<Lens<S, A>>, fn: MaybeRef<(a: A) => A>): (value: MaybeRef<S>) => ComputedRef<S>;
export function useOver<S, A>(lens: MaybeWatchSource<Lens<S, A>>, fn: MaybeRef<(a: A) => A>, value: MaybeRef<S>): ComputedRef<S>;


/**
 * Takes two arguments, `fst` and `snd`, and returns `[fst, snd]`.
 *
 * See also {@link objOf}, {@link of}
 *
 * @example
 * ```typescript
 * R.pair('foo', 'bar'); //=> ['foo', 'bar']
 * ```
 */
export function usePair<F>(fst: MaybeRef<F>): <S>(snd: MaybeRef<S>) => ComputedRef<[F, S]>;
export function usePair<F, S>(fst: MaybeRef<F>, snd: MaybeRef<S>): ComputedRef<[F, S]>;


/**
 * Takes a function `f` and a list of arguments, and returns a function `g`.
 * When applied, `g` returns the result of applying `f` to the arguments
 * provided initially followed by the arguments provided to `g`.
 *
 * See also {@link partialRight}, {@link curry}
 *
 * @example
 * ```typescript
 * const multiply2 = (a, b) => a * b;
 * const double = R.partial(multiply2, [2]);
 * double(3); //=> 6
 * 
 * const greet = (salutation, title, firstName, lastName) =>
 *   salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
 * 
 * const sayHello = R.partial(greet, ['Hello']);
 * const sayHelloToMs = R.partial(sayHello, ['Ms.']);
 * sayHelloToMs('Jane', 'Jones'); //=> 'Hello, Ms. Jane Jones!'
 * ```
 */
export function usePartial<V0, V1, T>(fn: MaybeRef<(x0: V0, x1: V1) => T>, args: MaybeWatchSource<[V0]>): ComputedRef<(x1: V1) => T>;
export function usePartial<V0, V1, V2, T>(fn: MaybeRef<(x0: V0, x1: V1, x2: V2) => T>, args: MaybeWatchSource<[V0, V1]>): ComputedRef<(x2: V2) => T>;
export function usePartial<V0, V1, V2, T>(fn: MaybeRef<(x0: V0, x1: V1, x2: V2) => T>, args: MaybeWatchSource<[V0]>): ComputedRef<(x1: V1, x2: V2) => T>;
export function usePartial<V0, V1, V2, V3, T>(
  fn: MaybeRef<(x0: V0, x1: V1, x2: V2, x3: V3) => T>,
  args: MaybeWatchSource<[V0, V1, V2]>,
): ComputedRef<(x2: V3) => T>;
export function usePartial<V0, V1, V2, V3, T>(
  fn: MaybeRef<(x0: V0, x1: V1, x2: V2, x3: V3) => T>,
  args: MaybeWatchSource<[V0, V1]>,
): ComputedRef<(x2: V2, x3: V3) => T>;
export function usePartial<V0, V1, V2, V3, T>(
  fn: MaybeRef<(x0: V0, x1: V1, x2: V2, x3: V3) => T>,
  args: MaybeWatchSource<[V0]>,
): ComputedRef<(x1: V1, x2: V2, x3: V3) => T>;
export function usePartial<T>(fn: MaybeRef<(...a: readonly any[]) => T>, args: MaybeWatchSource<readonly any[]>): ComputedRef<(...a: readonly any[]) => T>;


/**
 * Takes a function `f` and an object, and returns a function `g`.
 * When applied, `g` returns the result of applying `f` to the object
 * provided initially merged deeply (right) with the object provided as an argument to `g`.
 *
 * See also {@link partial}, {@link partialRight}, {@link curry}, {@link mergeDeepRight}
 *
 * @example
 * ```typescript
 * const multiply2 = ({ a, b }) => a * b;
 * const double = R.partialObject(multiply2, { a: 2 });
 * double({ b: 2 }); //=> 4
 * 
 * const greet = ({ salutation, title, firstName, lastName }) =>
 *   salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
 * 
 * const sayHello = R.partialObject(greet, { salutation: 'Hello' });
 * const sayHelloToMs = R.partialObject(sayHello, { title: 'Ms.' });
 * sayHelloToMs({ firstName: 'Jane', lastName: 'Jones' }); //=> 'Hello, Ms. Jane Jones!'
 * ```
 */
export function usePartialObject<T, R>(fn: MaybeRef<(value: T) => R>): <P1>(partial: MaybeWatchSource<P1>) => ComputedRef<(value: Omit<T, keyof P1>) => R>;
export function usePartialObject<T extends P1, P1, R>(fn: MaybeRef<(value: T) => R>, partial: MaybeWatchSource<P1>): ComputedRef<(value: Omit<T, keyof P1>) => R>;


/**
 * Takes a function `f` and a list of arguments, and returns a function `g`.
 * When applied, `g` returns the result of applying `f` to the arguments
 * provided to `g` followed by the arguments provided initially.
 *
 * See also {@link partial}
 *
 * @example
 * ```typescript
 * const greet = (salutation, title, firstName, lastName) =>
 *   salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
 * 
 * const greetMsJaneJones = R.partialRight(greet, ['Ms.', 'Jane', 'Jones']);
 * 
 * greetMsJaneJones('Hello'); //=> 'Hello, Ms. Jane Jones!'
 * ```
 */
export function usePartialRight<V0, V1, T>(fn: MaybeRef<(x0: V0, x1: V1) => T>, args: MaybeWatchSource<[V1]>): ComputedRef<(x1: V0) => T>;
export function usePartialRight<V0, V1, V2, T>(fn: MaybeRef<(x0: V0, x1: V1, x2: V2) => T>, args: MaybeWatchSource<[V1, V2]>): ComputedRef<(x2: V0) => T>;
export function usePartialRight<V0, V1, V2, T>(fn: MaybeRef<(x0: V0, x1: V1, x2: V2) => T>, args: MaybeWatchSource<[V2]>): ComputedRef<(x1: V0, x2: V1) => T>;
export function usePartialRight<V0, V1, V2, V3, T>(
  fn: MaybeRef<(x0: V0, x1: V1, x2: V2, x3: V3) => T>,
  args: MaybeWatchSource<[V1, V2, V3]>,
): ComputedRef<(x0: V0) => T>;
export function usePartialRight<V0, V1, V2, V3, T>(
  fn: MaybeRef<(x0: V0, x1: V1, x2: V2, x3: V3) => T>,
  args: MaybeWatchSource<[V2, V3]>,
): ComputedRef<(x0: V0, x1: V1) => T>;
export function usePartialRight<V0, V1, V2, V3, T>(
  fn: MaybeRef<(x0: V0, x1: V1, x2: V2, x3: V3) => T>,
  args: MaybeWatchSource<[V3]>,
): ComputedRef<(x0: V0, x1: V1, x2: V2) => T>;
export function usePartialRight<T>(fn: MaybeRef<(...a: readonly any[]) => T>, args: MaybeWatchSource<readonly any[]>): ComputedRef<(...a: readonly any[]) => T>;


/**
 * Takes a predicate and a list or other `Filterable` object and returns the
 * pair of filterable objects of the same type of elements which do and do not
 * satisfy, the predicate, respectively. Filterable objects include plain objects or any object
 * that has a filter method such as `Array`.
 *
 * See also {@link filter}, {@link reject}
 *
 * @example
 * ```typescript
 * R.partition(R.includes('s'), ['sss', 'ttt', 'foo', 'bars']);
 * // => [ [ 'sss', 'bars' ],  [ 'ttt', 'foo' ] ]
 * 
 * R.partition(R.includes('s'), { a: 'sss', b: 'ttt', foo: 'bars' });
 * // => [ { a: 'sss', foo: 'bars' }, { b: 'ttt' }  ]
 * ```
 */
export function usePartition(fn: MaybeRef<(a: string) => boolean>): (list: MaybeWatchSource<readonly string[]>) => ComputedRef<[string[], string[]]>;
export function usePartition<T>(fn: MaybeRef<(a: T) => boolean>): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<[T[], T[]]>;
export function usePartition(fn: MaybeRef<(a: string) => boolean>, list: MaybeWatchSource<readonly string[]>): ComputedRef<[string[], string[]]>;
export function usePartition<T>(fn: MaybeRef<(a: T) => boolean>, list: MaybeWatchSource<readonly T[]>): ComputedRef<[T[], T[]]>;


/**
 * Retrieves the value at a given path. The nodes of the path can be arbitrary strings or non-negative integers.
 * For anything else, the value is unspecified. Integer paths are meant to index arrays, strings are meant for objects.
 *
 * See also {@link prop}, {@link nth}, {@link assocPath}, {@link dissocPath}
 *
 * @example
 * ```typescript
 * R.path(['a', 'b'], {a: {b: 2}}); //=> 2
 * R.path(['a', 'b'], {c: {b: 2}}); //=> undefined
 * R.path(['a', 'b', 0], {a: {b: [1, 2, 3]}}); //=> 1
 * R.path(['a', 'b', -2], {a: {b: [1, 2, 3]}}); //=> 2
 * R.path([2], {'2': 2}); //=> 2
 * R.path([-2], {'-2': 'a'}); //=> undefined
 * ```
 */
export function usePath<S, K0 extends keyof S = keyof S>(path: MaybeWatchSource<[K0]>, obj: MaybeWatchSource<S>): ComputedRef<S[K0]>;
export function usePath<S, K0 extends keyof S = keyof S, K1 extends keyof S[K0] = keyof S[K0]>(path: MaybeWatchSource<[K0, K1]>, obj: MaybeWatchSource<S>): ComputedRef<S[K0][K1]>;
export function usePath<
  S,
  K0 extends keyof S = keyof S,
  K1 extends keyof S[K0] = keyof S[K0],
  K2 extends keyof S[K0][K1] = keyof S[K0][K1]
>(path: MaybeWatchSource<[K0, K1, K2]>, obj: MaybeWatchSource<S>): ComputedRef<S[K0][K1][K2]>;
export function usePath<
  S,
  K0 extends keyof S = keyof S,
  K1 extends keyof S[K0] = keyof S[K0],
  K2 extends keyof S[K0][K1] = keyof S[K0][K1],
  K3 extends keyof S[K0][K1][K2] = keyof S[K0][K1][K2]
>(path: MaybeWatchSource<[K0, K1, K2, K3]>, obj: MaybeWatchSource<S>): ComputedRef<S[K0][K1][K2][K3]>;
export function usePath<
  S,
  K0 extends keyof S = keyof S,
  K1 extends keyof S[K0] = keyof S[K0],
  K2 extends keyof S[K0][K1] = keyof S[K0][K1],
  K3 extends keyof S[K0][K1][K2] = keyof S[K0][K1][K2],
  K4 extends keyof S[K0][K1][K2][K3] = keyof S[K0][K1][K2][K3]
>(path: MaybeWatchSource<[K0, K1, K2, K3, K4]>, obj: MaybeWatchSource<S>): ComputedRef<S[K0][K1][K2][K3][K4]>;
export function usePath<
  S,
  K0 extends keyof S = keyof S,
  K1 extends keyof S[K0] = keyof S[K0],
  K2 extends keyof S[K0][K1] = keyof S[K0][K1],
  K3 extends keyof S[K0][K1][K2] = keyof S[K0][K1][K2],
  K4 extends keyof S[K0][K1][K2][K3] = keyof S[K0][K1][K2][K3],
  K5 extends keyof S[K0][K1][K2][K3][K4] = keyof S[K0][K1][K2][K3][K4]
>(path: MaybeWatchSource<[K0, K1, K2, K3, K4, K5]>, obj: MaybeWatchSource<S>): ComputedRef<S[K0][K1][K2][K3][K4][K5]>;
export function usePath<T>(path: MaybeWatchSource<Path>, obj: MaybeWatchSource<any>): ComputedRef<T | undefined>;
export function usePath<T>(path: MaybeWatchSource<Path>): (obj: MaybeWatchSource<any>) => ComputedRef<T | undefined>;


/**
 * Determines whether a nested path on an object has a specific value, in
 * [`R.equals`](#equals) terms. Most likely used to filter a list.
 *
 * See also {@link whereEq}, {@link propEq}, {@link pathSatisfies}, {@link equals}
 *
 * @example
 * ```typescript
 * const user1 = { address: { zipCode: 90210 } };
 * const user2 = { address: { zipCode: 55555 } };
 * const user3 = { name: 'Bob' };
 * const users = [ user1, user2, user3 ];
 * const isFamous = R.pathEq(90210, ['address', 'zipCode']);
 * R.filter(isFamous, users); //=> [ user1 ]
 * ```
 */
export function usePathEq(val: MaybeRef<any>): {
  (path: MaybeWatchSource<Path>): (obj: MaybeWatchSource<any>) => ComputedRef<boolean>;
  (path: MaybeWatchSource<Path>, obj: MaybeWatchSource<any>): ComputedRef<boolean>;
};
export function usePathEq(val: MaybeRef<any>, path: MaybeWatchSource<Path>): (obj: MaybeWatchSource<any>) => ComputedRef<boolean>;
export function usePathEq(val: MaybeRef<any>, path: MaybeWatchSource<Path>, obj: MaybeWatchSource<any>): ComputedRef<boolean>;


/**
 * If the given, non-null object has a value at the given path, returns the
 * value at that path. Otherwise returns the provided default value.
 *
 * @example
 * ```typescript
 * R.pathOr('N/A', ['a', 'b'], {a: {b: 2}}); //=> 2
 * R.pathOr('N/A', ['a', 'b'], {c: {b: 2}}); //=> "N/A"
 * ```
 */
export function usePathOr<T>(defaultValue: MaybeRef<T>): _.F.Curry<(a: MaybeWatchSource<Path>, b: MaybeWatchSource<any>) => ComputedRef<T>>;
export function usePathOr<T>(defaultValue: MaybeRef<T>, path: MaybeWatchSource<Path>): (obj: MaybeWatchSource<any>) => ComputedRef<T>;
export function usePathOr<T>(defaultValue: MaybeRef<T>, path: MaybeWatchSource<Path>, obj: MaybeWatchSource<any>): ComputedRef<T>;


/**
 * Retrieves the values at given paths of an object.
 *
 * See also {@link path}
 *
 * @example
 * ```typescript
 * R.paths([['a', 'b'], ['p', 0, 'q']], {a: {b: 2}, p: [{q: 3}]}); //=> [2, 3]
 * R.paths([['a', 'b'], ['p', 'r']], {a: {b: 2}, p: [{q: 3}]}); //=> [2, undefined]
 * ```
 */
export function usePaths<T>(paths: MaybeWatchSource<Path[]>): (obj: MaybeWatchSource<any>) => ComputedRef<Array<T | undefined>>;
export function usePaths<T>(paths: MaybeWatchSource<Path[]>, obj: MaybeWatchSource<any>): ComputedRef<Array<T | undefined>>;


/**
 * Returns `true` if the specified object property at given path satisfies the
 * given predicate; `false` otherwise.
 *
 * See also {@link propSatisfies}, {@link path}
 *
 * @example
 * ```typescript
 * R.pathSatisfies(y => y > 0, ['x', 'y'], {x: {y: 2}}); //=> true
 * R.pathSatisfies(R.is(Object), [], {x: {y: 2}}); //=> true
 * ```
 */
export function usePathSatisfies<T, U>(pred: MaybeRef<(val: T) => boolean>): _.F.Curry<(a: MaybeWatchSource<Path>, b: MaybeRef<U>) => ComputedRef<boolean>>;
export function usePathSatisfies<T, U>(pred: MaybeRef<(val: T) => boolean>, path: MaybeWatchSource<Path>): (obj: MaybeRef<U>) => ComputedRef<boolean>;
export function usePathSatisfies<T, U>(pred: MaybeRef<(val: T) => boolean>, path: MaybeWatchSource<Path>, obj: MaybeRef<U>): ComputedRef<boolean>;


/**
 * Returns a partial copy of an object containing only the keys specified. If
 * the key does not exist, the property is ignored.
 *
 * See also {@link omit}, {@link props}
 *
 * @example
 * ```typescript
 * R.pick(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
 * R.pick(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1}
 * ```
 */
export function usePick<T extends readonly [any, ...any], K extends string | number | symbol>(
  names: MaybeWatchSource<readonly K[]>,
  array: MaybeWatchSource<T>,
): ComputedRef<{
  [P in K as P extends number
    ? _.N.Greater<T['length'], P> extends 1
      ? P
      : never
    : never]: P extends keyof T ? T[P] : T[number];
}>;
export function usePick<T, K extends string | number | symbol>(
  names: MaybeWatchSource<readonly K[]>,
  obj: MaybeWatchSource<T>,
): ComputedRef<{ [P in keyof T as P extends K ? P : never]: T[P] }>;
export function usePick<K extends string | number | symbol>(
  names: MaybeWatchSource<readonly K[]>,
): <T extends readonly [any, ...any] | object>(
  obj: MaybeWatchSource<T>,
) => ComputedRef<T extends readonly [any, ...any]
  ? {
    [P in K as P extends number
      ? _.N.Greater<T['length'], P> extends 1
        ? P
        : never
      : never]: P extends keyof T ? T[P] : T[number];
  }
  : { [P in keyof T as P extends K ? P : never]: T[P] }>;


/**
 * Similar to `pick` except that this one includes a `key: undefined` pair for
 * properties that don't exist.
 *
 * See also {@link pick}
 *
 * @example
 * ```typescript
 * R.pickAll(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
 * R.pickAll(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, e: undefined, f: undefined}
 * ```
 */
export function usePickAll(names: MaybeWatchSource<readonly string[]>): <T, U>(obj: MaybeWatchSource<T>) => ComputedRef<U>;
export function usePickAll<T, K extends keyof T>(names: MaybeWatchSource<readonly K[]>, obj: MaybeWatchSource<T>): ComputedRef<Pick<T, K>>;
export function usePickAll<T, U>(names: MaybeWatchSource<readonly string[]>, obj: MaybeWatchSource<T>): ComputedRef<U>;


/**
 * Returns a partial copy of an object containing only the keys that satisfy
 * the supplied predicate.
 *
 * See also {@link pick}, {@link filter}
 *
 * @example
 * ```typescript
 * const isUpperCase = (val, key) => key.toUpperCase() === key;
 * R.pickBy(isUpperCase, {a: 1, b: 2, A: 3, B: 4}); //=> {A: 3, B: 4}
 * ```
 */
export function usePickBy<T>(pred: MaybeRef<ObjPred<T>>): <U, V extends T>(obj: MaybeWatchSource<V>) => ComputedRef<U>;
export function usePickBy<T, U>(pred: MaybeRef<ObjPred<T>>, obj: MaybeWatchSource<T>): ComputedRef<U>;


/**
 * Performs left-to-right function composition. The first argument may have
 * any arity; the remaining arguments must be unary.
 * 
 * In some libraries this function is named `sequence`.
 * 
 * **Note:** The result of pipe is not automatically curried.
 *
 * See also {@link compose}
 *
 * @example
 * ```typescript
 * const f = R.pipe(Math.pow, R.negate, R.inc);
 * 
 * f(3, 4); // -(3^4) + 1
 * ```
 */
export function usePipe<TArgs extends any[], R1, R2, R3, R4, R5, R6, R7, TResult>(
  ...funcs: MaybeRef<[
        f1: (...args: TArgs) => R1,
        f2: (a: R1) => R2,
        f3: (a: R2) => R3,
        f4: (a: R3) => R4,
        f5: (a: R4) => R5,
        f6: (a: R5) => R6,
        f7: (a: R6) => R7,
        ...func: Array<(a: any) => any>,
        fnLast: (a: any) => TResult
  ]>
): ComputedRef<(...args: TArgs) => TResult>;
// fallback overload if number of piped functions greater than 7
export function usePipe<TArgs extends any[], R1, R2, R3, R4, R5, R6, R7>(
  f1: MaybeRef<(...args: TArgs) => R1>,
  f2: (a: R1) => R2,
  f3: (a: R2) => R3,
  f4: (a: R3) => R4,
  f5: (a: R4) => R5,
  f6: (a: R5) => R6,
  f7: (a: R6) => R7,
): ComputedRef<(...args: TArgs) => R7>;
export function usePipe<TArgs extends any[], R1, R2, R3, R4, R5, R6>(
  f1: MaybeRef<(...args: TArgs) => R1>,
  f2: (a: R1) => R2,
  f3: (a: R2) => R3,
  f4: (a: R3) => R4,
  f5: (a: R4) => R5,
  f6: (a: R5) => R6,
): ComputedRef<(...args: TArgs) => R6>;
export function usePipe<TArgs extends any[], R1, R2, R3, R4, R5>(
  f1: MaybeRef<(...args: TArgs) => R1>,
  f2: (a: R1) => R2,
  f3: (a: R2) => R3,
  f4: (a: R3) => R4,
  f5: (a: R4) => R5,
): ComputedRef<(...args: TArgs) => R5>;
export function usePipe<TArgs extends any[], R1, R2, R3, R4>(
  f1: MaybeRef<(...args: TArgs) => R1>,
  f2: (a: R1) => R2,
  f3: (a: R2) => R3,
  f4: (a: R3) => R4,
): ComputedRef<(...args: TArgs) => R4>;
export function usePipe<TArgs extends any[], R1, R2, R3>(
  f1: MaybeRef<(...args: TArgs) => R1>,
  f2: (a: R1) => R2,
  f3: (a: R2) => R3,
): ComputedRef<(...args: TArgs) => R3>;
export function usePipe<TArgs extends any[], R1, R2>(
  f1: MaybeRef<(...args: TArgs) => R1>,
  f2: (a: R1) => R2,
): ComputedRef<(...args: TArgs) => R2>;
export function usePipe<TArgs extends any[], R1>(f1: MaybeRef<(...args: TArgs) => R1>): ComputedRef<(...args: TArgs) => R1>;


/**
 * Performs left-to-right function composition using transforming function. The first function may have
 * any arity; the remaining functions must be unary.
 * 
 * **Note:** The result of pipeWith is not automatically curried. Transforming function is not used on the
 * first argument.
 *
 * See also {@link composeWith}, {@link pipe}
 *
 * @example
 * ```typescript
 * const pipeWhileNotNil = R.pipeWith((f, res) => R.isNil(res) ? res : f(res));
 * const f = pipeWhileNotNil([Math.pow, R.negate, R.inc])
 * 
 * f(3, 4); // -(3^4) + 1
 * ```
 */
export function usePipeWith(
  transformer: MaybeRef<(fn: (...args: any[]) => any, intermediatResult: any) => any>,
): <TArgs extends any[], TResult>(fns: MaybeWatchSource<AtLeastOneFunctionsFlow<TArgs, TResult>>) => ComputedRef<(...args: TArgs) => TResult>;
export function usePipeWith<TArgs extends any[], TResult>(
  transformer: MaybeRef<(fn: (...args: any[]) => any, intermediatResult: any) => any>,
  fns: MaybeWatchSource<AtLeastOneFunctionsFlow<TArgs, TResult>>,
): ComputedRef<(...args: TArgs) => TResult>;


/**
 * Returns a new list by plucking the same named property off all objects in
 * the list supplied.
 * 
 * `pluck` will work on
 * any [functor](https://github.com/fantasyland/fantasy-land#functor) in
 * addition to arrays, as it is equivalent to `R.map(R.prop(k), f)`.
 *
 * See also {@link project}, {@link prop}, {@link props}
 *
 * @example
 * ```typescript
 * var getAges = R.pluck('age');
 * getAges([{name: 'fred', age: 29}, {name: 'wilma', age: 27}]); //=> [29, 27]
 * 
 * R.pluck(0, [[1, 2], [3, 4]]);               //=> [1, 3]
 * R.pluck('val', {a: {val: 3}, b: {val: 5}}); //=> {a: 3, b: 5}
 * ```
 */
export function usePluck<P extends string>(p: MaybeWatchSource<P>): <T>(list: MaybeWatchSource<Array<Record<P, T>>>) => ComputedRef<T[]>;
export function usePluck(p: MaybeWatchSource<number>): <T>(list: MaybeWatchSource<Array<{ [k: number]: T }>>) => ComputedRef<T[]>;
export function usePluck<K extends keyof T, T>(p: MaybeWatchSource<K>, list: MaybeWatchSource<readonly T[]>): ComputedRef<Array<T[K]>>;
export function usePluck<T>(p: MaybeWatchSource<number>, list: MaybeWatchSource<Array<{ [k: number]: T }>>): ComputedRef<T[]>;


/**
 * Returns a new list with the given element at the front, followed by the
 * contents of the list.
 *
 * See also {@link append}
 *
 * @example
 * ```typescript
 * R.prepend('fee', ['fi', 'fo', 'fum']); //=> ['fee', 'fi', 'fo', 'fum']
 * ```
 */
export function usePrepend<T>(el: MaybeRef<T>): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<T[]>;
export function usePrepend<T>(el: MaybeRef<T>, list: MaybeWatchSource<readonly T[]>): ComputedRef<T[]>;


/**
 * Multiplies together all the elements of a list.
 *
 * See also {@link reduce}
 *
 * @example
 * ```typescript
 * R.product([2,4,6,8,100,1]); //=> 38400
 * ```
 */
export function useProduct(list: MaybeWatchSource<readonly number[]>): ComputedRef<number>;


/**
 * Reasonable analog to SQL `select` statement.
 *
 * See also {@link pluck}, {@link props}, {@link prop}
 *
 * @example
 * ```typescript
 * const abby = {name: 'Abby', age: 7, hair: 'blond', grade: 2};
 * const fred = {name: 'Fred', age: 12, hair: 'brown', grade: 7};
 * const kids = [abby, fred];
 * R.project(['name', 'grade'], kids); //=> [{name: 'Abby', grade: 2}, {name: 'Fred', grade: 7}]
 * ```
 */
export function useProject<T, U>(props: MaybeWatchSource<readonly string[]>): (objs: MaybeWatchSource<readonly T[]>) => ComputedRef<U[]>;
export function useProject<T, U>(props: MaybeWatchSource<readonly string[]>, objs: MaybeWatchSource<readonly T[]>): ComputedRef<U[]>;


/**
 * Takes two functions as pre- and post- processors respectively for a third function,
 * i.e. `promap(f, g, h)(x) === g(h(f(x)))`.
 * 
 * Dispatches to the `promap` method of the third argument, if present,
 * according to the [FantasyLand Profunctor spec](https://github.com/fantasyland/fantasy-land#profunctor).
 * 
 * Acts as a transducer if a transformer is given in profunctor position.
 *
 * See also {@link transduce}
 *
 * @example
 * ```typescript
 * const decodeChar = R.promap(s => s.charCodeAt(), String.fromCharCode, R.add(-8))
 * const decodeString = R.promap(R.split(''), R.join(''), R.map(decodeChar))
 * decodeString("ziuli") //=> "ramda"
 * ```
 */
export function usePromap<A, B>(pre: MaybeRef<(value: A) => B>): <C, D>(post: MaybeRef<(value: C) => D>, fn: MaybeWatchSource<(value: B) => C>) => ComputedRef<(value: A) => D>;
export function usePromap<A, B, C, D>(pre: MaybeRef<(value: A) => B>, post: MaybeRef<(value: C) => D>): (fn: MaybeWatchSource<(value: B) => C>) => ComputedRef<(value: A) => D>;
export function usePromap<A, B, C, D>(pre: MaybeRef<(value: A) => B>, post: MaybeRef<(value: C) => D>, fn: MaybeWatchSource<(value: B) => C>): ComputedRef<(value: A) => D>;


/**
 * Returns a function that when supplied an object returns the indicated
 * property of that object, if it exists.
 *
 * See also {@link path}, {@link props}, {@link pluck}, {@link project}, {@link nth}
 *
 * @example
 * ```typescript
 * R.prop('x', {x: 100}); //=> 100
 * R.prop('x', {}); //=> undefined
 * R.prop(0, [100]); //=> 100
 * R.compose(R.inc, R.prop('x'))({ x: 3 }) //=> 4
 * ```
 */
export function useProp<_, T>(__: Placeholder, value: MaybeWatchSource<T>): {
  <P extends keyof Exclude<T, undefined>>(p: MaybeWatchSource<P>): ComputedRef<Prop<T, P>>;
  <P extends keyof never>(p: MaybeWatchSource<P>): ComputedRef<Prop<T, P>>;
};
export function useProp<V>(__: Placeholder, value: MaybeWatchSource<unknown>): (p: MaybeWatchSource<keyof never>) => ComputedRef<V>;
export function useProp<_, P extends keyof never, T>(p: MaybeWatchSource<P>, value: MaybeWatchSource<T>): ComputedRef<Prop<T, P>>;
export function useProp<V>(p: MaybeWatchSource<keyof never>, value: MaybeWatchSource<unknown>): ComputedRef<V>;
export function useProp<_, P extends keyof never>(p: MaybeWatchSource<P>): <T>(value: MaybeWatchSource<T>) => ComputedRef<Prop<T, P>>;
export function useProp<V>(p: MaybeWatchSource<keyof never>): (value: MaybeWatchSource<unknown>) => ComputedRef<V>;


/**
 * Returns `true` if the specified object property is equal, in
 * [`R.equals`](#equals) terms, to the given value; `false` otherwise.
 * You can test multiple properties with [`R.whereEq`](#whereEq),
 * and test nested path property with [`R.pathEq`](#pathEq).
 *
 * See also {@link whereEq}, {@link pathEq}, {@link propSatisfies}, {@link equals}
 *
 * @example
 * ```typescript
 * const abby = {name: 'Abby', age: 7, hair: 'blond'};
 * const fred = {name: 'Fred', age: 12, hair: 'brown'};
 * const rusty = {name: 'Rusty', age: 10, hair: 'brown'};
 * const alois = {name: 'Alois', age: 15, disposition: 'surly'};
 * const kids = [abby, fred, rusty, alois];
 * const hasBrownHair = R.propEq('brown', 'hair');
 * R.filter(hasBrownHair, kids); //=> [fred, rusty]
 * ```
 */
export function usePropEq<K extends string | number>(
  val: MaybeRef<any>,
): {
  (name: MaybeWatchSource<K>): (obj: MaybeRef<Record<K, any>>) => ComputedRef<boolean>;
  (name: MaybeWatchSource<K>, obj: MaybeRef<Record<K, any>>): ComputedRef<boolean>;
};
export function usePropEq<K extends string | number>(val: MaybeRef<any>, name: MaybeWatchSource<K>): (obj: MaybeRef<Record<K, any>>) => ComputedRef<boolean>;
export function usePropEq<K extends string | number>(val: MaybeRef<any>, name: MaybeWatchSource<K>, obj: MaybeRef<Record<K, any>>): ComputedRef<boolean>;


/**
 * Returns `true` if the specified object property is of the given type;
 * `false` otherwise.
 *
 * See also {@link is}, {@link propSatisfies}
 *
 * @example
 * ```typescript
 * R.propIs(Number, 'x', {x: 1, y: 2});  //=> true
 * R.propIs(Number, 'x', {x: 'foo'});    //=> false
 * R.propIs(Number, 'x', {});            //=> false
 * ```
 */
export function usePropIs<C extends (...args: any[]) => any, K extends keyof any>(
  type: MaybeRef<C>,
  name: MaybeWatchSource<K>,
  obj: MaybeRef<any>,
): obj is ComputedRef<Record<K, ReturnType<C>>>;
export function usePropIs<C extends new (...args: any[]) => any, K extends keyof any>(
  type: MaybeRef<C>,
  name: MaybeWatchSource<K>,
  obj: MaybeRef<any>,
): obj is ComputedRef<Record<K, InstanceType<C>>>;
export function usePropIs<C extends (...args: any[]) => any, K extends keyof any>(
  type: MaybeRef<C>,
  name: MaybeWatchSource<K>,
): (obj: MaybeRef<any>) => obj is ComputedRef<Record<K, ReturnType<C>>>;
export function usePropIs<C extends new (...args: any[]) => any, K extends keyof any>(
  type: MaybeRef<C>,
  name: MaybeWatchSource<K>,
): (obj: MaybeRef<any>) => obj is ComputedRef<Record<K, InstanceType<C>>>;
export function usePropIs<C extends (...args: any[]) => any>(
  type: MaybeRef<C>,
): {
  <K extends keyof any>(name: MaybeWatchSource<K>, obj: MaybeRef<any>): obj is ComputedRef<Record<K, ReturnType<C>>>;
  <K extends keyof any>(name: MaybeWatchSource<K>): (obj: MaybeRef<any>) => obj is ComputedRef<Record<K, ReturnType<C>>>;
};
export function usePropIs<C extends new (...args: any[]) => any>(
  type: MaybeRef<C>,
): {
  <K extends keyof any>(name: MaybeWatchSource<K>, obj: MaybeRef<any>): obj is ComputedRef<Record<K, InstanceType<C>>>;
  <K extends keyof any>(name: MaybeWatchSource<K>): (obj: MaybeRef<any>) => obj is ComputedRef<Record<K, InstanceType<C>>>;
};


/**
 * Return the specified property of the given non-null object if the property
 * is present and it's value is not `null`, `undefined` or `NaN`.
 * 
 * Otherwise the first argument is returned.
 *
 * @example
 * ```typescript
 * const alice = {
 *   name: 'ALICE',
 *   age: 101
 * };
 * const favorite = R.prop('favoriteLibrary');
 * const favoriteWithDefault = R.propOr('Ramda', 'favoriteLibrary');
 * 
 * favorite(alice);  //=> undefined
 * favoriteWithDefault(alice);  //=> 'Ramda'
 * ```
 */
export function usePropOr<T>(val: MaybeRef<T>): {
  (p: MaybeWatchSource<string>): <U, V>(obj: MaybeWatchSource<U>) => ComputedRef<V>
  <U, V>(p: MaybeWatchSource<string>, obj: MaybeWatchSource<U>): ComputedRef<V>
};
export function usePropOr<T>(val: MaybeRef<T>, p: MaybeWatchSource<string>): <U, V>(obj: MaybeWatchSource<U>) => ComputedRef<V>;
export function usePropOr<U>(__: Placeholder, p: MaybeRef<string>, obj: MaybeWatchSource<U>): <T, V>(val: MaybeWatchSource<T>) => ComputedRef<V>;
export function usePropOr<T, U>(val: MaybeRef<T>, __: Placeholder, obj: MaybeWatchSource<U>): <V>(p: MaybeWatchSource<string>) => ComputedRef<V>;
export function usePropOr<T, U, V>(val: MaybeRef<T>, p: MaybeWatchSource<string>, obj: MaybeWatchSource<U>): ComputedRef<V>;


/**
 * Acts as multiple `prop`: array of keys in, array of values out. Preserves
 * order.
 *
 * See also {@link prop}, {@link pluck}, {@link project}
 *
 * @example
 * ```typescript
 * R.props(['x', 'y'], {x: 1, y: 2}); //=> [1, 2]
 * R.props(['c', 'a', 'b'], {b: 2, a: 1}); //=> [undefined, 1, 2]
 * 
 * const fullName = R.compose(R.join(' '), R.props(['first', 'last']));
 * fullName({last: 'Bullet-Tooth', age: 33, first: 'Tony'}); //=> 'Tony Bullet-Tooth'
 * ```
 */
export function useProps<P extends string, T>(ps: MaybeWatchSource<readonly P[]>): (obj: MaybeWatchSource<Record<P, T>>) => ComputedRef<T[]>;
export function useProps<P extends string>(ps: MaybeWatchSource<readonly P[]>): <T>(obj: MaybeWatchSource<Record<P, T>>) => ComputedRef<T[]>;
export function useProps<P extends string, T>(ps: MaybeWatchSource<readonly P[]>, obj: MaybeWatchSource<Record<P, T>>): ComputedRef<T[]>;


/**
 * Returns `true` if the specified object property satisfies the given
 * predicate; `false` otherwise. You can test multiple properties with
 * [`R.where`](#where).
 *
 * See also {@link where}, {@link propEq}, {@link propIs}
 *
 * @example
 * ```typescript
 * R.propSatisfies(x => x > 0, 'x', {x: 1, y: 2}); //=> true
 * ```
 */
export function usePropSatisfies<P, K extends keyof any>(
  pred: MaybeRef<(val: any) => val is P>,
  name: MaybeWatchSource<K>,
  obj: MaybeRef<any>,
): obj is ComputedRef<Record<K, P>>;
export function usePropSatisfies<P, K extends keyof any>(
  pred: MaybeRef<(val: any) => val is P>,
  name: MaybeWatchSource<K>,
): (obj: MaybeRef<any>) => obj is ComputedRef<Record<K, P>>;
export function usePropSatisfies<P>(pred: MaybeRef<(val: any) => val is P>): {
  <K extends keyof any>(name: MaybeWatchSource<K>, obj: MaybeRef<any>): obj is ComputedRef<Record<K, P>>;
  <K extends keyof any>(name: MaybeWatchSource<K>): (obj: MaybeRef<any>) => obj is ComputedRef<Record<K, P>>;
};
export function usePropSatisfies(pred: MaybeRef<(val: any) => boolean>, name: MaybeWatchSource<keyof any>, obj: MaybeRef<any>): ComputedRef<boolean>;
export function usePropSatisfies(pred: MaybeRef<(val: any) => boolean>, name: MaybeWatchSource<keyof any>): (obj: MaybeRef<any>) => ComputedRef<boolean>;
export function usePropSatisfies(pred: MaybeRef<(val: any) => boolean>): _.F.Curry<(a: MaybeWatchSource<keyof any>, b: MaybeRef<any>) => ComputedRef<boolean>>;


/**
 * Returns a list of numbers from `from` (inclusive) to `to` (exclusive).
 *
 * @example
 * ```typescript
 * R.range(1, 5);    //=> [1, 2, 3, 4]
 * R.range(50, 53);  //=> [50, 51, 52]
 * ```
 */
export function useRange(from: MaybeWatchSource<number>): (to: MaybeWatchSource<number>) => ComputedRef<number[]>;
export function useRange(from: MaybeWatchSource<number>, to: MaybeWatchSource<number>): ComputedRef<number[]>;


/**
 * Returns a single item by iterating through the list, successively calling
 * the iterator function and passing it an accumulator value and the current
 * value from the array, and then passing the result to the next call.
 * 
 * The iterator function receives two values: *(acc, value)*. It may use
 * [`R.reduced`](#reduced) to shortcut the iteration.
 * 
 * The arguments' order of [`reduceRight`](#reduceRight)'s iterator function
 * is *(value, acc)*.
 * 
 * Note: `R.reduce` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.reduce` method. For more details
 * on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
 * 
 * Be cautious of mutating and returning the accumulator. If you reuse it across
 * invocations, it will continue to accumulate onto the same value. The general
 * recommendation is to always return a new value. If you can't do so for
 * performance reasons, then be sure to reinitialize the accumulator on each
 * invocation.
 * 
 * Dispatches to the `reduce` method of the third argument, if present. When
 * doing so, it is up to the user to handle the [`R.reduced`](#reduced)
 * shortcuting, as this is not implemented by `reduce`.
 *
 * See also {@link reduced}, {@link addIndex}, {@link reduceRight}
 *
 * @example
 * ```typescript
 * R.reduce(R.subtract, 0, [1, 2, 3, 4]) // => ((((0 - 1) - 2) - 3) - 4) = -10
 * //          -               -10
 * //         / \              / \
 * //        -   4           -6   4
 * //       / \              / \
 * //      -   3   ==>     -3   3
 * //     / \              / \
 * //    -   2           -1   2
 * //   / \              / \
 * //  0   1            0   1
 * ```
 */
export function useReduce<T, U>(f: MaybeRef<(acc: U, elem: T) => U | Reduced<U>>): {
  // reduce(f)(acc)(list)
  (acc: MaybeRef<U>): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<U>;
  // reduce(f)(__, list)(acc)
  (__: Placeholder, list: MaybeRef<readonly T[]>): (acc: MaybeWatchSource<U>) => ComputedRef<U>;
  // reduce(f)(acc, list)
  (acc: MaybeRef<U>, list: MaybeWatchSource<readonly T[]>): ComputedRef<U>;
};
// reduce(__, acc)
export function useReduce<U>(__: Placeholder, acc: MaybeRef<U>): {
  // reduce(__, acc)(f)(list)
  <T>(f: MaybeRef<(acc: U, elem: T) => U | Reduced<U>>): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<U>;
  // reduce(__, acc)(__, list)(f)
  <T>(__: Placeholder, list: MaybeRef<readonly T[]>): (f: MaybeWatchSource<(acc: U, elem: T) => U | Reduced<U>>) => ComputedRef<U>;
  // reduce(__, acc)(f, list)
  <T>(f: MaybeRef<(acc: U, elem: T) => U | Reduced<U>>, list: MaybeWatchSource<readonly T[]>): ComputedRef<U>;
};
// reduce(f, acc)(list)
export function useReduce<T, U>(f: MaybeRef<(acc: U, elem: T) => U | Reduced<U>>, acc: MaybeRef<U>): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<U>;
// reduce(_, _, list)
export function useReduce<T>(__: Placeholder, __2: Placeholder, list: MaybeRef<readonly T[]>): {
  // reduce(__, __, list)(f)(acc)
  <U>(f: MaybeRef<(acc: U, elem: T) => U | Reduced<U>>): (acc: MaybeWatchSource<U>) => ComputedRef<U>;
  // reduce(__, __, list)(__, acc)(f)
  <U>(__: Placeholder, acc: MaybeRef<U>): (f: MaybeWatchSource<(acc: U, elem: T) => U | Reduced<U>>) => ComputedRef<U>;
  // reduce(__, __, list)(f, acc)
  <U>(f: MaybeRef<(acc: U, elem: T) => U | Reduced<U>>, acc: MaybeWatchSource<U>): ComputedRef<U>;
};
// reduce(f, _, list)(acc)
export function useReduce<T, U>(f: MaybeRef<(acc: U, elem: T) => U | Reduced<U>>, __: Placeholder, list: MaybeRef<readonly T[]>): (acc: MaybeWatchSource<U>) => ComputedRef<U>;
// reduce(__, acc, list)(f)
export function useReduce<T, U>(__: Placeholder, acc: MaybeRef<U>, list: MaybeRef<readonly T[]>): (f: MaybeWatchSource<(acc: U, elem: T) => U | Reduced<U>>) => ComputedRef<U>;
// reduce(f, acc, list)
export function useReduce<T, U>(f: MaybeRef<(acc: U, elem: T) => U | Reduced<U>>, acc: MaybeRef<U>, list: MaybeWatchSource<readonly T[]>): ComputedRef<U>;





/**
 * Groups the elements of the list according to the result of calling
 * the String-returning function `keyFn` on each element and reduces the elements
 * of each group to a single value via the reducer function `valueFn`.
 * 
 * The value function receives two values: *(acc, value)*. It may use
 * [`R.reduced`](#reduced) to short circuit the iteration.
 * 
 * This function is basically a more general [`groupBy`](#groupBy) function.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * See also {@link groupBy}, {@link reduce}, {@link reduced}
 *
 * @example
 * ```typescript
 * const groupNames = (acc, {name}) => acc.concat(name)
 * const toGrade = ({score}) =>
 *   score < 65 ? 'F' :
 *   score < 70 ? 'D' :
 *   score < 80 ? 'C' :
 *   score < 90 ? 'B' : 'A'
 * 
 * var students = [
 *   {name: 'Abby', score: 83},
 *   {name: 'Bart', score: 62},
 *   {name: 'Curt', score: 88},
 *   {name: 'Dora', score: 92},
 * ]
 * 
 * reduceBy(groupNames, [], toGrade, students)
 * //=> {"A": ["Dora"], "B": ["Abby", "Curt"], "F": ["Bart"]}
 * ```
 */
export function useReduceBy<T, TResult>(
  valueFn: MaybeRef<(acc: TResult, elem: T) => TResult>,
): _.F.Curry<(a: MaybeRef<TResult>, b: MaybeRef<(elem: T) => string>, c: MaybeWatchSource<readonly T[]>) => ComputedRef<{ [index: string]: TResult }>>;
export function useReduceBy<T, TResult>(
  valueFn: MaybeRef<(acc: TResult, elem: T) => TResult>,
  acc: MaybeRef<TResult>,
): _.F.Curry<(a: MaybeRef<(elem: T) => string>, b: MaybeWatchSource<readonly T[]>) => ComputedRef<{ [index: string]: TResult }>>;
export function useReduceBy<T, TResult>(
  valueFn: MaybeRef<(acc: TResult, elem: T) => TResult>,
  acc: MaybeRef<TResult>,
  keyFn: MaybeRef<(elem: T) => string>,
): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<{ [index: string]: TResult }>;
export function useReduceBy<T, TResult>(
  valueFn: MaybeRef<(acc: TResult, elem: T) => TResult>,
  acc: MaybeRef<TResult>,
  keyFn: MaybeRef<(elem: T) => string>,
  list: MaybeWatchSource<readonly T[]>,
): ComputedRef<{ [index: string]: TResult }>;


/**
 * Returns a value wrapped to indicate that it is the final value of the reduce
 * and transduce functions. The returned value should be considered a black
 * box: the internal structure is not guaranteed to be stable.
 * 
 * This optimization is available to the below functions:
 * - [`reduce`](#reduce)
 * - [`reduceWhile`](#reduceWhile)
 * - [`reduceBy`](#reduceBy)
 * - [`reduceRight`](#reduceRight)
 * - [`transduce`](#transduce)
 *
 * See also {@link reduce}, {@link reduceWhile}, {@link reduceBy}, {@link reduceRight}, {@link transduce}
 *
 * @example
 * ```typescript
 * R.reduce(
 *  (acc, item) => item > 3 ? R.reduced(acc) : acc.concat(item),
 *  [],
 *  [1, 2, 3, 4, 5]) // [1, 2, 3]
 * ```
 */
export function useReduced<T>(elem: MaybeRef<T>): ComputedRef<Reduced<T>>;


/**
 * Returns a single item by iterating through the list, successively calling
 * the iterator function and passing it an accumulator value and the current
 * value from the array, and then passing the result to the next call.
 * 
 * Similar to [`reduce`](#reduce), except moves through the input list from the
 * right to the left.
 * 
 * The iterator function receives two values: *(value, acc)*, while the arguments'
 * order of `reduce`'s iterator function is *(acc, value)*. `reduceRight` may use [`reduced`](#reduced)
 * to short circuit the iteration.
 * 
 * Note: `R.reduceRight` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.reduceRight` method. For more details
 * on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight#Description
 * 
 * Be cautious of mutating and returning the accumulator. If you reuse it across
 * invocations, it will continue to accumulate onto the same value. The general
 * recommendation is to always return a new value. If you can't do so for
 * performance reasons, then be sure to reinitialize the accumulator on each
 * invocation.
 *
 * See also {@link reduce}, {@link addIndex}, {@link reduced}
 *
 * @example
 * ```typescript
 * R.reduceRight(R.subtract, 0, [1, 2, 3, 4]) // => (1 - (2 - (3 - (4 - 0)))) = -2
 * //    -               -2
 * //   / \              / \
 * //  1   -            1   3
 * //     / \              / \
 * //    2   -     ==>    2  -1
 * //       / \              / \
 * //      3   -            3   4
 * //         / \              / \
 * //        4   0            4   0
 * ```
 */
export function useReduceRight<T, TResult>(
  fn: MaybeRef<(elem: T, acc: TResult) => TResult>,
): (acc: MaybeRef<TResult>, list: MaybeWatchSource<readonly T[]>) => ComputedRef<TResult>;
export function useReduceRight<T, TResult>(
  fn: MaybeRef<(elem: T, acc: TResult) => TResult>,
  acc: MaybeRef<TResult>,
): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<TResult>;
export function useReduceRight<T, TResult>(
  fn: MaybeRef<(elem: T, acc: TResult) => TResult>,
  acc: MaybeRef<TResult>,
  list: MaybeWatchSource<readonly T[]>,
): ComputedRef<TResult>;


/**
 * Like [`reduce`](#reduce), `reduceWhile` returns a single item by iterating
 * through the list, successively calling the iterator function. `reduceWhile`
 * also takes a predicate that is evaluated before each step. If the predicate
 * returns `false`, it "short-circuits" the iteration and returns the current
 * value of the accumulator. `reduceWhile` may alternatively be short-circuited
 * via [`reduced`](#reduced).
 *
 * See also {@link reduce}, {@link reduced}
 *
 * @example
 * ```typescript
 * const isOdd = (acc, x) => x % 2 !== 0;
 * const xs = [1, 3, 5, 60, 777, 800];
 * R.reduceWhile(isOdd, R.add, 0, xs); //=> 9
 * 
 * const ys = [2, 4, 6]
 * R.reduceWhile(isOdd, R.add, 111, ys); //=> 111
 * ```
 */
export function useReduceWhile<T, TResult>(
  predicate: MaybeRef<(acc: TResult, elem: T) => boolean>,
): _.F.Curry<(a: MaybeRef<(acc: TResult, elem: T) => TResult>, b: MaybeRef<TResult>, c: MaybeWatchSource<readonly T[]>) => ComputedRef<TResult>>;
export function useReduceWhile<T, TResult>(
  predicate: MaybeRef<(acc: TResult, elem: T) => boolean>,
  fn: MaybeRef<(acc: TResult, elem: T) => TResult>,
): _.F.Curry<(a: MaybeRef<TResult>, b: MaybeWatchSource<readonly T[]>) => ComputedRef<TResult>>;
export function useReduceWhile<T, TResult>(
  predicate: MaybeRef<(acc: TResult, elem: T) => boolean>,
  fn: MaybeRef<(acc: TResult, elem: T) => TResult>,
  acc: MaybeRef<TResult>,
): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<TResult>;
export function useReduceWhile<T, TResult>(
  predicate: MaybeRef<(acc: TResult, elem: T) => boolean>,
  fn: MaybeRef<(acc: TResult, elem: T) => TResult>,
  acc: MaybeRef<TResult>,
  list: MaybeWatchSource<readonly T[]>,
): ComputedRef<TResult>;


/**
 * The complement of [`filter`](#filter).
 * 
 * Acts as a transducer if a transformer is given in list position. Filterable
 * objects include plain objects or any object that has a filter method such
 * as `Array`.
 *
 * See also {@link filter}, {@link transduce}, {@link addIndex}
 *
 * @example
 * ```typescript
 * const isOdd = (n) => n % 2 !== 0;
 * 
 * R.reject(isOdd, [1, 2, 3, 4]); //=> [2, 4]
 * 
 * R.reject(isOdd, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 * ```
 */
export function useReject<A, P extends A>(
  pred: MaybeRef<(val: A) => val is P>,
): {
  <B extends A>(list: MaybeWatchSource<readonly B[]>): ComputedRef<Array<Exclude<B, P>>>;
  <B extends A>(dict: MaybeWatchSource<Record<string, B>>): ComputedRef<Record<string, Exclude<B, P>>>;
};
export function useReject<T>(
  pred: MaybeRef<(value: T) => boolean>,
): <P extends T, C extends readonly P[] | Record<string, P>>(collection: MaybeWatchSource<C>) => ComputedRef<C>;
export function useReject<A, B extends A, P extends A>(
  pred: MaybeRef<(val: A) => val is P>,
  list: MaybeWatchSource<readonly B[]>,
): ComputedRef<Array<Exclude<B, P>>>;
export function useReject<A, B extends A, P extends A>(
  pred: MaybeRef<(val: A) => val is P>,
  dict: MaybeWatchSource<Record<string, B>>,
): ComputedRef<Record<string, Exclude<B, P>>>;
export function useReject<T, C extends readonly T[] | Record<string, T>>(pred: MaybeRef<(value: T) => boolean>, collection: MaybeWatchSource<C>): ComputedRef<C>;


/**
 * Removes the sub-list of `list` starting at index `start` and containing
 * `count` elements. _Note that this is not destructive_: it returns a copy of
 * the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * See also {@link without}
 *
 * @example
 * ```typescript
 * R.remove(2, 3, [1,2,3,4,5,6,7,8]); //=> [1,2,6,7,8]
 * ```
 */
export function useRemove<T>(start: MaybeWatchSource<number>): {
  (count: MaybeWatchSource<number>, list: MaybeWatchSource<readonly T[]>): ComputedRef<T[]>;
  (count: MaybeWatchSource<number>): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<T[]>;
};
export function useRemove<T>(start: MaybeWatchSource<number>, count: MaybeWatchSource<number>): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<T[]>;
export function useRemove<T>(start: MaybeWatchSource<number>, count: MaybeWatchSource<number>, list: MaybeWatchSource<readonly T[]>): ComputedRef<T[]>;


/**
 * Returns a fixed list of size `n` containing a specified identical value.
 *
 * See also {@link times}
 *
 * @example
 * ```typescript
 * R.repeat('hi', 5); //=> ['hi', 'hi', 'hi', 'hi', 'hi']
 * 
 * const obj = {};
 * const repeatedObjs = R.repeat(obj, 5); //=> [{}, {}, {}, {}, {}]
 * repeatedObjs[0] === repeatedObjs[1]; //=> true
 * ```
 */
export function useRepeat<T>(a: MaybeRef<T>): (n: MaybeWatchSource<number>) => ComputedRef<T[]>;
export function useRepeat<T>(a: MaybeRef<T>, n: MaybeWatchSource<number>): ComputedRef<T[]>;


/**
 * Replace a substring or regex match in a string with a replacement.
 * 
 * The first two parameters correspond to the parameters of the
 * `String.prototype.replace()` function, so the second parameter can also be a
 * function.
 *
 * @example
 * ```typescript
 * R.replace('foo', 'bar', 'foo foo foo'); //=> 'bar foo foo'
 * R.replace(/foo/, 'bar', 'foo foo foo'); //=> 'bar foo foo'
 * 
 * // Use the "g" (global) flag to replace all occurrences:
 * R.replace(/foo/g, 'bar', 'foo foo foo'); //=> 'bar bar bar'
 * ```
 */
export function useReplace(
  pattern: MaybeWatchSource<RegExp | string>,
): (replacement: MaybeWatchSource<string | ((match: string, ...args: readonly any[]) => string)>) => (str: MaybeWatchSource<string>) => ComputedRef<string>;
export function useReplace(
  pattern: MaybeWatchSource<RegExp | string>,
  replacement: MaybeWatchSource<string | ((match: string, ...args: readonly any[]) => string)>,
): (str: MaybeWatchSource<string>) => ComputedRef<string>;
export function useReplace(
  pattern: MaybeWatchSource<RegExp | string>,
  replacement: MaybeWatchSource<string | ((match: string, ...args: readonly any[]) => string)>,
  str: MaybeWatchSource<string>,
): ComputedRef<string>;


/**
 * Returns a new list or string with the elements or characters in reverse
 * order.
 *
 * @example
 * ```typescript
 * R.reverse([1, 2, 3]);  //=> [3, 2, 1]
 * R.reverse([1, 2]);     //=> [2, 1]
 * R.reverse([1]);        //=> [1]
 * R.reverse([]);         //=> []
 * 
 * R.reverse('abc');      //=> 'cba'
 * R.reverse('ab');       //=> 'ba'
 * R.reverse('a');        //=> 'a'
 * R.reverse('');         //=> ''
 * ```
 */
export function useReverse<T>(list: MaybeWatchSource<readonly T[]>): ComputedRef<T[]>;
export function useReverse(str: MaybeWatchSource<string>): ComputedRef<string>;


/**
 * Scan is similar to [`reduce`](#reduce), but returns a list of successively
 * reduced values from the left.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * See also {@link reduce}, {@link mapAccum}
 *
 * @example
 * ```typescript
 * const numbers = [1, 2, 3, 4];
 * const factorials = R.scan(R.multiply, 1, numbers); //=> [1, 1, 2, 6, 24]
 * ```
 */
export function useScan<T, TResult>(fn: MaybeRef<(acc: TResult, elem: T) => any>): {
  (acc: MaybeRef<TResult>): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<TResult[]>
  (acc: MaybeRef<TResult>, list: MaybeWatchSource<readonly T[]>): ComputedRef<TResult[]>
};
export function useScan<T, TResult>(fn: MaybeRef<(acc: TResult, elem: T) => any>, acc: MaybeRef<TResult>): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<TResult[]>;
export function useScan<T, TResult>(fn: MaybeRef<(acc: TResult, elem: T) => any>, acc: MaybeRef<TResult>, list: MaybeWatchSource<readonly T[]>): ComputedRef<TResult[]>;


/**
 * Returns the result of "setting" the portion of the given data structure
 * focused by the given lens to the given value.
 *
 * See also {@link view}, {@link over}, {@link lens}, {@link lensIndex}, {@link lensProp}, {@link lensPath}
 *
 * @example
 * ```typescript
 * const xLens = R.lensProp('x');
 * 
 * R.set(xLens, 4, {x: 1, y: 2});  //=> {x: 4, y: 2}
 * R.set(xLens, 8, {x: 1, y: 2});  //=> {x: 8, y: 2}
 * ```
 */
export function useSet<S, A>(lens: MaybeWatchSource<Lens<S, A>>): {
  (a: MaybeRef<A>): (obj: MaybeRef<S>) => ComputedRef<S>
  (a: MaybeRef<A>, obj: MaybeRef<S>): ComputedRef<S>
};
export function useSet<S, A>(lens: MaybeWatchSource<Lens<S, A>>, a: MaybeRef<A>): (obj: MaybeRef<S>) => ComputedRef<S>;
export function useSet<S, A>(lens: MaybeWatchSource<Lens<S, A>>, a: MaybeRef<A>, obj: MaybeRef<S>): ComputedRef<S>;


/**
 * Returns the elements of the given list or string (or object with a `slice`
 * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
 * 
 * Dispatches to the `slice` method of the third argument, if present.
 *
 * @example
 * ```typescript
 * R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
 * R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
 * R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
 * R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
 * R.slice(0, 3, 'ramda');                     //=> 'ram'
 * ```
 */
export function useSlice(a: MaybeWatchSource<number>): {
  <T>(b: MaybeWatchSource<number>, list: MaybeRef<readonly T[]>): ComputedRef<T[]>;
  (b: MaybeWatchSource<number>, list: MaybeRef<string>): ComputedRef<string>;
};
export function useSlice(
  a: MaybeWatchSource<number>,
  b: MaybeWatchSource<number>,
): {
  <T>(list: MaybeRef<readonly T[]>): ComputedRef<T[]>;
  (list: MaybeRef<string>): ComputedRef<string>;
};
export function useSlice(a: MaybeWatchSource<number>, b: MaybeWatchSource<number>, list: MaybeRef<string>): ComputedRef<string>;
export function useSlice<T>(a: MaybeWatchSource<number>, b: MaybeWatchSource<number>, list: MaybeRef<readonly T[]>): ComputedRef<T[]>;


/**
 * Returns a copy of the list, sorted according to the comparator function,
 * which should accept two values at a time and return a negative number if the
 * first value is smaller, a positive number if it's larger, and zero if they
 * are equal. Please note that this is a **copy** of the list. It does not
 * modify the original.
 *
 * See also {@link ascend}, {@link descend}
 *
 * @example
 * ```typescript
 * const diff = function(a, b) { return a - b; };
 * R.sort(diff, [4,2,7,5]); //=> [2, 4, 5, 7]
 * ```
 */
export function useSort<T>(fn: MaybeRef<(a: T, b: T) => number>): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<T[]>;
export function useSort<T>(fn: MaybeRef<(a: T, b: T) => number>, list: MaybeWatchSource<readonly T[]>): ComputedRef<T[]>;


/**
 * Sorts the list according to the supplied function.
 *
 * @example
 * ```typescript
 * const sortByFirstItem = R.sortBy(R.prop(0));
 * const pairs = [[-1, 1], [-2, 2], [-3, 3]];
 * sortByFirstItem(pairs); //=> [[-3, 3], [-2, 2], [-1, 1]]
 * 
 * const sortByNameCaseInsensitive = R.sortBy(R.compose(R.toLower, R.prop('name')));
 * const alice = {
 *   name: 'ALICE',
 *   age: 101
 * };
 * const bob = {
 *   name: 'Bob',
 *   age: -10
 * };
 * const clara = {
 *   name: 'clara',
 *   age: 314.159
 * };
 * const people = [clara, bob, alice];
 * sortByNameCaseInsensitive(people); //=> [alice, bob, clara]
 * ```
 */
export function useSortBy<T>(fn: MaybeRef<(a: T) => Ord>): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<T[]>;
export function useSortBy(fn: MaybeRef<(a: any) => Ord>): <T>(list: MaybeWatchSource<readonly T[]>) => ComputedRef<T[]>;
export function useSortBy<T>(fn: MaybeRef<(a: T) => Ord>, list: MaybeWatchSource<readonly T[]>): ComputedRef<T[]>;


/**
 * Sorts a list according to a list of comparators.
 *
 * See also {@link ascend}, {@link descend}
 *
 * @example
 * ```typescript
 * const alice = {
 *   name: 'alice',
 *   age: 40
 * };
 * const bob = {
 *   name: 'bob',
 *   age: 30
 * };
 * const clara = {
 *   name: 'clara',
 *   age: 40
 * };
 * const people = [clara, bob, alice];
 * const ageNameSort = R.sortWith([
 *   R.descend(R.prop('age')),
 *   R.ascend(R.prop('name'))
 * ]);
 * ageNameSort(people); //=> [alice, clara, bob]
 * ```
 */
export function useSortWith<T>(fns: MaybeWatchSource<Array<(a: T, b: T) => number>>): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<T[]>;
export function useSortWith<T>(fns: MaybeWatchSource<Array<(a: T, b: T) => number>>, list: MaybeWatchSource<readonly T[]>): ComputedRef<T[]>;


/**
 * Splits a string into an array of strings based on the given
 * separator.
 *
 * See also {@link join}
 *
 * @example
 * ```typescript
 * const pathComponents = R.split('/');
 * R.tail(pathComponents('/usr/local/bin/node')); //=> ['usr', 'local', 'bin', 'node']
 * 
 * R.split('.', 'a.b.c.xyz.d'); //=> ['a', 'b', 'c', 'xyz', 'd']
 * ```
 */
export function useSplit(sep: MaybeWatchSource<string | RegExp>): (str: MaybeWatchSource<string>) => ComputedRef<string[]>;
export function useSplit(sep: MaybeWatchSource<string | RegExp>, str: MaybeWatchSource<string>): ComputedRef<string[]>;


/**
 * Splits a given list or string at a given index.
 *
 * @example
 * ```typescript
 * R.splitAt(1, [1, 2, 3]);          //=> [[1], [2, 3]]
 * R.splitAt(5, 'hello world');      //=> ['hello', ' world']
 * R.splitAt(-1, 'foobar');          //=> ['fooba', 'r']
 * ```
 */
export function useSplitAt(index: MaybeWatchSource<number>): {
  <T>(list: MaybeWatchSource<readonly T[]>): ComputedRef<[T[], T[]]>;
  (list: MaybeWatchSource<string>): ComputedRef<[string, string]>;
};
export function useSplitAt<T>(index: MaybeWatchSource<number>, list: MaybeWatchSource<readonly T[]>): ComputedRef<[T[], T[]]>;
export function useSplitAt(index: MaybeWatchSource<number>, list: MaybeWatchSource<string>): ComputedRef<[string, string]>;


/**
 * Splits a collection into slices of the specified length.
 *
 * @example
 * ```typescript
 * R.splitEvery(3, [1, 2, 3, 4, 5, 6, 7]); //=> [[1, 2, 3], [4, 5, 6], [7]]
 * R.splitEvery(3, 'foobarbaz'); //=> ['foo', 'bar', 'baz']
 * ```
 */
export function useSplitEvery(a: MaybeWatchSource<number>): {
  (list: MaybeWatchSource<string>): ComputedRef<string[]>;
  <T>(list: MaybeWatchSource<readonly T[]>): ComputedRef<T[][]>;
};
export function useSplitEvery(a: MaybeWatchSource<number>, list: MaybeWatchSource<string>): ComputedRef<string[]>;
export function useSplitEvery<T>(a: MaybeWatchSource<number>, list: MaybeWatchSource<readonly T[]>): ComputedRef<T[][]>;


/**
 * Takes a list and a predicate and returns a pair of lists with the following properties:
 * 
 *  - the result of concatenating the two output lists is equivalent to the input list;
 *  - none of the elements of the first output list satisfies the predicate; and
 *  - if the second output list is non-empty, its first element satisfies the predicate.
 *
 * @example
 * ```typescript
 * R.splitWhen(R.equals(2), [1, 2, 3, 1, 2, 3]);   //=> [[1], [2, 3, 1, 2, 3]]
 * ```
 */
export function useSplitWhen<T>(pred: MaybeRef<(val: T) => boolean>): <U extends T>(list: MaybeWatchSource<readonly U[]>) => ComputedRef<[U[], U[]]>;
export function useSplitWhen<T>(pred: MaybeRef<(val: T) => boolean>, list: MaybeWatchSource<readonly T[]>): ComputedRef<[T[], T[]]>;


/**
 * Splits an array into slices on every occurrence of a value.
 *
 * @example
 * ```typescript
 * R.splitWhenever(R.equals(2), [1, 2, 3, 2, 4, 5, 2, 6, 7]); //=> [[1], [3], [4, 5], [6, 7]]
 * ```
 */
export function useSplitWhenever<T>(pred: MaybeRef<(a: T) => boolean>): <U extends T>(list: MaybeWatchSource<U[]>) => ComputedRef<U[][]>;
export function useSplitWhenever<T>(pred: MaybeRef<(a: T) => boolean>, list: MaybeWatchSource<T[]>): ComputedRef<T[][]>;


/**
 * Checks if a list starts with the provided sublist.
 * 
 * Similarly, checks if a string starts with the provided substring.
 *
 * See also {@link endsWith}
 *
 * @example
 * ```typescript
 * R.startsWith('a', 'abc')                //=> true
 * R.startsWith('b', 'abc')                //=> false
 * R.startsWith(['a'], ['a', 'b', 'c'])    //=> true
 * R.startsWith(['b'], ['a', 'b', 'c'])    //=> false
 * ```
 */
export function useStartsWith<T>(subList: MaybeRef<readonly T[]>): (list: MaybeRef<readonly T[]>) => ComputedRef<boolean>;
export function useStartsWith(substr: MaybeRef<string>): (str: MaybeRef<string>) => ComputedRef<boolean>;
export function useStartsWith<T>(subList: MaybeRef<readonly T[]>, list: MaybeRef<readonly T[]>): ComputedRef<boolean>;
export function useStartsWith(substr: MaybeRef<string>, str: MaybeRef<string>): ComputedRef<boolean>;


/**
 * Subtracts its second argument from its first argument.
 *
 * See also {@link add}
 *
 * @example
 * ```typescript
 * R.subtract(10, 8); //=> 2
 * 
 * const minus5 = R.subtract(R.__, 5);
 * minus5(17); //=> 12
 * 
 * const complementaryAngle = R.subtract(90);
 * complementaryAngle(30); //=> 60
 * complementaryAngle(72); //=> 18
 * ```
 */
export function useSubtract(a: MaybeWatchSource<number>): (b: MaybeWatchSource<number>) => ComputedRef<number>;
export function useSubtract(__: Placeholder, b: MaybeWatchSource<number>): (a: MaybeWatchSource<number>) => ComputedRef<number>;
export function useSubtract(a: MaybeWatchSource<number>, b: MaybeWatchSource<number>): ComputedRef<number>;


/**
 * Adds together all the elements of a list.
 *
 * See also {@link reduce}
 *
 * @example
 * ```typescript
 * R.sum([2,4,6,8,100,1]); //=> 121
 * ```
 */
export function useSum(list: MaybeWatchSource<readonly number[]>): ComputedRef<number>;


/**
 * Swap an item, at index `indexA` with another item, at index `indexB`, in an object or a list of elements.
 * A new result will be created containing the new elements order.
 *
 * @example
 * ```typescript
 * R.swap(0, 2, ['a', 'b', 'c', 'd', 'e', 'f']); //=> ['c', 'b', 'a', 'd', 'e', 'f']
 * R.swap(-1, 0, ['a', 'b', 'c', 'd', 'e', 'f']); //=> ['f', 'b', 'c', 'd', 'e', 'a'] list rotation
 * R.swap('a', 'b', {a: 1, b: 2}); //=> {a: 2, b: 2}
 * R.swap(0, 2, 'foo'); //=> 'oof'
 * ```
 */
export function useSwap(indexA: MaybeWatchSource<number>): {
  // swap(indexA)(indexB)(list)
  (indexB: MaybeWatchSource<number>): <T>(list: MaybeWatchSource<readonly T[]>) => ComputedRef<T[]>;
  // swap(indexA)(__, list)(indexB)
  <T>(__: Placeholder, list: MaybeWatchSource<readonly T[]>): (indexB: MaybeWatchSource<number>) => ComputedRef<T[]>;
  // swap(indexA)(indexB, list)
  <T>(indexB: MaybeWatchSource<number>, list: MaybeWatchSource<readonly T[]>): ComputedRef<T[]>;
};

// swap(__, indexB)
export function useSwap(
  __: Placeholder,
  indexB: MaybeWatchSource<number>
): {
  // swap(__, indexB)(indexA)(list)
  (indexA: MaybeWatchSource<number>): <T>(list: MaybeWatchSource<readonly T[]>) => ComputedRef<T[]>;
  // swap(__, indexB)(__, list)(indexA)
  <T>(__2: Placeholder, list: MaybeWatchSource<readonly T[]>): (indexA: MaybeWatchSource<number>) => ComputedRef<T[]>;
  // swap(__, indexB)(indexA, list)
  <T>(indexA: MaybeWatchSource<number>, list: MaybeWatchSource<readonly T[]>): ComputedRef<T[]>;
};

// swap(indexA, indexB)(list)
export function useSwap(indexA: MaybeWatchSource<number>, indexB: MaybeWatchSource<number>): <T>(list: MaybeWatchSource<readonly T[]>) => ComputedRef<T[]>;

// swap(__, __, list)
export function useSwap<T>(
  __: Placeholder,
  __2: Placeholder,
  list: MaybeWatchSource<readonly T[]>
): {
  // swap(__, __, list)(indexA)(indexB)
  (indexA: MaybeWatchSource<number>): (indexB: MaybeWatchSource<number>) => ComputedRef<T[]>;
  // swap(__, __, list)(__, indexB)(indexA)
  (__3: Placeholder, indexB: MaybeWatchSource<number>): (indexA: MaybeWatchSource<number>) => ComputedRef<T[]>;
  // swap(__, __, list)(indexA, indexB)
  (indexA: MaybeWatchSource<number>, indexB: MaybeWatchSource<number>): ComputedRef<T[]>;
};

// swap(indexA, __, list)(indexB)
export function useSwap<T>(
  indexA: MaybeWatchSource<number>,
  __: Placeholder,
  list: MaybeWatchSource<readonly T[]>
): (indexB: MaybeWatchSource<number>) => ComputedRef<T[]>;

// swap(__, indexB, list)(indexA)
export function useSwap<T>(
  __: Placeholder,
  indexB: MaybeWatchSource<number>,
  list: MaybeWatchSource<readonly T[]>
): (indexA: MaybeWatchSource<number>) => ComputedRef<T[]>;

// swap(indexA, indexB, list)
export function useSwap<T>(indexA: MaybeWatchSource<number>, indexB: MaybeWatchSource<number>, list: MaybeWatchSource<readonly T[]>): ComputedRef<T[]>;


/**
 * Finds the set (i.e. no duplicates) of all elements contained in the first or
 * second list, but not both.
 *
 * See also {@link symmetricDifferenceWith}, {@link difference}, {@link differenceWith}
 *
 * @example
 * ```typescript
 * R.symmetricDifference([1,2,3,4], [7,6,5,4,3]); //=> [1,2,7,6,5]
 * R.symmetricDifference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5,1,2]
 * ```
 */
export function useSymmetricDifference<T>(list: MaybeWatchSource<readonly T[]>): <T>(list: MaybeWatchSource<readonly T[]>) => ComputedRef<T[]>;
export function useSymmetricDifference<T>(list1: MaybeWatchSource<readonly T[]>, list2: MaybeWatchSource<readonly T[]>): ComputedRef<T[]>;


/**
 * Finds the set (i.e. no duplicates) of all elements contained in the first or
 * second list, but not both. Duplication is determined according to the value
 * returned by applying the supplied predicate to two list elements.
 *
 * See also {@link symmetricDifference}, {@link difference}, {@link differenceWith}
 *
 * @example
 * ```typescript
 * const eqA = R.eqBy(R.prop('a'));
 * const l1 = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];
 * const l2 = [{a: 3}, {a: 4}, {a: 5}, {a: 6}];
 * R.symmetricDifferenceWith(eqA, l1, l2); //=> [{a: 1}, {a: 2}, {a: 5}, {a: 6}]
 * ```
 */
export function useSymmetricDifferenceWith<T>(
  pred: MaybeRef<(a: T, b: T) => boolean>,
): _.F.Curry<(a: MaybeWatchSource<readonly T[]>, b: MaybeWatchSource<readonly T[]>) => ComputedRef<T[]>>;

export function useSymmetricDifferenceWith<T>(
  pred: MaybeRef<(a: T, b: T) => boolean>,
  list1: MaybeWatchSource<readonly T[]>,
  list2: MaybeWatchSource<readonly T[]>,
): ComputedRef<T[]>;


/**
 * Returns all but the first element of the given list or string (or object
 * with a `tail` method).
 * 
 * Dispatches to the `slice` method of the first argument, if present.
 *
 * See also {@link head}, {@link init}, {@link last}
 *
 * @example
 * ```typescript
 * R.tail([1, 2, 3]);  //=> [2, 3]
 * R.tail([1, 2]);     //=> [2]
 * R.tail([1]);        //=> []
 * R.tail([]);         //=> []
 * 
 * R.tail('abc');  //=> 'bc'
 * R.tail('ab');   //=> 'b'
 * R.tail('a');    //=> ''
 * R.tail('');     //=> ''
 * ```
 */
export function useTail(list: MaybeRef<string>): ComputedRef<string>;
// empty tuple - purposefully `never, They literally have no tail
export function useTail(list: MaybeRef<readonly []>): ComputedRef<never>;
// length=1 tuples also return `never`. They literally have no tail
export function useTail<T>(list: MaybeRef<readonly [T]>): ComputedRef<never>;
// non-empty tuples and array
// `infer Rest` only works on types like `readonly [1, '2', 3]` where you will get back `['2', 3]`
// else, if the type is `string[]`, you'll get back `string[]`
export function useTail<T extends readonly [...any]>(tuple: MaybeRef<T>): ComputedRef<T extends readonly [any, ...infer Rest] ? Rest : T>;


/**
 * Returns the first `n` elements of the given list, string, or
 * transducer/transformer (or object with a `take` method).
 * 
 * Dispatches to the `take` method of the second argument, if present.
 *
 * See also {@link drop}
 *
 * @example
 * ```typescript
 * R.take(1, ['foo', 'bar', 'baz']); //=> ['foo']
 * R.take(2, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
 * R.take(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 * R.take(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 * R.take(3, 'ramda');               //=> 'ram'
 * 
 * const personnel = [
 *   'Dave Brubeck',
 *   'Paul Desmond',
 *   'Eugene Wright',
 *   'Joe Morello',
 *   'Gerry Mulligan',
 *   'Bob Bates',
 *   'Joe Dodge',
 *   'Ron Crotty'
 * ];
 * 
 * const takeFive = R.take(5);
 * takeFive(personnel);
 * //=> ['Dave Brubeck', 'Paul Desmond', 'Eugene Wright', 'Joe Morello', 'Gerry Mulligan']
 * ```
 */
export function useTake(n: MaybeWatchSource<number>): {
  (xs: MaybeRef<string>): ComputedRef<string>;
  <T>(xs: MaybeRef<readonly T[]>): ComputedRef<T[]>;
};
export function useTake<T>(n: MaybeWatchSource<number>, xs: MaybeRef<readonly T[]>): ComputedRef<T[]>;
export function useTake(n: MaybeWatchSource<number>, xs: MaybeRef<string>): ComputedRef<string>;


/**
 * Returns a new list containing the last `n` elements of the given list.
 * If `n > list.length`, returns a list of `list.length` elements.
 *
 * See also {@link dropLast}
 *
 * @example
 * ```typescript
 * R.takeLast(1, ['foo', 'bar', 'baz']); //=> ['baz']
 * R.takeLast(2, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
 * R.takeLast(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 * R.takeLast(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 * R.takeLast(3, 'ramda');               //=> 'mda'
 * ```
 */
export function useTakeLast(n: MaybeWatchSource<number>): {
  (xs: MaybeWatchSource<string>): ComputedRef<string>;
  <T>(xs: MaybeWatchSource<readonly T[]>): ComputedRef<T[]>;
};
export function useTakeLast<T>(n: MaybeWatchSource<number>, xs: MaybeWatchSource<readonly T[]>): ComputedRef<T[]>;
export function useTakeLast(n: MaybeWatchSource<number>, xs: MaybeWatchSource<string>): ComputedRef<string>;



/**
 * Returns a new list containing the last `n` elements of a given list, passing
 * each value to the supplied predicate function, and terminating when the
 * predicate function returns `false`. Excludes the element that caused the
 * predicate function to fail. The predicate function is passed one argument:
 * *(value)*.
 *
 * See also {@link dropLastWhile}, {@link addIndex}
 *
 * @example
 * ```typescript
 * const isNotOne = x => x !== 1;
 * 
 * R.takeLastWhile(isNotOne, [1, 2, 3, 4]); //=> [2, 3, 4]
 * 
 * R.takeLastWhile(x => x !== 'R' , 'Ramda'); //=> 'amda'
 * ```
 */
export function useTakeLastWhile<T>(pred: MaybeRef<(a: T) => boolean>): <T>(list: MaybeWatchSource<readonly T[]>) => ComputedRef<T[]>;
export function useTakeLastWhile<T>(pred: MaybeRef<(a: T) => boolean>, list: MaybeWatchSource<readonly T[]>): ComputedRef<T[]>;


/**
 * Returns a new list containing the first `n` elements of a given list,
 * passing each value to the supplied predicate function, and terminating when
 * the predicate function returns `false`. Excludes the element that caused the
 * predicate function to fail. The predicate function is passed one argument:
 * *(value)*.
 * 
 * Dispatches to the `takeWhile` method of the second argument, if present.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * See also {@link dropWhile}, {@link transduce}, {@link addIndex}
 *
 * @example
 * ```typescript
 * const isNotFour = x => x !== 4;
 * 
 * R.takeWhile(isNotFour, [1, 2, 3, 4, 3, 2, 1]); //=> [1, 2, 3]
 * 
 * R.takeWhile(x => x !== 'd' , 'Ramda'); //=> 'Ram'
 * ```
 */
export function useTakeWhile<T>(fn: MaybeRef<(x: T) => boolean>): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<T[]>;
export function useTakeWhile<T>(fn: MaybeRef<(x: T) => boolean>, list: MaybeWatchSource<readonly T[]>): ComputedRef<T[]>;


/**
 * Runs the given function with the supplied object, then returns the object.
 * 
 * Acts as a transducer if a transformer is given as second parameter.
 *
 * @example
 * ```typescript
 * const sayX = x => console.log('x is ' + x);
 * R.tap(sayX, 100); //=> 100
 * // logs 'x is 100'
 * ```
 */
export function useTap<T, R extends T = T>(fn: MaybeRef<(a: T) => asserts a is R>): (value: MaybeRef<T>) => ComputedRef<R>;
export function useTap<T>(fn: MaybeRef<(a: T) => void>): (value: MaybeRef<T>) => ComputedRef<T>;
export function useTap<T, R extends T = T>(fn: MaybeRef<(a: T) => asserts a is R>, value: MaybeRef<T>): ComputedRef<R>;
export function useTap<T>(fn: MaybeRef<(a: T) => void>, value: MaybeRef<T>): ComputedRef<T>;


/**
 * Determines whether a given string matches a given regular expression.
 *
 * See also {@link match}
 *
 * @example
 * ```typescript
 * R.test(/^x/, 'xyz'); //=> true
 * R.test(/^y/, 'xyz'); //=> false
 * ```
 */
export function useTest(regexp: MaybeWatchSource<RegExp>): (str: MaybeWatchSource<string>) => ComputedRef<boolean>;
export function useTest(regexp: MaybeWatchSource<RegExp>, str: MaybeWatchSource<string>): ComputedRef<boolean>;


/**
 * Creates a thunk out of a function. A thunk delays a calculation until
 * its result is needed, providing lazy evaluation of arguments.
 *
 * See also {@link partial}, {@link partialRight}
 *
 * @example
 * ```typescript
 * R.thunkify(R.identity)(42)(); //=> 42
 * R.thunkify((a, b) => a + b)(25, 17)(); //=> 42
 * ```
 */
export function useThunkify<F extends (...args: readonly any[]) => any>(
  fn: MaybeRef<F>,
): ComputedRef<_.F.Curry<(...args: Parameters<F>) => () => ReturnType<F>>>;


/**
 * Calls an input function `n` times, returning an array containing the results
 * of those function calls.
 * 
 * `fn` is passed one argument: The current value of `n`, which begins at `0`
 * and is gradually incremented to `n - 1`.
 *
 * See also {@link repeat}
 *
 * @example
 * ```typescript
 * R.times(R.identity, 5); //=> [0, 1, 2, 3, 4]
 * ```
 */
export function useTimes<T>(fn: MaybeRef<(i: number) => T>): (n: MaybeWatchSource<number>) => ComputedRef<T[]>;
export function useTimes<T>(fn: MaybeRef<(i: number) => T>, n: MaybeWatchSource<number>): ComputedRef<T[]>;


/**
 * The lower case version of a string.
 *
 * See also {@link toUpper}
 *
 * @example
 * ```typescript
 * R.toLower('XYZ'); //=> 'xyz'
 * ```
 */
export function useToLower<S extends string>(str: MaybeWatchSource<S>): ComputedRef<Lowercase<S>>;
export function useToLower(str: MaybeWatchSource<string>): ComputedRef<string>;


/**
 * Converts an object into an array of key, value arrays. Only the object's
 * own properties are used.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * See also {@link fromPairs}, {@link keys}, {@link values}
 *
 * @example
 * ```typescript
 * R.toPairs({a: 1, b: 2, c: 3}); //=> [['a', 1], ['b', 2], ['c', 3]]
 * ```
 */
export function useToPairs<O extends object, K extends Extract<keyof O, string | number>>(
  obj: MaybeWatchSource<O>,
): ComputedRef<Array<{ [key in K]: [`${key}`, O[key]] }[K]>>;
export function useToPairs<S>(obj: MaybeWatchSource<Record<string | number, S>>): ComputedRef<Array<[string, S]>>;


/**
 * Converts an object into an array of key, value arrays. The object's own
 * properties and prototype properties are used. Note that the order of the
 * output array is not guaranteed to be consistent across different JS
 * platforms.
 *
 * @example
 * ```typescript
 * const F = function() { this.x = 'X'; };
 * F.prototype.y = 'Y';
 * const f = new F();
 * R.toPairsIn(f); //=> [['x','X'], ['y','Y']]
 * ```
 */
export function useToPairsIn<O extends object, K extends Extract<keyof O, string | number>>(
  obj: MaybeWatchSource<O>,
): ComputedRef<Array<{ [key in K]: [`${key}`, O[key]] }[K]>>;
export function useToPairsIn<S>(obj: MaybeWatchSource<Record<string | number, S>>): ComputedRef<Array<[string, S]>>;


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
 *     function Point(x, y) {
 *       this.x = x;
 *       this.y = y;
 *     }
 * 
 *     Point.prototype.toString = function() {
 *       return 'new Point(' + this.x + ', ' + this.y + ')';
 *     };
 * 
 *     R.toString(new Point(1, 2)); //=> 'new Point(1, 2)'
 *
 * @example
 * ```typescript
 * R.toString(42); //=> '42'
 * R.toString('abc'); //=> '"abc"'
 * R.toString([1, 2, 3]); //=> '[1, 2, 3]'
 * R.toString({foo: 1, bar: 2, baz: 3}); //=> '{"bar": 2, "baz": 3, "foo": 1}'
 * R.toString(new Date('2001-02-03T04:05:06Z')); //=> 'new Date("2001-02-03T04:05:06.000Z")'
 * ```
 */
export function useToString(val: MaybeRef<unknown>): ComputedRef<string>;


/**
 * The upper case version of a string.
 *
 * See also {@link toLower}
 *
 * @example
 * ```typescript
 * R.toUpper('abc'); //=> 'ABC'
 * ```
 */
export function useToUpper<S extends string = string>(str: MaybeWatchSource<S>): ComputedRef<Uppercase<S>>;
export function useToUpper(str: MaybeWatchSource<string>): ComputedRef<string>;


/**
 * Initializes a transducer using supplied iterator function. Returns a single
 * item by iterating through the list, successively calling the transformed
 * iterator function and passing it an accumulator value and the current value
 * from the array, and then passing the result to the next call.
 * 
 * The iterator function receives two values: *(acc, value)*. It will be
 * wrapped as a transformer to initialize the transducer. A transformer can be
 * passed directly in place of an iterator function. In both cases, iteration
 * may be stopped early with the [`R.reduced`](#reduced) function.
 * 
 * A transducer is a function that accepts a transformer and returns a
 * transformer and can be composed directly.
 * 
 * A transformer is an object that provides a 2-arity reducing iterator
 * function, step, 0-arity initial value function, init, and 1-arity result
 * extraction function, result. The step function is used as the iterator
 * function in reduce. The result function is used to convert the final
 * accumulator into the return type and in most cases is
 * [`R.identity`](#identity). The init function can be used to provide an
 * initial accumulator, but is ignored by transduce.
 * 
 * The iteration is performed with [`R.reduce`](#reduce) after initializing the transducer.
 *
 * See also {@link reduce}, {@link reduced}, {@link into}
 *
 * @example
 * ```typescript
 * const numbers = [1, 2, 3, 4];
 * const transducer = R.compose(R.map(R.add(1)), R.take(2));
 * R.transduce(transducer, R.flip(R.append), [], numbers); //=> [2, 3]
 * 
 * const isOdd = (x) => x % 2 !== 0;
 * const firstOddTransducer = R.compose(R.filter(isOdd), R.take(1));
 * R.transduce(firstOddTransducer, R.flip(R.append), [], R.range(0, 100)); //=> [1]
 * ```
 */
export function useTransduce<T, U, V>(
  xf: MaybeRef<(arg: readonly T[]) => U[]>,
  fn: MaybeRef<(acc: V, val: U) => V>,
  acc: MaybeRef<V>,
  list: MaybeWatchSource<readonly T[]>,
): ComputedRef<V>;
export function useTransduce<T, U, V>(
  xf: MaybeRef<(arg: readonly T[]) => U[]>,
): (fn: MaybeRef<(acc: V, val: U) => V>, acc: MaybeRef<V>, list: MaybeWatchSource<readonly T[]>) => ComputedRef<V>;
export function useTransduce<T, U, V>(
  xf: MaybeRef<(arg: readonly T[]) => U[]>,
  fn: MaybeRef<(acc: V, val: U) => V>,
): (acc: MaybeRef<readonly T[]>, list: MaybeWatchSource<readonly T[]>) => ComputedRef<V>;
export function useTransduce<T, U, V>(
  xf: MaybeRef<(arg: readonly T[]) => U[]>,
  fn: MaybeRef<(acc: V, val: U) => V>,
  acc: MaybeRef<readonly T[]>,
): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<V>;


/**
 * Transposes the rows and columns of a 2D list.
 * When passed a list of `n` lists of length `x`,
 * returns a list of `x` lists of length `n`.
 *
 * @example
 * ```typescript
 * R.transpose([[1, 'a'], [2, 'b'], [3, 'c']]) //=> [[1, 2, 3], ['a', 'b', 'c']]
 * R.transpose([[1, 2, 3], ['a', 'b', 'c']]) //=> [[1, 'a'], [2, 'b'], [3, 'c']]
 * 
 * // If some of the rows are shorter than the following rows, their elements are skipped:
 * R.transpose([[10, 11], [20], [], [30, 31, 32]]) //=> [[10, 20, 30], [11, 31], [32]]
 * ```
 */
export function useTranspose<T>(list: MaybeWatchSource<readonly T[][]>): ComputedRef<T[][]>;


/**
 * Maps an [Applicative](https://github.com/fantasyland/fantasy-land#applicative)-returning
 * function over a [Traversable](https://github.com/fantasyland/fantasy-land#traversable),
 * then uses [`sequence`](#sequence) to transform the resulting Traversable of Applicative
 * into an Applicative of Traversable.
 * 
 * Dispatches to the `traverse` method of the third argument, if present.
 *
 * See also {@link sequence}
 *
 * @example
 * ```typescript
 * // Returns `Maybe.Nothing` if the given divisor is `0`
 * const safeDiv = n => d => d === 0 ? Maybe.Nothing() : Maybe.Just(n / d)
 * 
 * R.traverse(Maybe.of, safeDiv(10), [2, 4, 5]); //=> Maybe.Just([5, 2.5, 2])
 * R.traverse(Maybe.of, safeDiv(10), [2, 0, 5]); //=> Maybe.Nothing
 * 
 * // Using a Type Representative
 * R.traverse(Maybe, safeDiv(10), Right(4)); //=> Just(Right(2.5))
 * R.traverse(Maybe, safeDiv(10), Right(0)); //=> Nothing
 * R.traverse(Maybe, safeDiv(10), Left("X")); //=> Just(Left("X"))
 * ```
 */
export function useTraverse<A, B>(of: MaybeRef<(a: B) => B[]>): {
  (fn: MaybeRef<(t: A) => B[]>): (list: MaybeRef<readonly A[]>) => ComputedRef<B[][]>
  (fn: MaybeRef<(t: A) => B[]>, list: MaybeRef<readonly A[]>): ComputedRef<B[][]>
};
export function useTraverse<A, B>(of: MaybeRef<(a: B) => B[]>, fn: MaybeRef<(t: A) => B[]>): (list: MaybeRef<readonly A[]>) => ComputedRef<B[][]>;
export function useTraverse<A, B>(of: MaybeRef<(a: B) => B[]>, fn: MaybeRef<(t: A) => B[]>, list: MaybeRef<readonly A[]>): ComputedRef<B[][]>;


/**
 * Removes (strips) whitespace from both ends of the string.
 *
 * @example
 * ```typescript
 * R.trim('   xyz  '); //=> 'xyz'
 * R.map(R.trim, R.split(',', 'x, y, z')); //=> ['x', 'y', 'z']
 * ```
 */
export function useTrim(str: MaybeWatchSource<string>): ComputedRef<string>;


/**
 * `tryCatch` takes two functions, a `tryer` and a `catcher`. The returned
 * function evaluates the `tryer`; if it does not throw, it simply returns the
 * result. If the `tryer` *does* throw, the returned function evaluates the
 * `catcher` function and returns its result. Note that for effective
 * composition with this function, both the `tryer` and `catcher` functions
 * must return the same type of results.
 *
 * @example
 * ```typescript
 * R.tryCatch(R.prop('x'), R.F)({x: true}); //=> true
 * R.tryCatch(() => { throw 'foo'}, R.always('caught'))('bar') // =>
 * 'caught'
 * R.tryCatch(R.times(R.identity), R.always([]))('s') // => []
 * R.tryCatch(() => { throw 'this is not a valid value'}, (err, value)=>({error : err,  value }))('bar') // => {'error': 'this is not a valid value', 'value': 'bar'}
 * ```
 */
export function useTryCatch<F extends (...args: readonly any[]) => any>(
  tryer: MaybeRef<F>,
): <RE = ReturnType<F>, E = unknown>(catcher: MaybeRef<(error: E, ...args: _.F.Parameters<F>) => RE>) => ComputedRef<F | (() => RE)>;
export function useTryCatch<F extends (...args: readonly any[]) => any, RE = ReturnType<F>, E = unknown>(
  tryer: MaybeRef<F>,
  catcher: MaybeRef<(error: E, ...args: _.F.Parameters<F>) => RE>,
): ComputedRef<F | (() => RE)>;


/**
 * Gives a single-word string description of the (native) type of a value,
 * returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not
 * attempt to distinguish user Object types any further, reporting them all as
 * 'Object'.
 *
 * @example
 * ```typescript
 * R.type({}); //=> "Object"
 * R.type(1); //=> "Number"
 * R.type(false); //=> "Boolean"
 * R.type('s'); //=> "String"
 * R.type(null); //=> "Null"
 * R.type([]); //=> "Array"
 * R.type(/[A-z]/); //=> "RegExp"
 * R.type(() => {}); //=> "Function"
 * R.type(undefined); //=> "Undefined"
 * ```
 */
export function useType(
  val: MaybeRef<any>,
): ComputedRef<| 'Object'
| 'Number'
| 'Boolean'
| 'String'
| 'Null'
| 'Array'
| 'RegExp'
| 'Function'
| 'Undefined'
| 'Symbol'
| 'Error'
| 'Date'>;


/**
 * Takes a function `fn`, which takes a single array argument, and returns a
 * function which:
 * 
 *   - takes any number of positional arguments;
 *   - passes these arguments to `fn` as an array; and
 *   - returns the result.
 * 
 * In other words, `R.unapply` derives a variadic function from a function which
 * takes an array. `R.unapply` is the inverse of [`R.apply`](#apply).
 *
 * See also {@link apply}
 *
 * @example
 * ```typescript
 * R.unapply(JSON.stringify)(1, 2, 3); //=> '[1,2,3]'
 * ```
 */
export function useUnapply<T>(fn: MaybeRef<(args: readonly any[]) => T>): ComputedRef<(...args: readonly any[]) => T>;


/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly 1 parameter. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * See also {@link binary}, {@link nAry}
 *
 * @example
 * ```typescript
 * const takesTwoArgs = function(a, b) {
 *   return [a, b];
 * };
 * takesTwoArgs.length; //=> 2
 * takesTwoArgs(1, 2); //=> [1, 2]
 * 
 * const takesOneArg = R.unary(takesTwoArgs);
 * takesOneArg.length; //=> 1
 * // Only 1 argument is passed to the wrapped function
 * takesOneArg(1, 2); //=> [1, undefined]
 * ```
 */
export function useUnary<T, R>(fn: MaybeRef<(a: T, ...args: readonly any[]) => R>): ComputedRef<(a: T) => R>;


/**
 * Returns a function of arity `n` from a (manually) curried function.
 * Note that, the returned function is actually a ramda style
 * curryied function, which can accept one or more arguments in each
 * function calling.
 *
 * See also {@link curry}, {@link curryN}
 *
 * @example
 * ```typescript
 * const addFour = a => b => c => d => a + b + c + d;
 * 
 * const uncurriedAddFour = R.uncurryN(4, addFour);
 * uncurriedAddFour(1, 2, 3, 4); //=> 10
 * ```
 */
export function useUncurryN<T>(len: MaybeWatchSource<number>): (fn: MaybeRef<(a: any) => any>) => ComputedRef<(...args: unknown[]) => T>;
export function useUncurryN<T>(len: MaybeWatchSource<number>, fn: MaybeRef<(a: any) => any>): ComputedRef<(...args: unknown[]) => T>;


/**
 * Builds a list from a seed value. Accepts an iterator function, which returns
 * either false to stop iteration or an array of length 2 containing the value
 * to add to the resulting list and the seed to be used in the next call to the
 * iterator function.
 * 
 * The iterator function receives one argument: *(seed)*.
 *
 * @example
 * ```typescript
 * const f = n => n > 50 ? false : [-n, n + 10];
 * R.unfold(f, 10); //=> [-10, -20, -30, -40, -50]
 * ```
 */
export function useUnfold<T, TResult>(fn: MaybeRef<(seed: T) => [TResult, T] | false>): (seed: MaybeRef<T>) => ComputedRef<TResult[]>;
export function useUnfold<T, TResult>(fn: MaybeRef<(seed: T) => [TResult, T] | false>, seed: MaybeRef<T>): ComputedRef<TResult[]>;


/**
 * Combines two lists into a set (i.e. no duplicates) composed of the elements
 * of each list.
 *
 * @example
 * ```typescript
 * R.union([1, 2, 3], [2, 3, 4]); //=> [1, 2, 3, 4]
 * ```
 */
export function useUnion<T>(as: MaybeWatchSource<readonly T[]>): (bs: MaybeWatchSource<readonly T[]>) => ComputedRef<T[]>;
export function useUnion<T>(as: MaybeWatchSource<readonly T[]>, bs: MaybeWatchSource<readonly T[]>): ComputedRef<T[]>;


/**
 * Combines two lists into a set (i.e. no duplicates) composed of the elements
 * of each list. Duplication is determined according to the value returned by
 * applying the supplied predicate to two list elements. If an element exists
 * in both lists, the first element from the first list will be used.
 *
 * See also {@link union}
 *
 * @example
 * ```typescript
 * const l1 = [{a: 1}, {a: 2}];
 * const l2 = [{a: 1}, {a: 4}];
 * R.unionWith(R.eqBy(R.prop('a')), l1, l2); //=> [{a: 1}, {a: 2}, {a: 4}]
 * ```
 */
export function useUnionWith<T>(pred: MaybeRef<(a: T, b: T) => boolean>): _.F.Curry<(a: MaybeWatchSource<readonly T[]>, b: MaybeWatchSource<readonly T[]>) => ComputedRef<T[]>>;
export function useUnionWith<T>(pred: MaybeRef<(a: T, b: T) => boolean>, list1: MaybeWatchSource<readonly T[]>, list2: MaybeWatchSource<readonly T[]>): ComputedRef<T[]>;


/**
 * Returns a new list containing only one copy of each element in the original
 * list. [`R.equals`](#equals) is used to determine equality.
 *
 * @example
 * ```typescript
 * R.uniq([1, 1, 2, 1]); //=> [1, 2]
 * R.uniq([1, '1']);     //=> [1, '1']
 * R.uniq([[42], [42]]); //=> [[42]]
 * ```
 */
export function useUniq<T>(list: MaybeWatchSource<readonly T[]>): ComputedRef<T[]>;


/**
 * Returns a new list containing only one copy of each element in the original
 * list, based upon the value returned by applying the supplied function to
 * each list element. Prefers the first item if the supplied function produces
 * the same value on two items. [`R.equals`](#equals) is used for comparison.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @example
 * ```typescript
 * R.uniqBy(Math.abs, [-1, -5, 2, 10, 1, 2]); //=> [-1, -5, 2, 10]
 * ```
 */
export function useUniqBy<T, U>(fn: MaybeRef<(a: T) => U>): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<T[]>;
export function useUniqBy<T, U>(fn: MaybeRef<(a: T) => U>, list: MaybeWatchSource<readonly T[]>): ComputedRef<T[]>;


/**
 * Returns a new list containing only one copy of each element in the original
 * list, based upon the value returned by applying the supplied predicate to
 * two list elements. Prefers the first item if two items compare equal based
 * on the predicate.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * @example
 * ```typescript
 * const strEq = R.eqBy(String);
 * R.uniqWith(strEq)([1, '1', 2, 1]); //=> [1, 2]
 * R.uniqWith(strEq)([{}, {}]);       //=> [{}]
 * R.uniqWith(strEq)([1, '1', 1]);    //=> [1]
 * R.uniqWith(strEq)(['1', 1, 1]);    //=> ['1']
 * ```
 */
export function useUniqWith<T>(pred: MaybeRef<(x: T, y: T) => boolean>): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<T[]>;
export function useUniqWith<T>(pred: MaybeRef<(x: T, y: T) => boolean>, list: MaybeWatchSource<readonly T[]>): ComputedRef<T[]>;



/**
 * Tests the final argument by passing it to the given predicate function. If
 * the predicate is not satisfied, the function will return the result of
 * calling the `whenFalseFn` function with the same argument. If the predicate
 * is satisfied, the argument is returned as is.
 *
 * See also {@link ifElse}, {@link when}, {@link cond}
 *
 * @example
 * ```typescript
 * let safeInc = R.unless(R.isNil, R.inc);
 * safeInc(null); //=> null
 * safeInc(1); //=> 2
 * ```
 */
export function useUnless<T, U>(pred: MaybeRef<(a: T) => boolean>, whenFalseFn: MaybeRef<(a: T) => U>): (a: MaybeRef<T>) => ComputedRef<T | U>;
export function useUnless<T, U>(pred: MaybeRef<(a: T) => boolean>, whenFalseFn: MaybeRef<(a: T) => U>, a: MaybeRef<T>): ComputedRef<T | U>;


/**
 * Shorthand for `R.chain(R.identity)`, which removes one level of nesting from
 * any [Chain](https://github.com/fantasyland/fantasy-land#chain).
 *
 * See also {@link flatten}, {@link chain}
 *
 * @example
 * ```typescript
 * R.unnest([1, [2], [[3]]]); //=> [1, 2, [3]]
 * R.unnest([[1, 2], [3, 4], [5, 6]]); //=> [1, 2, 3, 4, 5, 6]
 * ```
 */
export function useUnnest<T extends readonly any[]>(list: MaybeRef<T>): ComputedRef<_.T.UnNest<T>>;


/**
 * Takes a predicate, a transformation function, and an initial value,
 * and returns a value of the same type as the initial value.
 * It does so by applying the transformation until the predicate is satisfied,
 * at which point it returns the satisfactory value.
 *
 * @example
 * ```typescript
 * R.until(R.gt(R.__, 100), R.multiply(2))(1) // => 128
 * ```
 */
export function useUntil<T, U>(pred: MaybeRef<(val: T) => boolean>, fn: MaybeRef<(val: T) => U>): (init: MaybeRef<U>) => ComputedRef<U>;
export function useUntil<T, U>(pred: MaybeRef<(val: T) => boolean>, fn: MaybeRef<(val: T) => U>, init: MaybeRef<U>): ComputedRef<U>;


/**
 * Returns a new copy of the array with the element at the provided index
 * replaced with the given value.
 *
 * See also {@link adjust}
 *
 * @example
 * ```typescript
 * R.update(1, '_', ['a', 'b', 'c']);      //=> ['a', '_', 'c']
 * R.update(-1, '_', ['a', 'b', 'c']);     //=> ['a', 'b', '_']
 * ```
 */
export function useUpdate<T>(index: MaybeWatchSource<number>, value: MaybeRef<T>): (list: MaybeWatchSource<readonly T[]>) => ComputedRef<T[]>;
export function useUpdate<T>(index: MaybeWatchSource<number>, value: MaybeRef<T>, list: MaybeWatchSource<readonly T[]>): ComputedRef<T[]>;


/**
 * Accepts a function `fn` and a list of transformer functions and returns a
 * new curried function. When the new function is invoked, it calls the
 * function `fn` with parameters consisting of the result of calling each
 * supplied handler on successive arguments to the new function.
 * 
 * If more arguments are passed to the returned function than transformer
 * functions, those arguments are passed directly to `fn` as additional
 * parameters. If you expect additional arguments that don't need to be
 * transformed, although you can ignore them, it's best to pass an identity
 * function so that the new function reports the correct arity.
 *
 * See also {@link converge}
 *
 * @example
 * ```typescript
 * R.useWith(Math.pow, [R.identity, R.identity])(3, 4); //=> 81
 * R.useWith(Math.pow, [R.identity, R.identity])(3)(4); //=> 81
 * R.useWith(Math.pow, [R.dec, R.inc])(3, 4); //=> 32
 * R.useWith(Math.pow, [R.dec, R.inc])(3)(4); //=> 32
 * ```
 */
export function useUseWith<
  TArg1,
  TR1,
  TArg2,
  TR2,
  TArg3,
  TR3,
  TArg4,
  TR4,
  TArg5,
  TR5,
  TArg6,
  TR6,
  TArg7,
  TR7,
  TResult,
  RestFunctions extends Array<(...args: any[]) => any>,
  TArgs extends [TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, ...InputTypesOfFns<RestFunctions>]
>(
  fn: MaybeRef<(...args: [TR1, TR2, TR3, TR4, TR5, TR6, TR7, ...ReturnTypesOfFns<RestFunctions>]) => TResult>,
  transformers: MaybeWatchSource<[
    (arg: TArg1) => TR1,
    (arg: TArg2) => TR2,
    (arg: TArg3) => TR3,
    (arg: TArg4) => TR4,
    (arg: TArg5) => TR5,
    (arg: TArg6) => TR6,
    (arg: TArg7) => TR7,
    ...RestFunctions
  ]>,
): ComputedRef<(...args: TArgs) => TResult>;
export function useUseWith<TArg1, TR1, TArg2, TR2, TArg3, TR3, TArg4, TR4, TArg5, TR5, TArg6, TR6, TArg7, TR7, TResult>(
  fn: MaybeRef<(...args: [TR1, TR2, TR3, TR4, TR5, TR6, TR7] & { length: 7 }) => TResult>,
  transformers: MaybeWatchSource<[
    (arg: TArg1) => TR1,
    (arg: TArg2) => TR2,
    (arg: TArg3) => TR3,
    (arg: TArg4) => TR4,
    (arg: TArg5) => TR5,
    (arg: TArg6) => TR6,
    (arg: TArg7) => TR7
  ]>,
): ComputedRef<(...args: [TArg1, TArg2, TArg3, TArg4, TArg5, TArg7]) => TResult>;
export function useUseWith<TArg1, TR1, TArg2, TR2, TArg3, TR3, TArg4, TR4, TArg5, TR5, TArg6, TR6, TResult>(
  fn: MaybeRef<(...args: [TR1, TR2, TR3, TR4, TR5, TR6] & { length: 6 }) => TResult>,
  transformers: MaybeWatchSource<[
    (arg: TArg1) => TR1,
    (arg: TArg2) => TR2,
    (arg: TArg3) => TR3,
    (arg: TArg4) => TR4,
    (arg: TArg5) => TR5,
    (arg: TArg6) => TR6
  ]>,
): ComputedRef<(...args: [TArg1, TArg2, TArg3, TArg4, TArg5, TArg6]) => TResult>;
export function useUseWith<TArg1, TR1, TArg2, TR2, TArg3, TR3, TArg4, TR4, TArg5, TR5, TResult>(
  fn: MaybeRef<(...args: [TR1, TR2, TR3, TR4, TR5] & { length: 5 }) => TResult>,
  transformers: MaybeWatchSource<[
    (arg: TArg1) => TR1,
    (arg: TArg2) => TR2,
    (arg: TArg3) => TR3,
    (arg: TArg4) => TR4,
    (arg: TArg5) => TR5
  ]>,
): ComputedRef<(...args: [TArg1, TArg2, TArg3, TArg4, TArg5]) => TResult>;
export function useUseWith<TArg1, TR1, TArg2, TR2, TArg3, TR3, TArg4, TR4, TResult>(
  fn: MaybeRef<(...args: [TR1, TR2, TR3, TR4] & { length: 4 }) => TResult>,
  transformers: MaybeWatchSource<[(arg: TArg1) => TR1, (arg: TArg2) => TR2, (arg: TArg3) => TR3, (arg: TArg4) => TR4]>,
): ComputedRef<(...args: [TArg1, TArg2, TArg3, TArg4]) => TResult>;
export function useUseWith<TArg1, TR1, TArg2, TR2, TArg3, TR3, TResult>(
  fn: MaybeRef<(...args: [TR1, TR2, TR3] & { length: 3 }) => TResult>,
  transformers: MaybeWatchSource<[(arg: TArg1) => TR1, (arg: TArg2) => TR2, (arg: TArg3) => TR3]>,
): ComputedRef<(...args: [TArg1, TArg2, TArg3]) => TResult>;
export function useUseWith<TArg1, TR1, TArg2, TR2, TResult>(
  fn: MaybeRef<(...args: [TR1, TR2] & { length: 2 }) => TResult>,
  transformers: MaybeWatchSource<[(arg: TArg1) => TR1, (arg: TArg2) => TR2]>,
): ComputedRef<(...args: [TArg1, TArg2]) => TResult>;
export function useUseWith<TArg1, TR1, TResult>(
  fn: MaybeRef<(...args: [TR1]) => TResult>,
  transformers: MaybeWatchSource<[(arg: TArg1) => TR1]>,
): ComputedRef<(...args: [TArg1]) => TResult>;


/**
 * Returns a list of all the enumerable own properties of the supplied object.
 * Note that the order of the output array is not guaranteed across different
 * JS platforms.
 *
 * See also {@link valuesIn}, {@link keys}, {@link toPairs}
 *
 * @example
 * ```typescript
 * R.values({a: 1, b: 2, c: 3}); //=> [1, 2, 3]
 * ```
 */
export function useValues<T extends object, K extends keyof T>(obj: MaybeWatchSource<T>): ComputedRef<Array<T[K] | ValueOfUnion<T>>>;


/**
 * Returns a list of all the properties, including prototype properties, of the
 * supplied object.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * See also {@link values}, {@link keysIn}
 *
 * @example
 * ```typescript
 * const F = function() { this.x = 'X'; };
 * F.prototype.y = 'Y';
 * const f = new F();
 * R.valuesIn(f); //=> ['X', 'Y']
 * ```
 */
export function useValuesIn<T>(obj: MaybeWatchSource<any>): ComputedRef<T[]>;


/**
 * Returns a "view" of the given data structure, determined by the given lens.
 * The lens's focus determines which portion of the data structure is visible.
 *
 * See also {@link set}, {@link over}, {@link lens}, {@link lensIndex}, {@link lensProp}, {@link lensPath}
 *
 * @example
 * ```typescript
 * const xLens = R.lensProp('x');
 * 
 * R.view(xLens, {x: 1, y: 2});  //=> 1
 * R.view(xLens, {x: 4, y: 2});  //=> 4
 * ```
 */
export function useView<S, A>(lens: MaybeWatchSource<Lens<S, A>>): (obj: MaybeRef<S>) => ComputedRef<A>;
export function useView<S, A>(lens: MaybeWatchSource<Lens<S, A>>, obj: MaybeRef<S>): ComputedRef<A>;


/**
 * Tests the final argument by passing it to the given predicate function. If
 * the predicate is satisfied, the function will return the result of calling
 * the `whenTrueFn` function with the same argument. If the predicate is not
 * satisfied, the argument is returned as is.
 *
 * See also {@link ifElse}, {@link unless}, {@link cond}
 *
 * @example
 * ```typescript
 * // truncate :: String -> String
 * const truncate = R.when(
 *   R.propSatisfies(R.gt(R.__, 10), 'length'),
 *   R.pipe(R.take(10), R.append('…'), R.join(''))
 * );
 * truncate('12345');         //=> '12345'
 * truncate('0123456789ABC'); //=> '0123456789…'
 * ```
 */
export function useWhen<T, U extends T, V>(pred: MaybeRef<(a: T) => a is U>, whenTrueFn: MaybeRef<(a: U) => V>): (a: MaybeRef<T>) => ComputedRef<T | V>;
export function useWhen<T, U>(pred: MaybeRef<(a: T) => boolean>, whenTrueFn: MaybeRef<(a: T) => U>): (a: MaybeRef<T>) => ComputedRef<T | U>;
export function useWhen<T, U extends T, V>(pred: MaybeRef<(a: T) => a is U>, whenTrueFn: MaybeRef<(a: U) => V>, a: MaybeRef<T>): ComputedRef<T | V>;
export function useWhen<T, U>(pred: MaybeRef<(a: T) => boolean>, whenTrueFn: MaybeRef<(a: T) => U>, a: MaybeRef<T>): ComputedRef<T | U>;


/**
 * Takes a spec object and a test object; returns true if the test satisfies
 * the spec. Each of the spec's own properties must be a predicate function.
 * Each predicate is applied to the value of the corresponding property of the
 * test object. `where` returns true if all the predicates return true, false
 * otherwise.
 * 
 * `where` is well suited to declaratively expressing constraints for other
 * functions such as [`filter`](#filter) and [`find`](#find).
 *
 * See also {@link propSatisfies}, {@link whereEq}
 *
 * @example
 * ```typescript
 * // pred :: Object -> Boolean
 * const pred = R.where({
 *   a: R.equals('foo'),
 *   b: R.complement(R.equals('bar')),
 *   x: R.gt(R.__, 10),
 *   y: R.lt(R.__, 20)
 * });
 * 
 * pred({a: 'foo', b: 'xxx', x: 11, y: 19}); //=> true
 * pred({a: 'xxx', b: 'xxx', x: 11, y: 19}); //=> false
 * pred({a: 'foo', b: 'bar', x: 11, y: 19}); //=> false
 * pred({a: 'foo', b: 'xxx', x: 10, y: 19}); //=> false
 * pred({a: 'foo', b: 'xxx', x: 11, y: 20}); //=> false
 * ```
 */
export function useWhere<T>(spec: MaybeWatchSource<T>): <U>(testObj: MaybeWatchSource<U>) => ComputedRef<boolean>;
export function useWhere<T, U>(spec: MaybeWatchSource<T>, testObj: MaybeWatchSource<U>): ComputedRef<boolean>;


/**
 * Takes a spec object and a test object; each of the spec's own properties must be a predicate function.
 * Each predicate is applied to the value of the corresponding property of the
 * test object. `whereAny` returns true if at least one of the predicates return true,
 * false otherwise.
 * 
 * `whereAny` is well suited to declaratively expressing constraints for other
 * functions such as [`filter`](#filter) and [`find`](#find).
 *
 * See also {@link propSatisfies}, {@link where}
 *
 * @example
 * ```typescript
 * // pred :: Object -> Boolean
 * const pred = R.whereAny({
 *   a: R.equals('foo'),
 *   b: R.complement(R.equals('xxx')),
 *   x: R.gt(R.__, 10),
 *   y: R.lt(R.__, 20)
 * });
 * 
 * pred({a: 'foo', b: 'xxx', x: 8, y: 34}); //=> true
 * pred({a: 'xxx', b: 'xxx', x: 9, y: 21}); //=> false
 * pred({a: 'bar', b: 'xxx', x: 10, y: 20}); //=> false
 * pred({a: 'foo', b: 'bar', x: 10, y: 20}); //=> true
 * pred({a: 'foo', b: 'xxx', x: 11, y: 20}); //=> true
 * ```
 */
export function useWhereAny<Spec extends Record<PropertyKey, (value: any) => boolean>>(spec: MaybeWatchSource<Spec>): <U extends Record<keyof Spec, any>>(testObj: MaybeWatchSource<U>) => ComputedRef<boolean>;
export function useWhereAny<U>(__: Placeholder, testObj: MaybeWatchSource<U>): <Spec extends Partial<Record<keyof U, (value: any) => boolean>>>(spec: MaybeWatchSource<Spec>) => ComputedRef<boolean>;
export function useWhereAny<Spec extends Partial<Record<keyof U, (value: any) => boolean>>, U>(spec: MaybeWatchSource<Spec>, testObj: MaybeWatchSource<U>): ComputedRef<boolean>;


/**
 * Takes a spec object and a test object; returns true if the test satisfies
 * the spec, false otherwise. An object satisfies the spec if, for each of the
 * spec's own properties, accessing that property of the object gives the same
 * value (in [`R.equals`](#equals) terms) as accessing that property of the
 * spec.
 * 
 * `whereEq` is a specialization of [`where`](#where).
 *
 * See also {@link propEq}, {@link where}
 *
 * @example
 * ```typescript
 * // pred :: Object -> Boolean
 * const pred = R.whereEq({a: 1, b: 2});
 * 
 * pred({a: 1});              //=> false
 * pred({a: 1, b: 2});        //=> true
 * pred({a: 1, b: 2, c: 3});  //=> true
 * pred({a: 1, b: 1});        //=> false
 * ```
 */
export function useWhereEq<T>(spec: MaybeWatchSource<T>): <U>(obj: MaybeWatchSource<U>) => ComputedRef<boolean>;
export function useWhereEq<T, U>(spec: MaybeWatchSource<T>, obj: MaybeWatchSource<U>): ComputedRef<boolean>;


/**
 * Returns a new list without values in the first argument.
 * [`R.equals`](#equals) is used to determine equality.
 * 
 * Acts as a transducer if a transformer is given in list position.
 *
 * See also {@link transduce}, {@link difference}, {@link remove}
 *
 * @example
 * ```typescript
 * R.without([1, 2], [1, 2, 1, 3, 4]); //=> [3, 4]
 * ```
 */
export function useWithout<T>(list1: MaybeWatchSource<readonly T[] | readonly unknown[]>): (list2: MaybeWatchSource<readonly T[]>) => ComputedRef<T[]>;
export function useWithout<T>(list1: MaybeWatchSource<readonly unknown[]>, list2: MaybeWatchSource<readonly T[]>): ComputedRef<T[]>;


/**
 * Exclusive disjunction logical operation.
 * Returns `true` if one of the arguments is truthy and the other is falsy.
 * Otherwise, it returns `false`.
 *
 * See also {@link or}, {@link and}
 *
 * @example
 * ```typescript
 * R.xor(true, true); //=> false
 * R.xor(true, false); //=> true
 * R.xor(false, true); //=> true
 * R.xor(false, false); //=> false
 * ```
 */
export function useXor(a: MaybeRef<any>, b: MaybeRef<any>): ComputedRef<boolean>;
export function useXor(a: MaybeRef<any>): (b: MaybeRef<any>) => ComputedRef<boolean>;


/**
 * Creates a new list out of the two supplied by creating each possible pair
 * from the lists.
 *
 * @example
 * ```typescript
 * R.xprod([1, 2], ['a', 'b']); //=> [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
 * ```
 */
export function useXprod<K>(as: MaybeWatchSource<readonly K[]>): <V>(bs: MaybeWatchSource<readonly V[]>) => ComputedRef<Array<KeyValuePair<K, V>>>;
export function useXprod<K, V>(as: MaybeWatchSource<readonly K[]>, bs: MaybeWatchSource<readonly V[]>): ComputedRef<Array<KeyValuePair<K, V>>>;


/**
 * Creates a new list out of the two supplied by pairing up equally-positioned
 * items from both lists. The returned list is truncated to the length of the
 * shorter of the two input lists.
 * Note: `zip` is equivalent to `zipWith(function(a, b) { return [a, b] })`.
 *
 * @example
 * ```typescript
 * R.zip([1, 2, 3], ['a', 'b', 'c']); //=> [[1, 'a'], [2, 'b'], [3, 'c']]
 * ```
 */
export function useZip<K>(list1: MaybeWatchSource<readonly K[]>): <V>(list2: MaybeWatchSource<readonly V[]>) => ComputedRef<Array<KeyValuePair<K, V>>>;
export function useZip<K, V>(list1: MaybeWatchSource<readonly K[]>, list2: MaybeWatchSource<readonly V[]>): ComputedRef<Array<KeyValuePair<K, V>>>;


/**
 * Creates a new object out of a list of keys and a list of values.
 * Key/value pairing is truncated to the length of the shorter of the two lists.
 * Note: `zipObj` is equivalent to `pipe(zip, fromPairs)`.
 *
 * @example
 * ```typescript
 * R.zipObj(['a', 'b', 'c'], [1, 2, 3]); //=> {a: 1, b: 2, c: 3}
 * ```
 */
export function useZipObj<K extends PropertyKey>(keys: MaybeWatchSource<readonly K[]>): <T>(values: MaybeWatchSource<readonly T[]>) => ComputedRef<{ [P in K]: T }>;
export function useZipObj<T, K extends PropertyKey>(keys: MaybeWatchSource<readonly K[]>, values: MaybeWatchSource<readonly T[]>): ComputedRef<{ [P in K]: T }>;



/**
 * Creates a new list out of the two supplied by applying the function to each
 * equally-positioned pair in the lists. The returned list is truncated to the
 * length of the shorter of the two input lists.
 *
 * @example
 * ```typescript
 * const f = (x, y) => {
 *   // ...
 * };
 * R.zipWith(f, [1, 2, 3], ['a', 'b', 'c']);
 * //=> [f(1, 'a'), f(2, 'b'), f(3, 'c')]
 * ```
 */
export function useZipWith<T, U, TResult>(
  fn: MaybeRef<(x: T, y: U) => TResult>,
): (list1: MaybeWatchSource<readonly T[]>, list2: MaybeWatchSource<readonly U[]>) => ComputedRef<TResult[]>;
export function useZipWith<T, U, TResult>(
  fn: MaybeRef<(x: T, y: U) => TResult>,
  list1: MaybeWatchSource<readonly T[]>,
): (list2: MaybeWatchSource<readonly U[]>) => ComputedRef<TResult[]>;
export function useZipWith<T, U, TResult>(
  fn: MaybeRef<(x: T, y: U) => TResult>,
  list1: MaybeWatchSource<readonly T[]>,
  list2: MaybeWatchSource<readonly U[]>,
): ComputedRef<TResult[]>;