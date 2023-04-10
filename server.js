// console.log("hello from node.js!");
// const name = "suravi";
// console.log(name);

// const json2xls = require('json2xls');
// const fs = require("fs");

// const persons = [
//   {name: "Suravi", age: "20"},
//   {name: "Alex", age: "20"}
// ];

// const xls = json2xls(persons);

// fs.writeFileSync('data.xlsx', xls, 'binary');

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(express.urlencoded({extended: false}));

const connectionUrl = "mongodb+srv://jamuntech:Jamuntech123@cluster0.pll1wtj.mongodb.net/todo-app?retryWrites=true&w=majority";

mongoose.connect(connectionUrl);

const Todo = mongoose.model("todos", {
  name: String,
});

app.set("view engine", "ejs");

app.get('/', async (req, res) => {
  const result = await Todo.find();
    res.render("todos", {todos: result});
});

app.post("/todos", async (req, res) => {
  await Todo.create({name: req.body.todo});
  const result = await Todo.find()
  res.render("todos", {todos: result});
  });


app.post("/todos/delete/:id", async (req, res) => {
  await Todo.deleteOne({_id: req.params.id});
  const result = await Todo.find()
  res.render("todos", {todos: result});
    });
  // Todo.deleteOne({
  //   _id: "642cfa8fe646af9b569d4cb8"
  // })

//get and post:

// app.get('/test', (req, res) => {
//   res.send("add button clicked")
// })
// app.post('/test', (req,res) => {
//   res.send("hello from post test");
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
