import Validate from "./Validate"

function getRequiredError(val) {
    if (!Validate.required(val)) {
        return 'is required';
    }
    return null;
}

const emailError = email => {

    const requiredError = getRequiredError(email);
    if (requiredError) return requiredError;

    if (!Validate.email(email)) {
        return 'must be a valid email';
    }

    return null;
};

const usernameError = username => {

    const min = 5;
    const max = 15;
    const requiredError = getRequiredError(username);
    if (requiredError) return requiredError;

    if (!Validate.min(min, username) || !Validate.max(max, username)) {
        return `must be between ${min} and ${max} characters long`;
    }
};

const passwordError = password => {
    const requiredError = getRequiredError(password);
    if (requiredError) return requiredError;

    if (!Validate.password(password)) {
        return 'must be at least 8 characters with at ' +
            'least one: number, uppercase, special and lowercase character';
    }
};

const confirmPasswordError = (confirmPassword, password) => {
    const requiredError = getRequiredError(confirmPassword);
    if (requiredError) return requiredError;

    if (!Validate.same(password, confirmPassword)) {
        return 'doesn\'t match password';
    }
};

export default {
    usernameError,
    emailError,
    passwordError,
    confirmPasswordError,

    confirmationCodeError: confirmationCode => {
        return getRequiredError(confirmationCode);
    },

    errorsAll: ({username, email, password, confirmPassword}) => {
        return usernameError(username) ||
            emailError(email) ||
            passwordError(password) ||
            confirmPasswordError(confirmPassword, password)
    }
}