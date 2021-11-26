import { vueToggleType } from '../Type';

const inicialState = { vueMovies: [] }

function VueReducers(state = inicialState, action) {
    switch (action.type) {
        case vueToggleType:
            const vueToggleIndex = state.vueMovies.findIndex(item => item.id === action.value.id);
            if(vueToggleIndex !== -1) {
                return { 
                    ...state,
                    vueMovies: state.vueMovies.filter((item, index) => index !== vueToggleIndex),
                }
            } else {
                return {
                    ...state,
                    vueMovies: [ ...state.vueMovies, action.value ],
                }
            }
        default:
            return state
    }
}

export default VueReducers;