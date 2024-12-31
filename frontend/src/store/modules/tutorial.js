// /home/alice/cake library ex/frontend/src/store/modules/tutorials.js
export default {
    namespaced: true,
    state: {
        tutorials: [],
        currentTutorial: null
    },
    mutations: {
        setTutorials(state, tutorials) {
        state.tutorials = tutorials
        },
        setCurrentTutorial(state, tutorial) {
        state.currentTutorial = tutorial
        }
    },
    actions: {
        async fetchTutorials({ commit }) {
          // Placeholder for fetching tutorials
        const tutorials = [
            { id: 1, title: 'Chocolate Cake', description: 'Learn to bake a delicious chocolate cake' },
            { id: 2, title: 'Vanilla Sponge', description: 'Master the art of baking a light vanilla sponge' }
        ]
        commit('setTutorials', tutorials)
        },
        async fetchTutorialById({ commit }, id) {
          // Placeholder for fetching a specific tutorial
        const tutorial = { 
            id, 
            title: 'Sample Tutorial', 
            description: 'Detailed tutorial description' 
        }
        commit('setCurrentTutorial', tutorial)
        }
    },
    getters: {
        getAllTutorials: state => state.tutorials,
        getCurrentTutorial: state => state.currentTutorial
    }
}