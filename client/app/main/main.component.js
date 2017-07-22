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

  $onInit() {
    this.$http.get('/api/things')
      .then(response => {
        this.awesomeThings = response.data;
        this.socket.syncUpdates('thing', this.awesomeThings);
      });
  }

  addThing() {
    if(this.newThing) {
      this.$http.post('/api/events', {
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
    this.$http.put(`api/events/addme/${this.data._id}`)
    .then(res => {
      this.data = res.data;
      console.log(res.data);
    });
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
