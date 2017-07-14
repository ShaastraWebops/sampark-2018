'use strict';

var express = require('express');
var controller = require('./certificate.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

//router.get('/:eventid',auth.hasPower(), controller.index);
router.get('/:eventid/mail',auth.isAuthenticated(), controller.mail);
router.get('/:eventid',auth.isAuthenticated(), controller.show);
router.post('/:eventid',auth.hasPower(), controller.create);
router.delete('/:eventid',auth.isAuthenticated(), controller.destroy);

module.exports = router;
