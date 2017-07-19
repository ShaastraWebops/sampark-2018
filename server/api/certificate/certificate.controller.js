/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/certificates              ->  index
 * POST    /api/certificates              ->  create
 * GET     /api/certificates/:id          ->  show
 * DELETE  /api/certificates/:id          ->  destroy
 */

'use strict';
import config from '../../config/environment/sendgrid.js';

import jsonpatch from 'fast-json-patch';
import Event from '../event/event.model';
//will change it later
var api_key=config.apikey;
console.log(api_key);
var sendgrid = require('sendgrid')(api_key);
var nodemailer = require('nodemailer');
var multer = require('multer');
var fs = require('fs');
var exec = require('child_process').exec;

function sendEmail(data,ename,req){
  
  // Convert HTML to PDF with wkhtmltopdf
  console.log("Come sendEmail");
  // var modifiedFirstName = data[i].name.replace(/[^a-zA-Z0-9]/g, '');
  var destinationEmail = data.participant.email;
  var eventid=req.params.eventid;
  var userid=data.participant._id;
  var text_body = 'Thank you for attending Shaastra. PFA your e-certificate.Hope the event ' + ename + ' was good';  
  fs.readFile(__dirname +'/pdfs/'+ eventid + '/' + userid +'.pdf',function(err,data){
    console.log(destinationEmail);
    // var params = {
    //   to: destinationEmail,
    //   from: 'kaarthikrajamv@gmail.com',
    //   fromname: 'Shaastra Outreach',
    //   subject: 'Shaastra 2016 || E-certificate',
    //   text: text_body,
    //   files: [{filename: ename+ 'e-certificate.pdf', content: data}]
    // };
    // var email = new sendgrid.Email(params);
                var params = {
                    to: 'pawanprasad30@gmail.com',
                    from: 'pawanprasad30@gmail.com',
                    fromname: 'hi',
                    subject: 'hi',
                    text: 'hi'
                    // text: text_body,
                    // files: [{filename: 'e-certificate.pdf', content: data}]
                };
                var email = new sendgrid.Email(params);
    sendgrid.send(email, function (err, json) {
      console.log('Error sending mail - ', err);
      console.log('Success sending mail - ', json);
    });
  });
}
function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}
function respondWithPdf(req,res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      for(var i=0; i<entity.registerations.length; i++){
        if(entity.registerations[i].attendence){
          console.log("pdf create for ",entity.registerations[i]);
          pdfConvert(entity.registerations[i],req,entity.name);
        }
      }
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}
function pdfConvert(data,req,ename){

  console.log(data);
  var dummyContent = '<!DOCTYPE html><html><head><title></title></head><body>'
                    + '<img style="width:100%" src="../../participation.jpg">'
                    + '<h3 style="position:absolute;top:42.5%;left:35%">'
                    + data.participant.name
                    +'</h3><h3 style="position:absolute;top:47%;left:32%">'
                    + data.participant.college
                    + '</h3><h3 style="position:absolute;top:51.5%;left:45%">' 
                    + data.ename 
                    + '</h3></body></html>';
  console.log("dummyContent is\n\n",dummyContent);
//add pdf style if required
  // if(req.body.hasOwnProperty('template')){
  //   dummyContent=req.body.template;
  // }
  // var dummyContent = '<!DOCTYPE html><html><head><title></title></head><body><img style="width:100%" src="./winnerscertificate.jpg"><h3 style="position:absolute;top:42.5%;left:35%">Howard</h3><h3 style="position:absolute;top:47%;left:32%">IIT Madras</h3></body></html>';
  // var modifiedFirstName = data.name.replace(/[^a-zA-Z0-9]/g, '');
  var eventid=req.params.eventid;
  var userid=data.participant._id;
  var htmlFileName = __dirname + '/htmls/'+ eventid + '/' + userid +'.html';
  var pdfFileName = __dirname + '/pdfs/'+ eventid + '/' + userid +'.pdf';
  // Save to HTML file
console.log("all var : eventid"," htmlFileName ",htmlFileName," pdfFileName ", pdfFileName);
  fs.writeFile(htmlFileName, dummyContent, function(err) {
    console.log("Came fs.writeFile" );
    if(err) { 
      console.log(err); throw err; }
    console.log("file saved to site.html");
    var child = exec("wkhtmltopdf " + htmlFileName + " " + pdfFileName, function(err, stdout, stderr) {
    if(err) { throw err; }
      console.log(stderr);
      console.log("Came 2 child_process");
      sendEmail(data,ename,req);
    });
  });
  console.log('Rendered to ' + htmlFileName + ' and ' + pdfFileName + '\n');
}


function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Certificates
export function index(req, res) {
  return Certificate.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Certificate from the DB
export function show(req, res) {
    // var filePath = '/pdfs/'+ req.params.eventid+'/'+req.user._id+'.pdf';
    var filePath = '/pdfs/'+ req.params.eventid+'/'+'hi.pdf';
// res.writeHead(200, {
//   'Content-Type': 'application/pdf',
//   'Content-Disposition': 'attachment; filename=some_file.pdf',
//   'Content-Length': data.length
// });
// res.end(pdfData);
    fs.readFile(__dirname + filePath , function (err,data){
        res.contentType("application/pdf");
        res.send(data);
    });
    return null;
}

export function mail(req,res){
  return null;
}
// mail Certificate in the DB
export function createpdf(req, res) {
  console.log("createpdf");
  return Event.findOne({_id:req.params.eventid},'name registerations _id')
    .populate('registerations.participant','name college email _id')
    .exec()
    // .then(entity=>{console.log(entity.registerations);return entity;})
    .then(respondWithPdf(req,res, 201))
    .catch(handleError(res));
}

var storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
       cb(null, _dirname + '/uploads/');
  },
  filename: function (req, file, cb) {
      // var datetimestamp = Date.now();
      cb(null,   'certificate'+ '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
  }
});
var upload = multer({ //multer settings
    storage: storage
  }).single('file');
export function create(req,res){
  upload(req,res,function(err){
    if(err){
      res.json({error_code:1,err_desc:err});
      return;
    }
    res.json({error_code:0,err_desc:null});
    return null;
  });
}

// Deletes a Certificate from the DB
export function destroy(req, res) {
  var directory='./pdfs/' + req.params.eventid + '/';
  fs.readdir(directory, (err, files) => {
    if (err) throw error;

    for (const file of files) {
      fs.unlink(path.join(directory, file), err => {
        if (err) throw error;
      });
    }
  });
  var directory='./htmls/' + req.params.eventid + '/';

  fs.readdir(directory, (err, files) => {
    if (err) throw error;

    for (const file of files) {
      fs.unlink(path.join(directory, file), err => {
        if (err) throw error;
      });
    }
  });
    res.status(201).json({success:true});
    return res.end();
}
