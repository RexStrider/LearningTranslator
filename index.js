const express = require('express');

const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

require('./routes/yuuvis')(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT);