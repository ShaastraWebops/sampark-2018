'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newCertificate;

describe('Certificate API:', function() {
  describe('GET /api/certificates', function() {
    var certificates;

    beforeEach(function(done) {
      request(app)
        .get('/api/certificates')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          certificates = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(certificates).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/certificates', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/certificates')
        .send({
          name: 'New Certificate',
          info: 'This is the brand new certificate!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newCertificate = res.body;
          done();
        });
    });

    it('should respond with the newly created certificate', function() {
      expect(newCertificate.name).to.equal('New Certificate');
      expect(newCertificate.info).to.equal('This is the brand new certificate!!!');
    });
  });

  describe('GET /api/certificates/:id', function() {
    var certificate;

    beforeEach(function(done) {
      request(app)
        .get(`/api/certificates/${newCertificate._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          certificate = res.body;
          done();
        });
    });

    afterEach(function() {
      certificate = {};
    });

    it('should respond with the requested certificate', function() {
      expect(certificate.name).to.equal('New Certificate');
      expect(certificate.info).to.equal('This is the brand new certificate!!!');
    });
  });

  describe('PUT /api/certificates/:id', function() {
    var updatedCertificate;

    beforeEach(function(done) {
      request(app)
        .put(`/api/certificates/${newCertificate._id}`)
        .send({
          name: 'Updated Certificate',
          info: 'This is the updated certificate!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedCertificate = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCertificate = {};
    });

    it('should respond with the updated certificate', function() {
      expect(updatedCertificate.name).to.equal('Updated Certificate');
      expect(updatedCertificate.info).to.equal('This is the updated certificate!!!');
    });

    it('should respond with the updated certificate on a subsequent GET', function(done) {
      request(app)
        .get(`/api/certificates/${newCertificate._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let certificate = res.body;

          expect(certificate.name).to.equal('Updated Certificate');
          expect(certificate.info).to.equal('This is the updated certificate!!!');

          done();
        });
    });
  });

  describe('PATCH /api/certificates/:id', function() {
    var patchedCertificate;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/certificates/${newCertificate._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Certificate' },
          { op: 'replace', path: '/info', value: 'This is the patched certificate!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedCertificate = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedCertificate = {};
    });

    it('should respond with the patched certificate', function() {
      expect(patchedCertificate.name).to.equal('Patched Certificate');
      expect(patchedCertificate.info).to.equal('This is the patched certificate!!!');
    });
  });

  describe('DELETE /api/certificates/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/certificates/${newCertificate._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when certificate does not exist', function(done) {
      request(app)
        .delete(`/api/certificates/${newCertificate._id}`)
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
