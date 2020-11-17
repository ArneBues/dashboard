<template>
  <v-container class="sidecontainer" fluid>
    <v-alert v-if="error" type="error">
      {{ error.data.message }}
    </v-alert>
    <v-form v-model="valid">
      <v-container fluid>
        <v-text-field
          label="Title"
          :rules="[rulesGlobal.required, rulesGlobal.length100]"
          :counter="100"
          v-model="news.title"
        />
      </v-container>

      <v-container fluid>
        <v-textarea v-model="news.text" name="text" label="News" auto-grow></v-textarea>
      </v-container>

      <a href="https://daringfireball.net/projects/markdown/syntax" target="_blank">
        Markdown wird unterstützt
      </a>
      <v-container fluid>
        <v-btn @click="onSubmit" :disabled="!valid" class="mr-4">Submit</v-btn>
      </v-container>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { TestCase, TestGroup } from '@/types/test';
import axios, { AxiosResponse } from 'axios';
import TestGroupSelect from '@/components/TestGroupSelect.vue';
import { News } from '@/types/news';
import rules from '@/rules';

@Component({
  components: {},
})
export default class NewsForm extends Vue {
  private news: News = {
    id: 0,
    title: '',
    text: '',
    date: new Date(),
  };

  private id = this.$route.params.id;

  private valid = false;

  private error: unknown = null;

  private rulesGlobal = rules;

  created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/login');
    }
  }

  mounted() {
    if (this.id !== undefined) {
      axios
        .get(`/api/news/${this.id}`)
        .then((resp) => {
          console.log(resp.data);
          this.news = resp.data.data;
          console.log(this.news);
        })
        .catch((e) => console.log(e));
    }
  }

  onSubmit() {
    if (!this.valid) {
      return;
    }
    let promise: Promise<any>;
    if (this.id === undefined) {
      promise = axios.post('/api/news/', this.news);
    } else {
      promise = axios.put(`/api/news/${this.id}`, this.news);
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
