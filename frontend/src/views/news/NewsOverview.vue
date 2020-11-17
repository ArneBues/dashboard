<template>
  <v-container class="sidecontainer" fluid>
    <v-alert v-if="message.message" :type="message.type">
      {{ message.message }}
    </v-alert>
    <v-row v-if="loggedIn" style="padding-left: 15px">
      <router-link to="/news/new"> <v-btn color="primary"> Neue Nachricht </v-btn> </router-link>
    </v-row>
    <v-container v-for="article in news" :article="article" :key="article.id">
      <v-card>
        <v-card-title>
          {{ article.title }}
        </v-card-title>
        <v-card-subtitle>
          um {{ article.date | dateFormat }} von {{ article.writer.name }}
        </v-card-subtitle>
        <v-card-text>
          <span :inner-html.prop="article.text | formatMarked"></span>
        </v-card-text>
        <v-card-actions v-if="loggedIn">
          <v-row>
            <v-col>
              <router-link :to="{ name: 'news/edit', params: { id: article.id } }">
                Edit
              </router-link>
            </v-col>
            <v-col> <a href="#" @click="deleteItem(article)">Löschen</a></v-col>
          </v-row>
        </v-card-actions>

        <hr />
      </v-card>
    </v-container>
    <v-pagination
      v-if="maxPages > 1"
      v-model="page"
      :length="maxPages"
      @input="reload"
    ></v-pagination>

    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="headline">
          Die Nachricht {{ editedItem.title }} löschen?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red darken-1" text @click="deleteConfirm"> Ja </v-btn>

          <v-btn color="green darken-1" text @click="close"> Abbrechen </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { TestCase, TestGroup } from '@/types/test';
import axios from 'axios';
import { News } from '@/types/news';

@Component({
  components: {},
})
export default class NewsOverview extends Vue {
  private news: News[] = [];

  private errors: any[] = [];

  private count = 0;

  private editedItem: News = {
    id: 0,
    title: '',
    text: '',
    date: new Date(),
  };

  private dialogDelete = false;

  @Prop()
  private perPageProp!: number;

  private loggedIn = this.$store.getters.isLoggedIn;

  private perPage = 0;

  private page = 1;

  private message = { type: '', message: '' };

  get maxPages(): number {
    return Math.ceil(this.count / this.perPage);
  }

  mounted() {
    this.reload();
    if (this.perPageProp) {
      this.perPage = this.perPageProp;
    } else this.perPage = 3;
  }

  reload() {
    console.log(this.page);
    axios
      .get(`/api/news?each=${this.perPage}&page=${this.page}`)
      .then((resp) => {
        this.count = resp.data.data.count;
        this.news = resp.data.data.result;
      })
      .catch((e) => this.errors.push(e.response));
  }

  close() {
    this.dialogDelete = false;
  }

  deleteItem(item: News) {
    this.editedItem = { ...item };
    this.dialogDelete = true;
  }

  deleteConfirm() {
    if (this.editedItem) {
      axios
        .delete(`/api/news/${this.editedItem.id}`)
        .then((resp) => {
          this.message.type = 'success';
          this.message.message = 'News gelöscht!';
          this.count = resp.data.data.count;
          this.news = resp.data.data.result;
        })
        .catch((e) => console.log(e));
    }
    this.close();
  }
}
</script>

<style lang="scss"></style>
