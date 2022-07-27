const express = require('express')
const { graphql, buildSchema } = require('graphql')
const { graphqlHTTP } = require('express-graphql');
const states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming', 'Puerto Rico', 'Guam', 'US Virgin Islands', 'Northern Mariana Islands', 'American Samoa', 'Midway Atoll', 'Palmyra Atoll', 'Baker Island', 'Howland Island', 'Jarvis Island', 'Johnston Atoll', 'Kingman Reef', 'Wake Island', 'Navassa Island']

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
  const matcher = new RegExp(`^${key}`, 'i');
  return array.filter(word => word.match(matcher));
}


// try to get the message from App.Vue

const rootValue = {
  // language: (args) => [args.key]
  language: (args) => startsWith(states, args.key)

}


app.use(cors())
app.use('/graphql', graphqlHTTP({
  rootValue, schema, graphiql: true
}))



app.listen(4000, () => console.log('Listening on 4000'))



module.exports = router;
