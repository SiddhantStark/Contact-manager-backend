//console.log("I am creating a backend project")
const express =require('express');
const dotenv = require('dotenv').config();
const app = express();
const {getContact} = require('./controllers/contactController');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');


connectDb();
app.use(express.json());
app.use('/api/contacts',require("./routes/contactRoutes"));
app.use('/api/users',require("./routes/userRoutes"));
app.use(errorHandler);

const port = process.env.PORT || 5000; 
app.listen(port, ()=> {
    console.log(`Server running on ${port}`)
})