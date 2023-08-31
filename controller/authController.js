const userModel = require("../model/userSchema");
const emailValidator = require('email-validator');
const bcrpt = require('bcrypt');


const signup = async (req,res,next) => {
    const { name, email , password, confirmpassword } = req.body;
        console.log(name,email,password,);

        if (!name || !email || !password || !confirmpassword){
            return res.status(400).json({
                success : false,
                message : 'Every field should be fill !'
            })
        }

        const emailValid = emailValidator.validate(email);

        if (!emailValid){
            return res.status(400).json({
                success : false,
                message : 'Please Enter Correct Email id'
            })
        }

        if (password !== confirmpassword){
            return res.status(400).json({
                success : false,
                message : 'password and Confirm password will be same !'
            })
        }

      try {

        const userInfo = userModel(req.body);

        const result = await userInfo.save();

        return res.status(200).json({
            success : true,
            data : result
        })

      } catch (e) {
        if (e.code === 11000){
            return res.status(400).json({
                success : false,
                message : 'Account already exist with provided email id'
            })
        }
        return res.status(400).json({
            success : false,
            message : e.message
        })

      }
}

const signin = async (req,res) => {
    const {email,password } = req.body;

    if (!email || !password ){
        return res.status(400).json({
            success : false,
            message : 'Email id and password required for login'
        })
    }

    try {
        
        const user =  await userModel.findOne({
           email
        }).select('+password');
   
        if (!user || ! (await bcrpt.compare(password,user.password))) {
           return res.status(400).json({
               success : false,
               message : 'Invalid Credentials'
           })
        }
   
        const token = user.jwtToken();
        user.password = undefined;
   
        const cookieOption = {
           maxAge : 24*60*60*1000,
           httpOnly : true
        }
   
        res.cookie("token",token,cookieOption);
   
        res.status(200).json({
           success : true,
           data : user
        })
   
     } catch (e) {
        res.status(400).json({
            success : false,
            message : e.message
        })
     }

}

const getUser = async(req,res) => {
    const userId = req.user.id;


    try {
        
        
        const user = await userModel.findById(userId);
        return res.status(200).json({
            success : true,
            data : user
        })

    } catch (e) {
        console.log(e);
        return res.status(400).json({
            success : false,
            message : e.message
        })
    }
}

const logout = (req,res) => {
    try {
        const cookieOption = {
            expires : new Date(),
            httpOnly : true
        }
        res.cookie("token",null,cookieOption);

        res.status(200).json({
            success : true,
            message : 'Logout Successfully'
        })
        
    } catch (e) {
        return res.status(400).json({
            success : false,
            message : e.message
        })
    }
}


module.exports = {
    signup,
    signin,
    getUser,
    logout
}