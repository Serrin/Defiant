# Defiant – Tuple and Record Utilities

A small utility module for working with **tuples** (frozen arrays) and **records** (frozen objects) in JavaScript / TypeScript.
The module emphasizes immutability and provides helpers for creation, type checks, deep equality, and conversion.

---

## Overview

**Version: 1.0.0**

**Defiant** provides:

* Immutable tuple creation (`Object.freeze`-based)
* Immutable record creation (`Object.freeze`-based)
* Type guards for tuples and records
* Deep equality comparison for arrays and objects
* Conversion utilities between frozen and mutable structures

The module is implemented in TypeScript-compatible JavaScript and relies only on standard ECMAScript APIs.

---

## Design Notes

* **Immutability is shallow by design**

  * Freezing is applied only at the top level
* **No external dependencies**
* **TypeScript-friendly**

  * Uses generics and type predicates
* **Structural equality**

  * Useful for functional programming and state comparison

---

## How to import

Import directly as a local module:

```ts
import { Tuple, Record } from "./defiant.js";
```

Import default directly as a local module:

```ts
import { default as defiant } from "./defiant.js";
```

Import defaultExport directly as a local module:

```ts
import { defaultExport as defiant } from "./defiant.js";
```

---

## Exports

```ts
export { Tuple, Record };
export default { Tuple, Record };
```

---

## Tuple Utilities

Tuples are implemented as **frozen arrays**.

---

### `Tuple(...values)`

Creates a frozen array (tuple) from the given values.

```ts
const t = Tuple(1, "a", true);
// readonly [1, "a", true]
```

#### Signature

```ts
Tuple<T extends readonly unknown[]>(...values: T): T
```

---

### `Tuple.of(...values)`

Alias for `Tuple(...)`.

```ts
const t = Tuple.of(1, 2, 3);
```

---

### `Tuple.from(iterable)`

Creates a tuple from an iterable or array-like object.

```ts
const t = Tuple.from(new Set([1, 2, 3]));
```

#### Signature

```ts
Tuple.from<T extends readonly unknown[]>(
  iterable: Iterable<unknown> | ArrayLike<unknown>
): T
```

---

### `Tuple.isTuple(value)`

Checks whether a value is a frozen array.

```ts
Tuple.isTuple(Object.freeze([1, 2])); // true
Tuple.isTuple([1, 2]);                // false
```

#### Signature

```ts
Tuple.isTuple(value: unknown): value is readonly unknown[]
```

---

### `Tuple.isEqual(x, y)`

Performs a **deep equality check** between two values.

#### Characteristics

* Uses **SameValueZero** semantics for primitives

  * `NaN === NaN` → `true`
  * `-0` and `+0` are treated as equal
* Recursively compares:

  * Arrays (length and element order)
  * Objects (prototype, keys, and values)
* Works for nested structures

```ts
Tuple.isEqual(
  Tuple(1, { a: 2 }),
  Tuple(1, { a: 2 })
); // true
```

#### Signature

```ts
Tuple.isEqual<T extends readonly unknown[]>(x: T, y: T): boolean
```

---

### `Tuple.toArray(value)`

Converts a tuple to a mutable array (shallow copy).

```ts
const arr = Tuple.toArray(Tuple(1, 2, 3));
```

**Note:** Nested objects are still shared.

#### Signature

```ts
Tuple.toArray<T extends readonly unknown[]>(value: T): unknown[]
```

---

## Record Utilities

Records are implemented as **frozen objects** (shallow freeze).

---

### `Record(object)`

Creates a frozen copy of an object.

```ts
const r = Record({ a: 1, b: 2 });
```

**Characteristics**

* Shallow freeze
* Nested objects remain mutable

#### Signature

```ts
Record<T extends object>(O: T): T
```

---

### `Record.fromEntries(entries)`

Creates a record from an iterable of key–value pairs.

```ts
const r = Record.fromEntries([
  ["a", 1],
  ["b", 2],
]);
```

#### Signature

```ts
Record.fromEntries<T extends object>(
  entries: Iterable<readonly [keyof T, unknown]>
): T
```

---

### `Record.fromObject(object)`

Alias for `Record(object)`.

```ts
const r = Record.fromObject({ x: 10 });
```

---

### `Record.isRecord(value)`

Checks whether a value is a frozen object.

```ts
Record.isRecord(Object.freeze({ a: 1 })); // true
Record.isRecord({ a: 1 });                // false
```

#### Signature

```ts
Record.isRecord(value: unknown): value is object
```

---

### `Record.isEqual(x, y)`

Alias for `Tuple.isEqual`.

```ts
Record.isEqual({ a: 1 }, { a: 1 }); // true
```

#### Signature

```ts
Record.isEqual(x: readonly unknown, y: readonly unknown): boolean
```

---

### `Record.toObject(value)`

Converts a record to a mutable object (shallow copy).

```ts
const obj = Record.toObject(Record({ a: 1 }));
```

#### Signature

```ts
Record.toObject<T extends object>(value: T): object
```

---

## License

[https://opensource.org/licenses/MIT](https://opensource.org/licenses/MIT)

MIT License

SPDX short identifier: MIT

Copyright (c) 2026 Ferenc Czigler

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

© Copyright 2026 Ferenc Czigler [https://github.com/Serrin](https://github.com/Serrin)
