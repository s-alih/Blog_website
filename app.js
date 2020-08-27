const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const { result } = require('lodash')


//creating a app
const app = express()


const dbURI = 'mongodb+srv://Salih:salih@786@blog.aewl8.mongodb.net/Sali_blog?retryWrites=true&w=majority'

mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true }).then(app.listen(3000)).catch((error)=>console.log(error))

app.set('view engine','ejs')




app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

app.use(morgan('tiny'))


//get all blogs 




//making a get request
app.get('/',(req,res)=>{
    res.redirect('/blogs')
})
app.get('/about',(req,res)=>{
   res.render('about',{title:'about'})
})
// blog  routes
app.get('/blogs',(req,res)=>{
    Blog.find().sort({createdAt:-1})
     .then((result)=>res.render('index',{title:'all blogs',blogs:result}))
     .catch((error)=>console.log(error))
    
})
app.post('/blogs',(req,res)=>{
  const blog = new Blog(req.body)
  blog.save()
   .then((result)=>res.redirect('/blogs'))
   .catch((error)=>console.log(error))
})

app.get('/blogs/create', (req,res)=>{
    res.render('create',{title:'create blog'})
})

app.get('/blogs/:id',(req,res)=>{
    const id = req.params.id
    
    Blog.findById(id)
     .then((result)=>res.render('details',{title:'details',blog:result}))
     .catch((error)=>console.log(error))
})

app.delete('/blogs/:id',(req,res)=>{
    const id = req.params.id
    Blog.findByIdAndDelete(id)
     .then((result)=>res.json({redirect:'/blogs'}))
     .catch(err=>console.log(err))
})

app.use((req,res)=>{
    res.status(404).render('404',{title:'404'})
})