const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port =3000;
const cors=require('cors');
const commoRoutes=require('./Routes/commoRoutes');
const userRoute=require( './Routes/userRoute');
require('dotenv').config();
const mongoose=require('mongoose');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

mongoose.connect(process.env.MONGODB_URL);

app.use('/', commoRoutes);
app.use('/user', userRoute);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});


