<template>
  <v-container class="sidecontainer" fluid>
    <!-- Message -->
    <v-alert v-if="message.message" :type="message.type">
      {{ message.message }}
    </v-alert>

    <!-- VerlagsFormular -->
    <v-form v-model="valid">
      <!-- Name des Verlags -->
      <v-container fluid>
        <v-text-field
          label="Name"
          :rules="[rulesGlobal.required, rulesGlobal.length100]"
          :counter="100"
          v-model="publisher.name"
        />
      </v-container>
      <!-- Website des Verlags -->
      <v-container fluid>
        <v-text-field
          label="Website"
          :rules="[rulesGlobal.required, rulesGlobal.length100]"
          :counter="100"
          v-model="publisher.website"
        />
      </v-container>

      <!-- Beschreibung des Verlags -->
      <v-container fluid>
        <v-textarea
          v-model="publisher.description"
          name="text"
          label="Beschreibung"
          auto-grow
        ></v-textarea>
      </v-container>

      <v-container>
        <v-container class="px-0" fluid>
          <v-switch v-model="publisher.indexed" label="Indexiert"></v-switch>
        </v-container>
      </v-container>

      <!-- Kategory des Verlags -->
      <v-container fluid>
        <v-combobox
          v-model="publisher.category"
          return-object
          name="category"
          label="Kategory"
          :items="categories"
          :rules="[rulesGlobal.required]"
          item-text="name"
          dense
        >
          <!-- Item der Combobox -->
          <template v-slot:item="{ item }">
            {{ item.name }}
            <v-spacer></v-spacer>

            <!-- Aktionen -->
            <v-list-item-action @click.stop>
              <v-row no-gutters>
                <v-col>
                  <v-btn icon @click.stop.prevent="editCategory(item)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn icon @click.stop.prevent="deleteCategory(item)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-list-item-action>
          </template>
        </v-combobox>

        <v-btn
          color="primary"
          dark
          class="mb-2"
          @click="
            dialogCategory.open = true;
            dialogCategory.new = true;
          "
        >
          Neue Kategory
        </v-btn>
      </v-container>

      <!-- Fachbereich des Verlags -->
      <v-container>
        <v-data-table
          v-model="publisher.fachbereich"
          :headers="headers"
          :items="fachbereich"
          item-key="name"
          show-select
          hide-actions
          class="elevation-1"
        >
          <!-- Aktionen -->
          <template slot="item.actions" slot-scope="props">
            <td>
              <v-icon small class="mr-2" color="success" @click="editItem(props.item)">
                edit
              </v-icon>
              <v-icon small color="error" @click="deleteItem(props.item)"> delete </v-icon>
            </td>
          </template>
        </v-data-table>

        <v-btn color="primary" dark class="mb-2" @click="dialog = true">Neuer Fachbereich</v-btn>
      </v-container>

      <v-container fluid>
        <v-btn @click="onSubmit" :disabled="!valid" class="mr-4">Submit</v-btn>
      </v-container>
    </v-form>

    <!-- Neuen Fachbereich erstellen/editieren -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Neuer Fachbereich</span>
        </v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex>
                <v-text-field v-model="editedItem.name" label="Fachbereich"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Neue Kategory erstellen/editieren -->
    <v-dialog v-model="dialogCategory.open" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Kategorie</span>
        </v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex>
                <v-text-field
                  v-model="dialogCategory.editedItem.name"
                  label="Kategory"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="saveCategory">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--  Fachbereich löschen -->
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="headline"> Fachbereich {{ editedItem.name }} löschen? </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red darken-1" text @click="deleteConfirm"> Ja </v-btn>

          <v-btn color="green darken-1" text @click="close"> Abbrechen </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--  Kategory löschen -->
    <v-dialog v-model="dialogCategory.delete" max-width="500px">
      <v-card>
        <v-card-title class="headline"> Kategory {{ editedItem.name }} löschen? </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red darken-1" text @click="deleteCategoryConfirm"> Ja </v-btn>

          <v-btn color="green darken-1" text @click="close"> Abbrechen </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios, { AxiosResponse } from 'axios';
import TestGroupSelect from '@/components/TestGroupSelect.vue';

import rules from '@/rules';
import { Category, Fachbereich, PublisherStructure } from '@/types/publisher';

@Component({
  components: {},
})
export default class PublisherForm extends Vue {
  private publisher: PublisherStructure = {
    id: 0,
    name: '',
    website: '',
    description: '',
    fachbereich: [],
    indexed: false,
    category: {
      id: 0,
      name: '',
    },
  };

  private headers = [
    { text: 'Fachbereich', value: 'name' },
    { text: 'Aktionen', value: 'actions' },
  ];

  private editedItem: Fachbereich = {
    id: 0,
    name: '',
  };

  private default: Fachbereich = {
    id: 0,
    name: '',
  };

  private dialog = false;

  private dialogDelete = false;

  private dialogCategory = {
    open: false,
    new: false,
    edit: false,
    delete: false,
    editedItem: {
      id: 0,
      name: '',
    },
    defaultItem: {
      id: 0,
      name: '',
    },
  };

