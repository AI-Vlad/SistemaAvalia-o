const API_URL = "http://localhost:3000";
import axios from "axios";

export default {
  //Usuários


  async salvarUsuario(usuario) {
    return axios
      .post(API_URL + "/cadastrousuario", usuario)
      .then(response => response.data);
  },


  //Historico
  async buscarHistorico() {
    return axios.get(API_URL + "/historico").then(historico => historico.data);
  },




  //Fichas


  async salvarFicha(ficha) {
    return axios.post(API_URL + "/cadastroficha", ficha)
      .then(response => response.data);
  },





};