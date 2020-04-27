import $axios from '@/plugins/axios';
import $globalConsts from '@/plugins/global-constants';
import $log from '@/plugins/vue-logger';
import $router from '@/router';

const configWithBasicAuth = {
  headers: {
    'Authorization': 'Basic ' + btoa($globalConsts.VUE_APP_OAUTH_CLIENT_ID + ':' + $globalConsts.VUE_APP_OAUTH_CLIENT_SECRET),

    // https://stackoverflow.com/questions/54820443/how-to-prevent-login-prompt-in-chrome-for-401-unauthorization-error-for-basic-au
    'X-Requested-With': 'XMLHttpRequest',
  },
};

const state = {
  loginUser: {
    adminId: null,
    adminNm: null,
  },
  accessMenus: [],
};

const mutations = {

  init (state) {
    state.loginUser.adminId = null;
    state.loginUser.adminNm = null;
    state.accessMenus = [];
  },

  setLoginUser (state, payload) {
    state.loginUser.adminId = payload.loginUser.adminId;
    state.loginUser.adminNm = payload.loginUser.adminNm;
    state.accessMenus = payload.accessMenus ? payload.accessMenus : [];
  },
};

const getters = {

  isLogin (state) {
    return !!state.loginUser.adminId;
  },

  getLoginUser (state) {
    return state.loginUser;
  },

  getAccessMenus (state) {
    return state.accessMenus;
  },
};

const actions = {

  login (context, payload) {
    return new Promise(function (resolve, reject) {

      const formData = new URLSearchParams();
      formData.append('grant_type', 'password');
      formData.append('adminId', payload.adminId);
      formData.append('password', payload.password);

      $axios.post('/oauth/token', formData, configWithBasicAuth).then(res => {

        saveToken(context, {
          accessToken: res.data.access_token,
          refreshToken: res.data.refresh_token,
        });

        resolve();

      }).catch(err => {
        $log.error(err);
        reject(err);
      });
    });
  },

  veritySms (context, payload) {
    return new Promise(function (resolve, reject) {
      const smsNo = payload.smsNo;
      $axios.put('/oauth/verify/sms/' + smsNo).then(() => {
        return context.dispatch('me');
      }).then(() => {

        $log.debug('@/store/modules/storeUser.js action veritySms() : Success SMS Authorization.');

        $router.push({ path: '/' });

        resolve();
      }).catch(err => {
        $log.debug('@/store/modules/storeUser.js action veritySms() error :' + err);
        reject(err);
      });
    });

  },

  me (context) {
    return new Promise(function (resolve, reject) {
      $axios.get('/oauth/me').then(res => {
        const data = res.data;

        $log.debug('@/store/modules/storeUser.js action me() : current loginUser =>', JSON.stringify(data));

        data.accessMenus = setupAccessMenus(data.loginUser.accessMenus);
        context.commit('setLoginUser', data);

        resolve();
      }).catch(err => {
        $log.debug('@/store/modules/storeUser.js action me() error :' + err);
        reject(err);
      });
    });

  },

  logout (context) {
    return new Promise(function (resolve, reject) {
      $axios.delete('/oauth/revoke').then(() => {

        $log.debug('@/store/modules/storeUser.js action logout() : Success Logout.');

        context.dispatch('initTokenAndLoginUser');

        resolve();
      }).catch(err => {
        $log.debug('@/store/modules/storeUser.js submitSms() error :' + err);
        reject(err);
      });
    });

  },

  refreshToken (context) {

    const refreshToken = context.rootGetters['storeToken/getRefreshToken'];

    const formData = new URLSearchParams();
    formData.append('grant_type', 'refresh_token');
    formData.append('refresh_token', refreshToken);

    return new Promise(function (resolve, reject) {
      $axios.post('/oauth/token', formData, configWithBasicAuth).then(res => {

        $log.debug('@/store/modules/storeUser.js action refreshToken() : Success refresh token');

        saveToken(context, {
          accessToken: res.data.access_token,
          refreshToken: res.data.refresh_token,
        });

        resolve();

      }).catch(err => {
        reject(err);
      });
    });

  },

  mockLogin (context) {

    if (!$globalConsts.isLocal) {
      throw new Error('only local profiles.');
    }

    const accessMenus = $router.options.routes
      .find(route => !!route.children)
      .children.map(route => {
        return {
          menuCd: route.meta.menuCd,
          read: true,
          write: true,
        };
      });

    const mockLoginUser = {
      loginUser: {
        adminId: 'superAdmin',
        adminNm: '슈퍼관리자',
      },
      accessMenus: setupAccessMenus(accessMenus),
    };
    context.commit('setLoginUser', mockLoginUser);

    const mockToken = {
      accessToken: 'aba68284-7c32-4055-9dc6-6e5d1cfa970b',
      refreshToken: '3904dde4-01aa-43ba-9b50-4662d4308fc8',
    };
    saveToken(context, mockToken);

    $log.warn('mockLogin has executed.');
  },

  initTokenAndLoginUser (context) {
    context.commit('init');
    context.commit('storeToken/init', null, { root: true });
  },

};

const saveToken = function saveToken (context, token) {

  $log.debug('@/store/modules/storeUser.js saveToken() : NEW token => ', JSON.stringify(token, 0, 4));

  // another modules.
  context.commit('storeToken/saveToken', token, { root: true });

};

const setupAccessMenus = function setupAccessMenus (accessMenus) {

  const currentLayoutRouters = $router.options.routes
    .find(route => !!route.children)
    .children.map(route => {

      const menuCd = route.meta.menuCd;
      const findedAccessMenu = accessMenus.find(accessMenu => accessMenu.menuCd === menuCd);

      const menu = {
        menuCd: menuCd,
        read: findedAccessMenu ? findedAccessMenu.read : false,
        write: findedAccessMenu ? findedAccessMenu.write : false,
      };

      return menu;
    });

  return currentLayoutRouters;
};

export default {
  state,
  getters,
  actions,
  mutations,
};