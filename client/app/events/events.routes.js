'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('events', {
      url: '/events',
      template: '<events></events>'
    })  
    .state('eventinfo', {
      url: '/event/:eventid',
      template: '<eventinfo></eventinfo>'
    });
}
