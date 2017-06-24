'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var samparkCtrlStub = {
  index: 'samparkCtrl.index',
  show: 'samparkCtrl.show',
  create: 'samparkCtrl.create',
  upsert: 'samparkCtrl.upsert',
  patch: 'samparkCtrl.patch',
  destroy: 'samparkCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var samparkIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './sampark.controller': samparkCtrlStub
});

describe('Sampark API Router:', function() {
  it('should return an express router instance', function() {
    expect(samparkIndex).to.equal(routerStub);
  });

  describe('GET /api/samparks', function() {
    it('should route to sampark.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'samparkCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/samparks/:id', function() {
    it('should route to sampark.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'samparkCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/samparks', function() {
    it('should route to sampark.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'samparkCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/samparks/:id', function() {
    it('should route to sampark.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'samparkCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/samparks/:id', function() {
    it('should route to sampark.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'samparkCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/samparks/:id', function() {
    it('should route to sampark.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'samparkCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
