const express = require("express");
const path = require("path");
const cors = require("cors");
const grapqlHTTLP = require('express-graphql');
const schema = require('./schema');
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use('/graphql',grapqlHTTLP({
    schema,
    graphiql:true
}))

mongoose
    .connect('mongodb+srv://kaboo:123123nko@kaboo-dzvqk.mongodb.net/kaboo?retryWrites=true&w=majority',{ useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true })
    .then(()=>{console.log("MongoDb was connected")})
    .catch((err)=>{console.log(err);})








if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})









