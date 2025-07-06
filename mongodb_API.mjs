
//API with mongodb 

import express from 'express'
import {MongoClient} from 'mongodb'
const app = express()

//connection with database 
let url='mongodb://localhost:27017/'
const client=new MongoClient(url)
//Create/insert 
const insertOne = async()=>{
    try {
        await client.connect();
        console.log('db connected successfully...')
        const db = client.db('admin')
        const collection= db.collection('user')
        await collection.insertOne([])
        console.log('db connected successfully...')
        
    } catch (error) {
        console.log(error)
    }finally{
        await client.close()
    }
} 
//Read All Data from database
const readUsersData = async()=>{
    try {
        await client.connect();
        console.log('db connected successfully...')
        const db = client.db('admin')
        const collection= db.collection('user')
        const datalist=await collection.find({}).toArray()
        return datalist
    } catch (error) {
         console.log(error)       
    }finally{
        await client.close()
    }
} 
//Read All Data from database
const readOnebyid=async(id)=>{
    try {
        await client.connect()
        const collection = client.db('admin').collection('user')
        const result=await collection.findOne({id})
        return result
    } catch (error) {
        console.log(error)
    }finally{
        await client.close()
    }
}
//Update one raw one entity with selected by id
const updateOne=async(id,maidenName)=>{
    try {
        await client.connect()
        const collection = client.db('admin').collection('user')
        const result=await collection.updateOne({id:id},{$set:{maidenName:maidenName}})
        return `${id} has been updated`
    } catch (error) {
        console.log(error) 
    }finally{
         await client.close()
    }
}
//Delete one raw selected by id
const deleteOne=async(id)=>{
    try {
        await client.connect()
        const collection = client.db('admin').collection('user')
        const result=await collection.deleteOne({id})
        return `${id} has been deteted`
    } catch (error) {
        console.log(error)
    }finally{
        await client.close()
    }
}


app.get('/',async(req,res)=>{
    res.send('API with mongodb....')
})

app.get('/user',async(req,res)=>{
    const result = await readUsersData()
    console.log(req.session.id)
    res.send(result)
})

app.get('/user/:id',async(req,res)=>{
    let id = parseInt(req.params.id)
    const result = await readOnebyid(id)
    res.send(result)
})

app.get('/update/:id/:mname',async(req,res)=>{
    let id = parseInt(req.params.id)
    const result = await updateOne(id,req.params.mname)
    res.send(result)
})

app.get('/delete/:id',async(req,res)=>{
    let id = parseInt(req.params.id)
    const result = await deleteOne(id)
    res.send(result)
})


// Server running...
let port = process.env.PORT||3030
app.listen(port,()=>{
    console.log('Server running at Port :',port)
})
