const express = require('express')
const productModel = require('../models/product')
const app =express()

app.get('/' ,(req,res) =>{
    res.render('addProduct.hbs')
})

app.post('/add', async (req, res) => {

    if (req.body.id == '') {
        addProduct(req, res)
    } else {
        updateProduct(req, res)
    }
})

function addProduct(req, res) {
    const product = new productModel(req.body)
    try {
        product.save()
        res.render('index', {
        })
    } catch (error) {
        res.status(500).send(error)
    }
}

function updateProduct(req, res) {
    productModel.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.redirect('/list');
        } else {
            console.log(err)
        }
    })

}

app.get('/list', (req, res) => {
    productModel.find({}).then(product => {
        res.render('index', {
            products: product.map(product => product.toJSON())
        })
        // res.send(product)
    })
})
app.get('/listProduct',(req,res) =>{
    productModel.find({}).then(product =>{
        res.send(product)
    })
})

app.get('/listPhone',(req,res) =>{
    productModel.find({typeProduct:"Điện thoại"}).then(product =>{
        res.send(product)
    })
})
app.get('/listLaptop', (req, res) => {
    productModel.find({ typeProduct: "Laptop" }).then(product => {
        res.send(product)
    })
})
app.get('/listPhukien',(req,res) =>{
    productModel.find({typeProduct : "Phụ kiện"}).then(product =>{
        res.send(product)
    })
})


app.get('/edit/:id', (req, res) => {
    productModel.findById(req.params.id, (err, product) => {
        if (!err) {
            res.render('addProduct', {
                product: product.toJSON()
            })
        };
    })
})



app.get('/delete/:id', async (req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.id, req.body)
        if (!product) res.status(404).send("Không tồn tại ")
        else {
            res.redirect('/addProduct/list');
        }
        res.status(200).send()
    } catch (error) {
        res.status(500).send(error)

    }
})




module.exports = app