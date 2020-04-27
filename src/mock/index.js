import axios from '@/plugins/axios';
import MockAdapter from 'axios-mock-adapter';
import $globalConsts from '@/plugins/global-constants';

if (!$globalConsts.isLocal) {
  throw new Error('available only local profile.');
}

// babel-wildcard lazyloading error
// import * as modules from './modules';

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('@/mock/modules', true, /\.js$/);

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;

  return modules;
}, {});

// https://github.com/ctimmerm/axios-mock-adapter
const mock = new MockAdapter(axios);

Object.keys(modules).forEach(key => {
  modules[key](mock);
});

// https://github.com/ctimmerm/axios-mock-adapter/issues/254

export default mock;