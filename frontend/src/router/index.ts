import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/publishers',
    name: 'Publishers',
    component: () => import('../views/Publishers.vue'),
  },
  {
    path: '/publisher/:id',
    name: 'Publisher',
    component: () => import('../views/Publisher.vue'),
  },
  {
    path: '/test/new',
    name: 'test/new',
    component: () => import('../views/tests/TestForm.vue'),
  },
  {
    path: '/test/new/manuell',
    name: 'test/new/manuell',
    component: () => import('../views/tests/TestForm.vue'),
    props: { manuell: true },
  },
  {
    path: '/test/edit/:id',
    name: 'test/edit',
    component: () => import('../views/tests/TestForm.vue'),
  },
  {
    path: '/test/',
    name: 'tests',
    component: () => import('../views/tests/TestOverview.vue'),
  },
  {
    path: '/test/manuell',
    name: 'tests/manuell',
    component: () => import('../views/tests/TestOverview.vue'),
    props: { manuell: true },
  },
  {
    path: '/test/:id',
    name: 'test/show',
    component: () => import('../views/tests/TestCase.vue'),
  },
  {
    path: '/testgroup/new',
    name: 'testgroup/new',
    component: () => import('../views/tests/TestGroupForm.vue'),
  },
  {
    path: '/testgroup/edit/:id',
    name: 'testgroup/edit',
    component: () => import('../views/tests/TestGroupForm.vue'),
  },
  {
    path: '/testgroup',
    name: 'testgroup',
    component: () => import('../views/tests/TestGroupOverview.vue'),
  },
  {
    path: '/testgroup/show/:id',
    name: 'testgroup/show',
    component: () => import('../views/tests/TestGroupShow.vue'),
  },
  {
    path: '/news/new',
    name: 'news/new',
    component: () => import('../views/news/NewsForm.vue'),
  },
  {
    path: '/news/edit/:id',
    name: 'news/edit',
    component: () => import('../views/news/NewsForm.vue'),
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('../views/news/NewsOverview.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/publishers/new',
    name: 'publishers/new',
    component: () => import('../views/publisher/PublisherForm.vue'),
  },
  {
    path: '/source/new',
    name: 'source/new',
    component: () => import('../views/publisher/SourceForm.vue'),
  },
  {
    path: '/source/new/:publisherid',
    name: 'source/new',
    component: () => import('../views/publisher/SourceForm.vue'),
  },
  {
    path: '/source/edit/:id',
    name: 'source/edit',
    component: () => import('../views/publisher/SourceForm.vue'),
  },
  {
    path: '/user/new',
    name: 'user/new',
    component: () => import('../views/user/UserForm.vue'),
  },
  {
    path: '/user/edit/:id',
    name: 'user/edit',
    component: () => import('../views/user/UserForm.vue'),
  },
  {
    path: '/publisher/edit/:id',
    name: 'publisher/edit',
    component: () => import('../views/publisher/PublisherForm.vue'),
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/user/UserOverview.vue'),
  },
  {
    path: '/controlpanel',
    name: 'controlpanel',
    component: () => import('../views/ControlPanel.vue'),
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  mode: 'history',
  routes,
});

export default router;
