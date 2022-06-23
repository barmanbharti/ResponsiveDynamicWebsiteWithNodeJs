const express = require('express');
const app = express();
const path = require('path');
//const bodyParser = require('body-parser');
require("./db/conn");
const User = require("./models/usermessage");
const hbs = require('hbs');
const port = process.env.PORT || 8000;

const StaticPath = path.join(__dirname,'../public');
const viewsspath = path.join(__dirname,'../templates/views');
const partialspath = path.join(__dirname,'../templates/partials');


 app.use(express.static(StaticPath))

app.use('/css', express.static(path.join(__dirname,'../node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname,'../node_modules/bootstrap/dist/js')))
app.use('/jq', express.static(path.join(__dirname,'../node_modules/jquery/dist')))

app.use(express.urlencoded({extended:false}))
// app.use(express.json())
app.set('view engine','hbs');
app.set('views',viewsspath);
hbs.registerPartials(partialspath)

// app.use(express.urlencoded({extended:false}));
app.post("/contact", async(req,res) => {
    try{
         //res.send(req.body)
        const userData = new User (req.body);
        console.log(userData)
        await userData.save();
        res.status(201).render("index")
    } catch (error){
        res.status(500).send(error);
    }
    
})

app.get("/",(req,res) => {
    res.render("index")
})

app.listen(port, () => {
    console.log('server is listening to the port', port);
})