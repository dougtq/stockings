import Vue from 'vue'
import Router from 'vue-router'

const Init = () => import('@/components/Index')
const Login = () => import('@/components/Login')
const Estoque = () => import('@/components/Estoque')
const Produto = () => import('@/components/Produto')
const addProduto = () => import('@/components/Adicionar')

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
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/add',
      name: 'Adicionar',
      component: addProduto
    },
    {
      path: '/estoque',
      name: 'Estoque',
      component: Estoque
    },
    {
      path: '/produto/:id',
      name: 'Produto',
      component: Produto
    }
  ]
})
