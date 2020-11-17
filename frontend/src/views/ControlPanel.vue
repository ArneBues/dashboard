<template>
  <v-container class="container2">
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Testreihe Senden</v-card-title>
          <v-card-actions>
            <v-btn color="primary" @click="sendTestGroups">Senden</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>Emails überprüfen</v-card-title>
          <v-card-actions>
            <v-btn color="primary" @click="checkEmail">Überprüfen</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="loading || output.length > 0">
      <v-col>
        <v-card>
          <v-card-title> Ergebnis </v-card-title>
          <v-card-text>
            <v-progress-circular indeterminate color="primary" v-if="loading"></v-progress-circular>
            <ul v-else>
              <li v-for="(text, index) in output" :key="index">
                {{ text }}
              </li>
            </ul>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component({
  components: {},
})
export default class Dashboard extends Vue {
  private output: string[] = [];

  private loading = false;

  mounted() {
    console.log(this.$store.getters.getUser);
  }

  created() {
    if (!this.$store.getters.isAdmin) {
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

  sendTestGroups() {
    axios.get('/api/controlpanel/send').then((resp) => {
      this.output = resp.data.data;
    });
  }

  checkEmail() {
    axios.get('/api/controlpanel/check').then((resp) => {
      this.output = resp.data.data;
    });
  }
}
</script>

<style lang="scss" scoped></style>
