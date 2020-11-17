<template>
  <v-container class="white maincontent">
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            {{ publisher.name }}
          </v-card-title>
          <v-card-subtitle>
            Kategory: {{ publisher.category.name }} <a :href="publisher.website">Website</a>
          </v-card-subtitle>
          <v-card-text>
            <span :inner-html.prop="publisher.description | formatMarked"></span>
          </v-card-text>
          <v-card-actions>
            <v-btn icon v-if="loggedIn">
              <v-icon
                @click="$router.push('/publisher/edit/' + publisher.id)"
                color="grey lighten-1"
                >mdi-pencil</v-icon
              >
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title> Fachgebiete </v-card-title>
          <v-card-text>
            <ul>
              <li v-for="fach in publisher.fachbereich" :key="fach.id">
                {{ fach.name }}
              </li>
            </ul>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-simple-table dense>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Auflage</th>
                  <th class="text-left">Indexiert</th>
                  <th class="text-left" v-if="loggedIn">Aktionen</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="source in publisher.source" :key="source.id">
                  <td>{{ source.name }}</td>
                  <td>
                    <v-btn icon v-if="source.indexed">
                      <v-icon color="green lighten-1">mdi-check</v-icon>
                    </v-btn>
                    <v-btn icon v-else>
                      <v-icon color="red lighten-1">mdi-alert</v-icon>
                    </v-btn>
                  </td>
                  <td class="text-left" v-if="loggedIn">
                    <v-btn icon>
                      <v-icon @click="editSource(source)" color="grey lighten-1">mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon @click="deleteSource(source)" color="grey lighten-1">
                        mdi-delete
                      </v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-card-actions>
            <v-btn
              v-if="publisher !== null"
              color="primary"
              @click="$router.push('/source/new/' + publisher.id)"
            >
              Auflage hinzugügen
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialogDeleteSource" max-width="500px">
      <v-card>
        <v-card-title class="headline"> Auflage "{{ editedSource.name }}" löschen? </v-card-title>
        <v-card-text>Dies löscht diese Auflage</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red darken-1" text @click="deleteConfirmSource"> Ja </v-btn>

          <v-btn color="green darken-1" text @click="close"> Abbrechen </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import { Source } from '@/types/source';
import { PublisherStructure } from '../types/publisher';
// import PublisherData from '../exampledata.json';

@Component({})
export default class Publisher extends Vue {
  private publisher: PublisherStructure | null = null;

  private default: PublisherStructure = {
    id: 0,
    name: '',
    website: '',
    description: '',
    category: {
      id: 0,
      name: '',
    },
  };

  private editedSource: Source = {
    id: 0,
    name: '',
    indexed: true,
    date: '',
    publisher: this.default,
  };

  private loggedIn = this.$store.getters.isLoggedIn;

  private dialogDeleteSource = false;

  close() {
    this.dialogDeleteSource = false;
  }

  editSource(source: Source) {
    this.$router.push(`/source/edit/${source.id}`);
  }

  deleteSource(item: Source) {
    this.editedSource = { ...item };
    this.dialogDeleteSource = true;
  }

  mounted() {
    this.reload();
  }

  reload() {
    axios
      .get(`/api/publishers/${this.$route.params.id}`)
      .then((resp) => {
        console.log(resp.data);
        this.publisher = resp.data.data;
      })
      .catch((e) => console.log(e));
  }

  deleteConfirmSource() {
    if (this.editedSource) {
      axios
        .delete(`/api/sources/${this.editedSource.id}`)
        .then((resp) => {
          this.reload();
        })
        .catch((e) => console.log(e));
    }
    this.close();
  }
}
</script>

<style lang="scss" scoped></style>
