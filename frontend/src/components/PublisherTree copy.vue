<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <h4>
        {{ publisher.name }}
      </h4>
      <template v-slot:actions>
        {{ publisher.good }} / {{ publisher.good + publisher.bad }}
      </template>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-expansion-panels accordion multiple>
        <PublisherTree
          v-for="child in publisher.children"
          :publisher="child"
          v-bind:key="child.id"
          :depth="depth + 1"
        />
      </v-expansion-panels>

      <SourceList
        v-for="source in publisher.source"
        :source="source"
        :key="source.name"
        :indent="indent"
      />
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { PublisherStructure } from '@/types/publisher';
import PlusBox from 'vue-material-design-icons/PlusBox.vue';
import MinusBox from 'vue-material-design-icons/MinusBox.vue';
import SourceList from './SourceList.vue';
import 'vue-material-design-icons/styles.css';

@Component({
  components: {
    PlusBox,
    MinusBox,
    SourceList,
  },
})
export default class PublisherTree extends Vue {
  @Prop() private publisher!: PublisherStructure;

  @Prop() private depth!: number;

  private showChildren = false;

  get indent() {
    return `padding-left:${this.depth * 10}px;padding-right:${-this.depth * 10}px;`;
  }

  get color() {
    if (this.publisher.good && this.publisher.bad) {
      const total = this.publisher.good + this.publisher.bad;
      if (this.publisher.good / total === 1) return 'font-color:green;';
      if (this.publisher.good / total > 0.6) return 'font-color:yellow;';
      return 'font-color:red;';
    }
    return 'font-color:red;';
  }

  mounted() {
    if (this.depth === 0) this.showChildren = true;
  }

  toggleChildren() {
    this.showChildren = !this.showChildren;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
