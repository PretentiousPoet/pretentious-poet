import {FETCH_STUB_REQUEST, FETCH_STUB_SUCCESS, FETCH_STUB_FAIL} from 'actions/stub';

const initialState = {
    items: []
};

// Reducer

export default function stubReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_STUB_SUCCESS:
            return {
                ...state,
                items: action.result.data
            };
        default:
            return state;
    }
}

