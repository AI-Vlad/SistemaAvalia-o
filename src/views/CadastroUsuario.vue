<template>
  <div>
    <div>
      <v-snackbar
        type="info"
        v-model="naoCadastrado"
        close-text="Close Alert"
        color="red"
        :top="y === 'top'"
      >
        Os campos CPF, NOME, E-MAIL e SENHA são obrigatórios!
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
        <h1>Cadastro de usuário</h1>
      </div>

      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="nome" label="Nome *" :rules="nameRules" :counter="20" required></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field v-model="email" label="E-mail *" type="email" required></v-text-field>
          </v-col>

          <v-col cols="12" md="2">
            <v-text-field v-model="cpf" label="CPF *" :rules="cpfRules" :counter="11" required></v-text-field>
          </v-col>

          <v-col cols="12" md="2">
            <v-text-field v-model="senha" label="Senha" type="password" required></v-text-field>
          </v-col>
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
    nome: "",
    email: "",
    cpf: "",
    senha: "",

    salvo: false,
    naoCadastrado: false,
    y: "top",
    nameRules: [
      v => !!v || "Nome é obrigatório!",
      v => v.length <= 20 || "O nome deve ter até 20 caracteres"
    ],
    cpfRules: [
      v => !!v || "CPF é obrigatório!",
      v => v.length <= 11 || "O CPF deve ter 11 digitos"
    ]
  }),

  methods: {
    salvar() {
      let ehvalido = this.validar();

      if (ehvalido) {
        let usuario = {};
        usuario.nome = this.nome;
        usuario.email = this.email;
        usuario.cpf = this.cpf;
        usuario.senha = this.senha;

        alert(JSON.stringify(usuario));

        HttpRequestUtil.salvarUsuario(usuario).then(Usuario => {
          this.salvo = true;
          this.limparCampos();
        });
      } else {
        this.naoCadastrado = true;
      }
    },

    validar() {
      if (
        this.nome == "" ||
        this.senha == "" ||
        this.email == "" ||
        this.cpf == null
      ) {
        return false;
      }
      return true;
    },

    limparCampos() {
      this.nome = "";
      this.senha = "";
      this.email = "";

      this.cpf = "";
    }
  }
};
</script>