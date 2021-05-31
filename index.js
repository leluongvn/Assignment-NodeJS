const port = 3333
const express = require('express')
const mongoose = require('mongoose')
const bodyParser=require('body-parser')
const expressHbs = require('express-handlebars')
const userController = require('./controllers/userControllers')
const productController = require('./controllers/productControllers')
const { urlencoded } = require('express')

const url = "mongodb+srv://demo:Luong1502@cluster0.mrmuu.mongodb.net/demoDatabase?retryWrites=true&w=majority"
const app = express()   
app.use(express.json())
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended:true
}))


mongoose.connect(url,{useUnifiedTopology:true,useNewUrlParser:true})
      
app.use('/register',userController)

app.use('/addProduct',productController)
// app.use('/', productController)
app.use('/index', productController)


app.engine("hbs", expressHbs({ defaultLayout: 'main',extname :'.hbs'}))
app.use(express.static('images'))
app.use(express.static('css'))
app.set("view engine", "hbs")


app.get('/',(req,res) => res.render('signIn'))
app.get('/index', (req, res) => res.render('index'))
// app.get('/sign', (req, res) => res.render('sign'))
// app.get('/signIn', (req, res) => res.render('signIn')) 
app.get('/contact', (req, res) => res.render('contact'))
app.get('/introduction', (req, res) => res.render('introduction'))




// app.get('/list' ,(req,res) =>{
//     res.render('listUser')
// })


app.listen(port, () => console.log(`Example app listening on port port!`))