<template>
  <v-container>
    <v-row>
      <v-col>
        <h3>Ausgewählte Testfällle</h3>
        <draggable class="list-group" :list="list1" group="people" @change="updateData">
          <div class="list-group-item" v-for="element in list1" :key="element.id">
            <v-card>
              <v-card-title>
                <router-link
                  :to="{ name: 'test/show', params: { id: element.id } }"
                  target="_blank"
                >
                  {{ element.name }}
                </router-link>
              </v-card-title>
              <v-card-actions :data-id="element.id" @click="switchTest">Unselect</v-card-actions>
            </v-card>
          </div>
        </draggable>
      </v-col>

      <v-col>
        <h3>Testfälle</h3>
        <draggable class="list-group" :list="list2" group="people" @change="updateData">
          <div class="list-group-item" v-for="element in list2" :key="element.id">
            <v-card :data-id="index">
              <v-card-title>
                <router-link
                  :to="{ name: 'test/show', params: { id: element.id } }"
                  target="_blank"
                >
                  {{ element.name }}
                </router-link>
              </v-card-title>
              <v-card-actions :data-id="element.id" @click="switchTest"> Select</v-card-actions>
            </v-card>
          </div>
        </draggable>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { TestCase } from '@/types/test';
import { Component, Prop, Vue } from 'vue-property-decorator';
import draggable from 'vuedraggable';
import * as _ from 'lodash';

@Component({
  components: { draggable },
})
export default class TestGroupSelect extends Vue {
  @Prop() list1: TestCase[] = [];

  @Prop() list2: TestCase[] = [];

  updateData() {
    this.$emit('input', this.list1);
  }

  switchTest(e: any) {
    const elementid = Number(e.target.dataset.id);
    let test = _.find(this.list1, { id: elementid });

    if (test === undefined) {
      test = _.find(this.list2, { id: elementid });
      if (typeof test !== 'undefined') {
        _.pull(this.list2, test);
        this.list1.push(test);
      }
    } else {
      _.pull(this.list1, test);
      this.list2.push(test);
    }
  }
}
</script>

<style lang="scss" scoped>
.v-card__title {
  padding-bottom: 0;
}
</style>
