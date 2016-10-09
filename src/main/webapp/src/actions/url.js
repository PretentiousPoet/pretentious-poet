export const SET_URL = 'url/SET_URL';

export function setURL(url) {
    console.log(url);
    return  {
        type: SET_URL,
        url: url
    };
}