<template>
  <div>
    <b-form-row>
      <b-col :cols="cols">
        <b-form-group>
          <flat-pickr
            v-model="value.strDate"
            name="strDate"
            class="form-control"
            :config="flatPickerConfigs[0].strDate"
            :placeholder="!disabled ? 'YYYY.MM.DD' : null"
            :disabled="disabled"
            :class="['form-control',
                     { 'is-invalid': state !== null && !state },
                     { 'is-valid': state !== null && state }
            ]"
          />
        </b-form-group>
      </b-col>
      <b-col
        v-if="withTime"
        cols="2"
      >
        <b-form-group>
          <flat-pickr
            v-model="value.strTime"
            name="strTime"
            class="form-control"
            :placeholder="!disabled ? 'HH:MM' : null"
            :config="flatPickerConfigs[0].strTime"
            :disabled="!value.strDate || disabled"
            :class="['form-control',
                     { 'is-invalid': state !== null && !state },
                     { 'is-valid': state !== null && state }
            ]"
          />
        </b-form-group>
      </b-col>
      <b-col :cols="cols">
        <b-form-group>
          <flat-pickr
            v-model="value.endDate"
            name="endDate"
            class="form-control"
            :config="flatPickerConfigs[0].endDate"
            :placeholder="!disabled ? 'YYYY.MM.DD' : null"
            :disabled="disabled"
            :class="['form-control',
                     { 'is-invalid': state !== null && !state },
                     { 'is-valid': state !== null && state }
            ]"
          />
        </b-form-group>
      </b-col>
      <b-col
        v-if="withTime"
        cols="2"
      >
        <b-form-group>
          <flat-pickr
            v-model="value.endTime"
            name="endTime"
            class="form-control"
            :placeholder="!disabled ? 'HH:MM' : null"
            :config="flatPickerConfigs[0].endTime"
            :disabled="!value.endDate || disabled"
            :class="['form-control',
                     { 'is-invalid': state !== null && !state },
                     { 'is-valid': state !== null && state }
            ]"
          />
        </b-form-group>
      </b-col>
      <b-col
        v-if="withRangeBtn"
        class="text-right"
      >
        <b-button-group>
          <b-button
            pill
            variant="outline-secondary"
            :class="{ active : searchDtmActiveBtn === constants.searchDtmToday }"
            @click.prevent="clickToday"
          >
            당일
          </b-button>
          <b-button
            pill
            variant="outline-secondary"
            :class="{ active : searchDtmActiveBtn === constants.searchDtmWeek }"
            @click.prevent="clickWeek"
          >
            1주일
          </b-button>
          <b-button
            pill
            variant="outline-secondary"
            :class="{ active : searchDtmActiveBtn === constants.searchDtmOneMonth }"
            @click.prevent="clickOneMonth"
          >
            1개월
          </b-button>
          <b-button
            pill
            variant="outline-secondary"
            :class="{ active : searchDtmActiveBtn === constants.searchDtmThreeMonth }"
            @click.prevent="clickThreeMonth"
          >
            3개월
          </b-button>
        </b-button-group>
      </b-col>
    </b-form-row>
    <b-form-row>
      <b-form-invalid-feedback :state="state">
        {{ error }}
      </b-form-invalid-feedback>
    </b-form-row>
  </div>
</template>

<script>

import FlatPickr from 'vue-flatpickr-component';
import flatpickrUtils from '@/utils/flatpickr-utils';
import 'flatpickr/dist/flatpickr.min.css';

