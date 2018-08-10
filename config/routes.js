const db = require('knex')(require('../knexfile').development)
const { authenticate } = require('./middlewares');
const { jwtKey } = require('../_secrets/keys')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const axios = require('axios');


module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

async function register(req, res) {
  if (!req.body || !req.body.username || !req.body.password) {
    res.status(400).send('please provide username and password')
  }

  try {
    const hash = await bcrypt.hash(req.body.password, 10)
    const userDetails = {
      username: req.body.username,
      password: hash
    }
    const ids = await db('users').insert(userDetails)
    
    const user = await db('users')
      .where('id', '=', ids[0])
      .first()

    res.status(200).send(generateUserToken(user))
    
  } catch (err) {
    res.status(500).json(err.message)
  }
}

async function login(req, res) {
  if (!req.body || !req.body.username || !req.body.password) {
  }
  try { 
    const user = await db('users')  
      .where('username', '=', req.body.username)
      .first()
    const success = await bcrypt.compare(
      req.body.password,
      user.password
    )
    success
      ? res.status(200).send(generateUserToken(user))
      : res.status(401).send('invalid credentials')
  } catch (err) {
    res.status(500).json(err.message)
  }
}

function generateUserToken(user) {
  const payload = {
    username: user.username
  }
  const options = {
    expiresIn: '1h',
    jwtid: '1'
  }
  return jwt.sign(payload, jwtKey, options)
}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
