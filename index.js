const express= require('express')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT || 3000
const Expense = require('./models/expense');
app.use(express.json())
mongoose.connect('mongodb+srv://manju_16:16-Dec-03@mern.an1dulf.mongodb.net/newDb?retryWrites=true&w=majority',{
    useUnifiedTopology:true
})
app.get('/expenses',async(req,res)=>{
    const expenses = await Expense.find();
    res.send(expenses)
})
app.get('/expenses/:id',async(req,res)=>{
    try{
    const id = req.params.id
    const result = await Expense.findById(id);
    res.send(result)
    }catch(err){
        res.send(err)                  //always use try catch blocks
    }
    
})
app.delete('/expenses/:id',async(req,res)=>{
    try{
    const id = req.params.id
    const del = await Expense.findByIdAndDelete(id);
    res.send(del)
    }catch(err){
        res.send(err)                  //always use try catch blocks
    }
    
})


app.post('/expense',async(req,res)=>{
    try{
    console.log(req.body)
    const newExpense = req.body
    await Expense.create(newExpense)
    res.send("Hello world")
    }catch(err){
        res.send(err)
    }
})

app.put('/expense/:id',async(req,res)=>{
    try{
        const id = req.params.id
        const upd = await Expense.findByIdAndUpdate(id,{$set:req.body},{
            new:true
        })
        res.send(upd)
    }catch(err){
        res.send(err)
    }
})
app.listen(port,()=>{
    console.log(`Listening to the port ${port}`)
})

//for one req one res will send
//no two headers are defined for sending
//for eq: res.send("<h1>ghjgfkdhfui</h1>")
//        res.send("<h1>hjfjgfhfkshfk</h1>")