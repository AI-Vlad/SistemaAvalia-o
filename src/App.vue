<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" router :to="item.route">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <router-view />
    </v-content>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Bem-vindo ao Sistema!</v-toolbar-title>
    </v-app-bar>

    <v-footer padless>
      <div class="flex-grow-1"></div>
      <div>Sistema de Monitoramento de Terraplenos e Estruturas de Contenção&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>


<script>
export default {
  props: {
    source: String
  },

  data: () => ({
    drawer: null,
    username: "",
    password: "",
    logado: false,
    items: [
      {
        title: "Cadastrar usuário",
        icon: "mdi-account-card-details-outline",
        route: "/cadastrousuario"
      },

      {
        title: "Cadastrar ficha",
        icon: "mdi-file-edit-outline",
        route: "/cadastroficha"
      },

      {
        title: "Historico",
        icon: "mdi-file-search-outline",
        route: "/historico"
      }
    ]
  }),
  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>