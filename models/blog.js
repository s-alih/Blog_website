const mongoose = require('mongoose')

const shema = mongoose.Schema
const blogSchema = shema({
  title:{
      type:String,
      require:true
  },
  snippet:{
      type:String,
      require: true
  },
  body:{
      type:String,
      require:true
  }
},{timestamp:true})

const Blog = mongoose.model('Blog',blogSchema)

module.exports = Blog