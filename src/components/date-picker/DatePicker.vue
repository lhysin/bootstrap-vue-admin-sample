<template>
  <div>
    <flat-pickr
      v-model="date"
      :config="flatPickerConfigs"
      placeholder="YYYY.MM.DD"
      :class="['form-control',
               { 'is-invalid': state !== null && !state },
               { 'is-valid': state !== null && state }
      ]"
    />
    <b-form-invalid-feedback :state="state">
      {{ error }}
    </b-form-invalid-feedback>
  </div>
</template>

<script>

import FlatPickr from 'vue-flatpickr-component';
import flatpickrUtils from '@/utils/flatpickr-utils';
import 'flatpickr/dist/flatpickr.min.css';

export default {

  name: 'DatePicker',

  components: {
    'flat-pickr': FlatPickr,
  },

  props: {
    value: {
      type: String,
      default: '',
    },
    state: {
      type: Boolean,
      required: false,
    },
    error: {
      type: String,
      required: false,
      default: null,
    },
    config: {
      type: Object,
      required: false,
      default: null,
    },
  },

  data () {
    return {
      date: '',
    };
  },

  computed: {
    flatPickerConfigs () {
      const _this = this;
      if (_this.config) {
        return _this.config;
      } else {
        return flatpickrUtils.createDateFlatPickrConfig();
      }
    },
  },

  watch: {
    date () {
      const _this = this;
      _this.$emit('input', _this.date);
    },
  },

  beforeMount: function beforeMount () {
    const _this = this;
    _this.date = _this.value;
  },

  mounted () {
    const _this = this;
    _this.date = _this.value;
  },
};
</script>
<style scoped>
.form-control:not(:disabled) {
  cursor: pointer;
  background-color: white;
}
</style>
