<template>
  <v-app>
    <header id="menu">
      <div class="hidden-md-and-up">
      <v-navigation-drawer v-model="sidebar" app>
        <v-toolbar>
          <v-list>
            <v-list-tile>
              <v-list-tile-title class="title">
                {{ title }}
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-toolbar>
        <v-divider></v-divider>
        <v-list dense class="pt-0" >
          <v-list-tile exact v-for="(page, index) of pages" :key="index" :to="page.route">
            <v-list-tile-action >
              <v-icon>{{ page.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ page.name }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile exact @click="userSignOut" v-if="isAuthenticated">
            <v-list-tile-action>
              <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Sair</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        </v-navigation-drawer>
      </div>
      <v-toolbar clipped-right color="blue-grey lighten-5 black--text">
        <span class="hidden-md-and-up">
          <v-toolbar-side-icon @click="sidebar = !sidebar"></v-toolbar-side-icon>
        </span>
        <span class="hidden-sm-and-down">
          <v-btn :to="{ name: 'Index' }" color="light-blue lighten-1"><v-icon color="black"></v-icon><b> {{ title }} </b></v-btn>
        </span>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down" justify-space-around>
          <v-btn exact flat raised v-for="(page, i) of pages" :key="i" :to="page.route"><v-icon medium :color="page.color">{{ page.icon }}</v-icon></v-btn>
          <v-btn flat @click="userSignOut" v-if="isAuthenticated">
            <v-icon left>exit_to_app</v-icon>
          </v-btn>
        </v-toolbar-items>
        <span class="hidden-md-and-up">
          <v-btn :to="{ name: 'Index' }" color="light-blue lighten-1"><v-icon color="black"></v-icon><b> {{ title }} </b></v-btn>
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
      title: this.$store.state.appTitle,
      sidebar: false
    }
  },
  methods: {
    userSignOut () {
      this.$store.dispatch('userSignOut')
    }
  },
  computed: {
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    },
    pages () {
      const fixedRoutes = [{ name: 'Home', route: { name: 'Index' }, icon: 'home', color: '' }]

      if (this.isAuthenticated) {
        return [
          ...fixedRoutes,
          {
            name: 'Estoque',
            route: { name: 'Estoque' },
            icon: 'shopping_basket',
            color: ''
          },
          { name: 'Add Produto', route: { name: 'Adicionar' }, icon: 'add', color: '' }
        ]
      } else {
        return [
          ...fixedRoutes,
          { name: 'Entrar', route: { name: 'Login' }, icon: 'lock_open', color: '' }
        ]
      }
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
  }

  #content {
    font-family: 'Raleway', sans-serif;
  }

  #menu {
    font-family: 'Merriweather', serif;
  }

  @media screen and (max-width: 480px) {
    .brand-name {
      float: right;
      position: relative;
      display: none;
    }
  }
</style>
