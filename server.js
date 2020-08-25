const http = require('http')
const fs = require('fs')
const _ = require('lodash')

const server = http.createServer((req,res)=>{
    const greet = _.once(()=>{
        console.log('hai machans');
    })
    greet();
    greet();
    res.setHeader('content-type','text/html')
    let path = './views/';
    switch(req.url){
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path +=  'about.html';
            res.statusCode = 200;
            break;
        case '/about-blah':
            res.statusCode = 303;
            res.setHeader('Location','/about')
            res.end()
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }
    fs.readFile(path,(error, data)=>{
        if(error){
            console.log(error);
            res.end()

        }else{
            res.write(data)
            res.end()
        }
    })
    
})

server.listen(3000,'localhost',()=>{
     console.log('activly listening');
})