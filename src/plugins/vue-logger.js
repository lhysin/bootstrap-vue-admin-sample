import Vue from 'vue';
import $globalConsts from '@/plugins/global-constants';

import _vueLogger from 'vuejs-logger';

const options = {
  isEnabled: true,
  logLevel: $globalConsts.isPrd ? 'error' : 'debug',
  stringifyArguments: false,
  showLogLevel: true,
  showMethodName: true,
  separator: '|',
  showConsoleColors: true,
};

Vue.use(_vueLogger, options);

export default Vue.$log;