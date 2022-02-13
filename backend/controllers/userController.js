// @desc    Register new user
// @route   POST /api/users
// @access  Public

const registerUser= (req, res) => {
    res.status(200).json({message: 'User registred'})
}





module.exports = {
    registerUser,
}