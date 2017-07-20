'use strict';

import angular from 'angular';
import {
  UtilService, Stylepicker
} from './util.service';

export default angular.module('samparkApp.util', [])
  .factory('Util', UtilService)
  .factory('injectCSS', Stylepicker)
  .name;
