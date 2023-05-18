/*
  12 - Chainable Options
  -------
  by Anthony Fu (@antfu) #medium #application

  ### Question

  Chainable options are commonly used in Javascript. But when we switch to TypeScript, can you properly type it?

  In this challenge, you need to type an object or a class - whatever you like - to provide two function `option(key, value)` and `get()`. In `option`, you can extend the current config type by the given key and value. We should about to access the final result via `get`.

  For example

  ```ts
  declare const config: Chainable

  const result = config
    .option('foo', 123)
    .option('name', 'type-challenges')
    .option('bar', { value: 'Hello World' })
    .get()

  // expect the type of result to be:
  interface Result {
    foo: number
    name: string
    bar: {
      value: string
    }
  }
  ```

  You don't need to write any js/ts logic to handle the problem - just in type level.

  You can assume that `key` only accepts `string` and the `value` can be anything - just leave it as-is. Same `key` won't be passed twice.

  > View on GitHub: https://tsch.js.org/12
*/

/* _____________ Your Code Here _____________ */

//1. 제네릭 기본값 필요 <T={}>
//2. 키는 문자열 + 이미 있는 키는 또 만들 수 없음 option<K extends string,V>(key: K extends keyof T ? never : K, value: V)
//3. Chainable의 반환값은 객체가 점점 쌓이는 느낌 : Chainable<T & Record<K,V>>
//4. get에 이르면 여태 모은 키, 값들을 하나의 객체로 반환한다. 근데 우리는 타입을 구하는 거니까 T를 반환하면 된다.

//마지막 케이스 에러 해결 => 이미 존재하는 키에 대해 새로운 값이 들어오면 그 값이 반영되어야 함.
//option의 반환값에 Chainable<Omit<T,K> & Record<K,V>>
//객체 T에서 K 속성을 제거하고, K가 key이고 V가 value인 객체를 만드는 것
//(K가 들어왔든 안 들어왔든 일단 K를 제거하고 그 뒤에 key,value 설정 하도록 해둔 것... 이해하는 데 오래 걸렸다)

type Chainable<T = {}> = {
  option<K extends string, V>(
    key: K extends keyof T ? never : K,
    value: V
  ): Chainable<Omit<T, K> & Record<K, V>>;
  get(): T;
};

//참고 : https://bkdragon0228.tistory.com/9
/* _____________ Test Cases _____________ */
import type { Alike, Expect } from "@type-challenges/utils";

declare const a: Chainable;

const result1 = a
  .option("foo", 123)
  .option("bar", { value: "Hello World" })
  .option("name", "type-challenges")
  .get();

const result2 = a
  .option("name", "another name")
  // @ts-expect-error
  .option("name", "last name")
  .get();

const result3 = a
  .option("name", "another name")
  // @ts-expect-error
  .option("name", 123)
  .get();

type cases = [
  Expect<Alike<typeof result1, Expected1>>,
  Expect<Alike<typeof result2, Expected2>>,
  Expect<Alike<typeof result3, Expected3>>
];

type Expected1 = {
  foo: number;
  bar: {
    value: string;
  };
  name: string;
};

type Expected2 = {
  name: string;
};

type Expected3 = {
  name: number;
};

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/12/answer
    > View solutions: https://tsch.js.org/12/solutions
    > More Challenges: https://tsch.js.org
  */
