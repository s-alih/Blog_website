const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRouter = require('./routers/blogRoutes')
const { result } = require('lodash')

//creating a app
const app = express()


const dbURI = 'mongodb+srv://Salih:salih@786@blog.aewl8.mongodb.net/Sali_blog?retryWrites=true&w=majority'

mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true }).then(app.listen(3000)).catch((error)=>console.log(error))

app.set('view engine','ejs')




app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

app.use(morgan('tiny'))







//making a get request
app.get('/',(req,res)=>{
    res.redirect('/blogs')
})
app.get('/about',(req,res)=>{
   res.render('about',{title:'about'})
})
// blog  routes
app.use('/blogs',blogRouter)


app.use((req,res)=>{
    res.status(404).render('404',{title:'404'})
})