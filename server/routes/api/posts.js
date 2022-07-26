const express = require('express')
const { graphql, buildSchema } = require('graphql')
const { graphqlHTTP } = require('express-graphql');
const states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']

const cors = require('cors');
const { query } = require('express');

const router = express.Router();
const app = express()

const schema = buildSchema(`
  type Query {
    language(key: String): [String]
  }
`)


function startsWith(array, key) {
  const matcher = new RegExp(`^${key}`, 'g');
  return array.filter(word => word.match(matcher));
}


// try to get the message from App.Vue
const key = 'C'





const rootValue = {
  language: (args) => startsWith(states, args.key)
}

// Get Posts
// router.get('/', async (req, res) => {
//   res.send('filtered states');

// });

// router.get('/:bookId', async (req, res) => {

//   var key = req.params
//   // res.send(key)
//   const result = startsWith(states, key)
//   res.send(result)
// })


app.use(cors())
app.use('/graphql', graphqlHTTP({
  rootValue, schema, graphiql: true
}))



app.listen(4000, () => console.log('Listening on 4000'))



module.exports = router;
