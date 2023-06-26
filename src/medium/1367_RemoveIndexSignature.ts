/*
  1367 - Remove Index Signature
  -------
  by hiroya iizuka (@hiroyaiizuka) #medium #object-keys

  ### Question

  Implement `RemoveIndexSignature<T>` , exclude the index signature from object types.

  For example:

  ```ts

  type Foo = {
    [key: string]: any;
    foo(): void;
  }

  type A = RemoveIndexSignature<Foo>  // expected { foo(): void }

  ```

  > View on GitHub: https://tsch.js.org/1367
*/

/* _____________ Your Code Here _____________ */

//index signature : 객체의 특정 value에 접근 시 그 value의 key를 문자열로 인덱싱해 참조하는 방법
//객체의 프로퍼티를 명확히 선언할 수 없을 때, string, number 등 공통타입 혹은 유니온으로 선언하기 위해 사용하는 문법
//ex: dog["breed"]
//typescript에서는 자바스크립트의 인덱스 시그니처에 대한 타입을 지정해주는 것을 말함
//보통 객체에 어떤 프로퍼티들이 있는지 명확히 알 수 없을 때 사용함

//인덱스 시그니처의 단점
// - 인덱스 시그니처만 사용할 경우 빈 객체 > 에러 나지 않음
// - 각 key마다 다른 타입 가질 수 없음
// - 타입에 유연성 but 휴먼 에러 발생 가능
// 그러므로 런타임에 객체 프로퍼티 알 수 없는 경우에만 사용할 것

//문제에서는 index signature부분만 제거하게 해아 함
//string, number, symbol 등이 index signature 포함하면 never,
//아닌 경우 키 자체를 값으로 사용함

//풀이 1
//template literals are built on string literal types,
//which would be the only types you can infer from it and not a generic string.
//Also, string can only extend the types string and any AFAIK(as far as i know),
//thus the condition resulting in false and filtering out generic types.
type RemoveIndexSignature<Type> = {
  [Key in keyof Type as Key extends `${infer ConcreteKey}`
    ? ConcreteKey
    : never]: Type[Key];
};

//풀이 2
//키(k)가 string, number, symbol 등 Index Signature를 포함하면 never를
//아니면 키 자체를 키값으로 사용한다. 값은 T[k] 그대로 사용하면 된다.

type RemoveIndexSignature<T> = {
  [k in keyof T as string extends k
    ? never
    : number extends k
    ? never
    : symbol extends k
    ? never
    : k]: T[k];
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type Foo = {
  [key: string]: any;
  foo(): void;
};

type Bar = {
  [key: number]: any;
  bar(): void;
  0: string;
};

const foobar = Symbol("foobar");
type FooBar = {
  [key: symbol]: any;
  [foobar](): void;
};

type Baz = {
  bar(): void;
  baz: string;
};

type cases = [
  Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
  Expect<Equal<RemoveIndexSignature<Bar>, { bar(): void; 0: string }>>,
  Expect<Equal<RemoveIndexSignature<FooBar>, { [foobar](): void }>>,
  Expect<Equal<RemoveIndexSignature<Baz>, { bar(): void; baz: string }>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/1367/answer
  > View solutions: https://tsch.js.org/1367/solutions
  > More Challenges: https://tsch.js.org
*/
