'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('editsampark', {
      url: '/editsampark',
      template: '<editsampark></editsampark>'
    });
}
