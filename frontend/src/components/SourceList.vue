<template>
  <v-row no-gutters>
    <v-col cols="2">{{ source.name }}</v-col>
    <v-col cols="10" class="text-right">
      <v-btn icon v-if="source.indexed">
        <v-icon color="grey lighten-1">mdi-check-circle</v-icon>
      </v-btn>
      <v-btn icon v-if="!source.indexed">
        <v-icon color="grey lighten-1">mdi-alert</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { Fragment } from 'vue-fragment';
import { Source } from '@/types/source';
import CheckboxMarkedCircle from 'vue-material-design-icons/CheckboxMarkedCircle.vue';

import Alert from 'vue-material-design-icons/Alert.vue';

@Component({
  components: {
    CheckboxMarkedCircle,
    Alert,
    Fragment,
  },
})
export default class SourceList extends Vue {
  @Prop() private source!: Source;

  @Prop() private indent!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.row {
  border-top: 0px;
}
</style>
