/*
  43 - Exclude
  -------
  by Zheeeng (@zheeeng) #easy #built-in #union

  ### Question

  Implement the built-in Exclude<T, U>

  > Exclude from T those types that are assignable to U

  For example:

  ```ts
  type Result = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
  ```

  > View on GitHub: https://tsch.js.org/43
*/

/* _____________ Your Code Here _____________ */

//T와 U의 차집합 구하는 문제

//T extends U ? X : Y 와 같은 조건부 타입에서 T가 유니온 타입이면
//아래와 같이 분배법칙이 적용됨 (유니온에 포함된 각각의 타입들이 분배되어 연산됨)
/*
    e.g) 
    Set T is "a" | "b" | "c" and U is "a"

    = T extends U ? never : T
    = ("a" extends "a" ? never : "a") 
	  | ("b" extends "a" ? never : "b")
      | ("c" extends "a" ? never : "c")
    = never | "b" | "c"
    = "b" | "c"
*/

type MyExclude<T, U extends T> = T extends U ? never : T;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<MyExclude<"a" | "b" | "c", "a">, "b" | "c">>,
  Expect<Equal<MyExclude<"a" | "b" | "c", "a" | "b">, "c">>,
  Expect<
    Equal<MyExclude<string | number | (() => void), Function>, string | number>
  >
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/43/answer
  > View solutions: https://tsch.js.org/43/solutions
  > More Challenges: https://tsch.js.org
*/
