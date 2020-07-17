import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

console.log("Creating router");

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/shoppinglist',
    name: 'Shopping List',
    // route level code-splitting
    component: () => { return import(/* webpackChunkName: "shoppingList" */ '../views/ShoppingList.vue'); }
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  }
]

console.log("Routes defined:" + routes.length);
const router = new VueRouter({
  routes
})

console.log("Router created");
export default router
