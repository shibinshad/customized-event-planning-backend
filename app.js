const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port =3000;
const cors=require('cors')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.post('/user/signup', (req, res) => {
    console.log('started');
    console.log('-------------------------------------');
    console.log('req.body',req.body);
    console.log('-------------------------------------');
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
