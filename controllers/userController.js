const {successResponse, errorResponse, notFoundResponse} = require('../helpers');
const bcrypt = require('bcryptjs');
const UserRepository = require('../repository/userRepository');


exports.getUser = async(req, res, next) => {
    return successResponse(
        res, 'success', 'yes it works'
    )
}

exports.postUser = async(req, res, next) => {
    let {name, email, password} = req.body;
    console.log({name, email, password});
    // process.exit();
    let hashedPassword = await makeHash(password);
   try{
    const user = await UserRepository.createUser({
        name,
        email,
        password: hashedPassword
    });

    return successResponse(res, 'User created', user)
   }
   catch(error) {
       console.log('an error occurred');
       return errorResponse(res, error.message, {name, email, password})
   }
}


const makeHash = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword
}