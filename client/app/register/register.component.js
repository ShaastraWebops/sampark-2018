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
    this.curEvent = '';
  }

  $onInit(){
    this.$http.get('/api/samparks').then(res => {
      this.sams = res.data;
    });
    this.$http.get('/api/users/me').then(res => {
      this.me = res.data;
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

  registerEvent(){
    console.log(this.curEvent);
    var arr = this.me.registered;
    
    arr.push({
      event: this.curEvent._id,
      attendance: false
    });

    var regs = this.curEvent.registrations;
    regs.push({
      participant: this.me._id,
      attendance: false
    });

    this.$http.put('/api/users/'+this.me._id, {
      registered: arr
    }).then(res => {
      this.$http.put('/api/events/'+this.curEvent._id, {
        registrations: regs
      }).then(resp =>{
        alert('Successfully Registered');
      });
    });
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
