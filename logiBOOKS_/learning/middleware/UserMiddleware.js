const jwt = require('jsonwebtoken');
const {User, Role} = require('../models');
module.exports = {

    authMiddleware : async (req, res, next) => {
    //jika ada/tidak token dalam header
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }

    if(!token) {
        return next(res.status(401).json({
            status: 401,
            message: "Token tidak ditemukan!"
        }))
    }

    //verifikasi token
    let decoded;
    try {
        decoded = await jwt.verify(token, process.env.JWT_SECRET);
    } catch(err) {
        return next( res.status(401).json({
            error : 401,
            message : "Token invalid"
        }))
    }   

    //ambil data user berdasarkan decoded
    const currentUser = await User.findByPk(decoded.id)
    if(!currentUser){
        return next (res.status(401).json({
            status : 401,
            message : "User not found(token sudah tidak dapat digunakan)"
        }))
    }

    req.user = currentUser;

    next()
},

    permissionUser : (...roles) => {
        return async (req, res, next) => {
            const rolesData = await Role.findByPk(req.user.role_id)

            const roleName = rolesData.name

            if(!roles.includes(roleName)){
                return next (res.status(403).json({
                    error : 403,
                    message : 'Invalid role name'
                }))
            }
            
            next()
        }
    }

}