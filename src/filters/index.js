import Vue from 'vue';

// babel-wildcard lazyloading error
// import * as modules from './modules';

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('@/filters/modules', true, /\.js$/);

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;

  return modules;
}, {});

Object.keys(modules).forEach(module => {
  Object.keys(modules[module]).forEach(filter => {
    Vue.filter(filter, modules[module][filter]);
  });
});

// https://github.com/vuejs/Discussion/issues/405#issuecomment-375222835
// add global filters.
Vue.prototype.$filters = Vue.options.filters;