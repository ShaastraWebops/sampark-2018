'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('editsampark', {
      url: '/editsampark',
      template: '<editsampark></editsampark>',
      // authenticate: 'core'
    })
    .state('editevent',{
    	url:'/editsampark/:smprkid',
    	template:'<editevent></editevent>',
    	// authenticate:'core'
    });
}
  