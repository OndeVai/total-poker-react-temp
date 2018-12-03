import Validate from "./Validate"

function getRequiredError(val) {
    if (!Validate.required(val)) {
        return 'is required';
    }
    return null;
}


const usernameError = username => {
    const requiredError = getRequiredError(username);
    if (requiredError) return requiredError;

};

const passwordError = password => {
    const requiredError = getRequiredError(password);
    if (requiredError) return requiredError;
};



export default {
    usernameError,
    passwordError,


    errorsAll: ({username, email, password, confirmPassword}) => {
        return usernameError(username) ||
            passwordError(password);
    }
}