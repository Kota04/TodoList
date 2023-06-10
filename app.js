const express = require("express");         /* importing the express to start and so */ 
const bodyparser = require("body-parser");

var app = express();
app.set("view engine","ejs");       /* it is used to avoid the repition and make the simplecity ejs */
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));  /* it shows that all static files are in the public folder*/

const mongoose = require("mongoose");  /* module for connecting the js and mongodb*/

/* for establishing the connection and 27010 is the default port name of db is todolist */
mongoose.connect('mongodb://127.0.0.1:27017/todolist'); 

const trySchema =new mongoose.Schema({
    name:String
});                                         /* schema for the collection task in the database*/

const items = mongoose.model("task",trySchema);

app.get('/',(req,res)=>{
    items.find()
  .then((data) => {
    res.render("list",{ejes:data});
  })
  .catch((err) => {
    console.log(err);
  });

});

app.post('/',(req,res)=>{
    const assign = req.body.inpuut;
    const todo = new items({
        name:assign
    })
    todo.save();
    res.redirect('/');
});

app.post('/delete',(req,res)=>{
    const checker = req.body.chechboox;
    items.findByIdAndRemove(checker).then(()=>
    {
        console.log("A task has been done");
    }).catch((err)=>
    {
        console.log(err);
        
    });
    res.redirect('/');
});

app.listen(3000,()=>{
    console.log("server started");
})
