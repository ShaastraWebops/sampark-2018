import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  awesomeThings = [];
  newThing = '';
  data='hi';
  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }

  $onInit() {
    this.$http.get('/api/things')
      .then(response => {
        this.awesomeThings = response.data;
        this.socket.syncUpdates('thing', this.awesomeThings);
      });
  }

  addThing() {
    if(this.newThing) {
      this.$http.post('/api/things', {
        name: this.newThing
      });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.put('api/events/addme/596e3cbe132b540f33fb87ba')
    .then(res => {
      this.data = res.data;
      console.log(res.data);});
    console.log(thing);
  }
  upload(){
    this.newThing="inside upload func";
    var file = angular.element(document.querySelector('#file')).prop("files")[0];
    var files = [];
    files.push(file);
    this.newThing=file;

    this.$http.post('certificates/pic/participation', {
      title: 'certificate', 
      file: file
    })
    .then(res => {
      this.data = res.data;
      console.log(res.data);
    });
  }
}

export default angular.module('samparkApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
