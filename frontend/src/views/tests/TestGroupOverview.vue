<template>
  <v-container class="sidecontainer" fluid>
    <h1>Testreihen</h1>
    <router-link to="/testgroup/new" v-if="loggedIn"> Neute Testreihe anlegen </router-link>
    <v-alert v-if="message.message" :type="message.type">
      {{ message.message }}
    </v-alert>
    <v-simple-table>
      <thead>
        <tr>
          <th>Testreihe</th>
          <th>Letzter Test</th>
          <th v-if="loggedIn">Aktionen</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="testGroup in testGroups" :key="testGroup.id" :depth="0">
          <td>
            <router-link :to="{ name: 'testgroup/show', params: { id: testGroup.id } }">
              {{ testGroup.name }}
            </router-link>
          </td>
          <td>
            {{ testGroup.lastTest | dateFormat }}
          </td>
          <td v-if="loggedIn">
            <v-btn icon>
              <v-icon @click="edit(testGroup.id)" color="grey lighten-1">mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon @click="deleteTestGroup(testGroup)" color="grey lighten-1">mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>

    <v-dialog v-model="dialog" max-width="300" v-if="testGroupDelete">
      <v-card>
        <v-card-title class="headline">
          Testreihe {{ testGroupDelete.name }} löschen?
        </v-card-title>
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

import { TestCase, TestGroup } from '@/types/test';
import axios from 'axios';

@Component({
  components: {},
})
export default class TestGroupOverview extends Vue {
  private testGroups: TestGroup[] = [];

  private loggedIn = this.$store.getters.isLoggedIn;

  private dialog = false;

  private message = { type: 'success', message: '' };

  private testGroupDelete: TestGroup | null = null;

  mounted() {
    this.reload();
  }

  edit(e: number | string) {
    this.$router.push(`testgroup/edit/${e}`);
  }

  deleteTestGroup(e: TestGroup) {
    this.testGroupDelete = e;
    this.dialog = true;
  }

  deleteConfirm() {
    this.dialog = false;
    if (this.testGroupDelete) {
      axios
        .delete(`/api/test-group/${this.testGroupDelete.id}`)
        .then((resp) => {
          this.message.type = 'success';
          this.message.message = resp.data.data.message;
        })
        .catch((e) => console.log(e));
    }
    this.testGroupDelete = null;
    setTimeout(this.reload, 1000);
  }

  reload() {
    axios
      .get('/api/test-group/')
      .then((resp) => {
        console.log(resp.data);
        this.testGroups = resp.data.data;
        console.log(this.testGroups);
      })
      .catch((e) => console.log(e));
  }
}
</script>

<style lang="scss"></style>
