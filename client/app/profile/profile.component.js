'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './profile.routes';

export class ProfileComponent {
  /*@ngInject*/
  constructor($http,$state) {
    this.$http = $http;
    this.$state = $state;

  }
  $onInit() {
    this.$http.get('/api/users/me').then( res => {
      this.me=res.data;
    });
}
}

export default angular.module('sampark2018App.profile', [uiRouter])
  .config(routes)
  .component('profile', {
    template: require('./profile.html'),
    controller: ProfileComponent,
    controllerAs: '$Ctrl'
  })
  .name;
