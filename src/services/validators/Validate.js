const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

function email(email) {
    return emailRegex.test(email);
}

function required(val) {
    return val && min(0, val);
}

function min(minLen, val) {
    return val && val.length >= minLen;
}

function max(maxLen, val) {
    return val && val.length <= maxLen;
}

function password(val) {
    return pwdRegex.test(val);
}

function same(val1, val2){
    return val1 && val2 && val1 === val2;
}

export default {email, required, min, max, password, same};