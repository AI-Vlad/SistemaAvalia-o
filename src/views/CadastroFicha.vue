<template>
  <div class="text-center">
    <div>
      <v-snackbar
        type="info"
        v-model="naoCadastrado"
        close-text="Close Alert"
        color="red"
        :top="y === 'top'"
      >
        Os campos DATA, LOCAL, IDENTIFICAÇÃO, RODOVIA E RISCO são obrigatórios!
        <v-btn dark text @click="naoCadastrado = false">Fechar</v-btn>
      </v-snackbar>
    </div>
    <div>
      <v-snackbar
        type="info"
        v-model="salvo"
        close-text="Close Alert"
        color="info"
        :top="y === 'top'"
      >
        Cadastro efetuado com sucesso!
        <v-btn dark text @click="salvo = false">Fechar</v-btn>
      </v-snackbar>
    </div>

    <v-form>
      <div class="text-center">
        <h1>Cadastro de ficha</h1>
      </div>

      <v-container class="text-center">
        <v-row class="text-center">
          <v-col cols="12" sm="6" md="4">
            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="date"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date"
                  label="Data da ficha *"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>

          <v-col cols="12" md="8">
            <v-text-field v-model="local" label="Local *" :rules="nameRules" :counter="20" required></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field v-model="identificação" label="Identificação da ficha *" required></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="rodovia"
              label="Rodovia *"
              :rules="rodoviaRules"
              :counter="20"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="2">
            <v-text-field v-model="risco" label="Risco *" required></v-text-field>
          </v-col>
          <div>
            <v-file-input
              v-model="fotos"
              color="deep-purple accent-4"
              counter
              label="Caixa de fotos"
              multiple
              placeholder="Adicione até 3 fotos da sua avaliação *"
              prepend-icon="mdi-paperclip"
              outlined
              :show-size="1000"
              class="mt-5"
            >
              <template v-slot:selection="{ index, text }">
                <v-chip v-if="index < 2" color="deep-purple accent-4" dark label small>{{ text }}</v-chip>

                <span
                  v-else-if="index === 2"
                  class="overline grey--text text--darken-3 mx-2"
                >+{{ fotos.length - 2 }} File(s)</span>
              </template>
            </v-file-input>
          </div>
        </v-row>

        <div class="text-center">
          <v-btn color="success" @click="salvar">Salvar</v-btn>
        </div>
      </v-container>
    </v-form>
  </div>
</template>
<script>
import HttpRequestUtil from "@/util/HttpRequestUtil";
export default {
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    modal: false,

    local: "",
    fotos: [],
    identificação: "",
    rodovia: "",
    risco: "",

    salvo: false,
    naoCadastrado: false,
    y: "top",
    nameRules: [
      v => !!v || "Local é obrigatório!",
      v => v.length <= 20 || "O local deve ter até 20 caracteres"
    ],
    rodoviaRules: [
      v => !!v || "Rodovia é obrigatório!",
      v => v.length <= 7 || "A Rodovia deve ter 7 digitos"
    ],
    rgRules: [
      v => !!v || "RG é obrigatório!",
      v => v.length <= 7 || "O RG deve ter 7 digitos"
    ],
    telRules: [
      v => !!v || "Telefone é obrigatório!",
      v => v.length <= 11 || "O Telefone deve até 11 digitos"
    ]
  }),

  methods: {
    salvar() {
      let ehvalido = this.validar();

      if (ehvalido) {
        let ficha = {};
        ficha.data = this.date;
        ficha.local = this.local;
        ficha.fotos = this.fotos;
        ficha.identificação = this.identificação;
        ficha.rodovia = this.rodovia;

        ficha.risco = this.risco;

        alert(JSON.stringify(ficha));

        HttpRequestUtil.salvarFicha(ficha).then(Ficha => {
          this.salvo = true;
          this.limparCampos();
        });
      } else {
        this.naoCadastrado = true;
      }
    },

    validar() {
      if (
        this.date == "" ||
        this.identificação == "" ||
        this.local == "" ||
        this.fotos == null ||
        this.rodovia == "" ||
        this.risco == ""
      ) {
        return false;
      }
      return true;
    },

    limparCampos() {
      this.date = "";
      this.identificação = "";
      this.local = "";
      this.rodovia = "";
      this.risco = "";
      this.fotos = null;
    }
  }
};
</script>