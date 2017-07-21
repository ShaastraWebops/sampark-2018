'use strict';

describe('Component: EditsamparkComponent', function() {
  // load the controller's module
  beforeEach(module('sampark2018App.editsampark'));

  var EditsamparkComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    EditsamparkComponent = $componentController('editsampark', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
