const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,

        },
        emailId: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        },
        age: {
            type: Number
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
            type: String
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

const User = mongoose.model('User', userSchema);

module.exports = User;