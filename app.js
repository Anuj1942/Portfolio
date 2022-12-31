const express = require("express");
const path = require("path");
const app = express();
var mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://Anuj1942:anuj123@ac-pprmmuo-shard-00-00.ougzmr6.mongodb.net:27017,ac-pprmmuo-shard-00-01.ougzmr6.mongodb.net:27017,ac-pprmmuo-shard-00-02.ougzmr6.mongodb.net:27017/?ssl=true&replicaSet=atlas-y9vn5f-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true });
const port = 1006;

var personalSchema = new mongoose.Schema({
    name: String,
    email: String,
    text: String,
    about: String
});

var personal = mongoose.model('personal', personalSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); // For serving static files
app.use(express.urlencoded())

// HTML SPECIFIC STUFF
app.set('view engine', 'html'); // Set the tamplet engine as pug
app.set('views', path.join(__dirname, 'views')); // Set the views directory

// ENDPOINS
app.get('/', (req, res) => {
    const params = {}
    res.sendFile(__dirname + '/index.html');
})



//MONGO FOR FORM
app.post('/', (req, res) => {
    var myData = new personal(req.body);
    myData.save().then(() => {
        res.send("Submitted Successfully")
    }).catch(() => {
        res.status(400).send("This item has not been send to the database")
    });
    // res.render('home.pug');
})

// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`)
})