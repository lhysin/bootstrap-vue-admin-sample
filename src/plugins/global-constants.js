import Vue from 'vue';

// define global constants.
const _globalConsts = Object.freeze({

  VUE_APP_ADMIN_HOST: process.env.VUE_APP_ADMIN_HOST,
  VUE_APP_OAUTH_CLIENT_ID: process.env.VUE_APP_OAUTH_CLIENT_ID,
  VUE_APP_OAUTH_CLIENT_SECRET: process.env.VUE_APP_OAUTH_CLIENT_SECRET,

  SUCCESS_SAVE_MSG: '저장에 성공하였습니다.',
  CONFIRM_CREATE_SAVE_MSG: '새로운 내용을 저장하시겠습니까?',
  CONFIRM_UPDATE_SAVE_MSG: '변경된 내용을 저장하시겠습니까?',

  UNCHANGED_DATA_MSG: '변경된 내용이 없습니다.',

  MENU_AUTH_ERROR_MSG: '해당 메뉴에 권한이 없습니다.',
  BAD_REQUEST_MSG: '잘못된 접근입니다.',
  INVALID_FORM_MSG: '입력 항목을 확인 후 등록해주세요.',
  INVALID_HTML_TAG_MSG: '파일에서 유효하지 않는 html tag가 검출되었습니다.',
  INVALID_TOKEN_MSG: '중복 로그인 혹은 토큰시간이 만료되어 로그인창으로 이동합니다.',
  FILEDOWN_ERROR_MSG: '파일 다운로드에 실패하였습니다.',
  SEVER_ERROR_MSG: '서버오류가 발생하였습니다.\n서버 관리자에게 연락부탁드립니다.',

  YYYY_MM_DD_HH_MM_SS_FORMAT: 'YYYY.MM.DD HH:mm:ss',
  YYYY_MM_DD_HH_MM_FORMAT: 'YYYY.MM.DD(ddd) HH:mm',
  YYYY_MM_DD_FORMAT: 'YYYY.MM.DD',
  HH_MM_FORMAT: 'HH:mm',

  isLocal: process.env.VUE_APP_PROFILE === 'LOCAL',
  isDev: process.env.VUE_APP_PROFILE === 'DEV',
  isStg: process.env.VUE_APP_PROFILE === 'STG',
  isPrd: process.env.VUE_APP_PROFILE === 'PRD',

});

const ConstantsPlugin = {
  install: function (Vue) {
    Object.defineProperties(Vue.prototype, {
      $globalConsts: {
        get () {
          return _globalConsts;
        },
      },
    });
  },
};

Vue.use(ConstantsPlugin);

export default _globalConsts;
