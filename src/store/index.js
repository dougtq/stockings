import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '@/service/firebase'
import router from '@/router'
import shortid from 'shortid'

Vue.use(Vuex)

const fireDB = firebase.database()

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
          commit('setUser', { email: user.email })
          commit('setError', null)
          router.push('/estoque')
        })
        .catch(error => {
          commit('setError', error.message)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {email: payload.email})
    },
    userSignOut ({commit}) {
      firebase.auth()
        .signOut()
        .then(() => {
          router.push('/')
        })
        .finally(() => {
          commit('setUser', null)
          commit('setLoading', false)
          commit('setProduct', null)
          commit('setProducts', [])
        })
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
        .orderByChild('name')
        .on('value', (data, dataStr) => {
          const listaProdutos = []
          data
            .forEach((dt) => {
              listaProdutos.push(dt.toJSON())
            })
          commit('setProducts', listaProdutos)
          commit('setError', null)
          commit('setLoading', false)
        }, (err) => {
          commit('setError', err)
          commit('setLoading', false)
        })
    },
    getProduct ({commit}, payload) {
      commit('setLoading', true)
      fireDB.ref(`produtos/${payload.id}`)
        .orderByChild('name')
        .on('value', (data) => {
          commit('setProduct', data.toJSON())
          commit('setError', null)
          commit('setLoading', false)
        }, (err) => {
          if (err) {
            commit('setError', err)
            commit('setProduct', null)
            commit('setLoading', false)
            router.push('/estoque')
          }
        })
      router.push(`/produto/${payload.id}`)
    },
    updateProduct ({commit}, payload) {
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
        .finally(() => {
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
