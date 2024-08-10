const express = require('express');
const cors = require('cors');
const userRoutes = require('./src/routes/userRouter');
const requestRoutes = require('./src/routes/requestRouter')

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const port = 8000;

app.get('/', (req, res)=>{
    res.send('Hallo world')
})

// Rutas
app.use('/api', userRoutes);
app.use('/api', requestRoutes);


app.listen(port, ()=>{
    console.log('Server running in port ' + port)
})

