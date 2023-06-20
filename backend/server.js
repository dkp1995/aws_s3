const express = require('express')
const app = express()
const cors = require('cors')

const fileRoute = require('./routes/fileRoute')

const dotenv = require('dotenv');
dotenv.config();

app.use(cors())

app.use(express.json())

app.use('/fileUpload', fileRoute)

const PORT = process.env.PORT || 5001

app.listen( PORT, ()=>{

    console.log(`server is running ${PORT}`)
})