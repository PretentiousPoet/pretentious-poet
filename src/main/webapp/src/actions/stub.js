export const FETCH_STUB_REQUEST = 'stub/FETCH_STUB_REQUEST';
export const FETCH_STUB_SUCCESS = 'stub/FETCH_STUB_SUCCESS';
export const FETCH_STUB_FAIL = 'stub/FETCH_STUB_FAIL';

export function fetchStub(onSuccess) {
    return  {
        types: [FETCH_STUB_REQUEST, FETCH_STUB_SUCCESS, FETCH_STUB_FAIL],
        promise: client => client.get('/api/poem', {params:{url:'helloWorld'}}).then(
            onSuccess && onSuccess()
        )
    };
}