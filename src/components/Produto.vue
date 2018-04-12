<template>
<v-container fluid>
  <v-layout row wrap>
    <v-flex xs12>
      <v-form v-model="valid" @submit.prevent="updateProduct" ref="form">
        <v-layout column>
          <v-flex>
            <v-alert type="error" dismissible v-model="alert">
              {{ error }}
            </v-alert>
          </v-flex>
          <v-text-field
            label="Nome do Produto"
            v-model="name"
            :rules="nameRules"
            :counter="50"
            required></v-text-field>
          <v-text-field
            label="Preço unitário"
            v-model="price"
            :rules="priceRules"
            required></v-text-field>
          <v-text-field
            label="Unidades em estoque"
            v-model="quantity"
            :rules="quantityRules"
            type="number"
            required></v-text-field>
        </v-layout>
          <v-btn
            type="submit"
            color="success"
            :disabled="!valid || isLoading">
            <b>atualizar</b>
          </v-btn>
          <v-btn href="javascript:window.history.go(-1)" color="warning"><b>Cancelar</b></v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
  name: 'Produto',
  data () {
    return {
      valid: false,
      alert: false,
      productId: this.$store.state.product.id || this.$route.params.id,
      name: this.$store.state.product.name,
      nameRules: [(r) => !!r || 'Nome é obrigatório',
      (r) => r && r.length < 50 || 'Nome não pode ultrapassar 50 caracteres'],
      price: this.$store.state.product.price,
      priceRules: [(r) => !!r || 'Preço é obrigatório'],
      quantity: this.$store.state.product.quantity,
      quantityRules: [(r) => !!r || 'Quantidade é obrigatório']
    }
  },
  props: {},
  computed: {
    error () {
      return this.$store.state.error
    },
    isLoading () {
      return this.$store.state.loading
    }
  },
  methods: {
    clear () {
      this.$refs.form.reset()
      this.valid = false
    },
    updateProduct (e) {
      const payload = {
        id: this.productId,
        name: this.name,
        price: this.price,
        quantity: this.quantity
      }
      this.$store.dispatch('updateProduct', payload)
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
