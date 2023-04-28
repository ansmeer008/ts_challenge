/*
  14 - First of Array
  -------
  by Anthony Fu (@antfu) #easy #array

  ### Question

  Implement a generic `First<T>` that takes an Array `T` and returns its first element's type.

  For example:

  ```ts
  type arr1 = ['a', 'b', 'c']
  type arr2 = [3, 2, 1]

  type head1 = First<arr1> // expected to be 'a'
  type head2 = First<arr2> // expected to be 3
  ```

  > View on GitHub: https://tsch.js.org/14
*/

/* _____________ Your Code Here _____________ */
//세번째 테스트 케이스를 보면 빈 배열이 주어질 때는 First 값이 never와 동일해야하므로
//T가 빈 배열일 때를 분기해서 타입을 만들어주어야 함

type First<T extends any[]> = T extends [] ? never : T[0];

// 다른 풀이
// type First<T extends any[]> = T extends [infer P, ...any[]] ? P : never
//infer 키워드는 말 그대로 타입을 '추론'하는 것을 말함
//타입을 미리 명시하지 않거나 혹은 그러는 것이 효율적이지 못할 때 사용 가능
//위와 같이 조건부 타입을 이용해서 P가 추론되는 경우에 P를 반환하고, 빈 배열이라 P가 추론되지 않는 경우 never를 반환되게 할 수 있음
// +@타입도 구조분해할당이 가능하네...

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>
];

type errors = [
  // @ts-expect-error
  First<"notArray">,
  // @ts-expect-error
  First<{ 0: "arrayLike" }>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/14/answer
  > View solutions: https://tsch.js.org/14/solutions
  > More Challenges: https://tsch.js.org
*/
