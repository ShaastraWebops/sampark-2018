'use strict';

describe('Component: EditionsComponent', function() {
  // load the controller's module
  beforeEach(module('sampark2018App.editions'));

  var EditionsComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    EditionsComponent = $componentController('editions', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
