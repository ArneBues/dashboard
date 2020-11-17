<template>
  <v-container class="sidecontainer" fluid>
    <h1><span v-if="manuell">Manuelle</span> Tests</h1>
    <span v-if="loggedIn">
      <router-link to="/test/new/manuell" v-if="manuell"> Neuen Test anlegen </router-link>
      <router-link to="/test/new" v-else> Neuen Test anlegen </router-link>
    </span>
    <v-alert v-if="message.message" :type="message.type">
      {{ message.message }}
    </v-alert>
    <v-col>
      <v-text-field v-model="search" label="Suche" class="mx-4"></v-text-field>
    </v-col>
    <v-data-table
      :headers="headers"
      :items="testCases"
      :search="search"
      dense
      sort-by="id"
      :sort-desc="true"
    >
      <template slot="item.name" slot-scope="props">
        <td>
          <router-link :to="{ name: 'test/show', params: { id: props.item.id } }">
            {{ props.item.name }}
          </router-link>
        </td>
      </template>
      <template slot="item.filename" slot-scope="props">
        <td>
          <a :href="'/api/test/download/' + props.item.id" target="_blank">
            {{ props.item.filename }}
          </a>
        </td>
      </template>

      <template slot="item.actions" slot-scope="props">
        <td v-if="loggedIn">
          <v-btn icon>
            <v-icon @click="edit(props.item.id)" color="grey lighten-1">mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon @click="deleteTestCase(props.item)" color="grey lighten-1">mdi-delete</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
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
// eslint-disable-next-line object-curly-newline
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { TestCase } from '@/types/test';
import axios from 'axios';

@Component({
  components: {},
})
export default class TestOverview extends Vue {
  private testCases: TestCase[] = [];

  private loggedIn = this.$store.getters.isLoggedIn;

  private message = { type: 'success', message: '' };

  private testDelete: TestCase | null = null;

  private dialog = false;

  private search = '';

  @Prop()
  private manuell!: boolean;

  private headers = [
    {
      text: 'Id',
      value: 'id',
      align: 'start',
    },
    { text: 'Test', value: 'name' },
    { text: 'Datei', value: 'filename' },
    { text: 'Aktionen', value: 'actions' },
  ];

  mounted() {
    this.reload();
  }

  reload() {
    let manuell = '';
    if (this.manuell) {
      manuell = 'manuell';
    }
    axios
      .get(`/api/test/${manuell}`)
      .then((resp) => {
        console.log(resp.data);
        this.testCases = resp.data.data;
        console.log(this.testCases);
      })
      .catch((e) => console.log(e));
  }

  edit(e: number | string) {
    this.$router.push(`/test/edit/${e}`);
  }

  deleteTestCase(e: TestCase) {
    this.testDelete = e;
    this.dialog = true;
  }

  @Watch('manuell')
  onChange() {
    this.reload();
  }

  deleteConfirm() {
    this.dialog = false;
    if (this.testDelete) {
      axios
        .delete(`/api/test/${this.testDelete.id}`)
        .then((resp) => {
          this.message.type = 'success';
          this.message.message = resp.data.data.message;
        })
        .catch((e) => console.log(e));
    }
    this.testDelete = null;
    setTimeout(this.reload, 1000);
  }
}
</script>

<style lang="scss"></style>
