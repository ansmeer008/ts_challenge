- 3057 - Push

  ***

  by jiangshan (@jiangshanmeta) #easy #array

  ### Question

  Implement the generic version of `Array.push`

  For example:

  ```typescript
  type Result = Push<[1, 2], "3">; // [1, 2, '3']
  ```

  > View on GitHub: https://tsch.js.org/3057
  > \*/

/_ ******\_****** Your Code Here ******\_****** _/

type Push<T extends any[], U> = [...T, U]

/_ ******\_****** Test Cases ******\_****** _/
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
Expect<Equal<Push<[], 1>, [1]>>,
Expect<Equal<Push<[1, 2], '3'>, [1, 2, '3']>>,
Expect<Equal<Push<['1', 2, '3'], boolean>, ['1', 2, '3', boolean]>>,
]

/_ ******\_****** Further Steps ******\_****** _/
/\*

> Share your solutions: https://tsch.js.org/3057/answer
> View solutions: https://tsch.js.org/3057/solutions
> More Challenges: https://tsch.js.org
> \*/
