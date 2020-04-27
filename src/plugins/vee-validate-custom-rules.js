import $regex from '@/utils/regex-utils.js';

export default {

  rangeDate: {
    validate: (value) => {
      if (value) {
        if (!value.strDate || !value.endDate) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    },
    getMessage: (field) => {
      return `${field} 은/는 올바른 기간을 선택해야 합니다.`;
    },
  },

  rangeDateWithTime: {
    validate: (value) => {
      if (value) {
        if (!value.strDate || !value.strTime || !value.endDate || !value.endTime) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    },
    getMessage: (field) => {
      return `${field} 은/는 올바른 기간을 선택해야 합니다.`;
    },
  },

  numericDot: {
    validate: (value) => {
      return $regex.numericDot.test(value);
    },
    getMessage: (field) => {
      return `${field} 은/는 특수문자 '.'와 숫자만 입력 가능합니다.`;
    },
  },

  alphaNumericDot: {
    validate: (value) => {
      return $regex.alphaNumericDot.test(value);
    },
    getMessage: (field) => {
      return `${field} 은/는 특수문자 '.'와 영문 및 숫자만 입력 가능합니다.`;
    },
  },

  lowAlphaNumeric: {
    validate: (value) => {
      return $regex.lowAlphaNumeric.test(value);
    },
    getMessage: (field) => {
      return `${field} 은/는 영문 소문자 및 숫자만 입력 가능합니다.`;
    },
  },

  korean: {
    validate: (value) => {
      return $regex.korean.test(value);
    },
    getMessage: (field) => {
      return `${field} 은/는 한글만 입력 가능합니다.`;
    },
  },

  koreanAlphaNumericLowDash: {
    validate: (value) => {
      return $regex.koreanAlphaNumericLowDash.test(value);
    },
    getMessage: (field) => {
      return `${field} 은/는 특수문자 '_'와 한글, 영문 및 숫자만 입력 가능합니다.`;
    },
  },

  notKorean: {
    validate: (value) => {
      return !$regex.korean.test(value);
    },
    getMessage: (field) => {
      return `${field} 은/는 한글은 입력 가능하지 않습니다.`;
    },
  },

  koreanAlphaNumeric: {
    validate: (value) => {
      return $regex.koreanAlphaNumeric.test(value);
    },
    getMessage: (field) => {
      return `${field} 은/는 한글, 영문 및 숫자만 입력 가능합니다.`;
    },
  },

  notEmoji: {
    //Emoji : https://emojipedia.org/world-emoji-day/
    validate: (value) => {
      return !$regex.emoji.test(value);

    },
    getMessage: (field) => {
      return `${field} 은/는 이모지 입력 가능하지 않습니다.`;
    },
  },
};