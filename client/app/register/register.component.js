'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './register.routes';

export class RegisterComponent {
  /*@ngInject*/
  constructor($http) {
    this.message = 'Hello';
    this.$http = $http;
  }

  $onInit(){
    this.$http.get('/api/samparks').then(res => {
      this.sams = res.data;
    })
  }
}

export default angular.module('sampark2018App.register', [uiRouter])
  .config(routes)
  .component('register', {
    template: require('./register.html'),
    controller: RegisterComponent,
    controllerAs: 'registerCtrl'
  })
  .name;
