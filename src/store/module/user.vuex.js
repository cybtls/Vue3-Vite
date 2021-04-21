const user = {
    state: {
        userInfo: {
            name: 'cybtls'
        }
    },
    mutations: {
        UPDATA_USERINFO (state, data) {
            state.userInfo = data
        }
    },
    actions: {
        changeUserInfo (context, data) {
            context.commit('UPDATA_USERINFO', data)
        }
    }
}
export default user