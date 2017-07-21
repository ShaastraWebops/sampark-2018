'use strict';

describe('Component: EditeventComponent', function() {
  // load the controller's module
  beforeEach(module('sampark2018App.editevent'));

  var EditeventComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    EditeventComponent = $componentController('editevent', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
