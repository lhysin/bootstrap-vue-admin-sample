<template>
  <div>
    <flat-pickr
      v-model="time"
      :config="flatPickerConfigs"
      placeholder="HH:MM"
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
    name: {
      type: String,
      required: true,
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
      time: '',
    };
  },

  computed: {
    flatPickerConfigs () {
      const _this = this;
      if (_this.config) {
        return _this.config;
      } else {
        return flatpickrUtils.createTimeFlatPickrConfig();
      }
    },
  },

  watch: {
    time () {
      const _this = this;
      _this.$emit('input', _this.time);
    },
  },

  beforeMount: function beforeMount () {
    const _this = this;
    _this.date = _this.value;
  },

  mounted () {
    const _this = this;
    _this.time = _this.value;
  },
};
</script>
<style scoped>
.form-control:not(:disabled) {
  cursor: pointer;
  background-color: white;
}
</style>
