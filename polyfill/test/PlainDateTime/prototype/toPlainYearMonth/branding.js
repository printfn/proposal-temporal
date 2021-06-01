// Copyright (C) 2021 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.plaindatetime.prototype.toplainyearmonth
features: [Symbol]
---*/

const toPlainYearMonth = Temporal.PlainDateTime.prototype.toPlainYearMonth;

assert.sameValue(typeof toPlainYearMonth, "function");

assert.throws(TypeError, () => toPlainYearMonth.call(undefined), "undefined");
assert.throws(TypeError, () => toPlainYearMonth.call(null), "null");
assert.throws(TypeError, () => toPlainYearMonth.call(true), "true");
assert.throws(TypeError, () => toPlainYearMonth.call(""), "empty string");
assert.throws(TypeError, () => toPlainYearMonth.call(Symbol()), "symbol");
assert.throws(TypeError, () => toPlainYearMonth.call(1), "1");
assert.throws(TypeError, () => toPlainYearMonth.call({}), "plain object");
assert.throws(TypeError, () => toPlainYearMonth.call(Temporal.PlainDateTime), "Temporal.PlainDateTime");
assert.throws(TypeError, () => toPlainYearMonth.call(Temporal.PlainDateTime.prototype), "Temporal.PlainDateTime.prototype");
