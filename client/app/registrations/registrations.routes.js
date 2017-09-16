'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('registrations', {
      url: '/registrations',
      template: '<registrations></registrations>'
    });
}
