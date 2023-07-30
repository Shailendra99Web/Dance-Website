const express=require('express');
const path=require('path');
const app=express();
const mongoose = require('mongoose');
const bodyparser= require('body-parser');//Didn't used yet
mongoose.connect("mongodb://localhost/contactDance", { useNewUrlParser: true, useUnifiedTopology: true });
// const hostname="999.9.9.1";
const port=8000;

// Define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

var Contact= mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); // For serving STATIC FILES
app.use(express.urlencoded());// Help to bring app data to express

// PUG SPECIFIC STUFF
app.set('view engine', 'pug'); // Set the templete engine as pug
app.set('views', path.join(__dirname, "views")); // Set the view directory

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {};
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    const params = {};
    res.status(200).render('contact.pug', params);
})

//Contact Post ENDPOINT 
app.post('/contact', (req, res)=>{
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send('This item has been saved to the database');//TO HANDLE PROMISE which is sended by .save() method
    }).catch(()=>{
        res.status(400).send('Item was not saved to the database');//CATCH TO HANDLE ERRORS
    })
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`the application is started successfully on port ${port}`);
})