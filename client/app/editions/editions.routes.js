'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('editions', {
      url: '/editions',
      template: '<editions></editions>'
    })
    .state('eventlist',{
    	url:'/editions/:samparkid',
    	template: '<eventlist></eventlist>'
    });
}
