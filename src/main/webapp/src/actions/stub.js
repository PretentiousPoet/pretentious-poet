export const FETCH_STUB_REQUEST = 'stub/FETCH_STUB_REQUEST';
export const FETCH_STUB_SUCCESS = 'stub/FETCH_STUB_SUCCESS';
export const FETCH_STUB_FAIL = 'stub/FETCH_STUB_FAIL';
export const CLEAR_POEM = 'stub/CLEAR_POEM';

export function fetchStub(url, onSuccess) {
    console.log(url);
    return  {
        types: [FETCH_STUB_REQUEST, FETCH_STUB_SUCCESS, FETCH_STUB_FAIL],
        promise: client => client.get('/api/poem', {params:{url: url}, onSuccess: onSuccess()}).then(
            // onSuccess && onSuccess()
        )
    };
}

export function clearPoem() {
    return  {
        type: CLEAR_POEM
    };
}