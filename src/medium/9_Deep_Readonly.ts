/*
  9 - Deep Readonly
  -------
  by Anthony Fu (@antfu) #medium #readonly #object-keys #deep

  ### Question

  Implement a generic `DeepReadonly<T>` which make every parameter of an object - and its sub-objects recursively - readonly.

  You can assume that we are only dealing with Objects in this challenge. Arrays, Functions, Classes and so on do not need to be taken into consideration. However, you can still challenge yourself by covering as many different cases as possible.

  For example:

  ```ts
  type X = {
    x: {
      a: 1
      b: 'hi'
    }
    y: 'hey'
  }

  type Expected = {
    readonly x: {
      readonly a: 1
      readonly b: 'hi'
    }
    readonly y: 'hey'
  }

  type Todo = DeepReadonly<X> // should be same as `Expected`
  ```

  > View on GitHub: https://tsch.js.org/9
*/

/* _____________ Your Code Here _____________ */

//** Record 타입 이용해서 풀기
//Record<k,v>는 키가 k이고 값이 v인 객체 타입

type DeepReadonly<T> = {
  readonly [k in keyof T]: T[k] extends Record<any, unknown>
    ? DeepReadonly<T[k]>
    : T[k];
};

//** 인덱스 시그니처(Index Signature) : (내가 모르고 따라 쓰던) 대괄호로 객체를 접근하는 방법
// type imObj = { [name : string ] : number}

//**신기했던 풀이
//type DeepRedaonly<T> = keyof T extends never ? T : {readonly [k in keyof T]: DeepReadonly<T[k]>}
//조건인 'keyof T extends never'라는 건 T가 never의 key일때 라는 뜻인데
//이 경우는 Object 타입이 아니라는 뜻으로 해석된다.
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<DeepReadonly<X1>, Expected1>>,
  Expect<Equal<DeepReadonly<X2>, Expected2>>
];

type X1 = {
  a: () => 22;
  b: string;
  c: {
    d: boolean;
    e: {
      g: {
        h: {
          i: true;
          j: "string";
        };
        k: "hello";
      };
      l: [
        "hi",
        {
          m: ["hey"];
        }
      ];
    };
  };
};

type X2 = { a: string } | { b: number };

type Expected1 = {
  readonly a: () => 22;
  readonly b: string;
  readonly c: {
    readonly d: boolean;
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true;
          readonly j: "string";
        };
        readonly k: "hello";
      };
      readonly l: readonly [
        "hi",
        {
          readonly m: readonly ["hey"];
        }
      ];
    };
  };
};

type Expected2 = { readonly a: string } | { readonly b: number };

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9/answer
  > View solutions: https://tsch.js.org/9/solutions
  > More Challenges: https://tsch.js.org
*/
