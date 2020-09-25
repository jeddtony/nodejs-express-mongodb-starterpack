const jwt = require('jsonwebtoken');
const router = require('../routes/userRoute');
const UserRepository = require('../repository/userRepository')
const {successResponse, errorResponse, notFoundResponse} = require('../helpers')
const bcrypt = require('bcryptjs')

exports.postLogin = async (req, res) => {
    let {email, password} = req.body
    let user = await UserRepository.getUser({email: email});
    if(!user) {
        return errorResponse(res, 'Email or password is wrong',
        {email, password})
    }
    let validPass = await comparePassword(password, user.password);
    
    if(!validPass) {
        return errorResponse(res, 'Email or password is wrong',
        {email, password})
    }

    // Generate token
    const token = jwt.sign({ _id: user._id, 
        name: user.name, 
        email: user.email }, 
        process.env.JWT_TOKEN_SECRET, { expiresIn: '3h' });

        // console.log(token);
        // Implement a login count later
    res.header('auth-token', token);
    return successResponse(res, 'Login Successful', 
    {'auth-token': token, user}
    )
}



const comparePassword = async (password, hashedPassword) => {
    const validPass = await bcrypt.compare(password, hashedPassword);
    return validPass
}