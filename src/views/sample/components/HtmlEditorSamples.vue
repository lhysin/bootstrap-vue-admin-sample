<template>
  <b-container fluid>
    <h3>미구현</h3>
    <html-editor
      v-model="htmlEditorContent"
      :config="htmlEditorOption"
      class="form-control"
      name="htmlEditor"
    />
  </b-container>
</template>

<script>

import HtmlEditor from '@/components/editor/HtmlEditor';

export default {
  name: 'HtmlEditor',
  metaInfo: {
    title: 'HTML 에디터',
  },
  components: {
    'html-editor': HtmlEditor,
  },
  data () {
    return {

      htmlEditorContent: null,
      htmlEditorOption: {
      },
    };
  },
};
</script>