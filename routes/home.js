const path = require('path');
const express = require('express');
const router = express.Router();
const MemoController = require('../controller/memo')

router.get('/', MemoController.getMemos);

module.exports = router;
