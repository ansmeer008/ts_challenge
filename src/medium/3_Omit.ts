/*
  3 - Omit
  Omit은 유틸리티 타입으로 특정 속성만을 제거한 타입을 정의한다. 
  유틸리티 타입에는 Partial, Omit, Pick 등이 있는데, 
  Omit은 특정 타입에서 몇 개의 속성을 선택해 타입을 정의하는 Pick과 반대된다.
  (*Partial은 특정 타입의 부분 집합을 만족하는 타입을 정의,
    Partial 타입 사용하면 어떤 정보를 업데이트할 때 이전 정보를 똑같이 다시 작성하지 않아도 됨) 
  -------
  by Anthony Fu (@antfu) #medium #union #built-in

  ### Question

  Implement the built-in `Omit<T, K>` generic without using it.

  Constructs a type by picking all properties from `T` and then removing `K`

  For example

  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  type TodoPreview = MyOmit<Todo, 'description' | 'title'>

  const todo: TodoPreview = {
    completed: false,
  }
  ```

  > View on GitHub: https://tsch.js.org/3
*/

/* _____________ Your Code Here _____________ */

// as 사용 (type assertion)
type MyOmit<T extends Object, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, "description">>>,
  Expect<Equal<Expected2, MyOmit<Todo, "description" | "completed">>>
];

// @ts-expect-error
type error = MyOmit<Todo, "description" | "invalid">;

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

interface Expected1 {
  title: string;
  completed: boolean;
}

interface Expected2 {
  title: string;
}

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3/answer
  > View solutions: https://tsch.js.org/3/solutions
  > More Challenges: https://tsch.js.org
*/
