<template>
  <div>
    <b-container
      fluid="sm"
    >
      <h1>협력사 관리</h1>
      <b-form
        autocomplete="off"
        novalidate
        @submit.prevent="submitSearch"
      >
        <b-form-row>
          <b-col md="1">
            <label>전시기간</label>
          </b-col>
          <b-col>
            <range-date-picker
              ref="rangeDate"
              v-model="criteria"
              v-validate="'rangeDateWithTime'"
              name="rangeDate"
              :with-time="true"
              :with-range-btn="true"
              data-vv-as="전시기간"
              :data-vv-scope="searchFormScope"
              :state="stateValidation('rangeDate', searchFormScope)"
              :error="veeErrors.first('rangeDate', searchFormScope)"
            />
          </b-col>
        </b-form-row>

        <b-form-row>
          <b-col cols="4">
            <b-form-group
              label-cols-sm="4"
              label="협력사유형"
              label-for="ptnrTp"
              label-align-sm="left"
            >
              <b-select
                id="ptnrTp"
                v-model="criteria.ptnrTp"
                v-validate="'required'"
                name="ptnrTp"
                :options="[
                  {text:'전체', value: 'ALL'},
                  {text:'일반', value: 'GENERAL'},
                  {text:'1', value: '1'},
                  {text:'2', value: '2'},
                  {text:'3', value: '3'}
                ]"
                data-vv-as="협력사 유형"
                :data-vv-scope="searchFormScope"
                :state="stateValidation('ptnrTp', searchFormScope)"
              />
              <b-form-invalid-feedback :state="!veeErrors.has('ptnrTp', searchFormScope)">
                {{ veeErrors.first('ptnrTp', searchFormScope) }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col cols="4">
            <b-form-group
              label-cols-sm="4"
              label="협력사명"
              label-for="ptnrNm"
              label-align-sm="center"
            >
              <b-input
                id="ptnrNm"
                v-model="criteria.ptnrNm"
                v-validate="'korean'"
                name="ptnrNm"
                placeholder="협력사 명"
                data-vv-as="협력사 명"
                :data-vv-scope="searchFormScope"
                :state="stateValidation('ptnrNm', searchFormScope)"
                :formatter="$filters.onlyKorean"
              />
              <b-form-invalid-feedback :state="!veeErrors.has('ptnrNm', searchFormScope)">
                {{ veeErrors.first('ptnrNm', searchFormScope) }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col cols="4">
            <b-form-group
              label-cols-sm="4"
              label="협력사 번호 "
              label-for="ptnrNo"
              label-align-sm="center"
            >
              <b-input
                id="ptnrNo"
                v-model="criteria.ptnrNo"
                v-validate="'numeric'"
                name="ptnrNo"
                placeholder="협력사 번호"
                data-vv-as="협력사 번호"
                :data-vv-scope="searchFormScope"
                :state="stateValidation('ptnrNo', searchFormScope)"
                :formatter="$filters.onlyNumeric"
              />
              <b-form-invalid-feedback :state="!veeErrors.has('ptnrNo', searchFormScope)">
                {{ veeErrors.first('ptnrNo', searchFormScope) }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col cols="4">
            <b-form-group
              label-cols-sm="4"
              label="담당자명"
              label-for="empNm"
              label-align-sm="left"
            >
              <b-input
                id="empNm"
                v-model="criteria.empNo"
                name="empNm"
                placeholder="담당자 명"
              />
            </b-form-group>
          </b-col>
          <b-col class="text-right">
            <b-btn type="submit">
              검색
            </b-btn>
          </b-col>
        </b-form-row>
      </b-form>
      <b-form-group
        v-if="isEditable()"
        class="text-right"
      >
        <router-link
          to="/partner/regist"
          class="btn btn-primary"
        >
          협력사 등록
        </router-link>
      </b-form-group>
    </b-container>

    <b-container fluid="md">
      <b-form-group
        label="협력사 목록 / 총 10건"
        label-for="input-horizontal"
        label-cols-lg="11"
      >
        <b-form-select
          v-model="criteria.size"
          :options="[10, 20, 30, 40, 50]"
          @change="submitSearch"
        />
      </b-form-group>
      <b-table
        striped
        hover
        :fields="fields"
        :items="partners"
        head-variant="light"
        :busy="isBusy"
        :sort-by.sync="criteria.orderColId"
        :sort-desc.sync="criteria.orderType === 'ASC' ? false : true"
        :no-local-sorting="true"
        @row-clicked="myRowClickHandler"
        @sort-changed="sortChanged"
      >
        <template v-slot:table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle" />
            <strong>Loading...</strong>
          </div>
        </template>

        <template slot="HEAD_selected">
          <b-form-checkbox v-model="allSelected" />
        </template>

        <template v-slot:cell(selected)="row">
          <b-form-checkbox v-model="row.item.selected" />
        </template>

        <template v-slot:cell(ptnrNo)="row">
          <b-link
            :to="`/partner/detail/${row.item.ptnrNo}`"
            router-tag="a"
            class="underline"
          >
            <u>{{ row.item.ptnrNo }}</u>
          </b-link>
        </template>

        <template v-slot:cell(regDt)="row">
          <date-picker
            v-if="row.item.isDateClick"
            v-model="row.item.regDt"
          />
          <template v-else>
            {{ row.item.regDt }}
          </template>
        </template>
      </b-table>
      <b-form-group>
        <b-pagination
          v-if="totalRows > 10"
          v-model.number="criteria.page"
          align="right"
          size="sm"
          :per-page.sync="criteria.size"
          :total-rows.sync="totalRows"
          limit="10"
          first-text="<<"
          prev-text="<"
          next-text=">"
          last-text=">>"
          @change="submitSearch"
        />
      </b-form-group>
    </b-container>
  </div>
</template>
<script>

import { mapGetters, mapActions } from 'vuex';

import RangeDatePicker from '@/components/date-picker/RangeDatePicker';
import DatePicker from '@/components/date-picker/DatePicker';

export default {
  name: 'PartnerManage',
  metaInfo: {
    title: '협력사 관리',
  },
  components: {
    'date-picker': DatePicker,
    'range-date-picker': RangeDatePicker,
  },
  data () {
    return {

      criteria: {
        ptnrTp: 'ALL',
        ptnrNm: null,
        ptnrNo: '',
        empNo: '',
        strDate: '',
        strTime: '',
        endDate: '',
        endTime: '',
        orderColId: 'ptnrNo',
        orderType: 'DESC',
        page: 1,
        size: 10,
      },

      allSelected: false,
      isBusy: false,
      totalRows: 0,
    };
  },
  computed: {

    ...mapGetters('storePartner', {
      'partners': 'getPartners',
    }),

    fields () {
      return Object.freeze([
        { key: 'selected', label: '', sortable: false },
        { key: 'rowNum', label: '순번', sortable: true },
        { key: 'ptnrNo', label: '협력사 번호', sortable: true },
        { key: 'ptnrNm', label: '협력사 명', sortable: true },
        { key: 'empNm', label: '담당자', sortable: true },
        { key: 'strDtime', label: '시작일', sortable: false },
        { key: 'endDtime', label: '종료일', sortable: false },
        { key: 'regDtime', label: '등록일', sortable: false },
      ]);
    },

    searchFormScope () {
      return Object.freeze('SEARCH_FORM_SCOPE');
    },
  },

  mounted () {
    const _this = this;
    _this.$refs.rangeDate.clickOneMonth().then(() => {
      _this.submitSearch();
    });
  },

  methods: {

    ...mapActions('storePartner', [
      'readPartners',
    ]),

    submitSearch () {
      const _this = this;
      _this.checkValidation(_this.searchFormScope).then(() => {
        return _this.readPartners(_this.criteria);
      }).then(res => {
        _this.totalRows = res.totalRows;
      });
    },

    sortChanged (sorted) {
      const _this = this;
      _this.criteria.page = 1;
      _this.criteria.size = 10;
      _this.criteria.orderType = !sorted.sortDesc ? 'ASC' : 'DESC';
      _this.submitSearch();
    },

    // https://stackoverflow.com/questions/51367997/how-to-disable-row-clicked-events-for-an-entire-column-in-b-table

    // https://github.com/bootstrap-vue/bootstrap-vue/pull/4278
    myRowClickHandler (item, index, event) {
      this.$log.debug(event.srcElement);
      const element = event.srcElement;
      const isFirstElement = !element.previousSibling;
      this.$log.debug(isFirstElement);
    },
  },
};
</script>