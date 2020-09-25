const User = require('../models/User');

exports.getUser = async ({...params}) => {
    let user = await User.findOne({...params});
    if(!user) {
        return false;
    }
    return user;
}

exports.createUser = async ({...params}) => {
    let user = new User({...params});
    try {
        user = await user.save();
        return user;
    }
    catch(error) {
        console.log(error);
        throw error;
    }


    // return user;

}