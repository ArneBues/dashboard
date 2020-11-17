<template>
  <v-container class="sidecontainer" fluid>
    <v-alert v-if="error" type="error">
      {{ error.data.message }}
    </v-alert>
    <v-form v-model="valid">
      <v-container fluid>
        <v-text-field
          label="Auflage"
          :rules="[rulesGlobal.required, rulesGlobal.length100]"
          :counter="100"
          v-model="source.name"
        />
      </v-container>
      <!--<v-container>
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="source.date"
              label="Veröffentlichungsdatum"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="source.date" type="month" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date)"> OK </v-btn>
          </v-date-picker>
        </v-menu>
      </v-container>-->
      <v-container class="px-0" fluid>
        <v-switch v-model="source.indexed" label="Indexiert"></v-switch>
      </v-container>
      <v-container v-if="publishers.length > 0">
        <v-select
          v-model="source.publisher"
          :items="publishers"
          item-text="name"
          label="Publisher"
          persistent-hint
          :rules="[rulesGlobal.required]"
          return-object
          single-line
        ></v-select>
      </v-container>

      <v-container fluid>
        <v-btn @click="onSubmit" :disabled="!valid" class="mr-4">Submit</v-btn>
      </v-container>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios, { AxiosResponse } from 'axios';
import TestGroupSelect from '@/components/TestGroupSelect.vue';

import rules from '@/rules';
import { PublisherStructure } from '@/types/publisher';
import { Source } from '@/types/source';
import * as _ from 'lodash';

@Component({
  components: {},
})
export default class SourceForm extends Vue {
  private source: Source = {
    id: 0,
    name: '',
    indexed: false,
    date: new Date().toISOString().substr(0, 7),
    publisher: {
      id: 0,
      name: '',
      website: '',
      description: '',
      category: {
        id: 0,
        name: '',
      },
    },
  };

  private menu = false;

  private publishers: PublisherStructure[] = [];

  private id = this.$route.params.id;

  private valid = false;

  private error: unknown = null;

  private rulesGlobal = rules;

  private publisherId = this.$route.params.publisherid;

  created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/login');
    }
  }

  mounted() {
    if (this.id !== undefined) {
      axios
        .get(`/api/sources/${this.id}`)
        .then((resp) => {
          this.source = resp.data.data;
          this.source.date = new Date(this.source.date).toISOString().substr(0, 7);

          this.setPublisher();
        })
        .catch((e) => console.log(e));
    }
    axios
      .get('/api/publishers/normal')
      .then((resp) => {
        this.publishers = resp.data.data;
        this.setPublisher();
      })
      .catch((e) => console.log(e));
  }

  setPublisher() {
    const pub = _.find(this.publishers, { id: Number(this.publisherId) }) as PublisherStructure;
    console.log(pub);
    if (pub) {
      this.source.publisher = pub;
    }
  }

  onSubmit() {
    if (!this.valid) {
      return;
    }
    let promise: Promise<any>;
    if (this.id === undefined) {
      promise = axios.post('/api/sources/', this.source);
    } else {
      promise = axios.put(`/api/sources/${this.id}`, this.source);
    }
    promise
      .then((e) => {
        this.$router.go(-1);
      })
      .catch((err) => {
        this.error = err.response.data;
      });
  }
}
</script>

<style lang="scss"></style>
