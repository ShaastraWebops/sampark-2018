'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newSampark;

describe('Sampark API:', function() {
  describe('GET /api/samparks', function() {
    var samparks;

    beforeEach(function(done) {
      request(app)
        .get('/api/samparks')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          samparks = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(samparks).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/samparks', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/samparks')
        .send({
          name: 'New Sampark',
          info: 'This is the brand new sampark!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newSampark = res.body;
          done();
        });
    });

    it('should respond with the newly created sampark', function() {
      expect(newSampark.name).to.equal('New Sampark');
      expect(newSampark.info).to.equal('This is the brand new sampark!!!');
    });
  });

  describe('GET /api/samparks/:id', function() {
    var sampark;

    beforeEach(function(done) {
      request(app)
        .get(`/api/samparks/${newSampark._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          sampark = res.body;
          done();
        });
    });

    afterEach(function() {
      sampark = {};
    });

    it('should respond with the requested sampark', function() {
      expect(sampark.name).to.equal('New Sampark');
      expect(sampark.info).to.equal('This is the brand new sampark!!!');
    });
  });

  describe('PUT /api/samparks/:id', function() {
    var updatedSampark;

    beforeEach(function(done) {
      request(app)
        .put(`/api/samparks/${newSampark._id}`)
        .send({
          name: 'Updated Sampark',
          info: 'This is the updated sampark!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedSampark = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSampark = {};
    });

    it('should respond with the updated sampark', function() {
      expect(updatedSampark.name).to.equal('Updated Sampark');
      expect(updatedSampark.info).to.equal('This is the updated sampark!!!');
    });

    it('should respond with the updated sampark on a subsequent GET', function(done) {
      request(app)
        .get(`/api/samparks/${newSampark._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let sampark = res.body;

          expect(sampark.name).to.equal('Updated Sampark');
          expect(sampark.info).to.equal('This is the updated sampark!!!');

          done();
        });
    });
  });

  describe('PATCH /api/samparks/:id', function() {
    var patchedSampark;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/samparks/${newSampark._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Sampark' },
          { op: 'replace', path: '/info', value: 'This is the patched sampark!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedSampark = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedSampark = {};
    });

    it('should respond with the patched sampark', function() {
      expect(patchedSampark.name).to.equal('Patched Sampark');
      expect(patchedSampark.info).to.equal('This is the patched sampark!!!');
    });
  });

  describe('DELETE /api/samparks/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/samparks/${newSampark._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when sampark does not exist', function(done) {
      request(app)
        .delete(`/api/samparks/${newSampark._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
