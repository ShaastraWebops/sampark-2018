'use strict';

describe('Component: EditionComponent', function() {
  // load the controller's module
  beforeEach(module('sampark2018App.edition'));

  var EditionComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    EditionComponent = $componentController('edition', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
