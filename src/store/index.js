import Vue from 'vue';
import Vuex from 'vuex';
import $globalConsts from '@/plugins/global-constants';
import createPersistedState from 'vuex-persistedstate';

// babel-wildcard lazyloading error
// import * as modules from './modules';

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('@/store/modules', true, /\.js$/);

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;

  return modules;
}, {});

Vue.use(Vuex);

Object.keys(modules).forEach(module => {
  modules[module].namespaced = true;
  modules[module].strict = !$globalConsts.isPrd;
});

export default new Vuex.Store({
  modules: modules,
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,

      // https://stackoverflow.com/questions/55319006/making-only-one-module-persistent-with-vuex-persistedstate
      paths: ['storeToken'],
    }),
  ],
});

const extendMixin = {

  methods: {
    isEditable: function () {
      const _this = this;

      const menuCd = _this.$route.meta.menuCd;

      if (menuCd) {
        const accessMenus = _this.$store.getters['storeUser/getAccessMenus'];
        const findedAccessMenu = accessMenus.find(accessMenu => accessMenu.menuCd === menuCd);

        return findedAccessMenu ? findedAccessMenu.write : false;
      } else {
        return false;
      }
    },
  },
};

Vue.mixin(extendMixin);