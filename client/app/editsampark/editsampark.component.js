'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './editsampark.routes';

export class EditsamparkComponent {
  /*@ngInject*/
  constructor($http,$window,$state) {
    this.$http = $http;
    this.$state= $state
    this.$window=$window;
    this.tab = 1;
    this.sampark={};
    this.samparkid={};
    this.edit=false;
  }
  $onInit() {
    this.$http.get('/api/samparks').then( res => {
      this.samparks=res.data;
    });
}
  setTab(newTab){
      this.tab = newTab;
      this.edit=false;

    }

  isSet(tabNum){
      return this.tab === tabNum;
    }
  oneditclick(samparkedit){
    this.samparkid=samparkedit;
    this.edit=true;
  }
 addsampark(){
  this.$http.post('/api/samparks',this.sampark).then(res =>{
    this.$window.alert("Successfully Registered");
    this.$window.location.reload();
  });
 }
editevent(smprk){
this.$state.go('editevent',{smprkid:smprk._id});
}
savesampark(){
    this.$http.put(`/api/samparks/${this.samparkid._id}`,this.samparkid).then( res => {
    this.$window.alert("Successfully Saved");
    this.$window.location.reload();
  });
}
remove(smprk){
  if(this.$window.confirm("Confirm Delete " + smprk.name)){
    this.$http.delete(`/api/samparks/${smprk._id}`).then(res =>{
    this.$window.alert("Successfully Deleted");
    this.$window.location.reload();

    });
  }
}
}

export class EditeventComponent {
  /*@ngInject*/
  constructor($http,$window,$state){
    this.$http=$http;
    this.$window=$window;
    this.$state=$state;
    this.params=$state.params;
    this.sampark={};
    this.event={};
    this.eventid={};
    this.tab = 1;
    this.edit=false;
}
  $onInit(){
    this.$http.get(`/api/samparks/${this.params.smprkid}`).then(res => {
      this.sampark =  res.data;
      this.event.sampark = res.data._id;

    });
  }
  oneditclick(eventedit){
    this.eventid=eventedit;
    this.edit=true;
  }
  setTab(newTab){
      this.tab = newTab;
      this.edit=false;

    }

  isSet(tabNum){
      return this.tab === tabNum;
    }
 addevent(){
  this.$http.post('/api/events',this.event).then(res =>{
    this.$window.alert("Successfully Registered");
    this.$window.location.reload();
  });
}
saveevent(){
    this.$http.put(`/api/events/${this.eventid._id}`,this.eventid).then( res => {
    this.$window.alert("Successfully Saved");
    this.$window.location.reload();
  });
}
remove(event){
  if(this.$window.confirm("Confirm Delete " + event.name)){
    this.$http.delete(`/api/events/${event._id}`).then(res =>{
    this.$window.alert("Successfully Deleted");
    this.$window.location.reload();

    });
  }
}
}

export default angular.module('sampark2018App.editsampark', [uiRouter])
  .config(routes)
  .component('editsampark', {
    template: require('./editsampark.html'),
    controller: EditsamparkComponent,
    controllerAs: '$Ctrl'
  })
  .component('editevent', {
    template: require('./editevent.html'),
    controller: EditeventComponent,
    controllerAs: '$Ctrl'
  })
  .name;
