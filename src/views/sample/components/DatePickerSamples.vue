<template>
  <b-container fluid>
    <b-card
      title="DatePicker, TimePicker"
      class="mt-5"
    >
      <b-form
        autocomplete="off"
        @submit.prevent="onSubmit('dateAndTimeScope')"
      >
        <b-form-row>
          <b-col>
            <b-form-group
              description="날짜선택"
              label-for="date"
            >
              <date-picker
                id="date"
                v-model="date"
                v-validate="'required'"
                name="date"
                data-vv-as="단일 날짜"
                data-vv-scope="dateAndTimeScope"
                :state="stateValidation('date', 'dateAndTimeScope')"
                :error="veeErrors.first('date', 'dateAndTimeScope')"
              />
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
              description="시간선택"
              label-for="time"
            >
              <time-picker
                id="time"
                v-model="time"
                v-validate="'required'"
                name="time"
                data-vv-as="단일 시간"
                data-vv-scope="dateAndTimeScope"
                :state="stateValidation('time', 'dateAndTimeScope')"
                :error="veeErrors.first('time', 'dateAndTimeScope')"
              />
            </b-form-group>
          </b-col>
          <b-col class="text-right">
            <b-btn type="submit">
              submit
            </b-btn>
          </b-col>
        </b-form-row>
      </b-form>
    </b-card>

    <b-card
      title="RangeDatePicker"
      class="mt-5"
    >
      <b-form
        autocomplete="off"
        @submit.prevent="onSubmit('rangeDateScope')"
      >
        <b-form-row>
          <b-col>
            <b-form-group label="withTime, WithRangeBtn">
              <range-date-picker
                v-model="criteria1"
                v-validate="'rangeDateWithTime'"
                name="rangeDate1"
                :with-time="true"
                :with-range-btn="true"
                :show-desc="false"
                data-vv-as="withTime, WithRangeBtn"
                data-vv-scope="rangeDateScope"
                :state="stateValidation('rangeDate1', 'rangeDateScope')"
                :error="veeErrors.first('rangeDate1', 'rangeDateScope')"
              />
            </b-form-group>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col>
            <b-form-group label="withTime, withoutRangeBtn">
              <range-date-picker
                v-model="criteria2"
                v-validate="'rangeDateWithTime'"
                name="rangeDate2"
                :with-time="true"
                :with-range-btn="false"
                data-vv-as="withTime, WithRangeBtn"
                data-vv-scope="rangeDateScope"
                :state="stateValidation('rangeDate2', 'rangeDateScope')"
                :error="veeErrors.first('rangeDate2', 'rangeDateScope')"
              />
            </b-form-group>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col>
            <b-form-group label="withoutTime, withRangeBtn">
              <range-date-picker
                v-model="criteria3"
                v-validate="'rangeDate'"
                name="rangeDate3"
                :with-time="false"
                :with-range-btn="true"
                data-vv-as="withoutTime, withRangeBtn"
                data-vv-scope="rangeDateScope"
                :state="stateValidation('rangeDate3', 'rangeDateScope')"
                :error="veeErrors.first('rangeDate3', 'rangeDateScope')"
              />
            </b-form-group>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col>
            <b-form-group label="withoutTime, withoutRangeBtn">
              <range-date-picker
                v-model="criteria4"
                v-validate="'rangeDate'"
                name="rangeDate4"
                :with-time="false"
                :with-range-btn="false"
                data-vv-as="withoutTime, withoutRangeBtn"
                data-vv-scope="rangeDateScope"
                :state="stateValidation('rangeDate4', 'rangeDateScope')"
                :error="veeErrors.first('rangeDate4', 'rangeDateScope')"
              />
            </b-form-group>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col class="text-right">
            <b-btn type="submit">
              submit
            </b-btn>
          </b-col>
        </b-form-row>
      </b-form>
    </b-card>
  </b-container>
</template>

<script>

import RangeDatePicker from '@/components/date-picker/RangeDatePicker';
import DatePicker from '@/components/date-picker/DatePicker';
import TimePicker from '@/components/date-picker/TimePicker';

export default {
  name: 'DatePickerSamples',
  metaInfo: {
    title: '날짜 선택 샘플',
  },
  components: {
    'range-date-picker': RangeDatePicker,
    'date-picker': DatePicker,
    'time-picker': TimePicker,
  },
  data () {
    return {
      date: null,
      time: null,
      criteria1: {},
      criteria2: {},
      criteria3: {},
      criteria4: {},

    };
  },
  methods: {
    onSubmit (scope) {
      const _this = this;
      _this.checkValidation(_this.$validator, scope).then(() => {
        this.$log.debug('onSubmit scope : ' + scope + ' validation Success.');
      }).catch(() => {
        this.$log.warn('onSubmit scope : ' + scope + ' validation Fail.');
      });
    },
  },
};
</script>