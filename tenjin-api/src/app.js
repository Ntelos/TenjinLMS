const express = require('express');
const morgan = require('morgan');
require('dotenv').config()

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('common'));

app.use('/api', require('./api/routes/index'));

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => console.log(`API Server is running at http://localhost:${PORT}`));