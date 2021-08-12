export namespace Temporal {
  export type ComparisonResult = -1 | 0 | 1;
  type RoundingMode = 'halfExpand' | 'ceil' | 'trunc' | 'floor';

  /**
   * Options for assigning fields using `with()` or entire objects with
   * `from()`.
   * */
  export type AssignmentOptions = {
    /**
     * How to deal with out-of-range values
     *
     * - In `'constrain'` mode, out-of-range values are clamped to the nearest
     *   in-range value.
     * - In `'reject'` mode, out-of-range values will cause the function to
     *   throw a RangeError.
     *
     * The default is `'constrain'`.
     */
    overflow: 'constrain' | 'reject';
  };

  /**
   * Options for assigning fields using `Duration.prototype.with()` or entire
   * objects with `Duration.from()`, and for arithmetic with
   * `Duration.prototype.add()` and `Duration.prototype.subtract()`.
   * */
  export type DurationOptions = {
    /**
     * How to deal with out-of-range values
     *
     * - In `'constrain'` mode, out-of-range values are clamped to the nearest
     *   in-range value.
     * - In `'balance'` mode, out-of-range values are resolved by balancing them
     *   with the next highest unit.
     *
     * The default is `'constrain'`.
     */
    overflow: 'constrain' | 'balance';
  };

  /**
   * Options for conversions of `Temporal.PlainDateTime` to `Temporal.Instant`
   * */
  export type ToInstantOptions = {
    /**
     * Controls handling of invalid or ambiguous times caused by time zone
     * offset changes like Daylight Saving time (DST) transitions.
     *
     * This option is only relevant if a `DateTime` value does not exist in the
     * destination time zone (e.g. near "Spring Forward" DST transitions), or
     * exists more than once (e.g. near "Fall Back" DST transitions).
     *
     * In case of ambiguous or non-existent times, this option controls what
     * exact time to return:
     * - `'compatible'`: Equivalent to `'earlier'` for backward transitions like
     *   the start of DST in the Spring, and `'later'` for forward transitions
     *   like the end of DST in the Fall. This matches the behavior of legacy
     *   `Date`, of libraries like moment.js, Luxon, or date-fns, and of
     *   cross-platform standards like [RFC 5545
     *   (iCalendar)](https://tools.ietf.org/html/rfc5545).
     * - `'earlier'`: The earlier time of two possible times
     * - `'later'`: The later of two possible times
     * - `'reject'`: Throw a RangeError instead
     *
     * The default is `'compatible'`.
     *
     * */
    disambiguation: 'compatible' | 'earlier' | 'later' | 'reject';
  };

  type OffsetDisambiguationOptions = {
    /**
     * Time zone definitions can change. If an application stores data about
     * events in the future, then stored data about future events may become
     * ambiguous, for example if a country permanently abolishes DST. The
     * `offset` option controls this unusual case.
     *
     * - `'use'` always uses the offset (if it's provided) to calculate the
     *   instant. This ensures that the result will match the instant that was
     *   originally stored, even if local clock time is different.
     * - `'prefer'` uses the offset if it's valid for the date/time in this time
     *   zone, but if it's not valid then the time zone will be used as a
     *   fallback to calculate the instant.
     * - `'ignore'` will disregard any provided offset. Instead, the time zone
     *    and date/time value are used to calculate the instant. This will keep
     *    local clock time unchanged but may result in a different real-world
     *    instant.
     * - `'reject'` acts like `'prefer'`, except it will throw a RangeError if
     *   the offset is not valid for the given time zone identifier and
     *   date/time value.
     *
     * If the ISO string ends in 'Z' then this option is ignored because there
     * is no possibility of ambiguity.
     *
     * If a time zone offset is not present in the input, then this option is
     * ignored because the time zone will always be used to calculate the
     * offset.
     *
     * If the offset is not used, and if the date/time and time zone don't
     * uniquely identify a single instant, then the `disambiguation` option will
     * be used to choose the correct instant. However, if the offset is used
     * then the `disambiguation` option will be ignored.
     */
    offset: 'use' | 'prefer' | 'ignore' | 'reject';
  };

  export type ZonedDateTimeAssignmentOptions = Partial<
    AssignmentOptions & ToInstantOptions & OffsetDisambiguationOptions
  >;

  /**
   * Options for arithmetic operations like `add()` and `subtract()`
   * */
  export type ArithmeticOptions = {
    /**
     * Controls handling of out-of-range arithmetic results.
     *
     * If a result is out of range, then `'constrain'` will clamp the result to
     * the allowed range, while `'reject'` will throw a RangeError.
     *
     * The default is `'constrain'`.
     */
    overflow: 'constrain' | 'reject';
  };

  /**
   * Options for outputting precision in toString() on types with seconds
   */
  export type ToStringPrecisionOptions = {
    fractionalSecondDigits?: 'auto' | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
    smallestUnit?:
      | 'minute'
      | 'second'
      | 'millisecond'
      | 'microsecond'
      | 'nanosecond'
      | /** @deprecated */ 'minutes'
      | /** @deprecated */ 'seconds'
      | /** @deprecated */ 'milliseconds'
      | /** @deprecated */ 'microseconds'
      | /** @deprecated */ 'nanoseconds';

    /**
     * Controls how rounding is performed:
     * - `halfExpand`: Round to the nearest of the values allowed by
     *   `roundingIncrement` and `smallestUnit`. When there is a tie, round up.
     *   This mode is the default.
     * - `ceil`: Always round up, towards the end of time.
     * - `trunc`: Always round down, towards the beginning of time.
     * - `floor`: Also round down, towards the beginning of time. This mode acts
     *   the same as `trunc`, but it's included for consistency with
     *   `Temporal.Duration.round()` where negative values are allowed and
     *   `trunc` rounds towards zero, unlike `floor` which rounds towards
     *   negative infinity which is usually unexpected. For this reason, `trunc`
     *   is recommended for most use cases.
     */
    roundingMode?: RoundingMode;
  };

  export type ShowCalendarOption = {
    calendarName: 'auto' | 'always' | 'never';
  };

  export type CalendarTypeToStringOptions = Partial<ToStringPrecisionOptions & ShowCalendarOption>;

  export type ZonedDateTimeToStringOptions = Partial<
    CalendarTypeToStringOptions & {
      timeZoneName: 'auto' | 'never';
      offset: 'auto' | 'never';
    }
  >;

  export type InstantToStringOptions = Partial<
    ToStringPrecisionOptions & {
      timeZone: TimeZoneProtocol | string;
    }
  >;

  /**
   * Options to control the result of `until()` and `since()` methods in
   * `Temporal` types.
   */
  export interface DifferenceOptions<T extends string> {
    /**
     * The largest unit to allow in the resulting `Temporal.Duration` object.
     *
     * Valid values may include `'year'`, `'month'`, `'week'`, `'day'`,
     * `'hour'`, `'minute'`, `'second'`, `'millisecond'`, `'microsecond'`,
     * `'nanosecond'` and `'auto'`, although some types may throw an exception
     * if a value is used that would produce an invalid result. For example,
     * `hours` is not accepted by `Temporal.PlainDate.prototype.since()`.
     *
     * The default is always `'auto'`, though the meaning of this depends on the
     * type being used.
     */
    largestUnit?: 'auto' | T;

    /**
     * The unit to round to. For example, to round to the nearest minute, use
     * `smallestUnit: 'minute'`. This option is required for `round()` and
     * optional for `until()` and `since()`.
     */
    smallestUnit?: T;

    /**
     * Allows rounding to an integer number of units. For example, to round to
     * increments of a half hour, use `{ smallestUnit: 'minute',
     * roundingIncrement: 30 }`.
     */
    roundingIncrement?: number;

    /**
     * Controls how rounding is performed:
     * - `halfExpand`: Round to the nearest of the values allowed by
     *   `roundingIncrement` and `smallestUnit`. When there is a tie, round away
     *   from zero like `ceil` for positive durations and like `floor` for
     *   negative durations.
     * - `ceil`: Always round up, towards the end of time.
     * - `trunc`: Always round down, towards the beginning of time. This mode is
     *   the default.
     * - `floor`: Also round down, towards the beginning of time. This mode acts
     *   the same as `trunc`, but it's included for consistency with
     *   `Temporal.Duration.round()` where negative values are allowed and
     *   `trunc` rounds towards zero, unlike `floor` which rounds towards
     *   negative infinity which is usually unexpected. For this reason, `trunc`
     *   is recommended for most use cases.
     */
    roundingMode?: RoundingMode;
  }

  /**
   * Options to control rounding behavior
   */
  export interface RoundOptions<T extends string> {
    /**
     * The unit to round to. For example, to round to the nearest minute, use
     * `smallestUnit: 'minute'`. This option is required.
     */
    smallestUnit: T;

    /**
     * Allows rounding to an integer number of units. For example, to round to
     * increments of a half hour, use `{ smallestUnit: 'minute',
     * roundingIncrement: 30 }`.
     */
    roundingIncrement?: number;

    /**
     * Controls how rounding is performed:
     * - `halfExpand`: Round to the nearest of the values allowed by
     *   `roundingIncrement` and `smallestUnit`. When there is a tie, round up.
     *   This mode is the default.
     * - `ceil`: Always round up, towards the end of time.
     * - `trunc`: Always round down, towards the beginning of time.
     * - `floor`: Also round down, towards the beginning of time. This mode acts
     *   the same as `trunc`, but it's included for consistency with
     *   `Temporal.Duration.round()` where negative values are allowed and
     *   `trunc` rounds towards zero, unlike `floor` which rounds towards
     *   negative infinity which is usually unexpected. For this reason, `trunc`
     *   is recommended for most use cases.
     */
    roundingMode?: RoundingMode;
  }

  export interface DurationRoundOptions {
    /**
     * The largest unit to allow in the resulting `Temporal.Duration` object.
     *
     * Valid values include `'year'`, `'month'`, `'week'`, `'day'`, `'hour'`,
     * `'minute'`, `'second'`, `'millisecond'`, `'microsecond'`, `'nanosecond'`
     * and `'auto'`.
     *
     * The default is `'auto'`, which means "the largest nonzero unit in the
     * input duration". This default prevents expanding durations to larger
     * units unless the caller opts into this behavior.
     *
     * If `smallestUnit` is larger, then `smallestUnit` will be used as
     * `largestUnit`, superseding a caller-supplied or default value.
     */
    largestUnit:
      | 'auto'
      | 'year'
      | 'month'
      | 'week'
      | 'day'
      | 'hour'
      | 'minute'
      | 'second'
      | 'millisecond'
      | 'microsecond'
      | 'nanosecond'
      | /** @deprecated */ 'years'
      | /** @deprecated */ 'months'
      | /** @deprecated */ 'weeks'
      | /** @deprecated */ 'days'
      | /** @deprecated */ 'hours'
      | /** @deprecated */ 'minutes'
      | /** @deprecated */ 'seconds'
      | /** @deprecated */ 'milliseconds'
      | /** @deprecated */ 'microseconds'
      | /** @deprecated */ 'nanoseconds';

    /**
     * The unit to round to. For example, to round to the nearest minute, use
     * `smallestUnit: 'minute'`. This option is required.
     */
    smallestUnit:
      | 'year'
      | 'month'
      | 'week'
      | 'day'
      | 'hour'
      | 'minute'
      | 'second'
      | 'millisecond'
      | 'microsecond'
      | 'nanosecond'
      | /** @deprecated */ 'years'
      | /** @deprecated */ 'months'
      | /** @deprecated */ 'weeks'
      | /** @deprecated */ 'days'
      | /** @deprecated */ 'hours'
      | /** @deprecated */ 'minutes'
      | /** @deprecated */ 'seconds'
      | /** @deprecated */ 'milliseconds'
      | /** @deprecated */ 'microseconds'
      | /** @deprecated */ 'nanoseconds';

    /**
     * Allows rounding to an integer number of units. For example, to round to
     * increments of a half hour, use `{ smallestUnit: 'minute',
     * roundingIncrement: 30 }`.
     */
    roundingIncrement?: number;

    /**
     * Controls how rounding is performed:
     * - `halfExpand`: Round to the nearest of the values allowed by
     *   `roundingIncrement` and `smallestUnit`. When there is a tie, round away
     *   from zero like `ceil` for positive durations and like `floor` for
     *   negative durations. This mode is the default.
     * - `ceil`: Always round towards positive infinity. For negative durations
     *   this option will decrease the absolute value of the duration which may
     *   be unexpected. To round away from zero, use `ceil` for positive
     *   durations and `floor` for negative durations.
     * - `trunc`: Always round down towards zero.
     * - `floor`: Always round towards negative infinity. This mode acts the
     *   same as `trunc` for positive durations but for negative durations it
     *   will increase the absolute value of the result which may be unexpected.
     *   For this reason, `trunc` is recommended for most "round down" use
     *   cases.
     */
    roundingMode?: RoundingMode;

    /**
     * The starting point to use for rounding and conversions when
     * variable-length units (years, months, weeks depending on the calendar)
     * are involved. This option is required if any of the following are true:
     * - `unit` is `'week'` or larger units
     * - `this` has a nonzero value for `weeks` or larger units
     *
     * This value must be either a `Temporal.PlainDateTime`, a
     * `Temporal.ZonedDateTime`, or a string or object value that can be passed
     * to `from()` of those types. Examples:
     * - `'2020-01'01T00:00-08:00[America/Los_Angeles]'`
     * - `'2020-01'01'`
     * - `Temporal.PlainDate.from('2020-01-01')`
     *
     * `Temporal.ZonedDateTime` will be tried first because it's more
     * specific, with `Temporal.PlainDateTime` as a fallback.
     *
     * If the value resolves to a `Temporal.ZonedDateTime`, then operation will
     * adjust for DST and other time zone transitions. Otherwise (including if
     * this option is omitted), then the operation will ignore time zone
     * transitions and all days will be assumed to be 24 hours long.
     */
    relativeTo?: Temporal.PlainDateTime | Temporal.ZonedDateTime | PlainDateTimeLike | ZonedDateTimeLike | string;
  }

  /**
   * Options to control behavior of `Duration.prototype.total()`
   */
  export interface DurationTotalOptions {
    /**
     * The unit to convert the duration to. This option is required.
     */
    unit:
      | 'year'
      | 'month'
      | 'week'
      | 'day'
      | 'hour'
      | 'minute'
      | 'second'
      | 'millisecond'
      | 'microsecond'
      | 'nanosecond'
      | /** @deprecated */ 'years'
      | /** @deprecated */ 'months'
      | /** @deprecated */ 'weeks'
      | /** @deprecated */ 'days'
      | /** @deprecated */ 'hours'
      | /** @deprecated */ 'minutes'
      | /** @deprecated */ 'seconds'
      | /** @deprecated */ 'milliseconds'
      | /** @deprecated */ 'microseconds'
      | /** @deprecated */ 'nanoseconds';

    /**
     * The starting point to use when variable-length units (years, months,
     * weeks depending on the calendar) are involved. This option is required if
     * any of the following are true:
     * - `unit` is `'week'` or larger units
     * - `this` has a nonzero value for `weeks` or larger units
     *
     * This value must be either a `Temporal.PlainDateTime`, a
     * `Temporal.ZonedDateTime`, or a string or object value that can be passed
     * to `from()` of those types. Examples:
     * - `'2020-01'01T00:00-08:00[America/Los_Angeles]'`
     * - `'2020-01'01'`
     * - `Temporal.PlainDate.from('2020-01-01')`
     *
     * `Temporal.ZonedDateTime` will be tried first because it's more
     * specific, with `Temporal.PlainDateTime` as a fallback.
     *
     * If the value resolves to a `Temporal.ZonedDateTime`, then operation will
     * adjust for DST and other time zone transitions. Otherwise (including if
     * this option is omitted), then the operation will ignore time zone
     * transitions and all days will be assumed to be 24 hours long.
     */
    relativeTo?: Temporal.PlainDateTime | PlainDateTimeLike | string;
  }

  /**
   * Options to control behavior of `Duration.compare()`
   */
  export interface DurationCompareOptions {
    /**
     * The starting point to use when variable-length units (years, months,
     * weeks depending on the calendar) are involved. This option is required if
     * either of the durations has a nonzero value for `weeks` or larger units.
     *
     * This value must be either a `Temporal.PlainDateTime`, a
     * `Temporal.ZonedDateTime`, or a string or object value that can be passed
     * to `from()` of those types. Examples:
     * - `'2020-01'01T00:00-08:00[America/Los_Angeles]'`
     * - `'2020-01'01'`
     * - `Temporal.PlainDate.from('2020-01-01')`
     *
     * `Temporal.ZonedDateTime` will be tried first because it's more
     * specific, with `Temporal.PlainDateTime` as a fallback.
     *
     * If the value resolves to a `Temporal.ZonedDateTime`, then operation will
     * adjust for DST and other time zone transitions. Otherwise (including if
     * this option is omitted), then the operation will ignore time zone
     * transitions and all days will be assumed to be 24 hours long.
     */
    relativeTo?: Temporal.ZonedDateTime | Temporal.PlainDateTime | ZonedDateTimeLike | PlainDateTimeLike | string;
  }

  export type DurationLike = {
    years?: number;
    months?: number;
    weeks?: number;
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
    milliseconds?: number;
    microseconds?: number;
    nanoseconds?: number;
  };

  /**
   *
   * A `Temporal.Duration` represents an immutable duration of time which can be
   * used in date/time arithmetic.
   *
   * See https://tc39.es/proposal-temporal/docs/duration.html for more details.
   */
  export class Duration {
    static from(item: Temporal.Duration | DurationLike | string): Temporal.Duration;
    static compare(
      one: Temporal.Duration | DurationLike | string,
      two: Temporal.Duration | DurationLike | string,
      options?: DurationCompareOptions
    ): ComparisonResult;
    constructor(
      years?: number,
      months?: number,
      weeks?: number,
      days?: number,
      hours?: number,
      minutes?: number,
      seconds?: number,
      milliseconds?: number,
      microseconds?: number,
      nanoseconds?: number
    );
    readonly sign: -1 | 0 | 1;
    readonly blank: boolean;
    readonly years: number;
    readonly months: number;
    readonly weeks: number;
    readonly days: number;
    readonly hours: number;
    readonly minutes: number;
    readonly seconds: number;
    readonly milliseconds: number;
    readonly microseconds: number;
    readonly nanoseconds: number;
    negated(): Temporal.Duration;
    abs(): Temporal.Duration;
    with(durationLike: DurationLike): Temporal.Duration;
    add(other: Temporal.Duration | DurationLike | string, options?: DurationRoundOptions): Temporal.Duration;
    subtract(other: Temporal.Duration | DurationLike | string, options?: DurationRoundOptions): Temporal.Duration;
    round(options: DurationRoundOptions): Temporal.Duration;
    total(options: DurationTotalOptions): number;
    toLocaleString(locales?: string | string[], options?: Intl.DateTimeFormatOptions): string;
    toJSON(): string;
    toString(options?: ToStringPrecisionOptions): string;
  }

  /**
   * A `Temporal.Instant` is an exact point in time, with a precision in
   * nanoseconds. No time zone or calendar information is present. Therefore,
   * `Temporal.Instant` has no concept of days, months, or even hours.
   *
   * For convenience of interoperability, it internally uses nanoseconds since
   * the {@link https://en.wikipedia.org/wiki/Unix_time|Unix epoch} (midnight
   * UTC on January 1, 1970). However, a `Temporal.Instant` can be created from
   * any of several expressions that refer to a single point in time, including
   * an {@link https://en.wikipedia.org/wiki/ISO_8601|ISO 8601 string} with a
   * time zone offset such as '2020-01-23T17:04:36.491865121-08:00'.
   *
   * See https://tc39.es/proposal-temporal/docs/instant.html for more details.
   */
  export class Instant {
    static fromEpochSeconds(epochSeconds: number): Temporal.Instant;
    static fromEpochMilliseconds(epochMilliseconds: number): Temporal.Instant;
    static fromEpochMicroseconds(epochMicroseconds: bigint): Temporal.Instant;
    static fromEpochNanoseconds(epochNanoseconds: bigint): Temporal.Instant;
    static from(item: Temporal.Instant | string): Temporal.Instant;
    static compare(one: Temporal.Instant | string, two: Temporal.Instant | string): ComparisonResult;
    constructor(epochNanoseconds: bigint);
    readonly epochSeconds: number;
    readonly epochMilliseconds: number;
    readonly epochMicroseconds: bigint;
    readonly epochNanoseconds: bigint;
    equals(other: Temporal.Instant | string): boolean;
    add(
      durationLike: Omit<Temporal.Duration | DurationLike, 'years' | 'months' | 'weeks' | 'days'> | string
    ): Temporal.Instant;
    subtract(
      durationLike: Omit<Temporal.Duration | DurationLike, 'years' | 'months' | 'weeks' | 'days'> | string
    ): Temporal.Instant;
    until(
      other: Temporal.Instant | string,
      options?: DifferenceOptions<
        | 'hour'
        | 'minute'
        | 'second'
        | 'millisecond'
        | 'microsecond'
        | 'nanosecond'
        | /** @deprecated */ 'hours'
        | /** @deprecated */ 'minutes'
        | /** @deprecated */ 'seconds'
        | /** @deprecated */ 'milliseconds'
        | /** @deprecated */ 'microseconds'
        | /** @deprecated */ 'nanoseconds'
      >
    ): Temporal.Duration;
    since(
      other: Temporal.Instant | string,
      options?: DifferenceOptions<
        | 'hour'
        | 'minute'
        | 'second'
        | 'millisecond'
        | 'microsecond'
        | 'nanosecond'
        | /** @deprecated */ 'hours'
        | /** @deprecated */ 'minutes'
        | /** @deprecated */ 'seconds'
        | /** @deprecated */ 'milliseconds'
        | /** @deprecated */ 'microseconds'
        | /** @deprecated */ 'nanoseconds'
      >
    ): Temporal.Duration;
    round(
      options: RoundOptions<
        | 'hour'
        | 'minute'
        | 'second'
        | 'millisecond'
        | 'microsecond'
        | 'nanosecond'
        | /** @deprecated */ 'hours'
        | /** @deprecated */ 'minutes'
        | /** @deprecated */ 'seconds'
        | /** @deprecated */ 'milliseconds'
        | /** @deprecated */ 'microseconds'
        | /** @deprecated */ 'nanoseconds'
      >
    ): Temporal.Instant;
    toZonedDateTime(calendarAndTimeZone: {
      timeZone: TimeZoneProtocol | string;
      calendar: CalendarProtocol | string;
    }): Temporal.ZonedDateTime;
    toZonedDateTimeISO(
      tzLike: TimeZoneProtocol | string | { timeZone: TimeZoneProtocol | string }
    ): Temporal.ZonedDateTime;
    toLocaleString(locales?: string | string[], options?: Intl.DateTimeFormatOptions): string;
    toJSON(): string;
    toString(options?: InstantToStringOptions): string;
    valueOf(): never;
  }

  export interface CalendarProtocol {
    id?: string;
    calendar?: never;
    year(date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainYearMonth | PlainDateLike | string): number;
    month(
      date:
        | Temporal.PlainDate
        | Temporal.PlainDateTime
        | Temporal.PlainYearMonth
        | Temporal.PlainMonthDay
        | PlainDateLike
        | string
    ): number;
    monthCode(
      date:
        | Temporal.PlainDate
        | Temporal.PlainDateTime
        | Temporal.PlainYearMonth
        | Temporal.PlainMonthDay
        | PlainDateLike
        | string
    ): string;
    day(date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainMonthDay | PlainDateLike | string): number;
    era(date: Temporal.PlainDate | Temporal.PlainDateTime | PlainDateLike | string): string | undefined;
    eraYear(date: Temporal.PlainDate | Temporal.PlainDateTime | PlainDateLike | string): number | undefined;
    dayOfWeek?(date: Temporal.PlainDate | Temporal.PlainDateTime | PlainDateLike | string): number;
    dayOfYear?(date: Temporal.PlainDate | Temporal.PlainDateTime | PlainDateLike | string): number;
    weekOfYear?(date: Temporal.PlainDate | Temporal.PlainDateTime | PlainDateLike | string): number;
    daysInWeek?(date: Temporal.PlainDate | Temporal.PlainDateTime | PlainDateLike | string): number;
    daysInMonth?(
      date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainYearMonth | PlainDateLike | string
    ): number;
    daysInYear?(
      date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainYearMonth | PlainDateLike | string
    ): number;
    monthsInYear?(
      date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainYearMonth | PlainDateLike | string
    ): number;
    inLeapYear?(
      date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainYearMonth | PlainDateLike | string
    ): boolean;
    dateFromFields(
      fields: { year: number | undefined; month: number | undefined; monthCode: string | undefined; day: number },
      options: AssignmentOptions
    ): Temporal.PlainDate;
    yearMonthFromFields(
      fields: { year: number | undefined; month: number | undefined; monthCode: string | undefined },
      options: AssignmentOptions
    ): Temporal.PlainYearMonth;
    monthDayFromFields(
      fields: { year: number | undefined; month: number | undefined; monthCode: string | undefined; day: number },
      options: AssignmentOptions
    ): Temporal.PlainMonthDay;
    dateAdd?(
      date: Temporal.PlainDate | PlainDateLike | string,
      duration: Temporal.Duration | DurationLike | string,
      options: ArithmeticOptions
    ): Temporal.PlainDate;
    dateUntil?(
      one: Temporal.PlainDate | PlainDateLike | string,
      two: Temporal.PlainDate | PlainDateLike | string,
      options: DifferenceOptions<
        | 'year'
        | 'month'
        | 'week'
        | 'day'
        | /** @deprecated */ 'years'
        | /** @deprecated */ 'months'
        | /** @deprecated */ 'weeks'
        | /** @deprecated */ 'days'
      >
    ): Temporal.Duration;
    fields?(fields: Iterable<string>): Iterable<string>;
    mergeFields?(fields: Record<string, unknown>, additionalFields: Record<string, unknown>): Record<string, unknown>;
    toString(): string;
  }

  /**
   * A `Temporal.Calendar` is a representation of a calendar system. It includes
   * information about how many days are in each year, how many months are in
   * each year, how many days are in each month, and how to do arithmetic in
   * that calendar system.
   *
   * See https://tc39.es/proposal-temporal/docs/calendar.html for more details.
   */
  export class Calendar implements Omit<Required<CalendarProtocol>, 'calendar'> {
    static from(item: CalendarProtocol | string): Temporal.Calendar;
    constructor(calendarIdentifier: string);
    readonly id: string;
    year(date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainYearMonth | PlainDateLike | string): number;
    month(
      date:
        | Temporal.PlainDate
        | Temporal.PlainDateTime
        | Temporal.PlainYearMonth
        | Temporal.PlainMonthDay
        | PlainDateLike
        | string
    ): number;
    monthCode(
      date:
        | Temporal.PlainDate
        | Temporal.PlainDateTime
        | Temporal.PlainYearMonth
        | Temporal.PlainMonthDay
        | PlainDateLike
        | string
    ): string;
    day(date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainMonthDay | PlainDateLike | string): number;
    era(date: Temporal.PlainDate | Temporal.PlainDateTime | PlainDateLike | string): string | undefined;
    eraYear(date: Temporal.PlainDate | Temporal.PlainDateTime | PlainDateLike | string): number | undefined;
    dayOfWeek(date: Temporal.PlainDate | Temporal.PlainDateTime | PlainDateLike | string): number;
    dayOfYear(date: Temporal.PlainDate | Temporal.PlainDateTime | PlainDateLike | string): number;
    weekOfYear(date: Temporal.PlainDate | Temporal.PlainDateTime | PlainDateLike | string): number;
    daysInWeek(date: Temporal.PlainDate | Temporal.PlainDateTime | PlainDateLike | string): number;
    daysInMonth(
      date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainYearMonth | PlainDateLike | string
    ): number;
    daysInYear(
      date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainYearMonth | PlainDateLike | string
    ): number;
    monthsInYear(
      date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainYearMonth | PlainDateLike | string
    ): number;
    inLeapYear(
      date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainYearMonth | PlainDateLike | string
    ): boolean;
    dateFromFields(
      fields: { year: number | undefined; month: number | undefined; monthCode: string | undefined; day: number },
      options: AssignmentOptions
    ): Temporal.PlainDate;
    yearMonthFromFields(
      fields: { year: number | undefined; month: number | undefined; monthCode: string | undefined },
      options: AssignmentOptions
    ): Temporal.PlainYearMonth;
    monthDayFromFields(
      fields: { year: number | undefined; month: number | undefined; monthCode: string | undefined; day: number },
      options: AssignmentOptions
    ): Temporal.PlainMonthDay;
    dateAdd(
      date: Temporal.PlainDate | PlainDateLike | string,
      duration: Temporal.Duration | DurationLike | string,
      options: ArithmeticOptions
    ): Temporal.PlainDate;
    dateUntil(
      one: Temporal.PlainDate | PlainDateLike | string,
      two: Temporal.PlainDate | PlainDateLike | string,
      options?: DifferenceOptions<
        | 'year'
        | 'month'
        | 'week'
        | 'day'
        | /** @deprecated */ 'years'
        | /** @deprecated */ 'months'
        | /** @deprecated */ 'weeks'
        | /** @deprecated */ 'days'
      >
    ): Temporal.Duration;
    fields(fields: Iterable<string>): Iterable<string>;
    mergeFields(fields: Record<string, unknown>, additionalFields: Record<string, unknown>): Record<string, unknown>;
    toString(): string;
  }

  export type PlainDateLike = {
    year?: number;
    month?: number;
    monthCode?: string;
    day?: number;
    calendar?: CalendarProtocol | string;
  };

  type PlainDateISOFields = {
    isoYear: number;
    isoMonth: number;
    isoDay: number;
    calendar: CalendarProtocol;
  };

  /**
   * A `Temporal.PlainDate` represents a calendar date. "Calendar date" refers to the
   * concept of a date as expressed in everyday usage, independent of any time
   * zone. For example, it could be used to represent an event on a calendar
   * which happens during the whole day no matter which time zone it's happening
   * in.
   *
   * See https://tc39.es/proposal-temporal/docs/date.html for more details.
   */
  export class PlainDate {
    static from(item: Temporal.PlainDate | PlainDateLike | string, options?: AssignmentOptions): Temporal.PlainDate;
    static compare(
      one: Temporal.PlainDate | PlainDateLike | string,
      two: Temporal.PlainDate | PlainDateLike | string
    ): ComparisonResult;
    constructor(isoYear: number, isoMonth: number, isoDay: number, calendar?: CalendarProtocol);
    readonly era: string | undefined;
    readonly eraYear: number | undefined;
    readonly year: number;
    readonly month: number;
    readonly monthCode: string;
    readonly day: number;
    readonly calendar: CalendarProtocol;
    readonly dayOfWeek: number;
    readonly dayOfYear: number;
    readonly weekOfYear: number;
    readonly daysInWeek: number;
    readonly daysInYear: number;
    readonly daysInMonth: number;
    readonly monthsInYear: number;
    readonly inLeapYear: boolean;
    equals(other: Temporal.PlainDate | PlainDateLike | string): boolean;
    with(dateLike: PlainDateLike, options?: AssignmentOptions): Temporal.PlainDate;
    withCalendar(calendar: CalendarProtocol | string): Temporal.PlainDate;
    add(durationLike: Temporal.Duration | DurationLike | string, options?: ArithmeticOptions): Temporal.PlainDate;
    subtract(durationLike: Temporal.Duration | DurationLike | string, options?: ArithmeticOptions): Temporal.PlainDate;
    until(
      other: Temporal.PlainDate | PlainDateLike | string,
      options?: DifferenceOptions<
        | 'year'
        | 'month'
        | 'week'
        | 'day'
        | /** @deprecated */ 'years'
        | /** @deprecated */ 'months'
        | /** @deprecated */ 'weeks'
        | /** @deprecated */ 'days'
      >
    ): Temporal.Duration;
    since(
      other: Temporal.PlainDate | PlainDateLike | string,
      options?: DifferenceOptions<
        | 'year'
        | 'month'
        | 'week'
        | 'day'
        | /** @deprecated */ 'years'
        | /** @deprecated */ 'months'
        | /** @deprecated */ 'weeks'
        | /** @deprecated */ 'days'
      >
    ): Temporal.Duration;
    toPlainDateTime(temporalTime?: Temporal.PlainTime | PlainTimeLike | string): Temporal.PlainDateTime;
    toZonedDateTime(
      timeZoneAndTime:
        | TimeZoneProtocol
        | string
        | {
            timeZone: TimeZoneProtocol | string;
            plainTime?: Temporal.PlainTime | PlainTimeLike | string;
          }
    ): Temporal.ZonedDateTime;
    toPlainYearMonth(): Temporal.PlainYearMonth;
    toPlainMonthDay(): Temporal.PlainMonthDay;
    getISOFields(): PlainDateISOFields;
    toLocaleString(locales?: string | string[], options?: Intl.DateTimeFormatOptions): string;
    toJSON(): string;
    toString(options?: ShowCalendarOption): string;
    valueOf(): never;
  }

  export type PlainDateTimeLike = {
    year?: number;
    month?: number;
    monthCode?: string;
    day?: number;
    hour?: number;
    minute?: number;
    second?: number;
    millisecond?: number;
    microsecond?: number;
    nanosecond?: number;
    calendar?: CalendarProtocol | string;
  };

  type PlainDateTimeISOFields = {
    isoYear: number;
    isoMonth: number;
    isoDay: number;
    isoHour: number;
    isoMinute: number;
    isoSecond: number;
    isoMillisecond: number;
    isoMicrosecond: number;
    isoNanosecond: number;
    calendar: CalendarProtocol;
  };

  /**
   * A `Temporal.PlainDateTime` represents a calendar date and wall-clock time, with
   * a precision in nanoseconds, and without any time zone. Of the Temporal
   * classes carrying human-readable time information, it is the most general
   * and complete one. `Temporal.PlainDate`, `Temporal.PlainTime`, `Temporal.PlainYearMonth`,
   * and `Temporal.PlainMonthDay` all carry less information and should be used when
   * complete information is not required.
   *
   * See https://tc39.es/proposal-temporal/docs/datetime.html for more details.
   */
  export class PlainDateTime {
    static from(
      item: Temporal.PlainDateTime | PlainDateTimeLike | string,
      options?: AssignmentOptions
    ): Temporal.PlainDateTime;
    static compare(
      one: Temporal.PlainDateTime | PlainDateTimeLike | string,
      two: Temporal.PlainDateTime | PlainDateTimeLike | string
    ): ComparisonResult;
    constructor(
      isoYear: number,
      isoMonth: number,
      isoDay: number,
      hour?: number,
      minute?: number,
      second?: number,
      millisecond?: number,
      microsecond?: number,
      nanosecond?: number,
      calendar?: CalendarProtocol
    );
    readonly era: string | undefined;
    readonly eraYear: number | undefined;
    readonly year: number;
    readonly month: number;
    readonly monthCode: string;
    readonly day: number;
    readonly hour: number;
    readonly minute: number;
    readonly second: number;
    readonly millisecond: number;
    readonly microsecond: number;
    readonly nanosecond: number;
    readonly calendar: CalendarProtocol;
    readonly dayOfWeek: number;
    readonly dayOfYear: number;
    readonly weekOfYear: number;
    readonly daysInWeek: number;
    readonly daysInYear: number;
    readonly daysInMonth: number;
    readonly monthsInYear: number;
    readonly inLeapYear: boolean;
    equals(other: Temporal.PlainDateTime | PlainDateTimeLike | string): boolean;
    with(dateTimeLike: PlainDateTimeLike, options?: AssignmentOptions): Temporal.PlainDateTime;
    withPlainTime(timeLike?: Temporal.PlainTime | PlainTimeLike | string): Temporal.PlainDateTime;
    withPlainDate(dateLike: Temporal.PlainDate | PlainDateLike | string): Temporal.PlainDateTime;
    withCalendar(calendar: CalendarProtocol | string): Temporal.PlainDateTime;
    add(durationLike: Temporal.Duration | DurationLike | string, options?: ArithmeticOptions): Temporal.PlainDateTime;
    subtract(
      durationLike: Temporal.Duration | DurationLike | string,
      options?: ArithmeticOptions
    ): Temporal.PlainDateTime;
    until(
      other: Temporal.PlainDateTime | PlainDateTimeLike | string,
      options?: DifferenceOptions<
        | 'year'
        | 'month'
        | 'week'
        | 'day'
        | 'hour'
        | 'minute'
        | 'second'
        | 'millisecond'
        | 'microsecond'
        | 'nanosecond'
        | /** @deprecated */ 'years'
        | /** @deprecated */ 'months'
        | /** @deprecated */ 'weeks'
        | /** @deprecated */ 'days'
        | /** @deprecated */ 'hours'
        | /** @deprecated */ 'minutes'
        | /** @deprecated */ 'seconds'
        | /** @deprecated */ 'milliseconds'
        | /** @deprecated */ 'microseconds'
        | /** @deprecated */ 'nanoseconds'
      >
    ): Temporal.Duration;
    since(
      other: Temporal.PlainDateTime | PlainDateTimeLike | string,
      options?: DifferenceOptions<
        | 'year'
        | 'month'
        | 'week'
        | 'day'
        | 'hour'
        | 'minute'
        | 'second'
        | 'millisecond'
        | 'microsecond'
        | 'nanosecond'
        | /** @deprecated */ 'years'
        | /** @deprecated */ 'months'
        | /** @deprecated */ 'weeks'
        | /** @deprecated */ 'days'
        | /** @deprecated */ 'hours'
        | /** @deprecated */ 'minutes'
        | /** @deprecated */ 'seconds'
        | /** @deprecated */ 'milliseconds'
        | /** @deprecated */ 'microseconds'
        | /** @deprecated */ 'nanoseconds'
      >
    ): Temporal.Duration;
    round(
      options: RoundOptions<
        | 'day'
        | 'hour'
        | 'minute'
        | 'second'
        | 'millisecond'
        | 'microsecond'
        | 'nanosecond'
        | /** @deprecated */ 'days'
        | /** @deprecated */ 'hours'
        | /** @deprecated */ 'minutes'
        | /** @deprecated */ 'seconds'
        | /** @deprecated */ 'milliseconds'
        | /** @deprecated */ 'microseconds'
        | /** @deprecated */ 'nanoseconds'
      >
    ): Temporal.PlainDateTime;
    toZonedDateTime(tzLike: TimeZoneProtocol | string, options?: ToInstantOptions): Temporal.ZonedDateTime;
    toPlainDate(): Temporal.PlainDate;
    toPlainYearMonth(): Temporal.PlainYearMonth;
    toPlainMonthDay(): Temporal.PlainMonthDay;
    toPlainTime(): Temporal.PlainTime;
    getISOFields(): PlainDateTimeISOFields;
    toLocaleString(locales?: string | string[], options?: Intl.DateTimeFormatOptions): string;
    toJSON(): string;
    toString(options?: CalendarTypeToStringOptions): string;
    valueOf(): never;
  }

  export type PlainMonthDayLike = {
    year?: number;
    month?: number;
    monthCode?: string;
    day?: number;
    calendar?: CalendarProtocol | string;
  };

  /**
   * A `Temporal.PlainMonthDay` represents a particular day on the calendar, but
   * without a year. For example, it could be used to represent a yearly
   * recurring event, like "Bastille Day is on the 14th of July."
   *
   * See https://tc39.es/proposal-temporal/docs/monthday.html for more details.
   */
  export class PlainMonthDay {
    static from(
      item: Temporal.PlainMonthDay | PlainMonthDayLike | string,
      options?: AssignmentOptions
    ): Temporal.PlainMonthDay;
    constructor(isoMonth: number, isoDay: number, calendar?: CalendarProtocol, referenceISOYear?: number);
    readonly monthCode: string;
    readonly day: number;
    readonly calendar: CalendarProtocol;
    equals(other: Temporal.PlainMonthDay | PlainMonthDayLike | string): boolean;
    with(monthDayLike: PlainMonthDayLike, options?: AssignmentOptions): Temporal.PlainMonthDay;
    toPlainDate(year: { year: number }): Temporal.PlainDate;
    getISOFields(): PlainDateISOFields;
    toLocaleString(locales?: string | string[], options?: Intl.DateTimeFormatOptions): string;
    toJSON(): string;
    toString(options?: ShowCalendarOption): string;
    valueOf(): never;
  }

  // Temporal.PlainTime's `calendar` field is a Temporal.Calendar, not a
  // Temporal.CalendarProtocol, because that type's calendar is not customizable
  // by users. Temporal.ZonedDateTime and Temporal.PlainDateTime are also
  // "time-like" but their `calendar` is a Temporal.CalendarProtocol. Therefore,
  // those types are added below to ensure that their instances are accepted by
  // methods that take a PlainTimeLike object.
  export type PlainTimeLike =
    | {
        hour?: number;
        minute?: number;
        second?: number;
        millisecond?: number;
        microsecond?: number;
        nanosecond?: number;
        calendar?: Temporal.Calendar | 'iso8601';
      }
    | Temporal.ZonedDateTime
    | Temporal.PlainDateTime;

  type PlainTimeISOFields = {
    isoHour: number;
    isoMinute: number;
    isoSecond: number;
    isoMillisecond: number;
    isoMicrosecond: number;
    isoNanosecond: number;
    calendar: Temporal.Calendar;
  };

  /**
   * A `Temporal.PlainTime` represents a wall-clock time, with a precision in
   * nanoseconds, and without any time zone. "Wall-clock time" refers to the
   * concept of a time as expressed in everyday usage — the time that you read
   * off the clock on the wall. For example, it could be used to represent an
   * event that happens daily at a certain time, no matter what time zone.
   *
   * `Temporal.PlainTime` refers to a time with no associated calendar date; if you
   * need to refer to a specific time on a specific day, use
   * `Temporal.PlainDateTime`. A `Temporal.PlainTime` can be converted into a
   * `Temporal.PlainDateTime` by combining it with a `Temporal.PlainDate` using the
   * `toPlainDateTime()` method.
   *
   * See https://tc39.es/proposal-temporal/docs/time.html for more details.
   */
  export class PlainTime {
    static from(item: Temporal.PlainTime | PlainTimeLike | string, options?: AssignmentOptions): Temporal.PlainTime;
    static compare(
      one: Temporal.PlainTime | PlainTimeLike | string,
      two: Temporal.PlainTime | PlainTimeLike | string
    ): ComparisonResult;
    constructor(
      hour?: number,
      minute?: number,
      second?: number,
      millisecond?: number,
      microsecond?: number,
      nanosecond?: number
    );
    readonly hour: number;
    readonly minute: number;
    readonly second: number;
    readonly millisecond: number;
    readonly microsecond: number;
    readonly nanosecond: number;
    readonly calendar: Temporal.Calendar;
    equals(other: Temporal.PlainTime | PlainTimeLike | string): boolean;
    with(timeLike: Temporal.PlainTime | PlainTimeLike, options?: AssignmentOptions): Temporal.PlainTime;
    add(
      durationLike: Temporal.PlainTime | Temporal.Duration | DurationLike | string,
      options?: ArithmeticOptions
    ): Temporal.PlainTime;
    subtract(
      durationLike: Temporal.PlainTime | Temporal.Duration | DurationLike | string,
      options?: ArithmeticOptions
    ): Temporal.PlainTime;
    until(
      other: Temporal.PlainTime | PlainTimeLike | string,
      options?: DifferenceOptions<
        | 'hour'
        | 'minute'
        | 'second'
        | 'millisecond'
        | 'microsecond'
        | 'nanosecond'
        | /** @deprecated */ 'hours'
        | /** @deprecated */ 'minutes'
        | /** @deprecated */ 'seconds'
        | /** @deprecated */ 'milliseconds'
        | /** @deprecated */ 'microseconds'
        | /** @deprecated */ 'nanoseconds'
      >
    ): Temporal.Duration;
    since(
      other: Temporal.PlainTime | PlainTimeLike | string,
      options?: DifferenceOptions<
        | 'hour'
        | 'minute'
        | 'second'
        | 'millisecond'
        | 'microsecond'
        | 'nanosecond'
        | /** @deprecated */ 'hours'
        | /** @deprecated */ 'minutes'
        | /** @deprecated */ 'seconds'
        | /** @deprecated */ 'milliseconds'
        | /** @deprecated */ 'microseconds'
        | /** @deprecated */ 'nanoseconds'
      >
    ): Temporal.Duration;
    round(
      options: RoundOptions<
        | 'hour'
        | 'minute'
        | 'second'
        | 'millisecond'
        | 'microsecond'
        | 'nanosecond'
        | /** @deprecated */ 'hours'
        | /** @deprecated */ 'minutes'
        | /** @deprecated */ 'seconds'
        | /** @deprecated */ 'milliseconds'
        | /** @deprecated */ 'microseconds'
        | /** @deprecated */ 'nanoseconds'
      >
    ): Temporal.PlainTime;
    toPlainDateTime(temporalDate: Temporal.PlainDate | PlainDateLike | string): Temporal.PlainDateTime;
    toZonedDateTime(timeZoneAndDate: {
      timeZone: TimeZoneProtocol | string;
      plainDate: Temporal.PlainDate | PlainDateLike | string;
    }): Temporal.ZonedDateTime;
    getISOFields(): PlainTimeISOFields;
    toLocaleString(locales?: string | string[], options?: Intl.DateTimeFormatOptions): string;
    toJSON(): string;
    toString(options?: ToStringPrecisionOptions): string;
    valueOf(): never;
  }

  /**
   * A plain object implementing the protocol for a custom time zone.
   */
  export interface TimeZoneProtocol {
    id?: string;
    timeZone?: never;
    getOffsetNanosecondsFor(instant: Temporal.Instant | string): number;
    getOffsetStringFor?(instant: Temporal.Instant | string): string;
    getPlainDateTimeFor?(
      instant: Temporal.Instant | string,
      calendar?: CalendarProtocol | string
    ): Temporal.PlainDateTime;
    getInstantFor?(
      dateTime: Temporal.PlainDateTime | PlainDateTimeLike | string,
      options?: ToInstantOptions
    ): Temporal.Instant;
    getNextTransition?(startingPoint: Temporal.Instant | string): Temporal.Instant | null;
    getPreviousTransition?(startingPoint: Temporal.Instant | string): Temporal.Instant | null;
    getPossibleInstantsFor(dateTime: Temporal.PlainDateTime | PlainDateTimeLike | string): Temporal.Instant[];
    toString(): string;
    toJSON?(): string;
  }

  /**
   * A `Temporal.TimeZone` is a representation of a time zone: either an
   * {@link https://www.iana.org/time-zones|IANA time zone}, including
   * information about the time zone such as the offset between the local time
   * and UTC at a particular time, and daylight saving time (DST) changes; or
   * simply a particular UTC offset with no DST.
   *
   * Since `Temporal.Instant` and `Temporal.PlainDateTime` do not contain any time
   * zone information, a `Temporal.TimeZone` object is required to convert
   * between the two.
   *
   * See https://tc39.es/proposal-temporal/docs/timezone.html for more details.
   */
  export class TimeZone implements Omit<Required<TimeZoneProtocol>, 'timeZone'> {
    static from(timeZone: Temporal.TimeZone | string): Temporal.TimeZone;
    constructor(timeZoneIdentifier: string);
    readonly id: string;
    getOffsetNanosecondsFor(instant: Temporal.Instant | string): number;
    getOffsetStringFor(instant: Temporal.Instant | string): string;
    getPlainDateTimeFor(
      instant: Temporal.Instant | string,
      calendar?: CalendarProtocol | string
    ): Temporal.PlainDateTime;
    getInstantFor(
      dateTime: Temporal.PlainDateTime | PlainDateTimeLike | string,
      options?: ToInstantOptions
    ): Temporal.Instant;
    getNextTransition(startingPoint: Temporal.Instant | string): Temporal.Instant | null;
    getPreviousTransition(startingPoint: Temporal.Instant | string): Temporal.Instant | null;
    getPossibleInstantsFor(dateTime: Temporal.PlainDateTime | PlainDateTimeLike | string): Temporal.Instant[];
    toString(): string;
    toJSON(): string;
  }

  export type PlainYearMonthLike = {
    year?: number;
    month?: number;
    monthCode?: string;
    calendar?: CalendarProtocol | string;
  };

  /**
   * A `Temporal.PlainYearMonth` represents a particular month on the calendar. For
   * example, it could be used to represent a particular instance of a monthly
   * recurring event, like "the June 2019 meeting".
   *
   * See https://tc39.es/proposal-temporal/docs/yearmonth.html for more details.
   */
  export class PlainYearMonth {
    static from(
      item: Temporal.PlainYearMonth | PlainYearMonthLike | string,
      options?: AssignmentOptions
    ): Temporal.PlainYearMonth;
    static compare(
      one: Temporal.PlainYearMonth | PlainYearMonthLike | string,
      two: Temporal.PlainYearMonth | PlainYearMonthLike | string
    ): ComparisonResult;
    constructor(isoYear: number, isoMonth: number, calendar?: CalendarProtocol, referenceISODay?: number);
    readonly era: string | undefined;
    readonly eraYear: number | undefined;
    readonly year: number;
    readonly month: number;
    readonly monthCode: string;
    readonly calendar: CalendarProtocol;
    readonly daysInMonth: number;
    readonly daysInYear: number;
    readonly monthsInYear: number;
    readonly inLeapYear: boolean;
    equals(other: Temporal.PlainYearMonth | PlainYearMonthLike | string): boolean;
    with(yearMonthLike: PlainYearMonthLike, options?: AssignmentOptions): Temporal.PlainYearMonth;
    add(durationLike: Temporal.Duration | DurationLike | string, options?: ArithmeticOptions): Temporal.PlainYearMonth;
    subtract(
      durationLike: Temporal.Duration | DurationLike | string,
      options?: ArithmeticOptions
    ): Temporal.PlainYearMonth;
    until(
      other: Temporal.PlainYearMonth | PlainYearMonthLike | string,
      options?: DifferenceOptions<'year' | 'month' | /** @deprecated */ 'years' | /** @deprecated */ 'months'>
    ): Temporal.Duration;
    since(
      other: Temporal.PlainYearMonth | PlainYearMonthLike | string,
      options?: DifferenceOptions<'year' | 'month' | /** @deprecated */ 'years' | /** @deprecated */ 'months'>
    ): Temporal.Duration;
    toPlainDate(day: { day: number }): Temporal.PlainDate;
    getISOFields(): PlainDateISOFields;
    toLocaleString(locales?: string | string[], options?: Intl.DateTimeFormatOptions): string;
    toJSON(): string;
    toString(options?: ShowCalendarOption): string;
    valueOf(): never;
  }

  export type ZonedDateTimeLike = {
    year?: number;
    month?: number;
    monthCode?: string;
    day?: number;
    hour?: number;
    minute?: number;
    second?: number;
    millisecond?: number;
    microsecond?: number;
    nanosecond?: number;
    offset?: string;
    timeZone?: TimeZoneProtocol | string;
    calendar?: CalendarProtocol | string;
  };

  type ZonedDateTimeISOFields = {
    isoYear: number;
    isoMonth: number;
    isoDay: number;
    isoHour: number;
    isoMinute: number;
    isoSecond: number;
    isoMillisecond: number;
    isoMicrosecond: number;
    isoNanosecond: number;
    offsetNanoseconds: number;
    timeZone: TimeZoneProtocol;
    calendar: CalendarProtocol;
  };

  export class ZonedDateTime {
    static from(
      item: Temporal.ZonedDateTime | ZonedDateTimeLike | string,
      options?: ZonedDateTimeAssignmentOptions
    ): ZonedDateTime;
    static compare(
      one: Temporal.ZonedDateTime | ZonedDateTimeLike | string,
      two: Temporal.ZonedDateTime | ZonedDateTimeLike | string
    ): ComparisonResult;
    constructor(epochNanoseconds: bigint, timeZone: TimeZoneProtocol | string, calendar?: CalendarProtocol | string);
    readonly era: string | undefined;
    readonly eraYear: number | undefined;
    readonly year: number;
    readonly month: number;
    readonly monthCode: string;
    readonly day: number;
    readonly hour: number;
    readonly minute: number;
    readonly second: number;
    readonly millisecond: number;
    readonly microsecond: number;
    readonly nanosecond: number;
    readonly timeZone: Temporal.TimeZone;
    readonly calendar: CalendarProtocol;
    readonly dayOfWeek: number;
    readonly dayOfYear: number;
    readonly weekOfYear: number;
    readonly hoursInDay: number;
    readonly daysInWeek: number;
    readonly daysInMonth: number;
    readonly daysInYear: number;
    readonly monthsInYear: number;
    readonly inLeapYear: boolean;
    readonly offsetNanoseconds: number;
    readonly offset: string;
    readonly epochSeconds: number;
    readonly epochMilliseconds: number;
    readonly epochMicroseconds: bigint;
    readonly epochNanoseconds: bigint;
    equals(other: Temporal.ZonedDateTime | ZonedDateTimeLike | string): boolean;
    with(zonedDateTimeLike: ZonedDateTimeLike, options?: ZonedDateTimeAssignmentOptions): Temporal.ZonedDateTime;
    withPlainTime(timeLike?: Temporal.PlainTime | PlainTimeLike | string): Temporal.ZonedDateTime;
    withPlainDate(dateLike: Temporal.PlainDate | PlainDateLike | string): Temporal.ZonedDateTime;
    withCalendar(calendar: CalendarProtocol | string): Temporal.ZonedDateTime;
    withTimeZone(timeZone: TimeZoneProtocol | string): Temporal.ZonedDateTime;
    add(durationLike: Temporal.Duration | DurationLike | string, options?: ArithmeticOptions): Temporal.ZonedDateTime;
    subtract(
      durationLike: Temporal.Duration | DurationLike | string,
      options?: ArithmeticOptions
    ): Temporal.ZonedDateTime;
    until(
      other: Temporal.ZonedDateTime | ZonedDateTimeLike | string,
      options?: Temporal.DifferenceOptions<
        | 'year'
        | 'month'
        | 'week'
        | 'day'
        | 'hour'
        | 'minute'
        | 'second'
        | 'millisecond'
        | 'microsecond'
        | 'nanosecond'
        | /** @deprecated */ 'years'
        | /** @deprecated */ 'months'
        | /** @deprecated */ 'weeks'
        | /** @deprecated */ 'days'
        | /** @deprecated */ 'hours'
        | /** @deprecated */ 'minutes'
        | /** @deprecated */ 'seconds'
        | /** @deprecated */ 'milliseconds'
        | /** @deprecated */ 'microseconds'
        | /** @deprecated */ 'nanoseconds'
      >
    ): Temporal.Duration;
    since(
      other: Temporal.ZonedDateTime | ZonedDateTimeLike | string,
      options?: Temporal.DifferenceOptions<
        | 'year'
        | 'month'
        | 'week'
        | 'day'
        | 'hour'
        | 'minute'
        | 'second'
        | 'millisecond'
        | 'microsecond'
        | 'nanosecond'
        | /** @deprecated */ 'years'
        | /** @deprecated */ 'months'
        | /** @deprecated */ 'weeks'
        | /** @deprecated */ 'days'
        | /** @deprecated */ 'hours'
        | /** @deprecated */ 'minutes'
        | /** @deprecated */ 'seconds'
        | /** @deprecated */ 'milliseconds'
        | /** @deprecated */ 'microseconds'
        | /** @deprecated */ 'nanoseconds'
      >
    ): Temporal.Duration;
    round(
      options: Temporal.RoundOptions<
        | 'day'
        | 'hour'
        | 'minute'
        | 'second'
        | 'millisecond'
        | 'microsecond'
        | 'nanosecond'
        | /** @deprecated */ 'days'
        | /** @deprecated */ 'hours'
        | /** @deprecated */ 'minutes'
        | /** @deprecated */ 'seconds'
        | /** @deprecated */ 'milliseconds'
        | /** @deprecated */ 'microseconds'
        | /** @deprecated */ 'nanoseconds'
      >
    ): Temporal.ZonedDateTime;
    startOfDay(): Temporal.ZonedDateTime;
    toInstant(): Temporal.Instant;
    toPlainDateTime(): Temporal.PlainDateTime;
    toPlainDate(): Temporal.PlainDate;
    toPlainYearMonth(): Temporal.PlainYearMonth;
    toPlainMonthDay(): Temporal.PlainMonthDay;
    toPlainTime(): Temporal.PlainTime;
    getISOFields(): ZonedDateTimeISOFields;
    toLocaleString(locales?: string | string[], options?: Intl.DateTimeFormatOptions): string;
    toJSON(): string;
    toString(options?: ZonedDateTimeToStringOptions): string;
    valueOf(): never;
  }

  /**
   * The `Temporal.Now` object has several methods which give information about
   * the current date, time, and time zone.
   *
   * See https://tc39.es/proposal-temporal/docs/now.html for more details.
   */
  export namespace Now {
    /**
     * Get the exact system date and time as a `Temporal.Instant`.
     *
     * This method gets the current exact system time, without regard to
     * calendar or time zone. This is a good way to get a timestamp for an
     * event, for example. It works like the old-style JavaScript `Date.now()`,
     * but with nanosecond precision instead of milliseconds.
     *
     * Note that a `Temporal.Instant` doesn't know about time zones. For the
     * exact time in a specific time zone, use `Temporal.Now.zonedDateTimeISO`
     * or `Temporal.Now.zonedDateTime`.
     * */
    export function instant(): Temporal.Instant;

    /**
     * Get the current calendar date and clock time in a specific calendar and
     * time zone.
     *
     * The `calendar` parameter is required. When using the ISO 8601 calendar or
     * if you don't understand the need for or implications of a calendar, then
     * a more ergonomic alternative to this method is
     * `Temporal.Now.zonedDateTimeISO()`.
     *
     * @param {Temporal.Calendar | string} [calendar] - calendar identifier, or
     * a `Temporal.Calendar` instance, or an object implementing the calendar
     * protocol.
     * @param {TimeZoneProtocol | string} [tzLike] -
     * {@link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones|IANA time zone identifier}
     * string (e.g. `'Europe/London'`), `Temporal.TimeZone` instance, or an
     * object implementing the time zone protocol. If omitted, the environment's
     * current time zone will be used.
     */
    export function zonedDateTime(
      calendar: CalendarProtocol | string,
      tzLike?: TimeZoneProtocol | string
    ): Temporal.ZonedDateTime;

    /**
     * Get the current calendar date and clock time in a specific time zone,
     * using the ISO 8601 calendar.
     *
     * @param {TimeZoneProtocol | string} [tzLike] -
     * {@link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones|IANA time zone identifier}
     * string (e.g. `'Europe/London'`), `Temporal.TimeZone` instance, or an
     * object implementing the time zone protocol. If omitted, the environment's
     * current time zone will be used.
     */
    export function zonedDateTimeISO(tzLike?: TimeZoneProtocol | string): Temporal.ZonedDateTime;

    /**
     * Get the current calendar date and clock time in a specific calendar and
     * time zone.
     *
     * The calendar is required. When using the ISO 8601 calendar or if you
     * don't understand the need for or implications of a calendar, then a more
     * ergonomic alternative to this method is `Temporal.Now.plainDateTimeISO`.
     *
     * Note that the `Temporal.PlainDateTime` type does not persist the time zone,
     * but retaining the time zone is required for most time-zone-related use
     * cases. Therefore, it's usually recommended to use
     * `Temporal.Now.zonedDateTimeISO` or `Temporal.Now.zonedDateTime` instead
     * of this function.
     *
     * @param {Temporal.Calendar | string} [calendar] - calendar identifier, or
     * a `Temporal.Calendar` instance, or an object implementing the calendar
     * protocol.
     * @param {TimeZoneProtocol | string} [tzLike] -
     * {@link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones|IANA time zone identifier}
     * string (e.g. `'Europe/London'`), `Temporal.TimeZone` instance, or an
     * object implementing the time zone protocol. If omitted,
     * the environment's current time zone will be used.
     */
    export function plainDateTime(
      calendar: CalendarProtocol | string,
      tzLike?: TimeZoneProtocol | string
    ): Temporal.PlainDateTime;

    /**
     * Get the current date and clock time in a specific time zone, using the
     * ISO 8601 calendar.
     *
     * Note that the `Temporal.PlainDateTime` type does not persist the time zone,
     * but retaining the time zone is required for most time-zone-related use
     * cases. Therefore, it's usually recommended to use
     * `Temporal.Now.zonedDateTimeISO` instead of this function.
     *
     * @param {TimeZoneProtocol | string} [tzLike] -
     * {@link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones|IANA time zone identifier}
     * string (e.g. `'Europe/London'`), `Temporal.TimeZone` instance, or an
     * object implementing the time zone protocol. If omitted, the environment's
     * current time zone will be used.
     */
    export function plainDateTimeISO(tzLike?: TimeZoneProtocol | string): Temporal.PlainDateTime;

    /**
     * Get the current calendar date in a specific calendar and time zone.
     *
     * The calendar is required. When using the ISO 8601 calendar or if you
     * don't understand the need for or implications of a calendar, then a more
     * ergonomic alternative to this method is `Temporal.Now.plainDateISO`.
     *
     * @param {Temporal.Calendar | string} [calendar] - calendar identifier, or
     * a `Temporal.Calendar` instance, or an object implementing the calendar
     * protocol.
     * @param {TimeZoneProtocol | string} [tzLike] -
     * {@link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones|IANA time zone identifier}
     * string (e.g. `'Europe/London'`), `Temporal.TimeZone` instance, or an
     * object implementing the time zone protocol. If omitted,
     * the environment's current time zone will be used.
     */
    export function plainDate(
      calendar: CalendarProtocol | string,
      tzLike?: TimeZoneProtocol | string
    ): Temporal.PlainDate;

    /**
     * Get the current date in a specific time zone, using the ISO 8601
     * calendar.
     *
     * @param {TimeZoneProtocol | string} [tzLike] -
     * {@link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones|IANA time zone identifier}
     * string (e.g. `'Europe/London'`), `Temporal.TimeZone` instance, or an
     * object implementing the time zone protocol. If omitted, the environment's
     * current time zone will be used.
     */
    export function plainDateISO(tzLike?: TimeZoneProtocol | string): Temporal.PlainDate;

    /**
     * Get the current clock time in a specific time zone, using the ISO 8601 calendar.
     *
     * @param {TimeZoneProtocol | string} [tzLike] -
     * {@link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones|IANA time zone identifier}
     * string (e.g. `'Europe/London'`), `Temporal.TimeZone` instance, or an
     * object implementing the time zone protocol. If omitted, the environment's
     * current time zone will be used.
     */
    export function plainTimeISO(tzLike?: TimeZoneProtocol | string): Temporal.PlainTime;

    /**
     * Get the environment's current time zone.
     *
     * This method gets the current system time zone. This will usually be a
     * named
     * {@link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones|IANA time zone}.
     */
    export function timeZone(): Temporal.TimeZone;
  }
}

declare namespace IntlPolyfill {
  type Formattable =
    | Date
    | Temporal.Instant
    | Temporal.ZonedDateTime
    | Temporal.PlainDate
    | Temporal.PlainTime
    | Temporal.PlainDateTime
    | Temporal.PlainYearMonth
    | Temporal.PlainMonthDay;

  interface DateTimeFormatRangePart extends Intl.DateTimeFormatPart {
    source: 'shared' | 'startRange' | 'endRange';
  }

  export interface DateTimeFormat extends Intl.DateTimeFormat {
    /**
     * Format a date into a string according to the locale and formatting
     * options of this `Intl.DateTimeFormat` object.
     *
     * @param date The date to format.
     */
    format(date?: Formattable | number): string;

    /**
     * Allow locale-aware formatting of strings produced by
     * `Intl.DateTimeFormat` formatters.
     *
     * @param date The date to format.
     */
    formatToParts(date?: Formattable | number): Intl.DateTimeFormatPart[];

    /**
     * Format a date range in the most concise way based on the locale and
     * options provided when instantiating this `Intl.DateTimeFormat` object.
     *
     * @param startDate The start date of the range to format.
     * @param endDate The start date of the range to format. Must be the same
     * type as `startRange`.
     */
    formatRange<T extends Formattable>(startDate: T, endDate: T): string;
    formatRange(startDate: Date | number, endDate: Date | number): string;

    /**
     * Allow locale-aware formatting of tokens representing each part of the
     * formatted date range produced by `Intl.DateTimeFormat` formatters.
     *
     * @param startDate The start date of the range to format.
     * @param endDate The start date of the range to format. Must be the same
     * type as `startRange`.
     */
    formatRangeToParts<T extends Formattable>(startDate: T, endDate: T): DateTimeFormatRangePart[];
    formatRangeToParts(startDate: Date | number, endDate: Date | number): DateTimeFormatRangePart[];
  }

  export const DateTimeFormat: {
    /**
     * Creates `Intl.DateTimeFormat` objects that enable language-sensitive
     * date and time formatting.
     */
    new (locales?: string | string[], options?: Intl.DateTimeFormatOptions): DateTimeFormat;
    (locales?: string | string[], options?: Intl.DateTimeFormatOptions): DateTimeFormat;

    /**
     * Get an array containing those of the provided locales that are supported
     * in date and time formatting without having to fall back to the runtime's
     * default locale.
     */
    supportedLocalesOf(locales: string | string[], options?: Intl.DateTimeFormatOptions): string[];
  };
}

export { IntlPolyfill as Intl };

export function toTemporalInstant(this: Date): Temporal.Instant;