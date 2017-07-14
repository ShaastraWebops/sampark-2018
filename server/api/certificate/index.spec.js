'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var certificateCtrlStub = {
  index: 'certificateCtrl.index',
  show: 'certificateCtrl.show',
  create: 'certificateCtrl.create',
  upsert: 'certificateCtrl.upsert',
  patch: 'certificateCtrl.patch',
  destroy: 'certificateCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var certificateIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './certificate.controller': certificateCtrlStub
});

describe('Certificate API Router:', function() {
  it('should return an express router instance', function() {
    expect(certificateIndex).to.equal(routerStub);
  });

  describe('GET /api/certificates', function() {
    it('should route to certificate.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'certificateCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/certificates/:id', function() {
    it('should route to certificate.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'certificateCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/certificates', function() {
    it('should route to certificate.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'certificateCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/certificates/:id', function() {
    it('should route to certificate.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'certificateCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/certificates/:id', function() {
    it('should route to certificate.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'certificateCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/certificates/:id', function() {
    it('should route to certificate.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'certificateCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
