<template>
  <div class="text-center">
    <v-col cols="12">
      <v-card>
        <v-card-title>
          Histórico de avaliações:
          <div class="flex-grow-1"></div>
          <v-text-field
            v-model="search"
            label="Procurar avaliação por data/ identificação / local / rodovia / risco"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="compras"
          item-key="cliente.nome"
          :search="search"
          :single-expand="singleExpand"
          show-expand
          :expanded.sync="expanded"
        >
          <template v-slot:expanded-item="{ headers }">
            <td :colspan="headers.length" v-if="expanded[0] != undefined">
              <v-list-item
                v-for="produto in expanded[0].produtos"
                :key="produto._id"
                class="text-start"
              >Produto: {{produto.nome}}, Marca: {{produto.marca}}, Valor: R$ {{produto.valor}}, Quantidade: {{produto.quantidade}}</v-list-item>
            </td>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valortotalDasCompras: 0,
      search: "",
      dialogm1: "",
      dialog: false,
      expanded: [],
      singleExpand: true,

      headers: [
        { text: "Fotos da avaliação", align: "left" },

        {
          text: "Data",
          value: "valorTotal"
        },
        {
          text: "Identificação",
          value: "data"
        },
        {
          text: "Rodovia",
          value: "pagamento"
        },
        {
          text: "Risco",
          value: "cliente.nome"
        }
      ],
      compras: []
    };
  },

  methods: {
    buscarCompras() {
      HttpRequestUtil.buscarCompras().then(response => {
        this.compras = response;

        for (let i = 0; i < this.compras.length; i++) {
          this.valortotalDasCompras += this.compras[i].valorTotal;
        }
      });
    }
  },
  mounted() {
    this.buscarCompras();
  }
};
</script>

<style>
</style>