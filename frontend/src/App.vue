<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <v-container class="py-0 fill-height">
        <span v-for="link in links" :key="link.name">
          <v-btn text v-if="link.show" @click="$router.push(link.route)">
            {{ link.name }}
          </v-btn>
          <v-btn text v-else-if="admin && !link.show" @click="$router.push(link.route)">
            {{ link.name }}
          </v-btn>
        </span>
        <v-spacer></v-spacer>

        <v-responsive max-width="260" v-if="loggedIn" @click="logOut">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on"> Profile </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title @click="editProfile">Profile ändern</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title @click="logOut">Logout</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-responsive>
        <v-responsive max-width="260" v-else>
          <router-link to="/login"> Login </router-link>
        </v-responsive>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-4">
      <v-container class="maincontent">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import 'vuetify/dist/vuetify.min.css';
import { Component, Watch } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class App extends Vue {
  get loggedIn() {
    return this.$store.getters.isLoggedIn;
  }

  get admin() {
    return this.$store.getters.isAdmin;
  }

  private links = [
    {
      name: 'Dashboard',
      route: '/',
      show: true,
    },
    {
      name: 'Testfälle',
      route: '/test',
      show: true,
    },
    {
      name: 'Testreihen',
      route: '/testgroup',
      show: true,
    },
    {
      name: 'Korpus',
      route: '/publishers',
      show: true,
    },
    {
      name: 'Benutzer',
      route: '/user',
      show: false,
    },
    /* {
      name: 'Manuelle Tests',
      route: '/test/manuell',
      show: false,
    }, */
    {
      name: 'Kontroll',
      route: '/controlpanel',
      show: false,
    },
  ];

  logOut() {
    axios.get('/api/user/logout').then(() => {
      this.$store.dispatch('logout');
      this.$router.push('/');
    });
  }

  editProfile() {
    this.$router.push(`/user/edit/${this.$store.getters.getUser.id}`);
  }

  @Watch('$route')
  onRouteChange() {
    this.$store.dispatch('checkStatus');
  }
}
</script>

<style lang="scss">
.sidecontainer {
  background-color: white;
}
</style>
