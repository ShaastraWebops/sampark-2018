'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var feedbackCtrlStub = {
  index: 'feedbackCtrl.index',
  show: 'feedbackCtrl.show',
  create: 'feedbackCtrl.create',
  upsert: 'feedbackCtrl.upsert',
  patch: 'feedbackCtrl.patch',
  destroy: 'feedbackCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var feedbackIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './feedback.controller': feedbackCtrlStub
});

describe('Feedback API Router:', function() {
  it('should return an express router instance', function() {
    expect(feedbackIndex).to.equal(routerStub);
  });

  describe('GET /api/feedbacks', function() {
    it('should route to feedback.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'feedbackCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/feedbacks/:id', function() {
    it('should route to feedback.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'feedbackCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/feedbacks', function() {
    it('should route to feedback.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'feedbackCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/feedbacks/:id', function() {
    it('should route to feedback.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'feedbackCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/feedbacks/:id', function() {
    it('should route to feedback.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'feedbackCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/feedbacks/:id', function() {
    it('should route to feedback.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'feedbackCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
