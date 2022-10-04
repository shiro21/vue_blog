const express = require('express');
const mysql = require('mysql2');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  express: express,
  mysql: mysql,
  crypto: crypto,
  uuidv4: uuidv4
}