const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;


  })
  .catch((err) => {
    console.error(err);
  });