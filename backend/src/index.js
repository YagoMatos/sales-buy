const express = require('express');
const bodyParser = require('body-parser');
const allowCors = require('./config/cors/cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(allowCors);


require('./app/controllers/index')(app);

const port = 3004;
app.listen(port);

console.log(`Server running on Port: ${port}`);
