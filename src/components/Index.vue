<template>
  <v-container fluid>
    <v-carousel interval="6000" hide-delimiters light>
      <v-carousel-item  v-for="(item, i) in pics" :src="item.src" :key="i"></v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      pics: [
        {
          src: 'http://gastown.org/wp-content/uploads/2015/03/Neighbour-5.jpg'
        },
        {
          src: 'http://futurelankan.com/wp-content/uploads/2017/06/bridge-and-burn-clothing-store-1.jpg'
        },
        {
          src: 'http://assets.papelpop.com/wp-content/uploads/2014/09/britney-linha-lingerie.jpg'
        },
        {
          src: 'http://cdn.ofuxico.com.br/img/galeria/2014/09/230434.jpg'
        },
      ]
    }
  }
}
</script>

<style>
img {
  min-width: 100%;
  max-height: 100%;
  object-fit: fill;
}
</style>
