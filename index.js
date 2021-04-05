const port = 3000
const express = require('express')
const mongoose = require('mongoose')
const bodyParser=require('body-parser')
const expressHbs = require('express-handlebars')

// const userRoutes =require('./routes/userRoutes')
const userController = require('./controllers/userControllers')
const { urlencoded } = require('express')
const url = "mongodb+srv://demo:Luong1502@cluster0.mrmuu.mongodb.net/demoDatabase?retryWrites=true&w=majority"
const app = express()   
app.use(bodyParser.json())

app.use(bodyParser,urlencoded)
app.use(express.json())



mongoose.connect(url,{useUnifiedTopology:true,useNewUrlParser:true})

// app.use(userRoutes)

app.use('/register',userController)

app.engine("hbs", expressHbs({ defaultLayout: 'main',extname :'.hbs'}))
app.use(express.static('images'))
app.use(express.static('css'))
app.set("view engine", "hbs")

app.get('/index', (req, res) => res.render('index'))
app.get('/sign', (req, res) => res.render('sign'))
app.get('/register', (req, res) => res.render('register'))
app.get('/signIn', (req, res) => res.render('signIn'))
app.get('/contact', (req, res) => res.render('contact'))
app.get('/addProduct', (req, res) => res.render('addProduct'))
app.get('/introduction', (req, res) => res.render('introduction'))


app.listen(port, () => console.log(`Example app listening on port port!`))