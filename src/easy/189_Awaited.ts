/*
  189 - Awaited
  -------
  by Maciej Sikora (@maciejsikora) #easy #promise #built-in

  ### Question

  //여기서 말하는 Promise는 내가 아는 그 Promise 객체가 맞음 
  If we have a type which is wrapped type like Promise. How we can get a type which is inside the wrapped type?

  For example: if we have `Promise<ExampleType>` how to get ExampleType?

  ```ts
  type ExampleType = Promise<string>

  type Result = MyAwaited<ExampleType> // string
  ```

  > This question is ported from the [original article](https://dev.to/macsikora/advanced-typescript-exercises-question-1-45k4) by [@maciejsikora](https://github.com/maciejsikora)

  > View on GitHub: https://tsch.js.org/189
*/

/* _____________ Your Code Here _____________ */

//처음 작성한 방식
//cases의 마지막 케이스를 통과하기 위해서 Other<T>를 만들었으나 통과되지 못함
// type Other<T> = {then: (onfulfilled: (arg: T) => any) => any};
// type MyAwaited<T extends Promise<any> | Other<any>> = T extends Promise<infer U> ? (U extends Promise<any> ? MyAwaited<U> : U) : never;

//MyAwaited에 Promise 타입이 들어오지 않으면 에러가 발생하지만, 테스트케이스에는 Promise가 아닌 (그러나 비슷한..?) 타입이 true인 케이스가 있음
//이를 충족하기 위해서는 단순히 Promise를 extends 하는 게 아니라, PromiseLike라는 (프로미스와 비슷한...)타입을 extends 해야 한다
type MyAwaited<T extends PromiseLike<any | PromiseLike<any>>> =
  T extends PromiseLike<infer V>
    ? V extends PromiseLike<any>
      ? MyAwaited<V>
      : V
    : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type X = Promise<string>;
type Y = Promise<{ field: number }>;
type Z = Promise<Promise<string | number>>;
type Z1 = Promise<Promise<Promise<string | boolean>>>;
type T = { then: (onfulfilled: (arg: number) => any) => any };

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
  Expect<Equal<MyAwaited<T>, number>>
];

// @ts-expect-error
//MyAwaited에 Promise 타입이 들어오지 않으면 에러가 발생한다는 뜻
type error = MyAwaited<number>;

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/189/answer
  > View solutions: https://tsch.js.org/189/solutions
  > More Challenges: https://tsch.js.org
*/
