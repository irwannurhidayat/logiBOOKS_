const{User} = require('../models')
const jwt = require('jsonwebtoken')
const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

exports.registerUser = async (req, res) =>{
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

        const token = signToken(newUser.id)

        return res.status(200).json({
            message: 'User created successfully',
            token,
            data: newUser
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: 'validasi error',
            error:error.errors.map(err => err.message)
        })
    }
}

exports.loginUser = async (req, res) =>{
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
    const token = signToken(userData.id)
    return res.status(200).json({
        status: 'success',
        message: 'login successful',
        token
    })
}