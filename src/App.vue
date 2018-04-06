<template>
  <v-app>
    <header id="menu">
      <v-navigation-drawer v-model="sidebar" app>
        <v-toolbar flat>
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">
            {{ title }}
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-divider></v-divider>
    <v-list dense class="pt-0">
          <v-list-tile :to="{ name: 'Index' }">
            <v-list-tile-action >
              <v-icon>store</v-icon>
            </v-list-tile-action>
            <v-list-tile-content >
              <v-list-tile-title>Inicio</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile :to="{ name: 'Estoque' }">
            <v-list-tile-action >
              <v-icon>local_grocery_store</v-icon>
            </v-list-tile-action>
            <v-list-tile-content >
              <v-list-tile-title>Estoque</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar clipped-right color="blue-grey lighten-5 black--text">
        <v-toolbar-title>
          <v-btn :to="{ name: 'Index' }" id="brand-name" color="light-blue lighten-1"><v-icon color="black"></v-icon><b> {{ title }} </b></v-btn>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down" justify-space-around>
          <!-- class="hidden-sm-and-down" justify-space-around -->
          <v-btn exact flat raised :to="{ name: 'Index' }"><v-icon medium color="teal darken-1">store</v-icon></v-btn>
          <v-btn exact flat raised :to="{ name: 'Estoque' }"><v-icon medium color="blue">local_grocery_store</v-icon></v-btn>
        </v-toolbar-items>
        <span class="hidden-sm-and-up">
          <v-toolbar-side-icon @click="sidebar = !sidebar"></v-toolbar-side-icon>
        </span>
      </v-toolbar>
    </header>
    <section id="content">
      <v-container>
        <router-view></router-view>
      </v-container>
    </section>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      title: 'Use & Abuse',
      sidebar: false
    }
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Raleway:200');
  @import url('https://fonts.googleapis.com/css?family=Merriweather');
  
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    padding: 10px;
  }

  #content {
    font-family: 'Raleway', sans-serif;
  }
  
  #menu, #footer {
    font-family: 'Merriweather', serif;
  }

  .hidden-sm-and-down a {
    margin-right: 5px;
  }
</style>
