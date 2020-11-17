<template>
  <v-container class="container2">
    <v-layout row>
      <v-flex class="functiontest"><TestsOverview /></v-flex>
    </v-layout>
    <v-layout row>
      <v-flex md3 class="news">
        <NewsOverview />
      </v-flex>
      <v-flex class="publishers"> <Publishers /> </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import TestsOverview from '@/views/Dashboard/TestsOverview.vue';
import NewsOverview from '@/views/news/NewsOverview.vue';
import Publishers from '@/views/Publishers.vue';

@Component({
  components: {
    TestsOverview,
    Publishers,
    NewsOverview,
  },
})
export default class Dashboard extends Vue {
  mounted() {
    console.log(this.$store.getters.getUser);
  }
}
</script>

<style lang="scss" scoped>
.container2 {
  width: 90%;
}

.news {
  background-color: white;
  margin-right: 20px;
}
.functiontest {
  background-color: white;
  margin-bottom: 20px;
}
.publishers {
  background-color: white;
}
</style>
