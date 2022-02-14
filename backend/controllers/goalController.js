const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModels')
const User = require('../models/userModels')

// @desc    Get goals 
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req,res) => {
    const goals = await Goal.find({user: req.user.id}) // we filter by users
    res.status(200).json(goals)
})


// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoals = asyncHandler(async (req,res) => {
    if (!req.body.text){
        res.status(400)
        throw new Error("Please give text field")
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,
    })
    res.status(200).json(goal)
})


// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoals = asyncHandler(async (req,res) => {
    const goal = await Goal.findById(req.params.id )
    if (!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    
    const user = await User.findById(req.user.id)

    // Check user
    if (!user){
        res.status(400)
        throw new Error('User not found')
    }

    // Make sur the logged in user matches the goal user 
    if (user.id !== goal.user.toString()){
        res.status(400)
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true })

    res.status(200).json(updatedGoal)
})


// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoals = asyncHandler(async (req,res) => {
    const goal = await Goal.findById(req.params.id )
    if (!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)

    // Check user
    if (!user){
        res.status(400)
        throw new Error('User not found')
    }

    // Make sur the logged in user matches the goal user 
    if (user.id !== goal.user.toString()){
        console.log(`user.id : ${user.id}******* goal.user: ${goal.user.toString()}`)
        res.status(400)
        throw new Error('User not authorized')
    }

    await goal.remove()
    res.status(200).json({id: req.params.id})

    
})

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals,
}