<template>
  <v-content>
  <v-form v-model="valid" ref="form" lazy-validation>
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
      required></v-text-field>
    <!-- <v-select
      label="Item"
      v-model="select"
      :items="items"
      :rules="[v => !!v || 'Item is required']"
      required></v-select> -->
    <v-btn
      @click="submit"
      color="success"
      :disabled="!valid">
      <b>adicionar</b>
    </v-btn>
    <v-btn @click="clear" color="orange accent-3"><b>limpar</b></v-btn>
  </v-form>
  <br>
  <br>
  <br>
  <v-list v-for="(item, index) of items" :key="index">
    <v-list-tile to="sdadas">
    <v-list-tile-title class="title">
       <b>Produto: {{ item.name }} ----- Preço Unitário: {{ item.calories }} ----- Quantidade: {{ item.carbs }}</b>
    </v-list-tile-title>
    </v-list-tile>
  </v-list>
  </v-content>
</template>

<script>
export default {
  name: 'Estoque',
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
        v => v > 0  || 'A preço unitário do produto em estoque não pode ser negativa ou possuir outros caracteres',
      ],
      quantity: '',
      quantityRules: [
        v => !!v || 'A quantidade do produto em estoque é obrigatória',
        v => v > -1  || 'A quantidade do produto em estoque não pode ser negativa ou possuir outros caracteres'
      ],
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4
      },
      items: [
        {
          value: false,
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: '14%',
          iron: '1%'
        }
      ]
    }
  },
  methods: {
    clear () {
      this.$refs.form.reset()
      this.valid = false
    },
    submit () {}
  },
  created () {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
