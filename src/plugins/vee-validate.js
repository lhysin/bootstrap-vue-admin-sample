import Vue from 'vue';

import { Validator, install as VeeValidate } from 'vee-validate/dist/vee-validate.minimal.esm.js';
import * as rules from 'vee-validate/dist/rules.esm.js';

import customRules from '@/plugins/vee-validate-custom-rules';
import dictionary from '@/plugins/vee-validate-dictionary';

// All rules.
Object.keys(rules).forEach(rule => {
  Validator.extend(rule, rules[rule]);
});

// Merge the messages.
Validator.localize('ko', dictionary.ko);

// Add the custom rules you need.
Object.keys(customRules).forEach(rule => {
  Validator.extend(rule, customRules[rule]);
});

const config = {
  // aria: true,
  // classNames: {},
  // classes: false,
  // delay: 0,
  // dictionary: null,
  // errorBagName: 'errors', // change if property conflicts
  // fieldsBagName: 'fields',
  // i18n: null, // the vue-i18n plugin instance
  // i18nRootKey: 'validations', // the nested key under which the validation messages will be located
  // inject: true,
  // validity: false,
  // useConstraintAttrs: true,

  locale: 'ko',
  // events: 'change|blur|submit',
  events: 'submit',

  // Important to name this something other than 'fields'
  // https://github.com/bootstrap-vue/bootstrap-vue/issues/1270
  fieldsBagName: 'veeFields',

  // This is not required but avoids possible naming conflicts
  errorBagName: 'veeErrors',
};

// install the plugin
Vue.use(VeeValidate, config);

const extendMixin = {

  methods: {

    stateValidation (ref, scope, showValidState) {
      let targetField = null;
      if (scope) {
        const field = this.veeFields['$' + scope];
        if (field) {
          targetField = field[ref];
        }
      } else {
        targetField = this.veeFields[ref];
      }

      let state = null;
      if (targetField && targetField.validated) {

        state = !this.veeErrors.has(ref, scope);
        if (!showValidState && state) {
          state = null;
        }

      }

      return state;
    },

    checkValidation (dataScope) {
      const _this = this;

      return new Promise(function (resolve) {
        _this.$validator.validateAll(dataScope).then(isValid => {
          if (isValid) {
            resolve();
          } else {
            let alertMsg = '';
            const errorList = _this.$validator.errors.items;
            for (let error of errorList) {
              if (!!dataScope && error.scope !== dataScope) {
                continue;
              }
              alertMsg += error.msg + '\n';
            }
            alertMsg += _this.$globalConsts.INVALID_FORM_MSG;
            alert(alertMsg);
          }
        });
      });
    },

    compareEqObj (source, target) {
      const _this = this;

      return new Promise(function (resolve) {
        _this.$nextTick(function () {
          const isEq = JSON.stringify(source) === JSON.stringify(target);
          if (isEq) {
            alert(_this.$globalConsts.UNCHANGED_DATA_MSG);
          } else {
            resolve();
          }
        });
      });
    },
  },
};

Vue.mixin(extendMixin);