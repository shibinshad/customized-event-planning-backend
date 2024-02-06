const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port =3000;
const cors=require('cors')
const route=require('./Routes/routes')
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.use('/user',route)

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});



