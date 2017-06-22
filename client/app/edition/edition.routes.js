'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('edition', {
      url: '/edition',
      template: '<edition></edition>'
    });
}
