// Copyright (C) 2020 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.now.timezone
features: [Temporal]
---*/

const tz = Temporal.now.timeZone;
const tz1 = tz();
const tz2 = tz();
assert.notSameValue(tz1, tz2);