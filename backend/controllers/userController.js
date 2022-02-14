const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asycnHandler = require('express-async-handler')
const User = require('../models/userModels')

// @desc    Register new user
// @route   POST /api/users
// @access  Public

const registerUser= asycnHandler(async (req, res) => {
    const {name,email,password} = req.body

    if (!name || !email  || !password){
        res.status(400)
        throw new Error('Please fill all fields')
    }
    
    //Check if user exists
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

    //res.status(200).json({message: 'User registred'})
})

// @desc    Athenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser= asycnHandler(async (req, res) => {
    const {email, password} = req.body

    if (!email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    const userExists = await User.findOne({email})
    
    if(!userExists){
        res.status(400)
        throw new Error('The user does not exists')
    }

    if ( await bcrypt.compare(password, userExists.password) ){
        res.status(200).json({
            _id: userExists.id,
            name: userExists.name,
            email: userExists.email,
            token: generateToken(userExists.id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid password!')
    }

    //res.status(200).json({message: 'User login'})
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe= asycnHandler( async (req, res) => {
    const {_id, name, email} =  await User.findById(req.user)

    res.status(200).json({
        id: _id,
        name,
        email
    })
    //res.status(200).json({message: 'User data'})
})


// Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d',})
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}