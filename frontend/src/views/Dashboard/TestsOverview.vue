<template>
  <v-container class="myGrid">
    <v-card
      v-for="result in testGroupResults"
      :key="result.id"
      :class="getColor(result)"
      class="lighten-3"
      @click="goToResult(result)"
    >
      <v-card-title class="caption">{{ result.testGroup.name }}</v-card-title>
      <v-card-subtitle class="caption">{{ result.date | dateFormat }} </v-card-subtitle>
      <v-card-text class="caption"> Status: {{ result.success }}/{{ result.failure }} </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component({
  components: {},
})
export default class TestsOverview extends Vue {
  private testGroupResults = [];

  private count = 0;

  private limit = 14;

  // http://localhost:8000/
  mounted() {
    this.load();
  }

  load() {
    axios
      .get(`/api/testresult?limit=${this.limit}`)
      .then((resp) => {
        console.log(resp.data);
        this.testGroupResults = resp.data.data.data;
        this.count = resp.data.data.count;
      })
      .catch((e) => console.log(e));
  }

  goToResult(result: any) {
    this.$router.push(`/testgroup/show/${result.testGroup.id}?result=${result.id}`);
  }

  // eslint-disable-next-line class-methods-use-this
  getColor(result: any) {
    if (result.failure === 0) return 'green';
    if (result.success >= result.failure) return 'yellow';
    return 'red';
  }
}
</script>

<style lang="scss">
.myGrid {
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto;
  grid-gap: 0.5rem;
}

.v-card {
}
</style>
