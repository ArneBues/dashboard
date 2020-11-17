<template>
  <v-container class="sidecontainer" fluid>
    <v-form model="valid" v-if="!loading">
      <v-container fluid>
        <v-text-field
          label="Name"
          :rules="[rules.required]"
          :counter="100"
          v-model="testCase.name"
        />
      </v-container>

      <v-container fluid>
        <v-textarea
          v-model="testCase.description"
          name="description"
          label="Beschreibung"
          auto-grow
        >
        </v-textarea>
      </v-container>
      <v-container fluid>
        <v-slider
          v-model="testCase.successPercent"
          class="align-center"
          label="Erforderlicher Erkennungsquote"
          thumb-label
          max="100"
          min="0"
          step="10"
        >
        </v-slider>
      </v-container>

      <v-container fluid>
        <v-file-input
          label="Datei"
          v-model="file"
          @change="onFileChange"
          :rules="[rules.required]"
          accept=".doc,.docx,.xls,.xlsx,.sxw,.ppt,.pptx,.pdf,.txt,
          .rtf,.html,.htm,.wps,.odt,.odp,.ods,.tif,.tiff,.ps,.hwp"
        ></v-file-input>
      </v-container>
      <v-container fluid>
        <v-btn @click="onSubmit">Submit</v-btn>
      </v-container>
    </v-form>
    <v-card
      ><v-progress-circular indeterminate color="primary" v-if="loading"></v-progress-circular
    ></v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { TestCase } from '@/types/test';
import axios, { AxiosResponse } from 'axios';
import rules from '@/rules';
import { floor } from 'lodash';

@Component({
  components: {},
})
export default class TestForm extends Vue {
  private testCase: TestCase = {
    id: 0,
    name: '',
    description: '',
    file: '',
    successPercent: '0',
    manuell: false,
  };

  private loading = false;

  @Prop()
  private manuell!: boolean;

  private file: File | null = null;

  private rules = rules;

  private id = this.$route.params.id;

  private updateFile = false;

  private onFileChange(e: Event) {
    console.log(this.file);
    if (this.file) {
      this.testCase.file = this.file.name;
      this.updateFile = true;
    }
  }

  created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/login');
    }

    axios.interceptors.request.use(
      (config) => {
        this.loading = true;
        return config;
      },
      (error) => {
        this.loading = false;
        return Promise.reject(error);
      },
    );

    axios.interceptors.response.use(
      (response) => {
        this.loading = false;
        return response;
      },
      (error) => {
        this.loading = false;
        return Promise.reject(error);
      },
    );
  }

  private onSubmit(e: Event) {
    console.log(this.testCase);
    const formData = new FormData();
    let response: Promise<AxiosResponse<any>>;

    formData.append('name', this.testCase.name);
    formData.append('description', this.testCase.description);
    formData.append('successPercent', this.testCase.successPercent.toString());
    formData.append('manuell', String(this.testCase.manuell));
    if (this.id === undefined) {
      if (this.file) {
        formData.append('file', this.file);
      }
      response = axios.post('/api/test', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } else {
      if (this.file) {
        formData.append('file', this.file);
      }
      response = axios.put(`/api/test/${this.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }

    response
      .then(() => {
        this.$router.go(-1);
      })
      .catch(() => alert('could not save'));
  }

  mounted() {
    if (this.manuell) {
      this.testCase.manuell = true;
    }

    if (this.id !== undefined) {
      axios
        .get(`/api/test/${this.id}`)
        .then((resp) => {
          this.testCase = resp.data.data;
        })
        .catch((e) => console.log(e));
    }
  }
}
</script>

<style lang="scss"></style>
