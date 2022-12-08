require('dotenv').config();
const  express = require('express');
const  mongoose = require('mongoose');
const cors = require('cors')

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            
    optionSuccessStatus:200
}

const dbString = process.env.DATABASE_URL;

mongoose.connect(dbString);

const routes = require('./routes/routes')
const routesB = require('./routes/routesB')

const db = mongoose.connection

db.on('error',(error)=>{
    console.log(error);
})

db.once('connected',()=>{
    console.log("connected");
})

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use('/auth',routes);
app.use('/clog',routesB);
app.listen(3000,()=>{
    console.log(`server is started at localhost ${3000}`);
})