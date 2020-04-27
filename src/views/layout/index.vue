<template>
  <div>
    <TheNavbar />
    <TheBreadcrumb />
    <div class="router-transitions container-fluid flex-grow-1 container-p-y">
      <router-view />
    </div>
    <TheFooter />
  </div>
</template>

<script>

import TheNavbar from '@/views/layout/components/TheNavbar';
import TheBreadcrumb from '@/views/layout/components/TheBreadcrumb';
import TheFooter from '@/views/layout/components/TheFooter';

export default {
  name: 'TheLayout',
  components: {
    'TheNavbar': TheNavbar,
    'TheBreadcrumb': TheBreadcrumb,
    'TheFooter': TheFooter,
  },
  data () {
    return {
    };
  },

  beforeMount () {
  },

  mounted () {
  },

  methods: {
  },
};
</script>