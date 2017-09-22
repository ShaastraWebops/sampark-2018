import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  awesomeThings = [];
  newThing = '';
  samparkid='';
  data='hi';
  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }

  addThing() {
    if(this.newThing) {
      this.$http.put('/api/events/addme/597736c44cf5f20b2c421aff', {
        name: this.newThing
      })
      .then(res => {
        this.data= res.data;
        console.log(data);
      });
       }
      this.newThing = '';
    }

  deleteThing(thing) {
    this.$http.post('certificates/597736c44cf5f20b2c421aff')
    .then(res => {
      this.data = res.data;
      console.log(res.data);
    });
    console.log(thing);
  }
}

export default angular.module('samparkApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
