<template>
  <v-container>
    <v-alert v-if="message.message" :type="message.type">
      {{ message.message }}
    </v-alert>
    <v-data-table
      :headers="headers"
      :items="publishers"
      item-key="name"
      show-expand
      elevation="0"
      :search="search"
      group-by="category.name"
      dense
    >
      <template slot="item.actions" slot-scope="props">
        <td>
          <v-btn icon>
            <v-icon @click="$router.push('/publisher/' + props.item.id)" color="grey lighten-1">
              mdi-eye
            </v-icon>
          </v-btn>
          <v-btn icon v-if="loggedIn">
            <v-icon @click="editItem(props.item)" color="grey lighten-1">mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon v-if="loggedIn">
            <v-icon @click="deleteItem(props.item)" color="grey lighten-1">mdi-delete</v-icon>
          </v-btn>
        </td>
      </template>

      <template v-slot:[`group.header`]="{ group, headers, toggle, isOpen }">
        <td :colspan="headers.length">
          <v-btn @click="toggle" x-small icon :ref="group">
            <v-icon v-if="!isOpen">mdi-plus</v-icon>
            <v-icon v-else>mdi-minus</v-icon>
          </v-btn>
          <span class="mx-5 font-weight-bold">{{ group }}</span>
        </td>
      </template>

      <template v-slot:top>
        <v-row v-if="currentRoute === 'Publishers' && loggedIn">
          <v-col>
            <v-btn color="primary" dark class="mb-2" @click="neuerVerlag">Neuer Verlag</v-btn>
          </v-col>
          <v-col>
            <v-btn color="primary" dark class="mb-2" @click="neueSource">Neue Auflage</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field v-model="search" label="Suche" class="mx-4"></v-text-field>
          </v-col>
          <v-col>
            <v-combobox
              multiple
              label="Fachbereich"
              :items="fachbereich"
              v-model="fachbereichSearch"
              item-text="name"
              @change="filterFachbereich"
            ></v-combobox>
          </v-col>
        </v-row>
      </template>
      <template v-slot:[`item.data-table-expand`]="{ item, expand, isExpanded }">
        <td>
          <span v-if="item.source.length > 0">
            <v-btn @click="expand" x-small icon v-if="!isExpanded">
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>

            <v-btn @click="expand(false)" x-small icon v-else>
              <v-icon>mdi-chevron-up</v-icon>
            </v-btn>
          </span>
        </td>
      </template>
      <template v-slot:expanded-item="{ headers, item }" content-class="elevation-0">
        <td :colspan="headers.length" v-if="item.source.length > 0">
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
                <tr v-for="source in item.source" :key="source.id">
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
                      <v-icon @click="deleteSource(source)" color="grey lighten-1"
                        >mdi-delete</v-icon
                      >
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </td>
      </template>
      <template v-slot:[`item.percentageIndexed`]="{ item }">
        <td v-if="item.source.length > 0">{{ item.percentageIndexed }}%</td>
        <td v-else-if="item.indexed">
          <v-icon color="green lighten-1">mdi-check</v-icon>
        </td>
        <td v-else-if="!item.indexed">
          <v-icon color="red lighten-1">mdi-alert</v-icon>
        </td>
      </template>
      <template v-slot:[`item.fachbereich`]="{ item }">
        <td>
          <span v-for="test in item.fachbereich" :key="test.id"> {{ test.name }} </span>
        </td>
      </template>
    </v-data-table>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="headline"> Verlag "{{ editedItem.name }}" löschen? </v-card-title>
        <v-card-text>Dies löscht den Verlag und alle zugehörigen Auflagen</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red darken-1" text @click="deleteConfirm"> Ja </v-btn>

          <v-btn color="green darken-1" text @click="close"> Abbrechen </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
import PublisherTree from '@/components/PublisherTree.vue'; // @ is an alias to /src
import axios from 'axios';
import { Source } from '@/types/source';
import { Fachbereich, PublisherStructure } from '../types/publisher';
// import PublisherData from '../exampledata.json';

@Component({
  components: {
    PublisherTree,
  },
})
export default class Publishers extends Vue {
  private publishers: PublisherStructure[] = [];

  private loggedIn = this.$store.getters.isLoggedIn;

  private admin = this.$store.getters.isAdmin;

  private panel: number[] = [];

  private headers = [
    { text: 'Verlag', value: 'name' },
    { text: 'Indexiert', value: 'percentageIndexed' },
    { text: 'Fachbereiche', value: 'fachbereich' },
    { text: 'Aktion', value: 'actions' },
  ];

  private search = '';

  private fachbereichSearch = '';

  private fachbereich: Fachbereich[] = [];

  private editedItem: PublisherStructure = {
    id: 0,
    name: '',
    website: '',
    description: '',
    category: {
      id: 0,
      name: '',
    },
  };

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

  private message = { type: '', message: '' };

  private dialogDelete = false;

  private dialogDeleteSource = false;

  close() {
    this.dialogDelete = false;
    this.editedItem = this.default;
    this.dialogDeleteSource = false;
  }

  neuerVerlag() {
    this.$router.push('/publishers/new');
  }

  neueSource() {
    this.$router.push('/source/new');
  }

  editItem(pub: PublisherStructure) {
    this.$router.push(`/publisher/edit/${pub.id}`);
  }

  editSource(source: Source) {
    this.$router.push(`/source/edit/${source.id}`);
  }

  deleteItem(item: PublisherStructure) {
    this.editedItem = { ...item };
    this.dialogDelete = true;
  }

  deleteSource(item: Source) {
    this.editedSource = { ...item };
    this.dialogDeleteSource = true;
  }

  deleteConfirmSource() {
    if (this.editedSource) {
      axios
        .delete(`/api/sources/${this.editedSource.id}`)
        .then((resp) => {
          this.message.type = 'success';
          this.message.message = 'Auflage gelöscht!';
          this.reload();
        })
        .catch((e) => console.log(e));
    }
    this.close();
  }

  deleteConfirm() {
    this.dialogDelete = false;
    if (this.editedItem) {
      axios
        .delete(`/api/publishers/${this.editedItem.id}`)
        .then((resp) => {
          this.message.type = 'success';
          this.message.message = 'Verlag gelöscht!';
          this.publishers = resp.data.data;
        })
        .catch((e) => console.log(e));
    }
    this.close();
  }

  filterFachbereich() {
    axios
      .post('/api/publishers/filter', { fachbereich: this.fachbereichSearch })
      .then((resp) => {
        this.publishers = resp.data.data;
      })
      .catch((e) => console.log(e));
  }

  mounted() {
    this.reload();
  }

  reload() {
    axios
      .get('/api/publishers')
      .then((resp) => {
        this.publishers = resp.data.data;
      })
      .catch((e) => console.log(e));

    axios
      .get('/api/fachbereich')
      .then((resp) => {
        console.log(resp.data);
        this.fachbereich = resp.data.data;
        console.log(this.fachbereich);
      })
      .catch((e) => console.log(e));
  }

  get currentRoute() {
    return this.$route.name;
  }
}
/*      */
</script>

<style lang="scss">
.v-data-table > .v-data-table__wrapper tbody tr.v-data-table__expanded__content {
  box-shadow: none;
}
</style>
