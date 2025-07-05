
import express from 'express'
import mysql from 'mysql'

const app = express();





app.use(express.json())

// Database intel
const db = mysql.createConnection({
    host     : "fdb33.atspace.me",
    user     : "4119131_kp",
    password : "**********",
    database : "4119131_kp",
    port     : 3306
})

//C onnecting to Database
db.connect((err)=>{
    if (err) throw err
    console.log('Connected to database')
})

//creating database on node
app.get('/createdb',function(req,res){
    let sql="CREATE DATABASE nodedb";
    db.query(sql,(err,result)=>{
       if (err) throw err;
       console.log(result);
       res.end('DB Builded');
    })
})
//creating table
app.get('/createtable',(req,res)=>{
    let sql="CREATE TABLE post(id int AUTO_INCREMENT,title VARCHAR(47),body VARCHAR(277), PRIMARY KEY (id))";
    db.query(sql,(err,result)=>{
        if (err) throw err;
       console.log(result);
       res.end('Table Builded');
    })
});
//insert data to database
app.get('insert/:title/:body',(req,res)=>{
    let sql=`INSERT INTO post (title,body) VALUES(${req.params.title,req.params.body})`
    db.query(sql,(err,result)=>{
        if(err) throw err
        console,log(result)
        console.log('data inserted into database')
        res.send(result|'data inserted')
    })
})
//insert data to database by post method when client send json data
app.post('insert/',(req,res)=>{
    let sql=`INSERT INTO post (title,body) VALUES(${req.body.title,req.body.body})`
    db.query(sql,(err,result)=>{
        if(err) throw err
        console,log(result)
        console.log('data inserted into database')
        res.send(result|'data inserted')
    })
})
//Show all post 
app.get('post/',(req,res)=>{
    let sql=`SELECT * FROM post`
    db.query(sql,(err,result)=>{
        if(err) throw err
        console,log(result)
        res.send(result)
    })
})
// Show One post by id 
app.get('post/:id',(req,res)=>{
    let id = parseInt(req.params.id)
    let sql=`SELECT * FROM post WHERE id=${id}`
    db.query(sql,(err,result)=>{
        if(err) throw err
        console,log(result)
        res.send(result)
    })
})
// Update title by id 
app.get('update/:id/:title',(req,res)=>{
    let id = parseInt(id)
    let sql=`UPDATE post SET title=${req.params.title} WHERE id=${id}`
    db.query(sql,(err,result)=>{
        if(err) throw err
        console,log('Data updated')
        res.send(result|'updated')
    })
})
//Delete one by id
app.get('delete/:id',(req,res)=>{
    let id = parseInt(id)
    let sql=`DELETE FROM post WHERE id=${id}`
    db.query(sql,(err,result)=>{
        if(err) throw err
        console,log('Data Deleted')
        res.send(result|'Deleted')
    })
})


//Starting Server 
const PORT=process.env.PORT || 3306;
app.listen(PORT,()=>{console.log('Server running at port 8080');});