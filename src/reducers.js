import { SET_SEARCH_TERM } from './actions';

const DEFAULT_STATE = {
    searchTerm: '4hunnid'
}

const setSearchTerm = (state, action) => {
    return Object.assign({}, state, { searchTerm: action.payload })
}

const rootReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case SET_SEARCH_TERM:
            return setSearchTerm(state, action)
        default:
            return state
    }
}

export default rootReducer;