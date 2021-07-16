const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin-cosmoknight:iamDev1!@cluster0.arra1.mongodb.net/MEd-PediaDB', { useNewUrlParser: true, useUnifiedTopology: true });

const mainContactsSchema = {
    name: String,
    email: String,
    subject: String,
    msg: String,
    date: {},
}
const Contact = mongoose.model('Contact', mainContactsSchema);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get('/', function(req, res) {
    res.render('index');
})
app.post('/', function(req, res) {
    let nDate = new Date();
    let contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        msg: req.body.msg,
        date: nDate,

    })
    contact.save();
    Contact.find({}, function(err, contact) {
        console.log(contact);
    })
    res.redirect("/");
})
let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}


app.listen(port, function() {
    console.log("server started Successfully");
})