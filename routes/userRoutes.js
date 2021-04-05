const express = require('express')
const userModel = require('../models/user')
const app = express()

app.post('/register', async(req,res) =>{

    const user = new userModel(req.body)
    try {
        await user.save()
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = app