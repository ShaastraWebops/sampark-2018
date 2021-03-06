'use strict';

var express = require('express');
import * as auth from '../../auth/auth.service';
var controller = require('./feedback.controller');

var router = express.Router();

router.get('/',  auth.isAuthenticated(), controller.index);
router.get('/:id',  auth.isAuthenticated(), controller.show);
router.post('/', auth.isAuthenticated(),  controller.create);

module.exports = router;
