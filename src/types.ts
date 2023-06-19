export type Modify<T, R> = Omit<T, keyof R> & R

export type Impossible<T, K extends keyof T> = Omit<T, K> & { [P in K]: never }

export type OrPromise<T> = T | Promise<T>

export type MakePropertyRequired<T, K extends keyof T> = T &
  Required<Pick<T, K>>
