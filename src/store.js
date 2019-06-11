import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        'userId': '-1',
    },
    mutations: {
        initUserInfo(state, id) {
            console.log('store=' + id);
            state.userId = id;
        }
    },
    actions: {

    }
})