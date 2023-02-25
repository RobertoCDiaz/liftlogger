/**
 * Shows a type formed by several types unions in a more conscised way.
 */
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {}
