'use strict';

var express = require('express');
var controller = require('./event.controller');

var router = express.Router();
import * as auth from '../../auth/auth.service';

router.get('/', controller.index);
router.get('/:id', controller.show);

//userid from session
router.get('/myregis/all', auth.isAuthenticated(), controller.myregis);
router.put('/addme/:eventid', auth.isAuthenticated(), controller.regisuser);
router.delete('/delme/:eventid/', auth.isAuthenticated(), controller.deregister);

router.put('/:eventid/user/:userid/attendance', auth.hasPower(), controller.putattendance);
router.get('/registrations/:eventid', auth.hasPower(), controller.eventregis);

// router.put('/:eventid/user/:userid/left', auth.hasPower(), controller.putabsence);

router.post('/', auth.hasRole('core'), controller.create);
router.put('/:id', auth.hasRole('core'), controller.upsert);
// router.put('/:eventid/admin/:adminid', auth.hasRole('core'), controller.addadmin);
// router.delete('/:eventid/admin/:adminid', auth.hasRole('core'), controller.removeadmin);
// router.patch('/:id', auth.hasRole('core'), controller.patch);
router.delete('/:id', auth.hasRole('core'), controller.destroy);

module.exports = router;
