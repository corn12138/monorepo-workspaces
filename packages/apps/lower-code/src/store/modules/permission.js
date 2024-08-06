// Description: permission module for vuex.
// Version: 1.0
const state = { 
    testName: "lower-code",
    useList: [],
    useObj: {}
};
const mutations = {
    SET_TEST_NAME(state, name) {
        state.testName = name;
    },
    SET_USER_LIST(state, list) {
        console.log(Array.isArray(list) ,"存了吗？")
        state.useList = list;
        console.log(state.useList, "state.useList")
    },
    SET_USER_OBJ(state, obj) {
        state.useObj = obj;
    }
};

const actions = {
    setTestName(playload, name) {
        playload.commit('SET_TEST_NAME', name);
    },
    setUserList(playload, list) {
        playload.commit('SET_USER_LIST', list);
    },
    setUserObj(playload, obj) {
        playload.commit('SET_USER_OBJ', obj);
    }
};

//针对useList的处理函数
const setLists = (arr) => {
    arr.forEach(item => {
        item.name = item.name + '1';
    });
    return arr;
};

const getters = {
    getttersName: (state)=>{
        return setLists(state.useList);
    },
};


export default {   
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}