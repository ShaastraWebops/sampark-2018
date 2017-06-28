'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './events.routes';

export class EventsComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}
export class EventsInfoComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}
export default angular.module('sampark2k18App.events', [uiRouter])
  .config(routes)
  .component('events', {
    template: require('./events.html'),
    controller: EventsComponent,
  })  
  .component('eventinfo', {
    template: require('./eventinfo.html'),
    controller: EventsInfoComponent,
  })
  .name;

    // controllerAs: 'eventsinfoCtrl'
 
