/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/events              ->  index
 * POST    /api/events              ->  create
 * GET     /api/events/:id          ->  show
 * PUT     /api/events/:id          ->  upsert
 * PATCH   /api/events/:id          ->  patch
 * DELETE  /api/events/:id          ->  destroy
 * get('/myregis', myregis)
 * patch('/addme/:eventid', regisuser)
 * delete('/delme/:eventid/', deregister)
 * patch('/:eventid/user/:userid/attendence', putattendence)
 * get('/registrations/:eventid', eventregis)
 * put('/:eventid/admin/:adminid', addadmin)

 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Event from './event.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      // eslint-disable-next-line prefer-reflect
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
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

// Gets a list of Events
export function index(req, res) {
  return Event.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Event from the DB
export function show(req, res) {
  return Event.findById(req.params.id, '-registrations').exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Event in the DB
export function create(req, res) {
  return Event.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Event in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Event.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Event in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Event.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Event from the DB
export function destroy(req, res) {
  return Event.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

export function myregis(req, res){
  return Event.find(
      {'registrations.participant':req.user._id},'-registrations')
    .populate('admins','name email phone')
    .exec()
    .then(respondWithResultWithoutParticipants(res))
    .catch(handleError(res));
}
export function regisuser(req, res){
  var registration={participant:req.user._id,attendence:false};
  return Event.findOneAndUpdate(
      {_id: req.params.eventid},
      {$push: {registrations: registration}},
      {new: true, upsert: false, setDefaultsOnInsert: true, runValidators: true})
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}
export function deregister(req, res){
  return Event.findOneAndupdate(
      { _id: req.params.eventid , 'registrations.participant':req.user._id},
      {$pull: { registrations: {participant: req.user.id} } })
    .exec() 
    .then(respondWithResult(res))
    .catch(handleError(res));
}
export function putattendence(req, res){
  return Event.findOneAndupdate(
      { _id: req.params.eventid , 'registrations.participant':req.params.userid},
      {$set: { 'registrations.$.attendence':true } })
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}
export function eventregis(req, res){
  return Event.findById(req.params.eventid).exec()
    .populate('registrations.participant','-password -salt')
    .exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}
export function addadmin(req, res){
  return Event.findOneAndUpdate(
      {_id: req.params.eventid},
      {$push: { 'admins': req.params.adminid } },
      {new: true, upsert: false, setDefaultsOnInsert: true, runValidators: true})
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}
export function removeadmin(req, res){
  return Event.findOneAndupdate(
      {_id: req.params.eventid , admins:req.params.adminid},
      {$pull: { admins:req.params.adminid } })
    .exec()   
    .then(respondWithResult(res))
    .catch(handleError(res));
}