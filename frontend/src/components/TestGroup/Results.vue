<template>
  <v-container class="ma-0 pa-0">
    <v-expansion-panels class="ma-0 pa-0" v-model="panel" multiple dense>
      <v-expansion-panel class="ma-0 pa-0" v-for="testResult in testResults" :key="testResult.id">
        <v-expansion-panel-header class="ma-0 pa-0">
          <v-col>{{ testResult.date | dateFormat }}</v-col>
          <v-col>Result: {{ getResult(testResult.tests) }}</v-col>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-expansion-panels>
            <v-expansion-panel class="ma-0 pa-0" v-for="test in testResult.tests" :key="test.id">
              <v-expansion-panel-header class="ma-0 pa-0">
                <v-col>
                  <router-link :to="{ name: 'test/show', params: { id: test.testCase.id } }">
                    {{ test.testCase.name }}
                  </router-link>
                </v-col>
                <v-col v-if="typeof test.percentage === 'number'">
                  Erkannt: {{ test.percentage }}% Erwartet: {{ test.testCase.successPercent }}%
                </v-col>
                <v-col v-else> Antwort von Urkund austehend. </v-col>
                <v-col>{{ test.date | dateFormat }}</v-col>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col>
                    {{ test.testCase.filename }}
                  </v-col>
                  <v-col>
                    {{ test.testCase.descripton }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col v-if="test.email">
                    <span :inner-html.prop="test.email | formatMarked"></span>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script lang="ts">
/* eslint-disable class-methods-use-this */
import { Component, Prop, Vue } from 'vue-property-decorator';
import { TestGroup, TestResult, Tests } from '@/types/test';

@Component({
  components: {},
})
export default class Result extends Vue {
  @Prop()
  testResults!: TestResult[];

  @Prop()
  private panel!: number[];

  mounted() {
    console.log(this.testResults);
  }

  getResult(tests: Tests[]) {
    if (!tests) return 'test';

    let total = 0;
    let success = 0;

    tests.forEach((test) => {
      total += 1;
      if (test.percentage >= test.testCase!.successPercent) success += 1;
    });
    return `${success}/${total}`;
  }
}
</script>

<style lang="scss"></style>
