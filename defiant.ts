// @ts-check
/// <reference lib="esnext" />
/// <reference lib="esnext.iterator" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="webworker.importscripts" />
"use strict";

/**
 * @name Defiant - Tuple and Record utilities
 * @description This module provides utility functions for working with tuples (frozen arrays) and records (frozen objects) in JavaScript. It includes functions for creating tuples and records, checking if a value is a tuple or record, performing deep equality checks, and converting between tuples/records and regular arrays/objects.
 * @version 1.0.1
 * @author Ferenc Czigler
 * @see https://github.com/Serrin/Defiant
 * @license MIT https://opensource.org/licenses/MIT
 */

const VERSION = "Defiant v1.0.1";

/*
function _deepFreeze(O: any): void {
  if (O != null && typeof O === "object") {
    Object.freeze(O);
    for (let key of Object.keys(O)) {
      if ((O as any)[key] !== null && typeof (O as any)[key] === "object") {
        _deepFreeze((O as any)[key]);
      }
    }
  }
}
*/


/* Tuple - immutable (frozen) array */

/**
 * @description Creates a frozen array (tuple) from the given values.
 *
 * @param {unknown[]} values - The values to include in the tuple.
 * @returns {unknown[]} A frozen tuple containing the given values.
 */
const Tuple = <T extends readonly unknown[]>(...values: T): T =>
  Object.freeze(values);

Tuple.VERSION = VERSION;

/**
 * @description Creates a frozen array (tuple) from the given values.
 *
 * @param {unknown[]} values - The values to include in the tuple.
 * @returns {unknown[]} A frozen tuple containing the given values.
 */
Tuple.of = <T extends readonly unknown[]>(...values: T): T => Tuple(...values);

/**
 * @description Creates a frozen array (tuple) from an iterable or array-like object.
 *
 * @param {unknown[]} values - The values to include in the tuple.
 * @returns {unknown[]} A frozen tuple containing the given values.
 */
Tuple.from = <T extends readonly unknown[]>(iterable: Iterable<unknown> | ArrayLike<unknown>): T =>
  Tuple(...(Array.from(iterable) as unknown as T));

/**
 * @description Checks if a value is a frozen array (tuple).
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} true if the value is a frozen array (tuple), false otherwise.
 */
Tuple.isTuple = (value: unknown): value is readonly unknown[] =>
  Array.isArray(value) && Object.isFrozen(value);

/**
 * @description This function performs a deep equality check, meaning it will compare nested arrays and objects recursively. It uses the SameValueZero comparison for primitives, which means that NaN is considered equal to NaN, and -0 and +0 are considered equal. For arrays and objects, it checks that they have the same structure and values.
 *
 * @param {readonly unknown[]} x - The first value to compare.
 * @param {readonly unknown[]} y - The second value to compare.
 * @returns {boolean} true if the values are equal, false otherwise.
 */
Tuple.isEqual = function <T extends readonly unknown[]>(x: T, y: T): boolean {
  /**
   * @description Checks if a value is an object (but not null).
   *
   * @param {unknown} value - The value to check.
   * @return {boolean} true if the value is an object (but not null), false otherwise.
  */
  const _isObject = (value: unknown): value is object =>
    value != null && typeof value === "object";
  /**
   * @description This function performs a deep equality check, meaning it will compare nested arrays and objects recursively. It uses the SameValueZero comparison for primitives, which means that NaN is considered equal to NaN, and -0 and +0 are considered equal. For arrays and objects, it checks that they have the same structure and values.
   *
   * @param {readonly unknown} x - The first value to compare.
   * @param {readonly unknown} y - The second value to compare.
   * @returns {boolean} true if the values are equal, false otherwise.
   */
  function _isEqual(x: unknown, y: unknown): boolean {
    /* SameValueZero comparison - for reference and primitive equality */
    if (x === y || (Number.isNaN(x) && Number.isNaN(y))) { return true; }
    /* if both are arrays, check their length and elements recursively */
    if (Array.isArray(x) && Array.isArray(y)) {
      if (x.length !== y.length) { return false; }
      if (x.length === 0) { return true; }
      for (let i = 0; i < x.length; i++) {
        if (!_isEqual(x[i], y[i])) { return false; }
      }
      return true;
    }
    /* if both are objects, check their prototype, keys and values recursively */
    if (_isObject(x) && _isObject(y)) {
      if (Object.getPrototypeOf(x) !== Object.getPrototypeOf(y)) {
        return false;
      }
      const xKeys = Object.keys(x);
      const yKeys = Object.keys(y);
      if (xKeys.length !== yKeys.length) { return false; }
      if (xKeys.length === 0) { return true; }
      for (let key of xKeys) {
        if (!yKeys.includes(key) || !_isEqual((x as any)[key], (y as any)[key])) {
          return false;
        }
      }
      return true;
    }
    /* if we reach here, it means they are not equal */
    return false;
  }
  /* return the result of the deep equality check */
  return _isEqual(x, y);
};

