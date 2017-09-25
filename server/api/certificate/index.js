'use strict';

var express = require('express');
var controller = require('./certificate.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

/*
no /api/ in url ie not api/certificates/:eventid
just localhost:3000/certificates
*/
//router.get('/:eventid',auth.hasPower(), controller.index);
// router.get('/:eventid/mail',auth.isAuthenticated(), controller.mail);
////// USE IFRAME TO DISPLAY
////// install wkhtmltopdf separately , not in package.json
router.get('/:eventid', auth.isAuthenticated(), controller.show);
router.post('/:eventid', auth.hasRole('core'), controller.createpdf);
router.post('/pic/participation',[auth.hasRole('core')], controller.create);
router.delete('/:eventid', auth.hasRole('core'), controller.destroy);

module.exports = router;
