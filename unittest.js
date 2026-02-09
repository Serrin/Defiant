
import assert from "./assert.js";
globalThis.assert = assert;

// import all into a new celestra object
import { Tuple, Record } from "./defiant.js";
globalThis.Tuple = Tuple;
globalThis.Record = Record;

// import with default with name
//import { default as defiant } from "./defiant.js";
//globalThis.defiant = defiant;
//globalThis.Tuple = defiant.Tuple;
//globalThis.Record = defiant.Record;

// import the defaultExport object
//import defaultExport from "./defiant.js";
//globalThis.defiant = defaultExport;
//globalThis.Tuple = defiant.Tuple;
//globalThis.Record = defiant.Record;


/* Defiant v1.0.0 testcases for ESM environment */

const _isObject=(value)=>value!=null&&typeof value==="object";

try {

const testCases = [];

alert("Start of the test.");

testCases.push(
  assert.testSync( () => {
    assert.isTrue(Tuple.isTuple(Tuple(4,5,6)));
    assert.isFalse(Tuple.isTuple([4,5,6]));
    assert.isTrue(Tuple.isTuple(Tuple.of(4,5,6)));
    assert.isTrue(Tuple.isTuple(Tuple.from([4,5,6])));
    assert.isTrue(
      Tuple.isEqual(
        Tuple.of(4,5,Record.fromEntries([["a", 1], ["b", 2]])),
        Tuple.of(4,5,Record.fromObject({a:1, b:2}))
      )
    );
    assert.isTrue(
      Array.isArray(Tuple(4,5,6))
        && Object.isFrozen(Tuple(4,5,6))
        && Array.isArray(Tuple.toArray(Tuple(4,5,6)))
        && !Object.isFrozen(Tuple.toArray(Tuple(4,5,6)))
    );
  }, "Tuple")
);

testCases.push(
  assert.testSync( () => {
    assert.isTrue(Record.isRecord(Record({a:1, b:2})));
    assert.isFalse(Record.isRecord({a:1, b:2}));
    assert.isTrue(Record.isRecord(Record.fromEntries([["a", 1], ["b", 2]])));
    assert.isTrue(Record.isRecord(Record.fromObject({a:1, b:2})));
    assert.isTrue(
      Tuple.isEqual(
        Tuple.of(4,5,Record.fromEntries([["a", 1], ["b", 2]])),
        Tuple.of(4,5,Record.fromObject({a:1, b:2}))
      )
    );
    assert.isTrue(
      _isObject(Record({a:1, b:2}))
        && Object.isFrozen(Record({a:1, b:2}))
        && _isObject(Record.toObject(Record({a:1, b:2})))
        && !Object.isFrozen(Record.toObject(Record({a:1, b:2})))
    );
  }, "Record")
);

alert("End of the test.");

testCases
  .filter((item) => !assert.testCheck(item))
  .map((item) => JSON.stringify(item))
  .forEach((item) => alert(item));

} catch (error) {
  alert(error);
}
