import express from "express"
import path from "path"
import { fileURLToPath } from "url";

const app = express()
app.use(express.json())



app.set('view engine',"ejs");

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}))


let todos = []

//home page
app.get("/",(req,res)=>{
    res.render("index",{todos})

})

app.get("/add",(req,res)=>{
    res.render("add");
})

//add todo
app.post("/add",(req,res)=>{
    const newTodo = req.body.newTodo

    if(newTodo){
        todos.push(newTodo)
    }
    res.redirect("/")
})

//clear

app.post("/clear",(req,res)=>{
    todos=[]
    res.redirect("/")
})

//delete

app.get("/delete/:index", (req, res) => {
    const index = parseInt(req.params.index);

    if (!isNaN(index) && index >= 0 && index < todos.length) {
        todos.splice(index, 1);
    }

    res.redirect("/");
});

//edit

    app.get("/edit/:index", (req, res) => {
    const index = parseInt(req.params.index);
    if (!isNaN(index) && index >= 0 && index < todos.length) {
        const todo = todos[index];
        res.render("edit", { todo, index });
    } else {
        res.redirect("/");
    }
});


  app.post("/edit/:index", (req, res) => {
    const index = parseInt(req.params.index);
    const updatedTodo = req.body.updatedTodo;

    if (
        !isNaN(index) &&
        index >= 0 &&
        index < todos.length &&
        updatedTodo &&
        updatedTodo.trim()
    ) {
        todos[index] = updatedTodo.trim();
    }

    res.redirect("/");
});



//server port
const port = 5000

app.listen(port,()=>{
    console.log(`server running on ${port}`)
})