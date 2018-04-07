import Vue from 'vue'
import Router from 'vue-router'

const Init = () => import ('@/components/Index')
const Estoque = () => import ('@/components/Estoque')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/'
    },
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
