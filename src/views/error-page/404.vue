<template>
  <div>
    <b-container>
      <b-row>
        <div class="col-md-12">
          <div class="error-template">
            <h1>
              Oops!
            </h1>
            <h2>
              404 Not Found
            </h2>
            <div class="error-details">
              Sorry, an error has occured, Requested page not found!
            </div>
            <div class="error-actions">
              <router-link
                to="/"
                class="btn btn-primary btn-lg"
              >
                <span class="glyphicon glyphicon-home" />
                Take Me Home
              </router-link>
            </div>
          </div>
        </div>
      </b-row>
    </b-container>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '페이지를 찾을 수 없습니다.',
    titleTemplate: '%s',
  },
};
</script>