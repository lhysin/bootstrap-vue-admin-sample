import $globalConsts from '@/plugins/global-constants';
/*
 * <template>
 *   <labal>
 *    {{ 1024 | prettyByteFilter }}
 *   </label>
 *
 *   <labal>
 *    {{ fileSize | prettyByteFilter }}
 *   </label>
 * </template>
 */
export default {

  prettyByteFilter (num) {

    if (!num) {
      return '-';
    }

    num = Number(num);

    if (!num) {
      throw new TypeError('Expected a number');
    }

    let exponent;
    let unit;
    const neg = num < 0;
    let units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    if (neg) {
      num = -num;
    }

    if (num < 1) {
      return (neg ? '-' : '') + num + ' B';
    }

    exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1);
    num = (num / Math.pow(1000, exponent)).toFixed(2) * 1;
    unit = units[exponent];

    return (neg ? '-' : '') + num + ' ' + unit;
  },

  convertNumberAddCommaFilter (value) {

    if (typeof value === typeof undefined || value === null) {
      return '-';
    }

    const num = Number(value);
    if (!num) {
      return '0';
    }

    return num.toLocaleString('en');
  },

  nullCheckFilter (value) {

    if (typeof value === typeof undefined || value === null || value === '') {
      return '-';
    } else {
      return value;
    }
  },

  lineBreakFilter (value) {
    if (!value) {
      return '-';
    } else {
      return value.split('\n').join('<br />');
    }
  },

  mobileFilter (value) {
    if (!value) {
      return '-';
    }
    if (value.length < 10) {
      return value;
    }
    if (value.length === 10) {
      return value.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    }
    if (value.length === 11) {
      return value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    }
  },

  momentYYYYMMddFormatFilter (moment) {
    let returnValue = '-';
    if (!!moment && typeof moment.format === 'function') {
      returnValue = moment.format($globalConsts.YYYY_MM_DD_FORMAT);
    }

    return returnValue;
  },

  momentYYYYMMDDHHmmssFormatFilter (moment) {
    let returnValue = '-';
    if (!!moment && typeof moment.format === 'function') {
      returnValue = moment.format($globalConsts.YYYY_MM_DD_HH_MM_SS_FORMAT);
    }

    return returnValue;
  },

  momentYYYYMMDDdddHHmmFormatFilter (moment) {
    let returnValue = '-';
    if (!!moment && typeof moment.format === 'function') {
      returnValue = moment.format($globalConsts.YYYY_MM_DD_HH_MM_FORMAT);
    }

    return returnValue;
  },

};