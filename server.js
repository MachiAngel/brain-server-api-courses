
require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

const register = require('./controllers/register.js')
const signin = require('./controllers/signin.js')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const port = process.env.PORT || 3001

const { db } = require('./db/pgdb.js')


console.log('db:')
console.log(db)

var bcrypt = require('bcrypt');

app.use(cors())

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


app.get('/',(req,res) => { 
  res.send(database.users)
})


app.post('/signin',(req,res) => { signin.handleSignin(req,res,db,bcrypt)})


app.post('/register', (req, res) => { register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id',(req,res) => {profile.handleProfileGet(req,res,db)})

app.put('/image', (req,res) => {image.handleImage(req,res,db)})
app.post('/imageurl', (req, res) => { image.handleImage(req, res, db) })

app.listen(port, () => {
  console.log(`app is running on port ${port}`)
  console.log(`app is running on ${process.env.NODE_ENV} mode`)
})


