import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '@/router'
import shortid from 'shortid'

Vue.use(Vuex)
// Initialize Firebase
const config = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId
}

const fireDB = firebase.database(firebase.initializeApp(config))

export const store = new Vuex.Store({
  state: {
    appTitle: 'Use & Abuse',
    user: null,
    products: [],
    product: null,
    error: null,
    loading: false
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setProducts (state, payload) {
      state.products = payload
    },
    setProduct (state, payload) {
      state.product = payload
    }
  },
  actions: {
    userSignUp ({commit}, payload) {
      commit('setLoading', true)
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('setUser', {email: user.email})
          commit('setError', null)
          router.push('/login')
        })
        .catch(error => {
          commit('setError', error.message)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    userSignIn ({commit}, payload) {
      commit('setLoading', true)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('setUser', {email: user.email})
          commit('setLoading', false)
          commit('setError', null)
          router.push('/estoque')
        })
        .catch(error => {
          commit('setError', error.message)
          commit('setLoading', false)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {email: payload.email})
    },
    userSignOut ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
      router.push('/')
    },
    createProduct ({commit}, payload) {
      commit('setLoading', true)
      payload.id = shortid.generate()

      fireDB.ref('produtos/' + payload.id)
        .set(payload)
        .then(() => {
          commit('setError', null)
          commit('setLoading', false)
          router.push('/estoque')
        })
        .catch((err) => {
          commit('setError', err)
          commit('setLoading', false)          
        })
    },
    getProducts ({commit}, payload) {
      commit('setLoading', true)
      fireDB.ref('produtos')
        .on('value', (data) => {
          const listaProdutos = []
          data
            .forEach((dt) => {
              listaProdutos.push(dt.toJSON())
            })
          commit('setProducts', listaProdutos)
          commit('setError', null)
          commit('setLoading', false)
        })
    },
    getProduct ({commit}, payload) {
      commit('setLoading', true)
      console.log(payload)
      fireDB.ref(`produtos/${payload.id}`)
        .on('value', (data) => {
          // const listaProdutos = []
          // console.log(data.toJSON())
          commit('setProduct', data.toJSON())
          commit('setError', null)
          commit('setLoading', false)
        })
      router.push(`/produto/${payload.id}`)
    },
    updateProduct ({commit}, payload) {
      console.log(payload)
      commit('setLoading', true)
      fireDB.ref(`produtos/${payload.id}`)
        .update(payload)
        .then(() => {
          commit('setError', null)
          commit('setProduct', payload)
          router.push('/estoque')
        })
        .catch((err) => {
          commit('setError', err)
        })
        .finally((err) => {
          commit('setLoading', false)
        })
    } 
  },
  getters: {
    isAuthenticated (state) {
      return !!state.user
    },
    selectedProduct (state) {
      return state.product
    }
  }
})
