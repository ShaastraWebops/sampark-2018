'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './editsampark.routes';

export class EditsamparkComponent {
  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
    this.choose = 1;
  }

  $onInit(){
    this.newCity = {
      name: '',
      venue: '',
      venueLink: '',
      time: '',
      contact: ''
    };
    this.curCity = '';
    this.$http.get('/api/samparks').then(res =>{
      this.sams = res.data;
    })
  }

  addCity(){
    this.$http.post('/api/samparks', {
      name: this.newCity.name,
      venue: this.newCity.venue,
      venueLink: this.newCity.venueLink,
      time: this.newCity.time,
      contact: this.newCity.contact
    })
    .then(res =>{
      alert('Successfully Added');
      this.newCity = {
        name: '',
        venue: '',
        venueLink: '',
        time: '',
        contact: ''
      };
    });
  }

  editCity(){
    this.$http.put('/api/samparks/'+this.curCity._id, {
      name: this.curCity.name,
      venue: this.curCity.venue,
      venueLink: this.curCity.venueLink,
      time: this.curCity.venueLink,
      contact: this.curCity.contact
    })
    .then(res => {
      alert('Successfully Updated!');
    });
  }
}

export default angular.module('sampark2018App.editsampark', [uiRouter])
  .config(routes)
  .component('editsampark', {
    template: require('./editsampark.html'),
    controller: EditsamparkComponent,
    controllerAs: 'samparkCtrl'
  })
  .name;
