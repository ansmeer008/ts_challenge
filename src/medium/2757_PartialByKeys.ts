/*
  2757 - PartialByKeys
  -------
  by jiangshan (@jiangshanmeta) #medium #object

  ### Question

  Implement a generic `PartialByKeys<T, K>` which takes two type argument `T` and `K`.

  `K` specify the set of properties of `T` that should set to be optional. When `K` is not provided, it should make all properties optional just like the normal `Partial<T>`.

  For example

  ```typescript
  interface User {
    name: string
    age: number
    address: string
  }

  type UserPartialName = PartialByKeys<User, 'name'> // { name?:string; age:number; address:string }
  ```

  > View on GitHub: https://tsch.js.org/2757
*/

/* _____________ Your Code Here _____________ */

//잘 모르겠어서 찾아본 풀이들
//공통점은 Merge이든 IntersectionToObj이든 합쳐주는 과정이 필요함
//풀이 2에서는 1과 다르게 Exclude를 사용해주었고, 풀이 1에서는 좀 더 풀어서 쓴 듯

//풀이 1
type Merge<T> = {
  [K in keyof T]: T[K];
};

type PartialByKeys<T, K extends keyof T = keyof T> = Merge<
  {
    [P in keyof T as P extends K ? P : never]?: T[P];
  } & {
    [P in keyof T as P extends K ? never : P]: T[P];
  }
>;

//풀이 2
type IntersectionToObj<T> = {
  [K in keyof T]: T[K];
};
type PartialByKeys<T, K = any> = IntersectionToObj<
  {
    [P in keyof T as P extends K ? P : never]?: T[P];
  } & {
    [P in Exclude<keyof T, K>]: T[P];
  }
>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

interface User {
  name: string;
  age: number;
  address: string;
}

interface UserPartialName {
  name?: string;
  age: number;
  address: string;
}

interface UserPartialNameAndAge {
  name?: string;
  age?: number;
  address: string;
}

type cases = [
  Expect<Equal<PartialByKeys<User, "name">, UserPartialName>>,
  Expect<Equal<PartialByKeys<User, "name" | "age">, UserPartialNameAndAge>>,
  Expect<Equal<PartialByKeys<User>, Partial<User>>>,
  // @ts-expect-error
  Expect<Equal<PartialByKeys<User, "name" | "unknown">, UserPartialName>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2757/answer
  > View solutions: https://tsch.js.org/2757/solutions
  > More Challenges: https://tsch.js.org
*/