export default {
  name: 'RangeDatePicker',

  components: {
    'flat-pickr': FlatPickr,
  },

  props: {
    withTime: {
      type: Boolean,
      default: false,
    },
    withRangeBtn: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Object,
      required: true,
    },
    state: {
      type: Boolean,
      required: false,
      default: null,
    },
    error: {
      type: String,
      required: false,
      default: null,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data () {
    return {
      flatPickerConfigs: [],
      searchDtmActiveBtn: null,
    };
  },

  computed: {

    constants () {
      return Object.freeze({
        searchDtmToday: 'TODAY',
        searchDtmWeek: 'WEEK',
        searchDtmOneMonth: 'ONE_MONTH',
        searchDtmThreeMonth: 'THREE_MONTH',
      });
    },

    cols () {
      const _this = this;
      if (_this.withTime && _this.withRangeBtn) {
        return '2';
      } else if ((_this.withTime && !_this.withRangeBtn) ||
        (!_this.withTime && _this.withRangeBtn)) {
        return '4';
      } else {
        return null;
      }
    },
  },

  watch: {
    'value.strDate' () {
      this.changeDate('strDate', this.value.strDate);
    },
    'value.strTime' () {
      this.changeDate('strTime', this.value.strTime);
    },
    'value.endDate' () {
      this.changeDate('endDate', this.value.endDate);
    },
    'value.endTime' () {
      this.changeDate('endTime', this.value.endTime);
    },
  },

  beforeMount () {
    const _this = this;

    const flatPickerConfig = flatpickrUtils.createRangeFlatPickrConfig(_this.withTime);
    _this.flatPickerConfigs.push(flatPickerConfig);
  },

  methods: {

    clickToday () {
      const _this = this;

      return new Promise(function (resolve) {
        _this.clickChangeDate(_this.constants.searchDtmToday);
        resolve();
      });
    },

    clickWeek () {
      const _this = this;

      return new Promise(function (resolve) {
        _this.clickChangeDate(_this.constants.searchDtmWeek);
        resolve();
      });
    },

    clickOneMonth () {
      const _this = this;

      return new Promise(function (resolve) {
        _this.clickChangeDate(_this.constants.searchDtmOneMonth);
        resolve();
      });
    },

    clickThreeMonth () {
      const _this = this;

      return new Promise(function (resolve) {
        _this.clickChangeDate(_this.constants.searchDtmThreeMonth);
        resolve();
      });
    },

    clickChangeDate (type) {
      const _this = this;

      return new Promise(function (resolve) {
        const calculateRangeData = _this.calculateRangeData(type);

        const newObj = {
          ..._this.value,
          strDate: calculateRangeData.strDate,
          endDate: calculateRangeData.endDate,
        };

        if (_this.withTime) {
          newObj.strTime = _this.$moment('00:00', _this.$globalConsts.HH_MM_FORMAT).format(_this.$globalConsts.HH_MM_FORMAT);
          newObj.endTime = _this.$moment('23:59', _this.$globalConsts.HH_MM_FORMAT).format(_this.$globalConsts.HH_MM_FORMAT);
        }
        _this.$emit('input', newObj);
        resolve();
      });

    },

    calculateRangeData (type) {
      const _this = this;

      const returnData = {};

      const now = _this.$moment();

      returnData.endDate = now.format(_this.$globalConsts.YYYY_MM_DD_FORMAT);

      if (type === _this.constants.searchDtmToday) {
        returnData.strDate = now.format(_this.$globalConsts.YYYY_MM_DD_FORMAT);
      } else if (type === _this.constants.searchDtmWeek) {
        returnData.strDate = now.subtract(1, 'week').format(_this.$globalConsts.YYYY_MM_DD_FORMAT);
      } else if (type === _this.constants.searchDtmOneMonth) {
        returnData.strDate = now.subtract(1, 'month').format(_this.$globalConsts.YYYY_MM_DD_FORMAT);
      } else if (type === _this.constants.searchDtmThreeMonth) {
        returnData.strDate = now.subtract(3, 'month').format(_this.$globalConsts.YYYY_MM_DD_FORMAT);
      }

      return returnData;
    },

    changeDate (colId, value) {
      const _this = this;

      const config = _this.flatPickerConfigs[0];

      if (!value) {
        if (colId === 'strDate') {
          config.endDate.minDate = null;
        } else if (colId === 'endDate') {
          config.strDate.maxDate = null;
        }
      } else {

        if (colId === 'strDate') {

          if (!_this.value.strTime) {
            _this.value.strTime = _this.$moment('00:00', _this.$globalConsts.HH_MM_FORMAT).format(_this.$globalConsts.HH_MM_FORMAT);
          }

          if (value === _this.value.endDate) {
            _this.value.strTime = _this.$moment('00:00', _this.$globalConsts.HH_MM_FORMAT).format(_this.$globalConsts.HH_MM_FORMAT);
            if (_this.withTime) {
              config.strTime.maxDate = _this.value.endTime;
            }
          } else {
            if (_this.withTime) {
              config.strTime.maxDate = null;
            }
          }

          config.endDate.minDate = value;
          _this.value.strDate = value;

        } else if (colId === 'strTime' && _this.withTime) {

          if (_this.value.strDate === _this.value.endDate) {
            config.endTime.minDate = value;
          } else {
            config.endTime.minDate = null;
          }
          _this.value.strTime = value;

        } else if (colId === 'endDate') {

          if (!_this.value.endTime) {
            _this.value.endTime = _this.$moment('23:59', _this.$globalConsts.HH_MM_FORMAT).format(_this.$globalConsts.HH_MM_FORMAT);
          }

          if (_this.value.strDate === value) {
            _this.value.endTime = _this.$moment('23:59', _this.$globalConsts.HH_MM_FORMAT).format(_this.$globalConsts.HH_MM_FORMAT);
            if (_this.withTime) {
              config.endTime.minDate = _this.value.strTime;
            }
          } else {
            if (_this.withTime) {
              config.endTime.minDate = null;
            }
          }

          config.strDate.maxDate = value;
          _this.value.endDate = value;

        } else if (colId === 'endTime' && _this.withTime) {

          if (_this.value.strDate === _this.value.endDate) {
            config.strTime.maxDate = value;
          } else {
            config.strTime.maxDate = null;
          }

          _this.value.endTime = value;
        }

        if (_this.compareCriteria(_this.constants.searchDtmToday)) {
          _this.searchDtmActiveBtn = _this.constants.searchDtmToday;
        } else if (_this.compareCriteria(_this.constants.searchDtmWeek)) {
          _this.searchDtmActiveBtn = _this.constants.searchDtmWeek;
        } else if (_this.compareCriteria(_this.constants.searchDtmOneMonth)) {
          _this.searchDtmActiveBtn = _this.constants.searchDtmOneMonth;
        } else if (_this.compareCriteria(_this.constants.searchDtmThreeMonth)) {
          _this.searchDtmActiveBtn = _this.constants.searchDtmThreeMonth;
        } else {
          _this.searchDtmActiveBtn = null;
        }
      }
    },

    compareCriteria (type) {
      const _this = this;
      const calculateRangeData = _this.calculateRangeData(type);

      return calculateRangeData.strDate === _this.value.strDate && calculateRangeData.endDate === _this.value.endDate;
    },
  },
};

</script>
<style scoped>
.form-control:not(:disabled) {
  cursor: pointer;
  background-color: white;
}
</style>