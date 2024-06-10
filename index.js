const express = require('express')
const cors = require('cors')
const bodyParser =require('body-parser')
const {MongoClient} = require('mongodb')
const ObjectId = require('mongodb').ObjectId

const server=express()
server.use(cors())
server.use(bodyParser.json())

const port = 6500
server.listen(port,()=>{
    console.log('Server started listening on port '+port)
})

//mongodb://localhost:27017
const connection = new MongoClient('mongodb://localhost:27017')
connection.connect((err,result)=>{
    if(err){
        console.error('Error:'+err)
    }else{
        console.log('Database connected !!')
    }
})

server.post('/api/insert',async (req,res)=>{
    try{
        const postData=req.body
        const database = connection.db('batch2')
        const collection = database.collection('users')
        const result = await collection.insertOne(postData)
        res.json({status:true,message:'Student data created successfully !!'})
    }
    catch(err){
        res.json({status:false,message:'Internal server error'})        
    }
})

server.get('/api/getStudents',async(req,res)=>{
    try{
        const database = connection.db('batch2')
        const collection = database.collection('users')
        const result = await collection.find({}).toArray()
        res.json({status:true,message:result})
    }
    catch(err){
        res.json({status:false,message:'Internal server error'})        
    }
})

server.put('/api/update/:id',async(req,res)=>{
    try{
        const database = connection.db('batch2')
        const collection = database.collection('users')
        const postData = req.body
        const objectId = new ObjectId(req.params.id)
        const result = await collection.updateOne({_id:objectId},{$set:postData})
        if(result){
            res.json({status:true,message:'Student data updated successfully !!'})            
        }else{
            res.json({status:false,message:'Internal server error'})            
        }
    }
    catch(err){
        res.json({status:false,message:'Internal server error'})          
    }
})