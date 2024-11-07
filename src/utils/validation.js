const validator = require('validator');

const isValidSignUpData = (data) => {
    const { firstName, lastName, emailId, password } = data;
    console.log("🚀 ~ isValidSignUpData ~ password:", password)
    console.log("🚀 ~ isValidSignUpData ~ emailId:", emailId)
    console.log("🚀 ~ isValidSignUpData ~ lastName:", lastName)
    console.log("🚀 ~ isValidSignUpData ~ firstName:", firstName)

    if (!firstName || !lastName || !emailId || !password) {
        throw new Error('All fields are required');
    }

    if (!firstName) {
        throw new Error('First Name is required');
    }

    if (emailId && !validator.isEmail(emailId)) {
        throw new Error('Email is invalid');
    }

    if (password && !validator.isStrongPassword(password)) {
        throw new Error('Password is not strong enough');
    }
}

module.exports = { isValidSignUpData };