'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './editsampark.routes';

export class EditsamparkComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('sampark2018App.editsampark', [uiRouter])
  .config(routes)
  .component('editsampark', {
    template: require('./editsampark.html'),
    controller: EditsamparkComponent,
    controllerAs: 'editsamparkCtrl'
  })
  .name;
