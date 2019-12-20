import Vue from 'vue'
import Router from 'vue-router'
import CadastroUsuario from './views/CadastroUsuario.vue'
import CadastroFicha from "./views/CadastroFicha.vue"
import Historico from "./views/Historico.vue"

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{


            path: '/cadastrousuario',
            name: 'CadastroUsuario',
            component: CadastroUsuario
        },

        {


            path: '/cadastroficha',
            name: 'CadastroFicha',
            component: CadastroFicha
        },

        {


            path: '/historico',
            name: 'Historico',
            component: Historico
        },

    ]
})