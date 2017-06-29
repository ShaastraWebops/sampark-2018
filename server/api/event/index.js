'use strict';

var express = require('express');
var controller = require('./event.controller');

var router = express.Router();
import * as auth from '../../auth/auth.service';

router.get('/', controller.index);
router.get('/:id', controller.show);

//userid fron session
router.get('/myregis', auth.isAuthenticated(), controller.myregis);
router.put('/addme/:eventid', auth.isAuthenticated(), controller.regisuser);
router.delete('/delme/:eventid/', auth.isAuthenticated(), controller.deregister);

router.put('/:eventid/user/:userid/attendence', auth.hasRole('admin'), controller.putattendence);
router.get('/registrations/:eventid', auth.hasRole('admin'), controller.eventregis);

// router.put('/:eventid/user/:userid/left', auth.hasRole('admin'), controller.putabsence);

router.post('/', auth.hasRole('core'), controller.create);
router.put('/:id', auth.hasRole('core'), controller.upsert);
router.put('/:eventid/admin/:adminid', auth.hasRole('core'), controller.addadmin);
router.delete('/:eventid/admin/:adminid', auth.hasRole('core'), controller.removeadmin);
router.patch('/:id', auth.hasRole('core'), controller.patch);
router.delete('/:id', auth.hasRole('core'), controller.destroy);


module.exports = router;
