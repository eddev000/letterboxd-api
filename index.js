const express = require('express');
const app = express();

const cors = require('cors');
const filme = require('./router/filmsearch')

app.use(cors())
app.use(filme)



app.listen(process.env.PORT || 5000)
