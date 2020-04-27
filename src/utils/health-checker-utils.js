import $axios from '@/plugins/axios';
import $globalConsts from '@/plugins/global-constants';
import $axiosMockUtils from '@/utils/axios-mock-utils';

export default {

  checkAdminServer () {
    return new Promise(function (resolve, reject) {

      const config = { timeout: 5000 };

      if ($globalConsts.isLocal) {
        config.timeout = 500;
      }

      $axios.get('/actuator/health', config).then(res => {
        resolve(res);
      }).catch(error => {
        if ($globalConsts.isLocal) {
          $axiosMockUtils.activeAxiosMock().then(() => {
            resolve();
          }).catch(err => {
            reject(err);
          });
        } else {
          reject(error);
          throw new Error('admin server disconnected.');
        }
      });
    });
  },

};