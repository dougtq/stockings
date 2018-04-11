<template>
<v-flex xs12>
  <v-form v-model="valid" ref="form" @submit.prevent="createProduct">
    <v-layout column>
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
        type="number"
        v-model="quantity"
        :rules="quantityRules"
        required></v-text-field>
    </v-layout>
      <v-btn
        type="submit"
        color="primary"
        :disabled="!valid">
        <b>adicionar</b>
      </v-btn>
      <v-btn @click="clear" color="orange accent-3"><b>limpar</b></v-btn>
  </v-form>
</v-flex>
</template>

<script>
export default {
  data () {
    return {
      valid: false,
      name: '',
      nameRules: [
        v => !!v || 'O nome do produto é obrigatório',
        v => (v && v.length <= 50) || 'O nome do produto deve possuir menos de 50 caracteres'
      ],
      price: '',
      priceRules: [
        v => !!v || 'O preço unitário do produto é obrigatório',
        v => v > 0 || 'A preço unitário do produto em estoque não pode ser negativa ou possuir outros caracteres'
      ],
      quantity: '',
      quantityRules: [
        v => !!v || 'A quantidade do produto em estoque é obrigatória',
        v => v > -1 || 'A quantidade do produto em estoque não pode ser negativa ou possuir outros caracteres'
      ],
      items: [
        {
          name: 'Sutiã Bojo',
          price: '11,99',
          quantity: '20'
        }
      ]
    }
  },
  methods: {
    createProduct () {
      this.$store.dispatch('createProduct', { name: this.name, price: this.price, quantity: this.quantity })
    }
  }
}
</script>
