// @desc    Register new user
// @route   POST /api/users
// @access  Public

const registerUser= (req, res) => {
    res.status(200).json({message: 'User registred'})
}

// @desc    Athenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser= (req, res) => {
    res.status(200).json({message: 'User login'})
}

// @desc    Get user data
// @route   GET /api/users/me
// @access  Public
const getMe= (req, res) => {
    res.status(200).json({message: 'User data'})
}




module.exports = {
    registerUser,
    loginUser,
    getMe
}