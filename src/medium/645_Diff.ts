/*
  645 - Diff
  -------
  by ZYSzys (@ZYSzys) #medium #object

  ### Question

  Get an `Object` that is the difference between `O` & `O1`

  > View on GitHub: https://tsch.js.org/645
*/

/* _____________ Your Code Here _____________ */

//이전에 만들어보았던 Omit을 사용하면 쉽게 풀 수 있음
//그때는 key들이 개별로 주어져, 그 키들을 제외한 객체를 반환했는데
//Diff는 객체 두 개가 주어지므로 두 객체를 모두에서 O에 없거나 O1에 없는 키를 반환한다
type Diff<O, O1> = Omit<O & O1, keyof (O | O1)>;

//Exclude로도 풀 수 있으나 조금 더 복잡한 느낌..
type Diff<O, O1> = {
  [K in Exclude<keyof (O & O1), keyof (O | O1)>]: (O & O1)[K];
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type Foo = {
  name: string;
  age: string;
};
type Bar = {
  name: string;
  age: string;
  gender: number;
};
type Coo = {
  name: string;
  gender: number;
};

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/645/answer
  > View solutions: https://tsch.js.org/645/solutions
  > More Challenges: https://tsch.js.org
*/
