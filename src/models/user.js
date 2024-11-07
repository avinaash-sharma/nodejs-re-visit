const mongoose = require('mongoose');
const validate = require('validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            trim: true

        },
        emailId: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            validate(value) {
                if (!validate.isEmail(value)) {
                    throw new Error('Email is invalid');
                }
            }
        },
        password: {
            type: String,
            required: true,
            validate(value) {
                if (!validate.isStrongPassword(value)) {
                    throw new Error('Password is not Strong enough');
                }
            }
        },
        age: {
            type: Number,
            max: 100,
            min: 18
        },
        gender: {
            type: String,
            validate(value) {
                if (value !== 'male' && value !== 'female' && value !== 'other') {
                    throw new Error('Gender should be either male or female or other');
                }
            }
        },
        photoUrl: {
            type: String,
            validate(value) {
                if (!validate.isURL(value)) {
                    throw new Error('Provide correct URL');
                }
            }
        },
        about: {
            type: String,
            default: "Using WhatsApp"
        },
        skills: {
            type: Array,
            required: false
        }

    },
    { timestamps: true }
);

userSchema.methods.getJWT = async function () {
    const user = this;

    const token = await jwt.sign({ _id: user._id }, "dev@avinash@developer", {
        expiresIn: "7d",
    });

    return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(
        passwordInputByUser,
        passwordHash
    );

    return isPasswordValid;
};

const User = mongoose.model('User', userSchema);

module.exports = User;