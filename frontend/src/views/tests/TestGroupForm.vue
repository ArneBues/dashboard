<template>
  <v-container class="sidecontainer" fluid>
    <v-form model="valid" @submit.prevent="onSubmit">
      <v-container fluid>
        <v-text-field
          label="Name"
          :rules="[rules.required]"
          :counter="100"
          v-model="testGroup.name"
        />
      </v-container>

      <v-container fluid>
        <v-textarea
          v-model="testGroup.description"
          name="description"
          label="Beschreibung"
          auto-grow
        >
        </v-textarea>
      </v-container>
      <v-container fluid>
        <TestGroupSelect v-model="testCases" :list1="testCases" :list2="testCasesComplete" />
      </v-container>
      <v-container fluid>
        <v-btn @click="onSubmit">Submit</v-btn>
      </v-container>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { TestCase, TestGroup } from '@/types/test';
import axios, { AxiosResponse } from 'axios';
import TestGroupSelect from '@/components/TestGroupSelect.vue';
import rules from '@/rules';

@Component({
  components: { TestGroupSelect },
})
export default class TestGroupForm extends Vue {
  private testGroup: TestGroup = {
    name: '',
    description: '',
    date: new Date(),
    interval: 0,
    lastTest: undefined,
    id: 0,
  };

  private rules = rules;

  private valid = false;

  private testCases: TestCase[] = [];

  private testCasesComplete: TestCase[] = [];

  private id = this.$route.params.id;

  created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/login');
    }
  }

  mounted() {
    if (this.id !== undefined) {
      axios
        .get(`/api/test-group/${this.id}`)
        .then((resp) => {
          console.log(resp.data);
          this.testGroup = resp.data.data;
          if (this.testGroup.testCases !== undefined) {
            this.testCases = this.testGroup.testCases;
          }
          console.log(this.testGroup);
        })
        .catch((e) => console.log(e));
    }
    axios
      .get('/api/test/cases/null')
      .then((resp) => {
        console.log(resp.data);
        this.testCasesComplete = resp.data.data;
        console.log(this.testCasesComplete);
      })
      .catch((e) => console.log(e));
  }

  onSubmit(ev: any) {
    ev.preventDefault();
    this.testGroup.testCases = this.testCases;
    if (this.id === undefined) {
      axios.post('/api/test-group/', this.testGroup).then((e) => this.$router.go(-1));
    } else {
      axios.put(`/api/test-group/${this.id}`, this.testGroup).then((e) => this.$router.go(-1));
    }
    console.log(this.testGroup);
  }
}
</script>

<style lang="scss"></style>
