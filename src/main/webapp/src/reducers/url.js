import {SET_URL} from 'actions/url';

const initialState = {
    url: ''
};

// Reducer

export default function stubReducer(state = initialState, action) {
    switch (action.type) {
        case SET_URL:
            return {
                ...state,
                url: action.url
            };
        default:
            return state;
    }
}