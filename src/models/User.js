const {Schema, model} = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    username: String,
    password: String,
    email: String
})

userSchema.methods.encryptPass = async (password)=>{
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt);
}

module.exports = model('User', userSchema)