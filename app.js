const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const bodyparser=require("body-parser");
const port = 80;
app.engine('pug', require('pug').__express)

//MONGOOSE
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});

//Define Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
  });

//compile
const Contact = mongoose.model('Contact', contactSchema);

//

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())


// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {'title':'hello'}
    res.status(200).render('home.pug', params);
})

app.post('/contact', (req, res)=>{
    var myData= new Contact(req.body);
    myData.save().then(()=>{
        console.log("the data has been saved")
    }).catch(()=>{
        res.status(400).send("Not Saved")
    });
    res.status(200).render('contact.pug');
})

app.get('/contact', (req, res)=>{
    //const params = {'title':'hello'}
    res.status(200).render('contact.pug', params);
})


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
})