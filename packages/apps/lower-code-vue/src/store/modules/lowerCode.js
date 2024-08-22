const state = {
        count: {},
        components: [],
        currentComponentId: '',
};

const mutations = {
    SET_COUNT(state, count) {
        state.count = count;
    },
    SET_COMPONENTS(state, components) {
        state.components = components;
    },
    SET_CURRENT_COMPONENT_ID(state, id) {
        state.currentComponentId = id;
    },
};

const actions = {
    setCount(playload, count) {
        playload.commit('SET_COUNT', count);
    },
    setComponents(playload, components) {
        playload.commit('SET_COMPONENTS', components);
    },
    setCurrentComponentId(playload, id) {
        playload.commit('SET_CURRENT_COMPONENT_ID', id);
    },
};

const uniqueId = (data) => {
    if (!data) return []; 
    return [...new Map(data.map(item => [item._id, item])).values()];
};

export default {
    namespaced: true, // 这是一个命名空间模块，这样在不同的模块中可以有相同的方法名
    state,
    mutations,
    actions,
    getters: {
        count: state => state.count,
        getComponents: state => uniqueId(state.components),
        currentComponentId: state => state.currentComponentId,
    },
}