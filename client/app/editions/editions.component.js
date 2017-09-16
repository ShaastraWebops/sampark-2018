'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './editions.routes';

export class EditionsComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('sampark2018App.editions', [uiRouter])
  .config(routes)
  .component('editions', {
    template: require('./editions.html'),
    controller: EditionsComponent,
    controllerAs: 'editionsCtrl'
  })
  .name;
