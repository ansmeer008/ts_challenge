/*
  4182 - Fibonacci Sequence
  -------
  by windliang (@wind-liang) #medium

  ### Question

  Implement a generic `Fibonacci<T>` that takes a number `T` and returns its corresponding [Fibonacci number](https://en.wikipedia.org/wiki/Fibonacci_number).

  The sequence starts:
  1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...

  For example
  ```ts
  type Result1 = Fibonacci<3> // 2
  type Result2 = Fibonacci<8> // 21
  ```

  > View on GitHub: https://tsch.js.org/4182
*/

/* _____________ Your Code Here _____________ */
//피보나치는 각 항 바로 앞의 두 항 합으로 이루어진 수열 (0,1부터 시작함)
//ex: 0,1,1,2,3,5,8,13...

//풀이에서는
//몇 번째 피보나치 값을 구하는지 나타내는 T를 제외하고
//currentIndex - 인덱스값
//current 현재 값
//prev 이전 값
//총 세 가지 값을 이용해서 푸는데, ts에서 숫자 연산이 제한되므로 배열의 길이를 이용한다

type Fibonacci<
  T extends number,
  CurrentIndex extends any[] = [1],
  Prev extends any[] = [],
  Current extends any[] = [1]
> = CurrentIndex["length"] extends T
  ? Current["length"]
  : Fibonacci<T, [...CurrentIndex, 1], Current, [...Prev, ...Current]>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4182/answer
  > View solutions: https://tsch.js.org/4182/solutions
  > More Challenges: https://tsch.js.org
*/
