const express = require('express')


//creating a app
const app = express()

app.set('view engine','ejs')


app.listen(3000)

//making a get request
app.get('/',(req,res)=>{
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      ];
   res.render('index',{title:'Home',blogs})
})
app.get('/about',(req,res)=>{
   res.render('about',{title:'about'})
})
app.get('/about-us',(req,res)=>{
    res.redirect('./about')
})
app.get('/blogs/create', (req,res)=>{
    res.render('create',{title:'create blog'})
})

app.use((req,res)=>{
    res.status(404).render('404',{title:'404'})
})