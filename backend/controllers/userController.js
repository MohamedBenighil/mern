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
            email: user.email
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
            email: userExists.email
        })
    } else {
        res.status(400)
        throw new Error('Invalid password!')
    }

    //res.status(200).json({message: 'User login'})
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Public
const getMe= asycnHandler( async (req, res) => {
    res.status(200).json({message: 'User data'})
})



module.exports = {
    registerUser,
    loginUser,
    getMe
}