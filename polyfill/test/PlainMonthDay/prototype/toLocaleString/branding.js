// Copyright (C) 2021 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.plainmonthday.prototype.tolocalestring
features: [Symbol]
---*/

const toLocaleString = Temporal.PlainMonthDay.prototype.toLocaleString;

assert.sameValue(typeof toLocaleString, "function");

assert.throws(TypeError, () => toLocaleString.call(undefined), "undefined");
assert.throws(TypeError, () => toLocaleString.call(null), "null");
assert.throws(TypeError, () => toLocaleString.call(true), "true");
assert.throws(TypeError, () => toLocaleString.call(""), "empty string");
assert.throws(TypeError, () => toLocaleString.call(Symbol()), "symbol");
assert.throws(TypeError, () => toLocaleString.call(1), "1");
assert.throws(TypeError, () => toLocaleString.call({}), "plain object");
assert.throws(TypeError, () => toLocaleString.call(Temporal.PlainMonthDay), "Temporal.PlainMonthDay");
assert.throws(TypeError, () => toLocaleString.call(Temporal.PlainMonthDay.prototype), "Temporal.PlainMonthDay.prototype");
