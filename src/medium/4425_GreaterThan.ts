/*
  4425 - Greater Than
  -------
  by ch3cknull (@ch3cknull) #medium #array

  ### Question

  In This Challenge, You should implement a type `GreaterThan<T, U>` like `T > U`

  Negative numbers do not need to be considered.

  For example

  ```ts
  GreaterThan<2, 1> //should be true
  GreaterThan<1, 1> //should be false
  GreaterThan<10, 100> //should be false
  GreaterThan<111, 11> //should be true
  ```

  Good Luck!

  > View on GitHub: https://tsch.js.org/4425
*/

/* _____________ Your Code Here _____________ */

//배열 길이로 풀이 1
type GreaterThan<
  T extends number,
  U extends number,
  A extends any[] = []
> = A["length"] extends T
  ? false
  : A["length"] extends U
  ? true
  : GreaterThan<T, U, [...A, any]>;

//배열 길이로 풀이 2
type newArr<T extends number, A extends any[] = []> = A["length"] extends T
  ? A
  : newArr<T, [...A, ""]>;
type GreaterArr<T extends any[], U extends any[]> = U extends [...T, ...any]
  ? false
  : true;
type GreaterThan<T extends number, U extends number> = GreaterArr<
  newArr<T>,
  newArr<U>
>;

//위에 둘 다 마지막 테스트 케이스에서 걸림

//문자열 이용하기 (문자열에서 앞에서부터 차례로 제거하는 방식, 배열은 추가하는 방식이었으니까)
// compares two strings by length. Returns:
// * `true` if `A` is longer
// * `false` if `B` is longer
// * `"equal"` if `A` and `B` are the same length
type LongerThen<
  A extends string,
  B extends string
> = A extends `${string}${infer AR}`
  ? B extends `${string}${infer BR}`
    ? LongerThen<AR, BR>
    : true
  : B extends `${infer _}${string}`
  ? false
  : "equal";

// Compare two numbers of the same length. Iterates digit-by-digit searching
// for the first non-equal. After found - compare. If non is found - return `false`
type GreaterThanForEqualLength<A extends string, B extends string> = [
  A,
  B
] extends [`${infer AF}${infer AR}`, `${infer BF}${infer BR}`]
  ? AF extends BF
    ? GreaterThanForEqualLength<AR, BR>
    : "9876543210" extends `${string}${AF}${string}${BF}${string}`
    ? true
    : false
  : false;

// Compare by length. If length is equal - compare by the first non-equal digit
type GreaterThan<
  A extends number,
  B extends number,
  ByLengthResult = LongerThen<`${A}`, `${B}`>
> = ByLengthResult extends "equal"
  ? GreaterThanForEqualLength<`${A}`, `${B}`>
  : ByLengthResult;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<10, 9>, true>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
  Expect<Equal<GreaterThan<1234567891011, 1234567891010>, true>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4425/answer
  > View solutions: https://tsch.js.org/4425/solutions
  > More Challenges: https://tsch.js.org
*/
