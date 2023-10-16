const{User} = require('../models')
const jwt = require('jsonwebtoken')
const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const createSendToken = (user, statusCode, res) => {

    const token = signToken(user.id)

    const cookieOption = {
        expire: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    res.cookie('jwt', token, cookieOption)

    user.password = undefined

    res.status(statusCode).json({
        status : 'success',
        token,
        data : {
            user
        }

    })
}

module.exports = {

    registerUser : async (req, res) =>{
        try {
            if (req.body.password != req.body.passwordConfirm){
                return res.status(400).json({
                    message:'Fail',
                    error: ['passwords do not match']
                })
            }       
            const newUser = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })

           createSendToken(newUser, 201, res)

        } catch (error) {
            console.log(error)
            return res.status(400).json({
                message: 'validasi error',
                error:error.errors.map(err => err.message)
            })
        }
    },

    loginUser : async (req, res) =>{
        //validasi
        if(!req.body.email||!req.body.password){
            return res.status(400).json({
                status: 'failed',
                message: 'error validasi',
                error: 'please enter your email or password'
            })
        }

        //check email and password sudah ada
        const userData = await User.findOne({where: {email: req.body.email}})

        if(!userData || !(await userData.CorrectPassword(req.body.password, userData.password))) {
            return res.status(400).json({
                status: 'failed',
                message: 'error login',
                error: 'invalid email or password'
            })
        }

        //res token pada login
       createSendToken(userData, 200, res)
    }
}