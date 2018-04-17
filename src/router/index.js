import Vue from 'vue'
import Router from 'vue-router'
import { store } from '@/store'

const Init = () => import('@/components/Index')
const Login = () => import('@/components/Login')
const Estoque = () => import('@/components/Estoque')
const Produto = () => import('@/components/Produto')
const addProduto = () => import('@/components/Adicionar')

Vue.use(Router)

const Routes = new Router({
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
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/add',
      name: 'Adicionar',
      component: addProduto,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/estoque',
      name: 'Estoque',
      component: Estoque,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/produto/:id',
      name: 'Produto',
      component: Produto,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

Routes.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user) {
    next('/')
  }
  next()
})

export default Routes
