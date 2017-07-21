'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('editevent', {
      url: '/editevent',
      template: '<editevent></editevent>'
    });
}
