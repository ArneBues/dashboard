<template>
  <v-data-table :headers="headers" :items="tests" show-expand>
    <template v-slot:expanded-item="{ item }" content-class="elevation-0 email" class="">
      <td :colspan="headers.length" v-if="item.email">
        <span :inner-html.prop="item.email | formatMarked"></span>
      </td>
    </template>
    <template v-slot:[`item.percentage`]="{ item }">
      <td v-if="item.percentage >= successPercentage">Erkannt {{ item.percentage }}%</td>
      <td v-else-if="item.email === null">Keine Antwort erhalten</td>
      <td v-else>Nicht Erkannt {{ item.percentage }}%</td>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { Fragment } from 'vue-fragment';
import { Tests } from '@/types/test';
import axios from 'axios';

@Component({
  components: {},
})
export default class TestsList extends Vue {
  @Prop() private testCaseID!: number;

  @Prop() private successPercentage!: number;

  private tests: Tests[] = [];

  private headers = [
    { text: 'Datum', value: 'date' },
    { text: 'Status', value: 'percentage' },
  ];

  mounted() {
    console.log(this.successPercentage);
    axios
      .get(`/api/test/tests/${this.testCaseID}`)
      .then((resp) => {
        console.log('sss', resp.data);
        this.tests = resp.data.data;
      })
      .catch((e) => console.log(e));
  }
}
</script>

<style lang="scss"></style>
