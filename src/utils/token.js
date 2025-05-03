//
const TOKENKEY = 'token_key'
function _setToken(token){
    localStorage.setItem(TOKENKEY, token)
}

function getToken(){
    return localStorage.getItem(TOKENKEY)
}

function removeToken(){
    localStorage.removeItem(TOKENKEY)
}

export {_setToken, getToken, removeToken}