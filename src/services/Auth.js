import {Auth} from "aws-amplify";

async function signIn(username, password) {
    try {
        await Auth.signIn(username, password);
    } catch (e) {
        handleLoginError(e);
    }
}

async function signUp(username, password, email) {
    try {
        const newUser =
            await Auth.signUp({
                username,
                password,
                attributes: {
                    email
                }
            });
        return newUser;
    } catch (e) {
        handleSignupError(e, username);
    }
}

async function confirmSignUp(username, confirmationCode, password = null) {

    try {
        await Auth.confirmSignUp(username, confirmationCode);

        if (password) {
            await Auth.signIn(username, password); //todo is this needed after login?
        }
    } catch (e) {
        handleConfirmationError(e);
    }
}

function throwResolvedError(e, message, type) {
    message = message || e.message;
    type = type || 'warning';
    const resolvedError =
        Object.assign({}, e, {type, message});
    throw resolvedError;
}

function handleLoginError(e) {
    let loginErrorMessage, loginErrorMessageType;
    switch (e.code) {
        case 'UserNotFoundException':
        case 'InvalidParameterException':
        case 'NotAuthorizedException':
            loginErrorMessage = 'Invalid username or password';
            loginErrorMessageType = 'warning';
            break;
        case 'UserNotConfirmedException':
            break;
        default:
            loginErrorMessage = 'Unknown error, please try again';
            loginErrorMessageType = 'danger';
            console.error(e);
    }
    throwResolvedError(e, loginErrorMessage, loginErrorMessageType);
}

function handleSignupError(e, username) {
    if (e.code === "UsernameExistsException") {
        const message = `The username "${username}" has been taken already`;
        throwResolvedError(e, message);
    } else {
        throwResolvedError(e);
    }
}

function handleConfirmationError(e) {
    switch (e.code) {
        case 'CodeMismatchException':
            throwResolvedError(e)
            break;
        case 'NotAuthorizedException':
            //weird edge case where user logs in with invalid pwd but confirmation
            //shows anyway (wtf cognito??)
            //https://github.com/aws-amplify/amplify-js/issues/1464
            handleLoginError(e);
            break;
        default:
            const message = 'Unknown error, please try again';
            console.error(e, message, 'danger');
    }
}

export default {signIn, signUp, confirmSignUp};