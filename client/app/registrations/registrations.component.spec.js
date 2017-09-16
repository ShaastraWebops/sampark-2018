'use strict';

describe('Component: RegistrationsComponent', function() {
  // load the controller's module
  beforeEach(module('sampark2018App.registrations'));

  var RegistrationsComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    RegistrationsComponent = $componentController('registrations', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
