
//const uri = "mongodb+srv://tamasalex234:zdo1jvW0uGLvFrQY@cluster0.gr6cglv.mongodb.net/?retryWrites=true&w=majority";

const express = require('express');
const router = express.Router();
const Todo = require('../model/schema.cjs');

//get all

router.get('/', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
})


router.post('/new', async (req,res) =>{
    const newTodo = new Todo(
        req.body
    );
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
})


//getter podla id
router.get('/get/:id', async (req,res) =>{
    const t = await Todo.findById({_id : req.params.id});
    res.json(t);
})


//delete podla id
router.delete('/delete/:id', async (req,res) =>{
    const tDelete = await Todo.findByIdAndDelete({_id : req.params.id});
    res.json(tDelete);
})

//update podla id
router.put('/update/:id', async (req,res) =>{
    const tUpdate = await Todo.updateOne(
        {
            lekcia : "druha",
            obrazok: "test2"
        }
    );
    res.json(tUpdate);
})




module.exports = router