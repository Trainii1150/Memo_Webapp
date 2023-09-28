const express = require('express');
const path = require('path');
const router = express.Router();

const MemoController = require('../controller/memo')


router.get('/add-note',MemoController.getAddMemo);

router.post('/add-note',MemoController.PostAddMemo);

module.exports = router;