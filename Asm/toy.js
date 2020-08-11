const express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://sontito2609:sontito2609@cluster0.2gs37.mongodb.net/test";

router.get('/', async (req,res)=>{
    let client = await MongoClient.connect(url);
    let dbo = client.db("Store");
    let result = await dbo.collection("Product").find({}).toArray();
    res.render('allProduct', {toy : result});
})
// Add a new toy
router.get('/add', (req,res) => {
    res.render('addToy');
})
router.post('/add', async (req,res)=> {
    let inputName = req.body.toyName;
    let inputCategory = req.body.toyCategory;
    let inputBrand = req.body.toyBrand;
    let inputPrice = req.body.toyPrice;

    let newToy = { name : inputName, category : inputCategory, brand : inputBrand, price : inputPrice};
    let client = await MongoClient.connect(url);
    let dbo = client.db("Store");
    await dbo.collection("Product").insertOne(newToy);
    
    let result = await dbo.collection("Product").find({}).toArray();
    res.render('allProduct', { toy: result });
})
// Delete a toy
router.get("/delete", async (req,res) => {
    let id = req.query.id;
    var ObjectID = require('mongodb').ObjectID;
    let client = await MongoClient.connect(url);
    let dbo = client.db("Store");
    await dbo.collection("Product").deleteOne({_id:ObjectID(id)});

    let result = await dbo.collection("Product").find({}).toArray();
    res.render('allProduct', { toy: result });
})
// Search a toy
router.get('/search', (req, res) => {
    res.render('searchToy');
})
router.post('/search', async (req,res) =>{
    let search = req.body.nameSearch;
    let client = await MongoClient.connect(url);
    let dbo = client.db("Store");
    let result = await dbo.collection("Product").find({name: search}).toArray();
    res.render('allProduct', { toy : result }); 
})
// Edit a toy 
router.get('/edit', async (req, res) => {
    let id = req.query.id;
    var ObjectID = require('mongodb').ObjectID;

    let client = await MongoClient.connect(url);
    let dbo = client.db("Store");
    let result = await dbo.collection("Product").findOne({ _id: ObjectID(id) });
    res.render('editToy', { toy: result });
})
router.post('/doEdit', async (req, res) => {
    let id = req.body.id;
    let inputName = req.body.toyName;
    let inputCategory = req.body.toyCategory;
    let inputBrand = req.body.toyBrand;
    let inputPrice = req.body.toyPrice;

    let newInfo = { $set: { name : inputName, category : inputCategory, brand : inputBrand, price : inputPrice } };
    var ObjectID = require('mongodb').ObjectID;
    let client = await MongoClient.connect(url);
    let dbo = client.db("Store");
    await dbo.collection("Product").updateOne({_id:ObjectID(id)}, newInfo);
    res.redirect("/");
})
module.exports = router;
