<template>
<v-container fluid>
  <v-layout row wrap>
    <v-flex xs12>
      <v-layout>  
        <v-flex xs12 sm12 md4>
          <h3><strong>Nome</strong></h3>
        </v-flex>
        <v-flex xs12 sm12 md4>
          <b><strong>Preço</strong></b>  
        </v-flex>
        <v-flex xs12 sm12 md4>
          <b>Quantidade</b>
        </v-flex>
        <v-flex xs12 sm12 md4>
          <b>Ação</b>
        </v-flex>
      </v-layout>
      <v-flex>
        <v-alert type="error" dismissible v-model="alert">
          {{ error }}
        </v-alert>
      </v-flex>
      <h1 v-if="isLoading">Carregando...</h1>
      <div class="product-row" v-if="products && products.length" v-for="(item, index) of products" :key="index" :id="item.id">
        <v-layout :id="item.id">
          <v-flex xs12 sm12 md4>
            <h3>{{ item.name }}</h3>
          </v-flex>
          <v-flex xs12 sm12 md4>
            <b>{{ item.price }}</b>
          </v-flex>
          <v-flex xs12 sm12 md4>
            <b>{{ item.quantity }}</b>
          </v-flex>
          <v-flex xs12 sm12 md4>
            <a color="primary" :id="item.id" @click="selecionaProduto">Atualizar</a>
          </v-flex>
        </v-layout>
      </div>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
  name: 'Estoque',
  data () {
    return {}
  },
  methods: {
    selecionaProduto (e) {
      this.$store.dispatch('getProduct', { id: e.target.id })
      // console.log(e.target.id)
    }
  },
  async beforeMount () {
    await this.$store.dispatch('getProducts')
  },
  computed: {
    products () {
      return this.$store.state.products
    },
    isLoading () {
      return this.$store.state.loading
    }
  },
  watch: {
    error (value) {
      if (value) {
        this.alert = true
      }
    },
    alert (value) {
      if (!value) {
        this.$store.commit('setError', null)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.product-row {
  border: 1px solid black;
  padding: 2px;
  margin: 5px;
}

a {
  text-align: center;
  text-decoration: none;
  text-decoration: underline;
  color: black;
}
</style>
