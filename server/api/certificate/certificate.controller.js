/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/certificates              ->  index
 * POST    /api/certificates              ->  create
 * GET     /api/certificates/:id          ->  show
 * DELETE  /api/certificates/:id          ->  destroy
 */

'use strict';
import config from '../../config/environment/sendgrid.js';

// import jsonpatch from 'fast-json-patch';
import Event from '../event/event.model';
import Feedback from '../feedback/feedback.model';
import User from '../user/user.model';

var api_key = config.apikey;
console.log("api key\n\n\n" , api_key);
var sendgrid = require('sendgrid')(api_key);
// var nodemailer = require('nodemailer');
var multer = require('multer');
var fs = require('fs');
var exec = require('child_process').exec;

function sendEmail(data, ename, req) {
  // Convert HTML to PDF with wkhtmltopdf

  // console.log('Come sendEmail');
  var destinationEmail = data.participant.email;
  var eventid = req.params.eventid;
  var userid = data.participant._id;
  var text_body = 'Thank you for attending Shaastra. PFA your e-certificate.Hope the event ' + ename + ' was good';

  fs.readFile(__dirname + '/pdfs/' + eventid + '/' + userid + '.pdf', function(err, datafile) {
    // console.log(destinationEmail);
    var params = {
      to: destinationEmail,
      from: 'kaarthikrajamv@gmail.com',
      fromname: 'Shaastra Outreach',
      subject: 'Shaastra 2016 || E-certificate',
      text: text_body,
      files: [{filename: ename + 'e-certificate.pdf', content: datafile}]
    };
    // console.log('params is \n\n', params);
    // var email = new sendgrid.Email(params);

    sendgrid.send(params, function(err, json) {
    if (err)
      console.log('Error sending mail - ', err);
    else
      console.log('Success sending mail - ', json);
    });
  });
}

// 
// function respondWithResult(res, statusCode) {
//   statusCode = statusCode || 200;
//   return function(entity) {
//     if(entity) {
//       return res.status(statusCode).json(entity);
//     }
//     return null;
//   };
// }

