import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '../views/Home.vue'
import RegisterFriend from '../views/RegisterFriend.vue'
import Login from '../views/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/RegisterFriend',
      name: 'RegisterFriend',
      component: RegisterFriend
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
  ]
})
