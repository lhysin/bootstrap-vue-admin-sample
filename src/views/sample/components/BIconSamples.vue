<template>
  <b-container fluid>
    <b-card
      title="Bootstrap ICON"
      class="mt-5"
    >
      <a
        href="https://bootstrap-vue.org/docs/icons"
        target="_blank"
      >
        https://bootstrap-vue.org/docs/icons
      </a>
    </b-card>
    <b-card
      title="아이콘"
      class="mt-5"
    >
      <b-icon-arrow-up />
      <b-icon-arrow-down />
    </b-card>
    <b-card
      title="아이콘 + 입력폼"
      class="mt-5"
    >
      <b-input-group>
        <b-input-group-prepend is-text>
          <b-icon-arrow-up />
        </b-input-group-prepend>
        <b-form-input />
      </b-input-group>
    </b-card>
  </b-container>
</template>

<script>

/**
 * https://bootstrap-vue.org/docs/icons/#bootstrap-icons
 */

import { BIconArrowUp, BIconArrowDown } from 'bootstrap-vue';

export default {
  name: 'BIconSamples',
  metaInfo: {
    title: 'BIcon 샘플',
  },
  components: {
    'b-icon-arrow-up': BIconArrowUp,
    'b-icon-arrow-down': BIconArrowDown,
  },
  data () {
    return {
    };
  },
};
</script>