'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './registrations.routes';

export class RegistrationsComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('sampark2018App.registrations', [uiRouter])
  .config(routes)
  .component('registrations', {
    template: require('./registrations.html'),
    controller: RegistrationsComponent,
    controllerAs: 'registrationsCtrl'
  })
  .name;
