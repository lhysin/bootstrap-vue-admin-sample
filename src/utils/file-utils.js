import fileSaver from 'file-saver';

import $axios from '@/plugins/axios';
import $globalConsts from '@/plugins/global-constants';
import $log from '@/plugins/vue-logger';

export default {

  getImgWidthAndHeightFromFile (file) {
    const _URL = window.URL || window.webkitURL;

    return new Promise(function (resolve, reject) {
      try {
        const img = new Image();
        img.onload = function () {
          _URL.revokeObjectURL(file);
          resolve({ width: this.width, height: this.height });
        };
        img.src = _URL.createObjectURL(file);
      } catch (error) {
        $log.error(error);
        reject(error);
      }
    });
  },

  downloadFileFromUrl (fileUrl, fileNm, isShowErrorAlert) {

    if (!fileUrl || !fileNm) {
      throw new Error('fileUrl or filenm invalid.');
    }

    const _this = this;

    return new Promise(function (resolve, reject) {
      _this.getFileBlobFromUrl(fileUrl).then(res => {
        const blob = new Blob([res.arrayBuffer]);
        _this.$downloadFileFromBlob(blob, fileNm).then(res => {
          resolve(res);
        }).catch(error => {
          if (!isShowErrorAlert) {
            alert($globalConsts.FILEDOWN_ERROR_MSG);
          }
          reject(error);
        });
      }).catch(error => {
        $log.error(error);
        if (!isShowErrorAlert) {
          alert($globalConsts.FILEDOWN_ERROR_MSG);
        }
        reject(error);
      });
    });
  },

  downloadFileFromBlob (blob, fileNm, isShowErrorAlert) {

    if (!blob || !fileNm) {
      throw new Error('blob or fileNm invalid.');
    }

    return new Promise(function (resolve, reject) {
      try {
        fileSaver.saveAs(blob, fileNm);
        resolve();
      } catch (error) {
        $log.error(error);
        if (isShowErrorAlert) {
          alert($globalConsts.FILEDOWN_ERROR_MSG);
        }
        reject(error);
      }
    });
  },

  getFileBlobFromUrl (fileUrl) {
    return new Promise(function (resolve, reject) {
      $axios.get(fileUrl, { responseType: 'arraybuffer' }).then(res => {
        let contentType = null;
        if (res.headers) {
          contentType = res.headers['content-type'];
        }
        resolve({ arrayBuffer: res.data, contentType: contentType });
      }).catch(error => {
        $log.error(error);
        reject(error);
      });
    });
  },

  getFileSizeFromUrl (fileUrl) {
    const _this = this;

    return new Promise(function (resolve, reject) {
      _this.$getFileBlobFromUrl(fileUrl).then(res => {
        let options = null;
        if (!res.contentType) {
          options = { type: res.contentType };
        }
        const blob = new Blob([res.arrayBuffer], options);
        resolve(blob.size);
      }).catch(error => {
        $log.error(error);
        reject(error);
      });
    });
  },

  inputFileReader (file) {
    return new Promise(function (resolve, reject) {
      try {
        const fileReader = new FileReader();
        fileReader.onload = function (res) {
          resolve({ targetUrl: res.target.result });
        };
        fileReader.readAsDataURL(file);
      } catch (error) {
        $log.error(error);
        reject(error);
      }
    });
  },

};