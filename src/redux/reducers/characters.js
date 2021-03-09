import { SELECT_CHARACTER, STORE_CHARACTERS } from '../actionTypes'

const initialState = {
    all: [],
    selectedById: {
        name: '',
        image: '',
        location: {
            name: ''
        },
        origin: {
            name: ''
        },
        episode: []
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case STORE_CHARACTERS:
            return { ...state, all: [...action.payload] }
        case SELECT_CHARACTER:
            return { ...state, selectedById: action.payload }

        default:
            return state;
    }
}