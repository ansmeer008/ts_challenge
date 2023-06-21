/*
  1042 - IsNever
  -------
  by hiroya iizuka (@hiroyaiizuka) #medium #union #utils

  ### Question

  Implement a type IsNever, which takes input type `T`.
  If the type of resolves to `never`, return `true`, otherwise `false`.

  For example:

  ```ts
  type A = IsNever<never>  // expected to be true
  type B = IsNever<undefined> // expected to be false
  type C = IsNever<null> // expected to be false
  type D = IsNever<[]> // expected to be false
  type E = IsNever<number> // expected to be false
  ```

  > View on GitHub: https://tsch.js.org/1042
*/

/* _____________ Your Code Here _____________ */

//처음에는 falsy 값을 어제처럼 제외하고 검증해야하나 생각했는데 그건 아니었음
//솔루션이 두 가지 방법이 있었는데 배열을 이용하는 것과, Equal을 이용하는 것

//배열을 이용해서 검증하는 이유는 T extends never과 같은 식으로 작성하면 그냥 never를 뱉기 때문
type IsNever<T> = [T] extends [never] ? true : false;

type IsNever<T> = Equal<never, T>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<IsNever<never>, true>>,
  Expect<Equal<IsNever<never | string>, false>>,
  Expect<Equal<IsNever<"">, false>>,
  Expect<Equal<IsNever<undefined>, false>>,
  Expect<Equal<IsNever<null>, false>>,
  Expect<Equal<IsNever<[]>, false>>,
  Expect<Equal<IsNever<{}>, false>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/1042/answer
  > View solutions: https://tsch.js.org/1042/solutions
  > More Challenges: https://tsch.js.org
*/
