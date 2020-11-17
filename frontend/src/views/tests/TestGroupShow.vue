<template>
  <v-container class="white maincontent">
    <v-row>
      <v-col>
        <Show v-if="testGroup" :testGroup="testGroup" />
      </v-col>
      <v-col>
        <v-card><canvas ref="graph"></canvas></v-card>
      </v-col>
    </v-row>
    <v-row v-if="selectedResult.length > 0">
      <v-col>
        Result:
        <v-btn icon>
          <v-icon @click="selectedResult = []" color="grey lighten-1">mdi-delete</v-icon>
        </v-btn>
        <Result :testResults="selectedResult" :panel="[0]" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h2>Alle:</h2>
        <Result v-if="testResults" :testResults="testResults" />
      </v-col>
    </v-row>
    <div class="text-center" v-if="pages > 1">
      <v-container>
        <v-row justify="center">
          <v-col cols="8">
            <v-container class="max-width">
              <v-pagination @input="loadPage" v-model="page" :length="pages"></v-pagination>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import { TestCase, TestGroup, TestResult } from '@/types/test';
import Show from '@/components/TestGroup/Show.vue';
import Chart, { ChartData, Point } from 'chart.js';
import moment from 'moment';
import _ from 'lodash';

import Result from '@/components/TestGroup/Results.vue';

@Component({
  components: { Show, Result },
})
export default class VueGroupShow extends Vue {
  private id = this.$route.params.id;

  private testGroup: TestGroup | null = null;

  private testResults: TestResult[] = [];

  private count = 0;

  private perPage = 20;

  private page = 1;

  private chart!: Chart;

  private data: { x: number; y: number; id: number }[] = [];

  private labels: string[] = [];

  private selectedResult: TestResult[] = [];

  get pages() {
    return Math.ceil(this.count / this.perPage);
  }

  mounted() {
    if (this.$route.query.result) {
      this.showSpecificTestbyId(Number(this.$route.query.result));
    }

    axios
      .get(`/api/test-group/${this.id}`)
      .then((resp) => {
        this.testGroup = resp.data.data;
      })
      .catch((e) => console.log(e));
    this.chart = new Chart(this.$refs.graph as HTMLCanvasElement, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Prozentsatz erkannt',
            data: this.data,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        onClick: this.showSpecificTest,
        title: {
          display: false,
          text: 'Results',
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Month',
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                max: 100,
                min: 0,
                stepSize: 50,
              },
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Value',
              },
            },
          ],
        },
      },
    });
    this.loadPage();
    this.loadGraph();
  }

  showSpecificTest(e: MouseEvent) {
    this.selectedResult = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const activePoints = this.chart.getElementAtEvent(e) as any;
    if (activePoints[0]) {
      // eslint-disable-next-line no-underscore-dangle
      const chartData = activePoints[0]._chart.config.data;
      // eslint-disable-next-line no-underscore-dangle
      const idx = activePoints[0]._index;
      const label = chartData.labels[idx];
      const value = chartData.datasets[0].data[idx];
      console.log(idx, label, value);

      axios
        .get(`/api/test/result/${value.id}`)
        .then((res) => {
          this.selectedResult.push(res.data.data);
        })
        .catch((err) => console.log(err));
    }
  }

  showSpecificTestbyId(id: number) {
    this.selectedResult = [];
    axios
      .get(`/api/test/result/${id}`)
      .then((res) => {
        this.selectedResult.push(res.data.data);
      })
      .catch((err) => console.log(err));
  }

  loadGraph() {
    axios.get(`/api/test-group/result/graph/${this.id}`).then((resp) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      resp.data.data.forEach((a: any) => {
        this.labels.push(moment(a.date).format('D-M-Y H:mm:ss'));
        this.data.push({
          y: Math.ceil((a.success / a.total) * 100),
          x: a.date,
          id: a.testResult_id,
        });
      });
      this.labels = this.labels.reverse().slice(20);
      this.data = this.data.reverse().slice(20);
      this.chart.update();
    });
  }

  loadPage() {
    axios
      .get(`/api/test-group/result/${this.id}?each=${this.perPage}&page=${this.page}`)
      .then((resp) => {
        this.testResults = resp.data.data.data;
        this.count = resp.data.data.count;
      })
      .catch((e) => console.log(e));
  }
}
</script>

<style lang="scss"></style>
