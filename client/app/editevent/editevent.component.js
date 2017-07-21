'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './editevent.routes';

export class EditeventComponent {
  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
    this.choose = 1;
    this.city = '';
    this.curCity = '';
    this.curEvents = '';
    this.curEvent = '';
  }

  $onInit(){
    this.$http.get('/api/samparks').then(res => {
      this.sams = res.data;
    })
  }

  addEvent(){
    this.$http.post('/api/events', {
      name: this.newEvent.name,
      venue: this.newEvent.venue,
      time: this.newEvent.time,
      instructions: this.newEvent.instructions,
      sampark: this.city._id,
      registrations: []
    })
    .then(res =>{
      this.$http.get('/api/samparks/'+this.city._id).then(resp => {
        var arr = resp.data.events;
        arr.push(res.data._id);
        this.$http.put('/api/samparks/'+this.city._id,{
          events: arr
        }).then(final =>{
          alert('Successfully added');
        });
      });
    });
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

  editEvent(){
    this.$http.put('/api/events/'+this.curEvent._id,{
      name: this.curEvent.name,
      venue: this.curEvent.venue,
      time: this.curEvent.time,
      instructions: this.curEvent.instructions
    })
    .then(res => {
      alert('Successfully Updated!');
    })
  }
}

export default angular.module('sampark2018App.editevent', [uiRouter])
  .config(routes)
  .component('editevent', {
    template: require('./editevent.html'),
    controller: EditeventComponent,
    controllerAs: 'eventCtrl'
  })
  .name;
