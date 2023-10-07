var express = require('express');
const { createPost } = require('../controller/createPost');
const { updatePost } = require('../controller/updatePost');
const { deletePost } = require('../controller/deletePost');
var router = express.Router();

/* GET post listing. */
router.get('/', function (req, res, next)