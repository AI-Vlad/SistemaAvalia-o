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
            <v-text-field
              v-model="cpf"
              label="CPF *"
              type="number"
              :rules="cpfRules"
              :counter="11"
              required
            ></v-text-field>
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
export default {
  data: () => ({
    usuario: "",
    senha: "",
    cpf: "",
    rg: "",
    nome: "",
    telefone: "",
    sexo: "",
    email: "",
    cep: "",
    endereco: "",
    numero: "",
    bairro: "",
    cidade: "",
    uf: "",
    complemento: "",
    items: [
      { text: "Masculino", value: "M" },
      { text: "Feminino", value: "F" },
      { text: "Outro", value: "O" }
    ],
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
    ],
    rgRules: [
      v => !!v || "RG é obrigatório!",
      v => v.length <= 7 || "O RG deve ter 7 digitos"
    ],
    telRules: [
      v => !!v || "Telefone é obrigatório!",
      v => v.length <= 11 || "O Telefone deve até 11 digitos"
    ]
  })
};
</script>