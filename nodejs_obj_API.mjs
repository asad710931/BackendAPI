import express from 'express'
import cors from 'cors'
import csrf from 'csurf'
import session from 'express-session'

const app = express()

app.use(express.json())
app.use(cors())

const users=[
 {id:1,phone:'+8801919710931',password:'12345'},
 {id:2,phone:'+8801919710932',password:'12346'},
 {id:3,phone:'+8801919710933',password:'12347'}
]

//get all users
app.get('/users',(req,res)=>{
    res.json(users)
})

//get only one 
app.get('/user/:id',(req,res)=>{
  let id=parseInt(req.params.id)
  const user = users.find(user=>user.id == id)
  res.json(user)
})
app.get('/',(req,res)=>{
})

//insert new user 
console.log(users.length+1)
app.post('/post',(req,res)=>{
   console.log(req.body.phone)
   let newUser={id:users.length+1,phone:req.body.phone,password:req.body.password}
   users.push(newUser)
   console.log(newUser.phone)
   res.cookie('username','asad',{ maxAge: 9000000, httpOnly: false})
   req.cookie.username='asad'
   res.json({status:'ok'})
})

//update user
app.put('/put/:id',(req,res)=>{
  let id=parseInt(req.params.id)
  const user=users.find(user=>user.id == id)
  user.phone=req.body.phone
  user.password=req.body.password
  res.json({status:'user updated'})
})

//delete user
app.delete('/delete/:id',(req,res)=>{
  id=parseInt(req.params.id)
  const user = users.find(user=>{user.id == id})
  const index=users.indexOf(user)
  users.splice(index,1)
  res.json({status:'user deleted'})
  res.status(200).json({status:'user Deleted'})
})

const port =process.env.PORT|8080 
app.listen(port,(err)=>console.log('Server running at port:',port))





