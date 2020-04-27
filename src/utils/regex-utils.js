const _regex = Object.freeze({

  alpha: /^[A-Z]*$/i,
  alphaSpaces: /^[A-Z\s]*$/i,
  alphaNumeric: /^[0-9a-zA-Z]*$/i,
  alphaNumericDot: /^[0-9a-zA-Z.]*$/i,
  alphaNumericDash: /^[0-9A-Z_-]*$/i,
  alphaNumericLowDash: /^[0-9A-Z_]*$/i,

  lowAlpha: /^[a-z]*$/,
  lowAlphaNumeric: /^[a-z0-9]*$/,

  korean: /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*$/,
  koreanSpaces: /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣\s]*$/,
  koreanNumeric: /^[0-9|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*$/,
  koreanDash: /^[0-9|ㄱ-ㅎ|ㅏ-ㅣ|가-힣|_-]*$/,
  koreanLowDash: /^[0-9|ㄱ-ㅎ|ㅏ-ㅣ|가-힣|_]*$/,
  koreanAlphaNumeric: /^[0-9|ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-zA-Z0-9]*$/,
  koreanAlphaNumericLowDash: /^[0-9|ㄱ-ㅎ|ㅏ-ㅣ|가-힣|_|a-zA-Z0-9]*$/,

  numeric: /^[0-9]*$/,
  numericDot: /^[0-9.]*$/,

  /* eslint-disable max-len */
  // Emoji : https://emojipedia.org/world-emoji-day/
  emoji: /(\u2602|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/,
  /* eslint-enable max-len */

  // from /vee-validate/dist/rules.esm.js
  month: /^(1[0-2]|0?\d)/, // 0 to 12
  date: /^(3[0-1]|[0-2]?\d)/, // 0 to 31
  dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/, // 0 to 366
  week: /^(5[0-3]|[0-4]?\d)/, // 0 to 53
  hour23h: /^(2[0-3]|[0-1]?\d)/, // 0 to 23
  hour24h: /^(2[0-4]|[0-1]?\d)/, // 0 to 24
  hour11h: /^(1[0-1]|0?\d)/, // 0 to 11
  hour12h: /^(1[0-2]|0?\d)/, // 0 to 12
  minute: /^[0-5]?\d/, // 0 to 59
  second: /^[0-5]?\d/, // 0 to 59

  singleDigit: /^\d/, // 0 to 9
  twoDigits: /^\d{1,2}/, // 0 to 99
  threeDigits: /^\d{1,3}/, // 0 to 999
  fourDigits: /^\d{1,4}/, // 0 to 9999

  anyDigitsSigned: /^-?\d+/,
  singleDigitSigned: /^-?\d/, // 0 to 9, -0 to -9
  twoDigitsSigned: /^-?\d{1,2}/, // 0 to 99, -0 to -99
  threeDigitsSigned: /^-?\d{1,3}/, // 0 to 999, -0 to -999
  fourDigitsSigned: /^-?\d{1,4}/, // 0 to 9999, -0 to -9999

  dateTimeDelimeter: /[T ]/,
  plainTime: /:/,
  timeZoneDelimeter: /[Z ]/i,

  /* eslint-disable max-len */
  creditCard: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11}|6[27][0-9]{14})$/,
  /* eslint-enable max-len */

  // year tokens
  YY: /^(\d{2})$/,
  YYY: [
    /^([+-]\d{2})$/, // 0 additional digits
    /^([+-]\d{3})$/, // 1 additional digit
    /^([+-]\d{4})$/, // 2 additional digits
  ],
  YYYY: /^(\d{4})/,
  YYYYY: [
    /^([+-]\d{4})/, // 0 additional digits
    /^([+-]\d{5})/, // 1 additional digit
    /^([+-]\d{6})/, // 2 additional digits
  ],

  // date tokens
  MM: /^-(\d{2})$/,
  DDD: /^-?(\d{3})$/,
  MMDD: /^-?(\d{2})-?(\d{2})$/,
  Www: /^-?W(\d{2})$/,
  WwwD: /^-?W(\d{2})-?(\d{1})$/,

  HH: /^(\d{2}([.,]\d*)?)$/,
  HHMM: /^(\d{2}):?(\d{2}([.,]\d*)?)$/,
  HHMMSS: /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/,

  // timezone tokens
  timezone: /([Z+-].*)$/,
  timezoneZ: /^(Z)$/,
  timezoneHH: /^([+-])(\d{2})$/,
  timezoneHHMM: /^([+-])(\d{2}):?(\d{2})$/,

});

export default _regex;