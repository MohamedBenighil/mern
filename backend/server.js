const express = require('express')
const dotenv = require('dotenv').config()
const port =  process.env.PORT || 5000

const app = express()



app.get('/api/goals', (req,res) => {
    res.status(200).json({message: "Hello benighil"})
})

app.listen(port, () => console.log(`server started on port ${port}`))