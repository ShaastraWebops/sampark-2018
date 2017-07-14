/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/certificates              ->  index
 * POST    /api/certificates              ->  create
 * GET     /api/certificates/:id          ->  show
 * DELETE  /api/certificates/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Event from '../event/event.model';

function sendEmail(i){
  // Convert HTML to PDF with wkhtmltopdf
  console.log("Come sendEmail" + i);
  var modifiedFirstName = data[i].name.replace(/[^a-zA-Z0-9]/g, '');
  var destinationEmail = data[i].email;
  var text_body = "Thank you for attending Shaastra. PFA your e-certificate.";  
  fs.readFile('pdfs/'+ modifiedFirstName +'.pdf',function(err,data){
    console.log(destinationEmail);
    var params = {
      to: destinationEmail,
      from: 'kaarthikrajamv@gmail.com',
      fromname: 'Shaastra Outreach',
      subject: 'Shaastra 2016 || E-certificate',
      text: text_body,
      files: [{filename: 'e-certificate.pdf', content: data}]
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
function respondWithMail(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}
    function pdfConvert(i){
        console.log(i);
        var dummyContent = '<!DOCTYPE html><html><head><title></title></head><body><img style="width:100%" src="../uploads/participation.jpg"><h3 style="position:absolute;top:42.5%;left:35%">' + data[i].name + '</h3><h3 style="position:absolute;top:47%;left:32%">' + data[i].college + '</h3><h3 style="position:absolute;top:51.5%;left:45%">' + data[i].event + '</h3></body></html>';
        // var dummyContent = '<!DOCTYPE html><html><head><title></title></head><body><img style="width:100%" src="../uploads/winnerscertificate.jpg"><h3 style="position:absolute;top:42.5%;left:35%">Howard</h3><h3 style="position:absolute;top:47%;left:32%">IIT Madras</h3></body></html>';
        var modifiedFirstName = data[i].name.replace(/[^a-zA-Z0-9]/g, '');
        var htmlFileName = "htmls/"+ modifiedFirstName +".html", pdfFileName = "pdfs/"+ modifiedFirstName +".pdf";
    
        // Save to HTML file
        fs.writeFile(htmlFileName, dummyContent, function(err) {
            console.log("Came fs.writeFile" + i);
            if(err) { 
              console.log(err); throw err; }
            util.log("file saved to site.html");

            var child = exec("wkhtmltopdf " + htmlFileName + " " + pdfFileName, function(err, stdout, stderr) {
                if(err) { throw err; }
                util.log(stderr);
                console.log("Came 2 child_process" + i);
                sendEmail(i);
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
  return Certificate.findById(req.params.eventid).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithmail(res))
    .catch(handleError(res));
}
export function create(req,res){
  return null;
}
// mail Certificate in the DB
export function mail(req, res) {
  return Event.find({_id:req.params.eventid,'registrations.participant':req.user._id},'name')
    .populate('registrations.participant','name college')
    .exec()
    .then(respondWithMail(res, 201))
    .catch(handleError(res));
}


// Deletes a Certificate from the DB
export function destroy(req, res) {
  return Certificate.findById(req.params.eventid).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
