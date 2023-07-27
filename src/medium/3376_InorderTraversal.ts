/*
  3376 - InorderTraversal
  -------
  by jiangshan (@jiangshanmeta) #medium #object

  ### Question

  Implement the type version of binary tree inorder traversal.

  For example:

  ```typescript
  const tree1 = {
    val: 1,
    left: null,
    right: {
      val: 2,
      left: {
        val: 3,
        left: null,
        right: null,
      },
      right: null,
    },
  } as const

  type A = InorderTraversal<typeof tree1> // [1, 3, 2]
  ```

  > View on GitHub: https://tsch.js.org/3376
*/

/* _____________ Your Code Here _____________ */

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

//NonNullable은 주어진 제네릭 타입 T에서 null과 undefined를 제외한 타입을 구성함
type InorderTraversal<
  T extends TreeNode | null,
  NT extends TreeNode = NonNullable<T>
> = T extends null
  ? []
  : [
      ...InorderTraversal<NT["left"]>,
      NT["val"],
      ...InorderTraversal<NT["right"]>
    ];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

const tree1 = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: {
      val: 3,
      left: null,
      right: null,
    },
    right: null,
  },
} as const;

const tree2 = {
  val: 1,
  left: null,
  right: null,
} as const;

const tree3 = {
  val: 1,
  left: {
    val: 2,
    left: null,
    right: null,
  },
  right: null,
} as const;

const tree4 = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: null,
    right: null,
  },
} as const;

type cases = [
  Expect<Equal<InorderTraversal<null>, []>>,
  Expect<Equal<InorderTraversal<typeof tree1>, [1, 3, 2]>>,
  Expect<Equal<InorderTraversal<typeof tree2>, [1]>>,
  Expect<Equal<InorderTraversal<typeof tree3>, [2, 1]>>,
  Expect<Equal<InorderTraversal<typeof tree4>, [1, 2]>>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/3376/answer
    > View solutions: https://tsch.js.org/3376/solutions
    > More Challenges: https://tsch.js.org
  */
