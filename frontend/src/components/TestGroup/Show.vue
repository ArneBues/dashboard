<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="ma-0 pa-0" outlined tile>
          <v-card-title>{{ testGroup.name }} </v-card-title>
          <v-card-subtitle>Testreihe</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="ma-0 pa-0" outlined tile>
          <v-card-title> {{ testGroup.date | dateFormat }}</v-card-title>
          <v-card-subtitle>Letzter Test</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="ma-0 pa-0" outlined tile>
          <v-card-title>Beschreibung</v-card-title>
          <v-card-text>
            <span :inner-html.prop="testGroup.description | formatMarked"></span>
          </v-card-text>
          <v-card-actions v-if="loggedIn">
            <v-btn icon>
              <v-icon @click="edit(testGroup)" color="grey lighten-1">mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon @click="deleteItem(testGroup)" color="grey lighten-1">mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-simple-table>
            <thead>
              <tr>
                <th>Testfall</th>

                <th>Aktion</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="element in testGroup.testCases" :key="element.id">
                <td>
                  {{ element.name }}
                </td>
                <td>
                  <v-btn icon @click="$router.push('/test/' + element.id)">
                    <v-icon color="grey lighten-1">mdi-eye</v-icon>
                  </v-btn>
                  <v-btn icon @click="$router.push('/test/edit/' + element.id)" v-if="loggedIn">
                    <v-icon color="grey lighten-1"> mdi-pencil </v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="headline"> Testreihe "{{ editedItem.name }}" löschen? </v-card-title>
        <v-card-text>Dies löscht die Testreihe und alle zugehörigen Tests</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red darken-1" text @click="deleteConfirm"> Ja </v-btn>

          <v-btn color="green darken-1" text @click="dialogDelete = false"> Abbrechen </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { TestGroup } from '@/types/test';
import axios from 'axios';

@Component({
  components: {},
})
export default class Show extends Vue {
  @Prop()
  testGroup!: TestGroup;

  private dialogDelete = false;

  private editedItem: TestGroup = {
    id: 0,
    name: '',
    description: '',
    date: new Date(),
    interval: 0,
  };

  private loggedIn = this.$store.getters.isLoggedIn;

  edit(testGroup: TestGroup) {
    this.$router.push(`/testgroup/edit/${testGroup.id}`);
  }

  deleteItem(item: TestGroup) {
    this.editedItem = { ...item };
    this.dialogDelete = true;
  }

  deleteConfirm() {
    this.dialogDelete = false;
    if (this.editedItem) {
      axios
        .delete(`/api/test-group/${this.editedItem.id}`)
        .then((resp) => {
          this.$router.go(-1);
        })
        .catch((e) => console.log(e));
    }
  }
}
</script>

<style lang="scss"></style>
