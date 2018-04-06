import Vue from 'vue'
import Router from 'vue-router'
import Init from '@/components/Index'
import Estoque from '@/components/Estoque'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Init
    },
    {
      path: '/estoque',
      name: 'Estoque',
      component: Estoque
    }
  ]
})