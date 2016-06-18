'use strict';

(function() {

class MainController {

  constructor($http) {
    this.$http = $http;
    this.awesomeThings = [];
  }

  $onInit() {
    this.$http.get('/api/things').then(response => {
      this.awesomeThings = response.data;
    });
  }
}

angular.module('mmcApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });

})();
