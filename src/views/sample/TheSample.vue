<template>
  <b-container fluid>
    <h1>샘플모음</h1>
    <b-card no-body>
      <b-tabs
        pills
        card
        vertical
      >
        <b-tab
          title="날짜입력"
          active
        >
          <date-picker-samples />
        </b-tab>
        <b-tab title="비디오재생">
          <video-player-samples />
        </b-tab>
        <b-tab title="HTML에디터">
          <html-editor-samples />
        </b-tab>
        <b-tab title="아이콘">
          <b-icon-samples />
        </b-tab>
      </b-tabs>
    </b-card>
  </b-container>
</template>

<script>
export default {
  name: 'TheSample',
  components: {
    'date-picker-samples': () => ({
      component: import('@/views/sample/components/DatePickerSamples.vue'),
    }),
    'video-player-samples': () => ({
      component: import('@/views/sample/components/VideoPlayerSamples.vue'),
    }),
    'html-editor-samples': () => ({
      component: import('@/views/sample/components/HtmlEditorSamples.vue'),
    }),
    'b-icon-samples': () => ({
      component: import('@/views/sample/components/BIconSamples.vue'),
    }),
  },
};
</script>