/**
 * @description Converts a frozen array (tuple) to a regular array. This creates a shallow copy of the tuple, so nested objects or arrays will still be shared between the original tuple and the new array.
 *
 * @param {readonly unknown[]} value - The tuple to convert to an array.
 * @returns {unknown[]} A shallow copy of the tuple as an array.
 */
Tuple.toArray = <T extends readonly unknown[]>(value: T): unknown[] =>
  Array.from(value);


/* Record - immutable (frozen) object */

/**
 * @description Creates a frozen object (record) from the given object. This function performs a shallow freeze, meaning that only the top-level properties of the object are frozen. Nested objects or arrays will not be frozen and can still be modified.
 *
 * @param {object} O - The object to freeze.
 * @returns {object} A frozen copy of the given object.
 */
const Record = <T extends object>(O: T): T =>
  Object.freeze(Object.assign({}, O)) as T;

Record.VERSION = VERSION;

/**
 * @description Creates a frozen object (record) from an iterable of key-value pairs. This function performs a shallow freeze, meaning that only the top-level properties of the object are frozen. Nested objects or arrays will not be frozen and can still be modified.
 *
 * @param {Iterable<readonly [keyof T, unknown]>} entries - The iterable of key-value pairs to create the record from.
 * @returns {object} A frozen object copy of the entries.
 */
Record.fromEntries = <T extends object>(entries: Iterable<readonly [keyof T, unknown]>): T =>
  Object.freeze(Object.fromEntries(entries)) as T;

/**
 * @description Creates a frozen object (record) from the given object. This function performs a shallow freeze, meaning that only the top-level properties of the object are frozen. Nested objects or arrays will not be frozen and can still be modified.
 *
 * @param {object} O - The object to freeze.
 * @returns {object} A frozen copy of the given object.
 */
Record.fromObject = <T extends object>(O: T): T => Record(O) as T;

/**
 * @description Checks if a value is a frozen object (record). This function checks that the value is an object (but not null) and that it is frozen. Note that this does not check for specific properties or structure, just that it is a frozen object.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is a frozen object (record), false otherwise.
 */
Record.isRecord = (value: unknown): value is object =>
  value != null && typeof value === "object" && Object.isFrozen(value);

/**
 * @description Alias for `Tuple.isEqual();`. This function performs a deep equality check, meaning it will compare nested arrays and objects recursively. It uses the SameValueZero comparison for primitives, which means that NaN is considered equal to NaN, and -0 and +0 are considered equal. For arrays and objects, it checks that they have the same structure and values.
 *
 * @param {readonly unknown} x - The first value to compare.
 * @param {readonly unknown} y - The second value to compare.
 * @returns {boolean} true if the values are equal, false otherwise.
 */
Record.isEqual = Tuple.isEqual;

/**
 * @description Converts a frozen object (record) to a regular object. This creates a shallow copy of the record, so nested objects or arrays will still be shared between the original record and the new object.
 *
 * @param {object} value - The frozen object (record) to convert.
 * @returns A shallow copy of the frozen object as a regular object.
 */
Record.toObject = <T extends object>(value: T): object =>
  Object.assign({}, value);


/* export the module */
export { Tuple, Record };
export default { Tuple, Record };
