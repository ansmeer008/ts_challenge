/*
  8 - Readonly 2
  -------
  by Anthony Fu (@antfu) #medium #readonly #object-keys

  ### Question

  Implement a generic `MyReadonly2<T, K>` which takes two type argument `T` and `K`.

  `K` specify the set of properties of `T` that should set to Readonly. When `K` is not provided, it should make all properties readonly just like the normal `Readonly<T>`.

  For example

  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  const todo: MyReadonly2<Todo, 'title' | 'description'> = {
    title: "Hey",
    description: "foobar",
    completed: false,
  }

  todo.title = "Hello" // Error: cannot reassign a readonly property
  todo.description = "barFoo" // Error: cannot reassign a readonly property
  todo.completed = true // OK
  ```

  > View on GitHub: https://tsch.js.org/8
*/

/* _____________ Your Code Here _____________ */

//K를 제한해주고 뒤에 keyof T를 한 번 더 해주는 이유가 뭘까??
//(지정해주지 않으면 1번 케이스만 에러 남 : K에 아무것도 들어오지 않을 때!)
//=> Default Type 설정 해주는 것!
//K가 없다면 readonly인 속성이 없는데, Readonly<Todo1>와 같으려면 기본적으로 T의 키들을 Readonly로 설정해주면 통과된다.

//Alike는 비슷한 검증 함수로 utils 파일에 들어가면 아래와 같이 작성되어 있음
/* Alike */
//  Expect<Alike<{ a: 1 } & { b: 2 }, { a: 1; b: 2 }>>,
//  ExpectFalse<Equal<{ a: 1 } & { b: 2 }, { a: 1; b: 2 }>>,
// ]

type MyReadonly2<T extends Object, K extends keyof T = keyof T> = Omit<T, K> &
  Readonly<Pick<T, K>>;

/* _____________ Test Cases _____________ */
import type { Alike, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, "title" | "description">, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, "title" | "description">, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, "description">, Expected>>
];

// @ts-expect-error
type error = MyReadonly2<Todo1, "title" | "invalid">;

interface Todo1 {
  title: string;
  description?: string;
  completed: boolean;
}

interface Todo2 {
  readonly title: string;
  description?: string;
  completed: boolean;
}

interface Expected {
  readonly title: string;
  readonly description?: string;
  completed: boolean;
}

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/8/answer
  > View solutions: https://tsch.js.org/8/solutions
  > More Challenges: https://tsch.js.org
*/
