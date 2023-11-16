const express = require("express");
const app = express();
// const mysql = require('mysql2');

const http = require("http");
const server = http.createServer(app);
const cors = require('cors');
const dotenv = require('dotenv/config');
const passport = require('passport');

const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Web Token
const jwt = require('jsonwebtoken');

app.use(cors( { origin: '*' }));

app.get('/ping', (req, res) => {
  console.log('PING')
  res.status(200).json({
    code: 'y'
  })
})

// Parser
app.use(express.json({ limit: "50mb"}));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// Passport
app.use(session({ secret: 'scretkey', resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// DB
const connections = require('./config/connections');
connections.connect(err => {
  if (err) return console.error('Connections Err', err);
  console.log('DB Connect');
})

app.use('/api/auth', require('./controllers/authController'));
app.use('/api/editor', require('./controllers/editorController'));

const port = process.env.PORT || 3000;

app.set("port", port)
server.listen(port, () => {
  console.log(`
    Project Server
    Running Port : localhost:${port}
    Started Time : ${Date()}
  `)
});

module.exports = app;