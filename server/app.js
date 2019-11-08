const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const mongo = require('mongodb').MongoClient;
const cors =  require('cors');

const schema = require('./schema/schema');

const app = express();

// allow cross-origin requests
app.use(cors());

//Set up mongoose connection
const uri = 'mongodb://127.0.0.1:27017/movies';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
mongoose.connection.once('open', () => { console.log('DB Connected successfull!'); });
mongoose.connection.once('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

const port = 4000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
