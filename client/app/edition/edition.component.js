'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './edition.routes';

export class EditionComponent {
  /*@ngInject*/
  constructor($http) {
    this.message = 'Hello';
    this.object = $http.get('/');
  }

}

export default angular.module('sampark2018App.edition', [uiRouter])
  .config(routes)
  .component('edition', {
    template: require('./edition.html'),
    controller: EditionComponent,
    controllerAs: 'editionCtrl'
  })
  .name;
