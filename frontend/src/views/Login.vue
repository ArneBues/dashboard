<template>
  <v-container>
    <v-alert v-if="alert" type="error">
      {{ alert }}
    </v-alert>
    <v-form v-model="valid" @submit.prevent="onSubmit">
      <v-container>
        <v-text-field
          label="Email"
          :rules="[rules.required, rules.email]"
          :counter="100"
          v-model="auth.email"
        />
      </v-container>
      <v-container>
        <v-text-field
          label="Password"
          type="password"
          :rules="[rules.required]"
          :counter="100"
          v-model="auth.password"
        />
      </v-container>
      <v-container fluid>
        <v-btn type="submit" @click="onSubmit" :disabled="!valid" class="mr-4">Submit</v-btn>
      </v-container>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { TestGroup } from '@/types/test';
import axios from 'axios';
import rules from '@/rules';

@Component({
  components: {},
})
export default class Login extends Vue {
  private auth = {
    email: '',
    passord: '',
  };

  private valid = false;

  private rules = rules;

  private alert = '';

  onSubmit(e: Event) {
    e.preventDefault();
    this.alert = '';
    if (!this.valid) {
      return false;
    }
    axios
      .post('/api/login', this.auth)
      .then((res) => {
        console.log(res.data.data);
        // this.$store.dispatch('login', { user: res.data.data });
        this.$router.push('/');
      })
      .catch((err) => {
        this.alert = 'Benutzername oder Passwort falsch';
      });
    return false;
  }
}
</script>

<style lang="scss"></style>
