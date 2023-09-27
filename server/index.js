const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const path = require('path')

app.use(cors());

const PORT = process.env.port
app.use(express.static(path.resolve(__dirname,"static")))

app.get('/',(req,res)=>{
    res.send('hi')
})

app.get('/env',(req,res)=>{
    res.json({key:process.env.privatekey})
})

app.listen(PORT,()=>{
    console.log('app is listining at',PORT)
})