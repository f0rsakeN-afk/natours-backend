const mongoose = require('mongoose');
const crypto = require('crypto')
const bcrypt = require('bcryptjs')



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Username is required"],
    },
    photo: {
        type: String
    },
    email: {
        unique: true,
        type: String,
        required: [true, 'An email address is required'],
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'A password is required'],
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'A passwordConfirm is required'],
        validate: {
            validator: function (val) {
                return this.password === val;
            },
            message: 'Password are not the same'
        }
    },
    role: {
        type: String,
        enum: ['user', 'guide', 'lead-guide', 'admin'],
        default: 'user'
    }

})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
})


userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}


const User = mongoose.model('user', userSchema);
module.exports = User;