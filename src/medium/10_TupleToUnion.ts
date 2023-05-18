/*
  10 - Tuple to Union
  -------
  by Anthony Fu (@antfu) #medium #infer #tuple #union

  ### Question

  Implement a generic `TupleToUnion<T>` which covers the values of a tuple to its values union.

  For example

  ```ts
  type Arr = ['1', '2', '3']

  type Test = TupleToUnion<Arr> // expected to be '1' | '2' | '3'
  ```

  > View on GitHub: https://tsch.js.org/10
*/

/* _____________ Your Code Here _____________ */

//any와 unknown은 둘 다 모든 타입을 허용
//any 보다 unknown이 엄격한 검사를 실행한다고 볼 수 있음 (프로퍼티, 연산 등 사용할 때 )
//any에서는 그냥 넘어갔을 케이스가 unknown에서는 추가적인 타입 검사가 필요한 경우 존재 (if문 etc)

type TupleToUnion<T extends any[]> = T extends [infer F, ...infer P]
  ? F | TupleToUnion<P>
  : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<TupleToUnion<[123, "456", true]>, 123 | "456" | true>>,
  Expect<Equal<TupleToUnion<[123]>, 123>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/10/answer
  > View solutions: https://tsch.js.org/10/solutions
  > More Challenges: https://tsch.js.org
*/
