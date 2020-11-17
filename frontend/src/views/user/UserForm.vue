<template>
  <v-container>
    <v-alert v-if="error" type="error">
      {{ error }}
    </v-alert>
    <v-form v-model="valid">
      <v-container>
        <v-text-field label="Name" :rules="[rules.required]" :counter="100" v-model="user.name" />
      </v-container>
      <v-container>
        <v-text-field
          label="Email"
          :rules="[rules.required, rules.email]"
          :counter="100"
          v-model="user.email"
        />
      </v-container>
      <v-container>
        <v-select
          label="Rolle"
          v-model="user.role"
          :items="roles"
          item-text="name"
          item-value="value"
        >
        </v-select>
      </v-container>
      <v-container>
        <v-text-field
          label="Password"
          type="password"
          :rules="PasswordRule"
          :counter="100"
          v-model="user.password"
        />
      </v-container>
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
import { User } from '@/types/user';
import { xor } from 'lodash';

@Component({
  components: {},
})
export default class UserForm extends Vue {
  private user = {
    name: '',
    email: '',
    role: '',
    password: '',
  };

  private roles = [
    { name: 'Admin', value: 'admin' },
    { name: 'Editor', value: 'editor' },
  ];

  private valid = false;

  private error: unknown = null;

  private rules = rules;

  private id = this.$route.params.id;

  created() {
    if (!this.$store.getters.isAdmin) {
      if (this.$store.getters.getUser.id !== Number(this.id)) {
        this.$router.push('/login');
      }
    }
  }

  get PasswordRule() {
    if (this.id === undefined) return [this.rules.required];
    return [];
  }

  mounted() {
    if (this.id !== undefined) {
      axios
        .get(`/api/user/${this.id}`)
        .then((resp) => {
          console.log(resp.data);
          this.user = resp.data.data;
          console.log(this.user);
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
      promise = axios.post('/api/user/', this.user);
    } else {
      promise = axios.put(`/api/user/${this.id}`, this.user);
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
