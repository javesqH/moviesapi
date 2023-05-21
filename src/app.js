const express = require('express');

const db = require('./utils/database');

const initModels = require('./models/initModels');
const { port } = require('./config');
const moviesRouter = require('./movies/movies.routers')
const app = express();


db.authenticate()
     .then(() => console.log('DB Authentication Succesfully'))
     .catch((err) => console.log(err))

db.sync()
     .then(() => console.log('Database synced'))
     .catch((err) => console.log(err))   
     
initModels()     

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({message: 'OK!'})
})

app.use('/movies', moviesRouter)

app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})