'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './registrations.routes';

export class RegistrationsComponent {
  /*@ngInject*/
  constructor($http,$window,$state) {
    this.$http = $http;
    this.$state= $state
    this.$window=$window;
    this.samparks=[];
    this.sampark={};
    this.nofevents=0;
    this.events=[{name:"Select Sampark First"}];
    this.event={};
    this.registrations=[];
  }
  $onInit() {
    this.$http.get('/api/samparks').then( res => {
      this.samparks=res.data;
      this.nofevents=0;

    });
  }
  eventsel(){
    this.$http.get(`/api/samparks/${this.sampark._id}`).then( res => {
      if(res.data.events.length){
      this.events=res.data.events;
      this.nofevents=1;
    }
    else{
    this.nofevents=0;
    this.events=[{name:"No Events Created Yet"}];

    }
    });
  }
  display(){
    if (this.nofevents) {
    this.$http.get(`/api/events/registrations/${this.event._id}`).then( res => {
    if(res.data.registrations.length)
      this.registrations=res.data.registrations;
    else{
    this.registrations=[{participant:{name:"NO",college:"Registrations",email:"YET"},attendance:true}];

    }
    });
  }
  }
  putattendance(index){
    this.id=this.registrations[index].participant._id;
    this.registrations[index].attendance=true;
    this.$http.put(`/api/events/${this.event._id}/user/${this.id}/attendance`)
      }
  }

export default angular.module('sampark2018App.registrations', [uiRouter])
  .config(routes)
  .component('registrations', {
    template: require('./registrations.html'),
    controller: RegistrationsComponent,
    controllerAs: '$Ctrl'
  })
  .name;
