const { json } = require('body-parser')
const express = require('express')
const userModel = require('../models/user')
const app = express()


app.get('/',(req,res)=>{
    res.render('register.hbs',{
        viewTitle:"Thêm người dùng"
    })
})


//
app.get('/login', async (req, res) => {
    res.render('signIn')


    console.log(user);
})

app.post('/add', async (req, res) => {

    if(req.body.id ==''){
        addUser(req, res)
    }else{
        updateUser(req, res)
    }
})


function addUser(req,res){
    const user = new userModel(req.body)
    try {
        user.save()
        res.render('register', {
            viewTitle: "Thêm người dùng"
        })
    } catch (error) {
        res.status(500).send(error)
    }
     
}

function updateUser(req,res){
    userModel.findOneAndUpdate({_id:req.body.id },req.body,{new:true}, (err, doc) => {
        if (!err) {
            res.redirect('/register/list');
        } else {
            console.log(err)
        }
    })
}

app.get('/list',(req,res) =>{

    userModel.find({}).then(user =>{
        res.render('listUser',{
            viewTitle: "Cập nhật người dùng",
            users : user.map(user => user.toJSON())
        })
        

        // res.send(user)
    })
})

app.get('/edit/:id',(req,res)=>{
    userModel.findById(req.params.id,(err,user) =>{
        if(!err){
            res.render('register',{
                viewTitle:"Cập nhật người dùng",
                user : user.toJSON()
            })
        };
    })
})


app.get('/delete/:id', async (req, res) => {


    try {
        const user = await userModel.findByIdAndDelete(req.params.id,req.body)
        if(!user)res.status(404).send("Không tồn tại ")
        else{
            res.redirect('/register/list');
        }
        res.status(200).send()
    } catch (error) {
        res.status(500).send(error)
    }
})
module.exports = app