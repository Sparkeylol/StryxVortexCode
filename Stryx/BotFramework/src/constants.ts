const TimeUnits = {
  years: {
    label: '(?:years?|y)',
    value: 1000 * 60 * 60 * 24 * 365,
  },
  months: {
    label: '(?:months?|mo)',
    value: 1000 * 60 * 60 * 24 * 30,
  },
  weeks: {
    label: '(?:weeks?|w)',
    value: 1000 * 60 * 60 * 24 * 7,
  },
  days: {
    label: '(?:days?|d)',
    value: 1000 * 60 * 60 * 24,
  },
  hours: {
    label: '(?:hours?|hrs?|h)',
    value: 1000 * 60 * 60,
  },
  minutes: {
    label: '(?:minutes?|mins?|m)',
    value: 1000 * 60,
  },
  seconds: {
    label: '(?:seconds?|secs?|s)',
    value: 1000,
  },
  milliseconds: {
    label: '(?:milliseconds?|msecs?|ms)',
    value: 1,
  },
};

export default { TimeUnits };
