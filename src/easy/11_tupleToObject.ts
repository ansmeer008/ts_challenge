/*
  11 - Tuple to Object
  -------
  by sinoon (@sinoon) #easy #object-keys

  ### Question

  Given an array, transform it into an object type and the key/value must be in the provided array.

  For example:

  ```ts
  const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

  type result = TupleToObject<typeof tuple> // expected { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
  ```

  > View on GitHub: https://tsch.js.org/11
*/

/* _____________ Your Code Here _____________ */
//아래 테스트 케이스를 봤을 때 배열들은 number, string으로 구성되어 있고
//const이기 때문에 수정이 불가능 하므로 ReadOnlyArray
//결과인 객체는 key와 value 값이 동일하다
//튜플 = 길이와 타입이 고정된 배열
//배열의 각 인덱스마다의 타입이 고정되어 있다고 보면 됨
//***push 매서드 사용하면 튜플 규칙 무시한다는 맹점 존재****/

type TupleToObject<T extends ReadonlyArray<number | string>> = {
  [P in T[number]]: P;
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

const tuple = ["tesla", "model 3", "model X", "model Y"] as const;
const tupleNumber = [1, 2, 3, 4] as const;
const tupleMix = [1, "2", 3, "4"] as const;

type cases = [
  Expect<
    Equal<
      TupleToObject<typeof tuple>,
      {
        tesla: "tesla";
        "model 3": "model 3";
        "model X": "model X";
        "model Y": "model Y";
      }
    >
  >,
  Expect<Equal<TupleToObject<typeof tupleNumber>, { 1: 1; 2: 2; 3: 3; 4: 4 }>>,
  Expect<
    Equal<TupleToObject<typeof tupleMix>, { 1: 1; "2": "2"; 3: 3; "4": "4" }>
  >
];

// @ts-expect-error
type error = TupleToObject<[[1, 2], {}]>;

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/11/answer
    > View solutions: https://tsch.js.org/11/solutions
    > More Challenges: https://tsch.js.org
  */