  private publishers: PublisherStructure[] = [];

  private id = this.$route.params.id;

  private valid = false;

  private rulesGlobal = rules;

  private fachbereich: Fachbereich[] = [];

  private message = { type: '', message: '' };

  private editedIndex = -1;

  private categories: Category[] = [];

  editItem(item: Fachbereich) {
    this.editedIndex = this.fachbereich.indexOf(item);
    this.editedItem = { ...item };
    this.dialog = true;
  }

  editCategory(item: Category) {
    this.dialogCategory.edit = true;
    this.dialogCategory.open = true;
    this.dialogCategory.editedItem = { ...item };
  }

  mounted() {
    axios
      .get('/api/fachbereich')
      .then((resp) => {
        this.fachbereich = resp.data.data;
      })
      .catch((e) => console.log(e));

    axios
      .get('/api/publishers/category')
      .then((resp) => {
        this.categories = resp.data.data;
      })
      .catch((e) => console.log(e));
    if (this.id !== undefined) {
      axios
        .get(`/api/publishers/${this.id}`)
        .then((resp) => {
          console.log(resp.data);
          this.publisher = resp.data.data;
          console.log(this.publisher);
        })
        .catch((e) => console.log(e));
    }
    axios
      .get('/api/publishers/normal')
      .then((resp) => {
        console.log(resp.data);
        this.publishers = resp.data.data;
        this.publishers.unshift({
          id: 0,
          name: '',
          website: '',
          description: '',
          category: {
            id: 0,
            name: '',
          },
        });
        console.log(this.publishers);
      })
      .catch((e) => console.log(e));
  }

  save() {
    if (this.editedIndex === -1) {
      axios
        .post('/api/fachbereich/', this.editedItem)
        .then((resp) => {
          this.message.type = 'success';
          this.message.message = 'Fachbereich hinzugefügt.';
          this.fachbereich = resp.data.data;
          this.close();
        })
        .catch((e) => console.log(e));
    } else {
      axios
        .put(`/api/fachbereich/${this.editedItem.id}`, this.editedItem)
        .then((resp) => {
          this.message.type = 'success';
          this.message.message = 'Fachbereich Geändert.';
          this.fachbereich = resp.data.data;
          this.close();
        })
        .catch((e) => console.log(e));
    }
  }

  saveCategory() {
    if (this.dialogCategory.new) {
      axios
        .post('/api/publishers/category', this.dialogCategory.editedItem)
        .then((resp) => {
          this.message.type = 'success';
          this.message.message = 'Kategorie hinzugefügt.';
          this.categories = resp.data.data;
          this.close();
        })
        .catch((e) => console.log(e));
    } else {
      axios
        .put(
          `/api/publishers/category/${this.dialogCategory.editedItem.id}`,
          this.dialogCategory.editedItem,
        )
        .then((resp) => {
          this.message.type = 'success';
          this.message.message = 'Kategorie Geändert.';
          this.categories = resp.data.data;
          this.close();
        })
        .catch((e) => console.log(e));
    }
  }

  close() {
    this.dialog = false;
    this.dialogDelete = false;
    this.dialogCategory.new = false;
    this.dialogCategory.open = false;
    this.dialogCategory.delete = false;
    this.dialogCategory.editedItem = this.dialogCategory.defaultItem;
    this.editedItem = this.default;
    this.editedIndex = -1;
  }

  deleteItem(item: Fachbereich) {
    this.editedItem = { ...item };
    this.dialogDelete = true;
  }

  deleteCategory(item: Category) {
    this.dialogCategory.editedItem = { ...item };
    this.dialogCategory.delete = true;
  }

  deleteCategoryConfirm() {
    if (this.dialogCategory.editedItem) {
      axios
        .delete(`/api/publishers/category/${this.dialogCategory.editedItem.id}`)
        .then((resp) => {
          this.message.type = 'success';
          this.message.message = 'Kategory gelöscht!';
          this.categories = resp.data.data;
        })
        .catch((e) => {
          this.message.type = 'error';
          this.message.message = 'Kategory wird benutzt und kann nicht gelöscht werden.';
        });
    }
    this.close();
  }

  deleteConfirm() {
    this.dialogDelete = false;
    if (this.editedItem) {
      axios
        .delete(`/api/fachbereich/${this.editedItem.id}`)
        .then((resp) => {
          this.message.type = 'success';
          this.message.message = 'Fachbereich gelöscht!';
          this.fachbereich = resp.data.data;
        })
        .catch((e) => console.log(e));
    }
    this.close();
  }

  onSubmit() {
    if (!this.valid) {
      return;
    }
    let promise: Promise<any>;
    if (this.id === undefined) {
      promise = axios.post('/api/publishers/', this.publisher);
    } else {
      promise = axios.put(`/api/publishers/${this.id}`, this.publisher);
    }
    promise
      .then((e) => {
        this.$router.push('/publishers');
      })
      .catch((err) => {
        this.message.type = 'error';
        this.message.message = err.response.data;
      });
  }
}
</script>

<style lang="scss"></style>
