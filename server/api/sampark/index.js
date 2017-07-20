'use strict';

var express = require('express');
var controller = require('./sampark.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);

router.post('/', auth.hasRole('core'), controller.create);

router.put('/:id', auth.hasRole('core'), controller.upsert);
router.put('/activate/:id/:state', auth.hasRole('core'), controller.actst);
router.patch('/:id', auth.hasRole('core'), controller.patch);

router.delete('/:id', auth.hasRole('core'), controller.destroy);

module.exports = router;
