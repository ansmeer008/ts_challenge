/*

Intro:

    We have asynchronous functions now, advanced technology.
    This makes us a tech startup officially now.
    But one of the consultants spoiled our dreams about
    inevitable future IT leadership.
    He said that callback-based asynchronicity is not
    popular anymore and everyone should use Promises.
    He promised that if we switch to Promises, this would
    bring promising results.

Exercise:

    We don't want to reimplement all the data-requesting
    functions. Let's decorate the old callback-based
    functions with the new Promise-compatible result.
    The final function should return a Promise which
    would resolve with the final data directly
    (i.e. users or admins) or would reject with an error
    (or type Error).

    The function should be named promisify.

Higher difficulty bonus exercise:

    Create a function promisifyAll which accepts an object
    with functions and returns a new object where each of
    the function is promisified.

    Rewrite api creation accordingly:

        const api = promisifyAll(oldApi);

*/

//왕 어려웠던 문제

interface User {
  type: "user";
  name: string;
  age: number;
  occupation: string;
}

interface Admin {
  type: "admin";
  name: string;
  age: number;
  role: string;
}

type Person = User | Admin;

const admins: Admin[] = [
  { type: "admin", name: "Jane Doe", age: 32, role: "Administrator" },
  { type: "admin", name: "Bruce Willis", age: 64, role: "World saver" },
];

const users: User[] = [
  {
    type: "user",
    name: "Max Mustermann",
    age: 25,
    occupation: "Chimney sweep",
  },
  { type: "user", name: "Kate Müller", age: 23, occupation: "Astronaut" },
];

export type ApiResponse<T> =
  | {
      status: "success";
      data: T;
    }
  | {
      status: "error";
      error: string;
    };

//oldApi 매서드는 (ApiResponse) => void 타입의 콜백을 받고 아무것도 리턴하지 않음
//그러므로 (ApiResponse => void) => void와 같은 매개변수를 promisify가 받아야 함
export type OldRequestType<T> = (
  callback: (response: ApiResponse<T>) => void
) => void;

//promisify 매서드에 필요한 타입 & 구현체 만들어주기
//<T>와 반환하는 타입을 ()=>Promise<T>로 해준걸로도 통과는되지만
//인자쪽 unknown을 OldRequestType으로 바꿔줄 수 있음
export function promisify<T>(arg: OldRequestType<T>): () => Promise<T> {
  return () => new Promise((resolve, reject) => {});
}

//각 request에서 callback의 arg 형태가 각각 다르므로 해당 부분을 제네릭으로 처리해야 한다
//타입을 유추할 수 있는 인자를 받거나, 타입 인자를 받는 형태가 되어야 함
//=>  promisify 에서 <T>로 타입 인자 받도록 한다
const oldApi = {
  requestAdmins(callback: (response: ApiResponse<Admin[]>) => void) {
    callback({
      status: "success",
      data: admins,
    });
  },
  requestUsers(callback: (response: ApiResponse<User[]>) => void) {
    callback({
      status: "success",
      data: users,
    });
  },
  requestCurrentServerTime(callback: (response: ApiResponse<number>) => void) {
    callback({
      status: "success",
      data: Date.now(),
    });
  },
  requestCoffeeMachineQueueLength(
    callback: (response: ApiResponse<number>) => void
  ) {
    callback({
      status: "error",
      error: "Numeric value has exceeded Number.MAX_SAFE_INTEGER.",
    });
  },
};

export const api = {
  requestAdmins: promisify<Admin[]>(oldApi.requestAdmins),
  requestUsers: promisify<User[]>(oldApi.requestUsers),
  requestCurrentServerTime: promisify<number>(oldApi.requestCurrentServerTime),
  requestCoffeeMachineQueueLength: promisify<number>(
    oldApi.requestCoffeeMachineQueueLength
  ),
};

function logPerson(person: Person) {
  console.log(
    ` - ${person.name}, ${person.age}, ${
      person.type === "admin" ? person.role : person.occupation
    }`
  );
}

//사용되는 것을 보면 await api.requestAdmins() 와 같이 사용되는데
//requestAdmins 값은 promisify(oldApi.requestAdmins)이므로
//promisify(oldApi.requestAdmins)의 타입은 promise를 리턴하는 함수타입 (()=> Promise<?>)
async function startTheApp() {
  console.log("Admins:");
  (await api.requestAdmins()).forEach(logPerson);
  console.log();

  console.log("Users:");
  (await api.requestUsers()).forEach(logPerson);
  console.log();

  console.log("Server time:");
  console.log(
    `   ${new Date(await api.requestCurrentServerTime()).toLocaleString()}`
  );
  console.log();

  console.log("Coffee machine queue length:");
  console.log(`   ${await api.requestCoffeeMachineQueueLength()}`);
}

startTheApp().then(
  () => {
    console.log("Success!");
  },
  (e: Error) => {
    console.log(
      `Error: "${e.message}", but it's fine, sometimes errors are inevitable.`
    );
  }
);

// In case you are stuck:
// https://www.typescriptlang.org/docs/handbook/2/generics.html
