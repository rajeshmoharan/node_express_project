const mongoose = require('mongoose');
const {Schema} = mongoose;
const JWT = require('jsonwebtoken');
const bcrpt = require('bcrypt');

const userSchema = new Schema ({
        name : {
            type : String,
            required : [true, 'Name required'],
            trim : true
        },
        email : {
            type : String,
            required : [true, 'Email required'],
            unique : true,
            trim : true,
            lowercase : true
        },
        password : {
            type : String,
            select : false
        },
        forgotPasswordToken : {
            type : String
        },
        forgotPasswordExpiryDate : {
            type : Date
        }

}
,{
    timestamps : true
})

userSchema.pre('save', async function (next){
        if (!this.isModified('password')){
            return next();
        }
        this.password = await bcrpt.hash(this.password,10);
        return next();
})

userSchema.methods = {
    jwtToken  () {
        return JWT.sign(
                {id : this._id , email : this.email },
                process.env.SECRET,
                {expiresIn : '24h'}
            )
    }
}



const userModel = mongoose.model('user',userSchema);

module.exports = userModel;