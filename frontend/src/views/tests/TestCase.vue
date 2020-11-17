/* eslint-disable no-alert */
<template>
  <v-container class="white maincontent">
    <v-alert v-if="message.message" :type="message.type">
      {{ message.message }}
    </v-alert>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            {{ testCase.name }}
          </v-card-title>
          <v-card-text>
            <span :inner-html.prop="testCase.description | formatMarked"></span>
          </v-card-text>
          <v-card-actions>
            <v-btn v-if="loggedIn" color="primary" @click="edit">Edit</v-btn>
            <v-spacer> </v-spacer>
            <v-btn v-if="loggedIn" color="primary" @click="deleteTestCase(testCase)">Löschen</v-btn>
            <v-spacer> </v-spacer><v-btn color="primary" @click="executeTest">Test ausführen</v-btn>
            <v-spacer> </v-spacer>
            <a :href="'/api/test/download/' + id"><v-btn color="primary">Download</v-btn></a>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <v-card>Graph<canvas ref="graph"></canvas></v-card>
      </v-col>
    </v-row>
    <v-row v-if="testCase.id !== 0">
      <v-col>
        <h2>Alle:</h2>
        <TestsList :testCaseID="testCase.id" :successPercentage="testCase.successPercent" />
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="300" v-if="testDelete">
      <v-card>
        <v-card-title class="headline"> Test {{ testDelete.name }} löschen? </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red darken-1" text @click="deleteConfirm"> Ja </v-btn>

          <v-btn color="green darken-1" text @click="dialog = false"> Abbrechen </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { TestCase } from '@/types/test';
import axios from 'axios';
import TestsList from '@/components/TestsList.vue';
import Chart, { ChartData, Point } from 'chart.js';
import moment from 'moment';

@Component({
  components: {
    TestsList,
  },
})
export default class TestForm extends Vue {
  private testCase: TestCase = {
    id: 0,
    name: '',
    description: '',
    file: '',
    successPercent: '',
  };

  private id = this.$route.params.id;

  private componentKey = 0;

  private loggedIn = this.$store.getters.isLoggedIn;

  private message = { type: 'success', message: '' };

  private testDelete: TestCase | null = null;

  private dialog = false;

  private chart!: Chart;

  private data: { x: number; y: number; id: number }[] = [];

  private labels: string[] = [];

  mounted() {
    axios
      .get(`/api/test/${this.id}`)
      .then((resp) => {
        console.log(resp.data);
        this.testCase = resp.data.data;
        console.log(this.testCase);
        console.log(this.testCase.successPercent);
      })
      .catch((e) => console.log(e));

    this.chart = new Chart(this.$refs.graph as HTMLCanvasElement, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Prozentsatz Erkannt',
            data: this.data,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
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
    this.loadGraph();
  }

  forceRerender() {
    this.componentKey += 1;
  }

  loadGraph() {
    axios.get(`/api/test/tests/${this.id}?limit=10`).then((resp) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any

      console.log('ss', resp);
      resp.data.data.forEach((a: any) => {
        this.labels.push(moment(a.date).format('D-M-Y H:mm:ss'));
        this.data.push({ y: a.percentage, x: a.date, id: 0 });
      });
      this.labels = this.labels.reverse();
      this.data = this.data.reverse();
      this.chart.update();
    });
  }

  deleteTestCase(e: TestCase) {
    this.testDelete = e;
    this.dialog = true;
  }

  deleteConfirm() {
    this.dialog = false;
    if (this.testDelete) {
      axios
        .delete(`/api/test/${this.testDelete.id}`)
        .then((resp) => {
          this.message.type = 'success';
          this.message.message = resp.data.data.message;
          this.$router.push('/test');
        })
        .catch((e) => console.log(e));
    }
    this.testDelete = null;
  }

  edit() {
    this.$router.push(`/test/edit/${this.testCase.id}`);
  }

  executeTest() {
    axios
      .get(`/api/test/executetest/${this.id}`)
      .then((resp) => {
        console.log(resp.data);
        this.forceRerender();
        this.message.message = 'Test gesendet';
        this.message.type = 'success';
      })
      .catch((e) => {
        this.message.message = 'Test nicht gesendet';
        this.message.type = 'error';
        console.log(e);
      });
  }
}
</script>

<style lang="scss"></style>
