const dictionary = Object.freeze({
  ko: {
    messages: {
      // Override the messages.
      required: (field) => `${field} 은/는 필수입력 항목입니다.`,
      email: (field) => `${field} 은/는 숫자만 입력가능합니다.`,
      numeric: (field) => `${field} 은/는 필수입력 항목입니다.`,
      min: (field, length) => `${field} 은/는 최소 ${length} 글자 입니다.`,
      max: (field, length) => `${field} 은/는 최대 ${length} 글자 입니다.`,
    },
  },
});

export default dictionary;