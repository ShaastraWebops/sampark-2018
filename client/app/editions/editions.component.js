'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './editions.routes';

export class EditionsComponent {
  /*@ngInject*/
  constructor($http,$state,$window) {
    this.$http=$http;
    this.$state=$state;
    this.$window=$window;
    this.samparks={};

  }
  $onInit() {
    this.$http.get('/api/samparks').then( res => {
      this.samparks=res.data;
    });
}
  sgo(id){
    this.$state.go(`eventlist`,{samparkid:id});
  }
}

export class EventListComponent{
  /*@ngInject*/
  constructor($http,$state,$window){
    this.$http=$http;
    this.$state=$state;
    this.$window=$window;
    this.params=$state.params;
    this.sampark={};
    this.mess="ello";
  }
    $onInit() {
    this.$http.get(`/api/samparks/${this.params.samparkid}`).then( res => {
      this.events=res.data.events;
    });
  }
  register(id){
    this.$http.put(`/api/events/addme/${id}`).then(res =>{
    this.$window.alert("Successfully Registered");
    this.$state.go('profile');
    });
  }

}

export default angular.module('sampark2018App.editions', [uiRouter])
  .config(routes)
  .component('editions', {
    template: require('./editions.html'),
    controller: EditionsComponent,
    controllerAs: '$Ctrl'
  })
  .component('eventlist', {
    template: require('./eventlist.html'),
    controller: EventListComponent,
    controllerAs: '$Ctrl'
  })
  .name;
