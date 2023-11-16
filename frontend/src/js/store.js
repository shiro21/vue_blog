import { createStore } from "vuex"
import router from '@/js/router'
import createPersistedState from "vuex-persistedstate"
// import { axios, editor } from '@/js/axios'

export default createStore({
    state: {
        token: null,
        // 데이터를 로컬스토리지에 보관하면 부담이 많이 듦
        // data: null
    },
    mutations: {
        SET_USER(state, value) {
            console.log('set user')
            state.token = value
        },
        CLEAR_USER(state) {
            console.log('clear user')
            state.token = null
        },
        // 데이터를 로컬스토리지에 보관하면 부담이 많이 듦
        // async CARD_DATA(state) {

        //     await axios.post(`${editor}/read`)
        //     .then(res => {
        //         state.data = res.data.data
        //     })
        // }
    },
    actions: {
        login({ commit }, details) {

            commit('SET_USER', details)

        },
        logout({ commit }) {
            console.log('logout')
            commit('CLEAR_USER')
            router.push('/login')
        },
        async userStorage({ commit }, urlData) {

            if (router.currentRoute.value === '/editor') console.log('에디터')
            if (this.state.token === null) commit('CLEAR_USER')
            else if (this.state.token !== null && urlData === '/login') router.push('/')
            else if (this.state.token !== null && urlData === '/join') router.push('/')
            else commit('SET_USER', this.state.token)
        },
        // 데이터를 로컬스토리지에 보관하면 부담이 많이 듦
        // async editorController({ commit }) {
        //     commit('CARD_DATA')
        // }
    },
    plugins: [
        createPersistedState({
            paths: ['token'],
        })
    ],
})
