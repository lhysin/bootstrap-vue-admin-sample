import { Korean } from 'flatpickr/dist/l10n/ko';

const flatPickrConfigs = {
  date: {
    locale: Korean,
    dateFormat: 'Y.m.d',
    altFormat: 'Y.m.d',
    allowInput: false,
  },
  time: {
    enableTime: true,
    noCalendar: true,
    time_24hr: true,
    dateFormat: 'H:i',
    altFormat: 'H:i',
    minuteIncrement: 1,
    allowInput: false,
  },
};

export default {

  createRangeFlatPickrConfig (isTime) {

    const flatPickerConfigs = {};

    flatPickerConfigs.strDate = Object.assign({
      minDate: null,
      maxDate: null,
    }, flatPickrConfigs.date);

    flatPickerConfigs.endDate = Object.assign({
      minDate: null,
      maxDate: null,
    }, flatPickrConfigs.date);

    if (isTime) {
      flatPickerConfigs.strTime = Object.assign({
        minDate: null,
        maxDate: null,
      }, flatPickrConfigs.time);
      flatPickerConfigs.endTime = Object.assign({
        minDate: null,
        maxDate: null,
      }, flatPickrConfigs.time);
    }

    return flatPickerConfigs;
  },

  createDateFlatPickrConfig () {
    return Object.assign({
      minDate: null,
      maxDate: null,
    }, flatPickrConfigs.date);
  },

  createTimeFlatPickrConfig () {
    return Object.assign({
      minDate: null,
      maxDate: null,
    }, flatPickrConfigs.time);
  },

};

