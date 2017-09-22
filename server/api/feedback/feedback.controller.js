/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/feedbacks              ->  index
 * POST    /api/feedbacks              ->  create
 * GET     /api/feedbacks/:id          ->  show
 * PUT     /api/feedbacks/:id          ->  upsert
 * PATCH   /api/feedbacks/:id          ->  patch
 * DELETE  /api/feedbacks/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Feedback from './feedback.model';
import User from '../user/user.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
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

// Gets a list of Feedbacks
export function index(req, res) {
  return Feedback.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Feedback from the DB
export function show(req, res) {
  return Feedback.find({event:req.params.id}).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Feedback in the DB
export function create(req, res) {
  return Feedback.create(req.body)
    .then(entity => {
      if(entity){
      User.findOneAndUpdate({ _id:req.user._id , 'registered.event':req.body.event , 'registered.attendance':true}, {$set: { 'registered.$.feedback':true } }).exec()
      .then(entity => {
        return entity;
      });
      }
      return entity;
    })
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}


// Deletes a Feedback from the DB
// export function destroy(req, res) {
//   return Feedback.findById(req.params.id).exec()
//     .then(handleEntityNotFound(res))
//     .then(removeEntity(res))
//     .catch(handleError(res));
// }
