/*
  459 - Flatten
  -------
  by zhouyiming (@chbro) #medium #array

  ### Question

  In this challenge, you would need to write a type that takes an array and emitted the flatten array type.

  For example:

  ```ts
  type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, 5]
  ```

  > View on GitHub: https://tsch.js.org/459
*/

/* _____________ Your Code Here _____________ */

//재귀를... 이용해야...쓰것지요?
//처음에 아래처럼 작성했는데 틀림
//마지막 결과를 Flateen<[...R]>이라고 쓰긴 했는데... F는 어떡할 것이며... 
type Flatten<T extends any[]> = T extends [infer F,...infer R] ? F extends any[] ? Flatten<[...F, ...R]> : Flatten<[...R]>

// //두 가지 방법이 있음 
// //풀이 1 : 제네릭 내에 T말고도 타입 하나를 더 넣어줌 
type Flatten<S extends any[], T extends any[] = []> =  S extends [infer X, ...infer Y] ? 
  X extends any[] ?
   Flatten<[...X, ...Y], T> : Flatten<[...Y], [...T, X]> 
  : T

// //풀이 2 : 다른 풀이는 아래와 같다
type Flatten<T extends any[]> = T extends [infer First, ...infer Rest]
  ? First extends any[]
    ? [...Flatten<First>, ...Flatten<Rest>]
    : [First, ...Flatten<Rest>]
  : T;

//빈 배열인 경우를 고려해주기 위한 방법이 서로 다른 것 같음
//풀이 1은 처음부터 T라는 빈배열을 제네릭 내에 포함시키고
//풀이 2는 삼항연산자 내에 빈 배열일 때를 고려한다 

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Flatten<[]>, []>>,
  Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
  Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
  Expect<Equal<Flatten<[{ foo: 'bar'; 2: 10 }, 'foobar']>, [{ foo: 'bar'; 2: 10 }, 'foobar']>>,
]

// @ts-expect-error
type error = Flatten<'1'>

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/459/answer
  > View solutions: https://tsch.js.org/459/solutions
  > More Challenges: https://tsch.js.org
*/
