
const state = {
    name: "lower-code",
    age: 18
 }
//  
const mutations = {
    SET_NAME(state,name){
        state.name = name;
    },
    SET_AGE(state,age){
        state.age = age;
    }
}
const actions = {
    setName(playload,name){
        playload.commit('SET_NAME',name)
    },
    setAge(playload,age){
        playload.commit('SET_AGE',age)
    }
};
//  
const getters = {
    name: state => state.name,
    age: state => state.age
}

export  default{
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}