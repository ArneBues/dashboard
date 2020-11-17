<template>
  <v-container>
    <v-alert v-if="message.message" :type="message.type">
      {{ message.message }}
    </v-alert>
    <v-row>
      <v-card><router-link to="user/new">Neuer Benutzer</router-link> </v-card>
    </v-row>
    <v-list two-line>
      <v-list-item v-for="user in users" :key="user.id">
        <v-list-item-content>
          <v-list-item-title v-text="user.name"></v-list-item-title>
          <v-list-item-subtitle v-text="user.email"></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-row>
            <v-btn icon>
              <v-icon @click="edit(user.id)" color="grey lighten-1">mdi-account-edit</v-icon>
            </v-btn>
            <v-btn icon v-if="currentId !== user.id">
              <v-icon @click="deleteUser(user)" color="grey lighten-1">mdi-delete</v-icon>
            </v-btn>
          </v-row>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <v-dialog v-model="dialog" max-width="300" v-if="user">
      <v-card>
        <v-card-title class="headline"> Benutzer {{ user.name }} löschen? </v-card-title>
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
import axios, { AxiosResponse } from 'axios';
import TestGroupSelect from '@/components/TestGroupSelect.vue';
import { News } from '@/types/news';
import rules from '@/rules';
import { User } from '@/types/user';

@Component({
  components: {},
})
export default class UserOverview extends Vue {
  private users: User[] = [];

  private user: User | null = null;

  private dialog = false;

  private message = { type: 'success', message: '' };

  private currentId = this.$store.getters.getUser.id;

  created() {
    if (!this.$store.getters.isAdmin) {
      this.$router.push('/login');
    }
  }

  edit(e: number | string) {
    this.$router.push(`user/edit/${e}`);
  }

  deleteUser(e: User) {
    this.user = e;
    this.dialog = true;
  }

  deleteConfirm() {
    this.dialog = false;
    if (this.user) {
      if (this.user.id === this.currentId) {
        this.message.type = 'error';
        this.message.message = 'Aktueller Benutzer kann nicht gelöscht werden.';
        this.user = null;
        return;
      }
      axios
        .delete(`/api/user/${this.user.id}`)
        .then((resp) => {
          this.message.type = 'success';
          this.message.message = resp.data.data.message;
        })
        .catch((e) => console.log(e));
    }
    this.user = null;
    setTimeout(this.reload, 1000);
  }

  reload() {
    axios
      .get('/api/user/')
      .then((resp) => {
        console.log(resp.data);
        this.users = resp.data.data;
        console.log(this.users);
      })
      .catch((e) => console.log(e));
  }

  mounted() {
    this.reload();
  }
}
</script>

<style lang="scss"></style>
