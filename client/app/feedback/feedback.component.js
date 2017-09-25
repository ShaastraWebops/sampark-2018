'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './feedback.routes';

export class FeedbackComponent {
  /*@ngInject*/
  constructor($http) {
    this.$http=$http;
    this.feedbacks=[];
  }
  $onInit() {
    this.$http.get('/api/feedbacks').then( res=> this.feedbacks = res.data);
  }
}

export class FeedIdComponent{
  /*@ngInject*/
  constructor($http,$window,$state) {
    this.message = 'Hello fb';
    this.$http=$http;
    this.$state=$state;
    this.params=$state.params;
    this.$window=$window;
    this.quality=0;
    this.materials=0;
    this.suggestions='';
  }
submitfeedback(){
    this.message += 'Helloooo';

  this.$http.post('/api/feedbacks',{
    event:this.params.id,
    quality:this.quality,
    materials:this.materials,
    suggestions:this.suggestions
  }).then(res => {
    this.$state.go('profile');
  });
}
}


export default angular.module('sampark2018App.feedback', [uiRouter])
  .config(routes)
  .component('feedback', {
    template: require('./feedback.html'),
    controller: FeedbackComponent,
    controllerAs: '$Ctrl'
  })
  .component('feedbackid', {
    template: require('./feedbackid.html'),
    controller: FeedIdComponent,
    controllerAs: '$Ctrl'
  })
  .name;


