const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000

const mysql = require('mysql')
const bodyParser = require('body-parser')//Mideware

const connection = mysql.createConnection({
    host:'127.0.0.1',
    user: 'root',
    password:'',
    database:'cadastro'

})

const pessoas = require('./routes/pessoas')

const dependencias = {
    connection
}

app.use(bodyParser.urlencoded({extended:false}))

app.use(express.static('public'))

app.get('/',(req, res)=> res.render('home'))
app.use('/pessoas', pessoas(dependencias))

// view engine
app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs')

connection.connect((err)=>{
    if (!err){
        app.listen(port, ()=>console.log('Crud listening on port: ',port))
    }else{
            console.log('conecado, mas sem conexão com a base de dados. ')
        }
    }
)