function respondWithPdf(req, res, statusCode) {

  statusCode = statusCode || 200;
  return function(entity) {
    console.log("\nentity of respondWithPdf",entity);
    if(entity) {
      for(var i = 0; i < entity.registrations.length; i++) {
        if(entity.registrations[i].attendance) {
          pdfConvert(entity.registrations[i], req, entity.name);
        }
      }
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}
function pdfConvert(data, req, ename) {
  var eventid = req.params.eventid;
  var userid = data.participant._id;
  var pdfFileName = __dirname + '/pdfs/' + eventid + '/' + userid + '.pdf';
  var htmlFileName = __dirname + '/htmls/' + eventid + '/' + userid + '.html';


// New Version
// fs.stat('foo.txt', function(err, stat) {
//     if(err == null) {
//         console.log('File exists');
//     } else if(err.code == 'ENOENT') {
//         // file does not exist
//         fs.writeFile('log.txt', 'Some log\n');
//     } else {
//         console.log('Some other error: ', err.code);
//     }
// });


  var dummyContent = '<!DOCTYPE html><html><head><title></title></head><body>'
                    + '<img style = "width:100%" src="../../participation.jpg">'
                    + '<h3 style = "position:absolute;top:42.5%;left:35%">'
                    + data.participant.name
                    + '</h3><h3 style = "position:absolute;top:47%;left:32%">'
                    + data.participant.college
                    + '</h3><h3 style = "position:absolute;top:51.5%;left:45%">'
                    + ename
                    + '</h3></body></html>';
  // console.log('dummyContent is\n\n', dummyContent);
  // var dummyContent = '<!DOCTYPE html><html><head><title></title></head><body><img style="width:100%" src="./winnerscertificate.jpg"><h3 style="position:absolute;top:42.5%;left:35%">Howard</h3><h3 style="position:absolute;top:47%;left:32%">IIT Madras</h3></body></html>';

console.log('write started');

  fs.exists(pdfFileName, exists => {
    if(exists){
      console.log('already created');
      return null;
    }
    else{
      fs.writeFile(htmlFileName, dummyContent, function(err) {
        console.log('Came fs.writeFile');
        if(err) {
          console.log(err); 
          throw err;
        }
        console.log('file saved to site.html');
        exec('wkhtmltopdf ' + htmlFileName + ' ' + pdfFileName, function(err, stdout, stderr) {
          if(err) {
            throw err;}
          console.log('Came 2 child_process');

          //Comment 4 lines to keep the html files saved
          fs.unlink(htmlFileName, err => {
            if(err) throw err;
            console.log('DELETED dummy html');
          });
          // sendEmail(data, ename, req);

          //uncomment to send email on creation of pdf one time only 
        });
      });
    }
    });
  // Save to HTML file

  return null;
}


// function removeEntity(res) {
//   return function(entity) {
//     if(entity) {
//       return entity.remove()
//         .then(() => {
//           res.status(204).end();
//         });
//     }
//   };
// }

// function handleEntityNotFound(res) {
//   return function(entity) {
//     if(!entity) {
//       res.status(404).end();
//       return null;
//     }
//     return entity;
//   };
// }

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}


// Gets a single Certificate from the DB
export function show(req, res) {
console.log("certificates show enter");
  var filePath = __dirname + '/pdfs/' + req.params.eventid + '/' + req.user._id + '.pdf';
  fs.readFile(filePath, function(err, data) {
    if(err) {
      res.status(403).end();
      return null;
    }
    res.contentType('application/pdf');
    res.send(data);
  });
  return null;

// Other Way to add lot of headers
// var filePath =__dirname + '/pdfs/'+ req.params.eventid+'/'+'hi.pdf';
// res.writeHead(200, {
//   'Content-Type': 'application/pdf',
//   'Content-Disposition': 'attachment; filename=some_file.pdf',
//   'Content-Length': data.length
// });
// res.end(pdfData);
}

// mail Certificate in the DB
export function mail(req, res) {
  return null;
}
export function createpdf(req, res) {
  console.log("create pdf in ");
  return Event.findOne({ _id: req.params.eventid}, 'name registrations _id')
    .populate('registrations.participant', 'name college email _id')
    .exec()
    .then(respondWithPdf(req, res, 201))
    .then(entity => {
      if(!entity){
        res.statusCode(402).end();
        return null;
      }

    })
    .catch(handleError(res));
}

var storage = multer.diskStorage({ //multers disk storage settings
  destination: function(req, file, cb) {
    cb(null, __dirname);
  },
  filename: function(req, file, cb) {
    // var datetimestamp = Date.now();
    cb(null, 'participation' + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
  }
});
var upload = multer({ //multer settings
  storage: storage
}).single('file');

export function create(req, res) {
  console.log(req);
  upload(req, res, function(err) {
    if(err) {
      res.json({ error_code: 1, err_desc: err});
      return null;
    }
    res.json({ error_code: 0, err_desc: null});
    return null;
  });
}

// Deletes an event Certificates from the DB
export function destroy(req, res) {
  var directory = __dirname + '/pdfs/' + req.params.eventid;
  fs.readdir(directory, (err, pfiles) => {
    if(err) throw err;

    for(const pfile of pfiles) {
      fs.unlink(directory + '/' + pfile, err => {
        if(err) throw err;
      });
    }
  });
  console.log('no err in pdfs');

  // i'm deleting the html files then and then to save memory 
  // you can comment del html there and uncomment here to delete whenever required
  // directory = __dirname + '/htmls/' + req.params.eventid;

  // fs.readdir(directory, (err, hfiles) => {
  //   if(err) throw err;

  //   for(const hfile of hfiles) {
  //     fs.unlink(directory + '/' + hfile, err => {
  //       if(err) throw err;
  //     });
  //   }
  // });
  res.status(201).json({ success: true});
  return res.end();
}

