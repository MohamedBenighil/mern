const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModels')

// @desc    Get goals 
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req,res) => {
    const goals = await Goal.find() // later we filter by users
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
        text: req.body.text
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
    //const deletedGoal = await Goal.findByIdAndRemove(req.params.id, req.body)
    //res.status(200).json(deletedGoal)

    await goal.remove()
    res.status(200).json({id: req.params.id})

    
})

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals,
}