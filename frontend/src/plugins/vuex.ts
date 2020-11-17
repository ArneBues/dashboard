import Vue from 'vue';
import Vuex from 'vuex';
import { User } from '@/types/user';
import createPersistedState from 'vuex-persistedstate';
import Axios from 'axios';

Vue.use(Vuex);

const getDefaultState = () => ({
  token: '',
  user: {},
});

const store = new Vuex.Store({
  state: getDefaultState(),
  getters: {
    isLoggedIn: (state) => (state.user as User)?.id > 0,
    getUser: (state) => state.user,
    isAdmin: (state) => (state.user as User)?.role === 'admin',
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    RESET: (state) => {
      Object.assign(state, getDefaultState());
    },
  },
  actions: {
    login: ({ commit }, { token, user }) => {
      commit('SET_TOKEN', token);
      commit('SET_USER', user);
    },
    logout: ({ commit }) => {
      commit('RESET', '');
    },
    checkStatus: ({ commit }) => {
      Axios.get('/api/user/status').then((resp) => {
        if (resp.data.data) {
          commit('SET_USER', resp.data.data);
        } else commit('RESET', '');
      });
    },
  },
  plugins: [createPersistedState()],
});

export default store;
