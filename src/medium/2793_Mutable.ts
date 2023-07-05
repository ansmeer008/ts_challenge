/*
  2793 - Mutable
  -------
  by jiangshan (@jiangshanmeta) #medium #readonly #object-keys

  ### Question

  Implement the generic ```Mutable<T>``` which makes all properties in ```T``` mutable (not readonly).

  For example

  ```typescript
  interface Todo {
    readonly title: string
    readonly description: string
    readonly completed: boolean
  }

  type MutableTodo = Mutable<Todo> // { title: string; description: string; completed: boolean; }

  ```

  > View on GitHub: https://tsch.js.org/2793
*/

/* _____________ Your Code Here _____________ */
//you could write a utility type like Writable mapped type that strips away readonly-ness,
//and that would convert readonly array containers back to their mutable equivalents.

// type Writable<T> = {
//   -readonly [K in keyof T]: T[K];
// };
// // { a: string, b: number }
// type A = Writable<{
//   readonly a: string;
//   readonly b: number;
// }>;
// // number[]
// type B = Writable<readonly number[]>;
// // [string, boolean]
// type C = Writable<readonly [string, boolean]>;

//출처 : https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#improvements-for-readonlyarray-and-readonly-tuples

type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

interface Todo1 {
  title: string;
  description: string;
  completed: boolean;
  meta: {
    author: string;
  };
}

type List = [1, 2, 3];

type cases = [
  Expect<Equal<Mutable<Readonly<Todo1>>, Todo1>>,
  Expect<Equal<Mutable<Readonly<List>>, List>>
];

type errors = [
  // @ts-expect-error
  Mutable<"string">,
  // @ts-expect-error
  Mutable<0>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/2793/answer
    > View solutions: https://tsch.js.org/2793/solutions
    > More Challenges: https://tsch.js.org
  */
