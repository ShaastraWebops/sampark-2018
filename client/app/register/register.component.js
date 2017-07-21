'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './register.routes';

export class RegisterComponent {
  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
    this.curCity = '';
    this.curEvents = '';
  }

  $onInit(){
    this.$http.get('/api/samparks').then(res => {
      this.sams = res.data;
    })
  }

  cityChanged(){
    this.$http.get('/api/samparks/'+this.curCity._id).then(res =>{
      this.curids = res.data.events;
      this.curEvents = []
      for(var i=0; i<this.curids.length; i++)
      {
        this.$http.get('/api/events/'+this.curids[i]).then(res =>{
          this.curEvents.push(res.data);
        })
      }
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
