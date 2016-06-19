'use strict';

(function() {

class MainController {

  constructor($http, $scope) {
    this.$http = $http;
    this.awesomeThings = [];
    // function to submit the form after all validation has occurred
    $scope.submitForm = function(isValid) {

      // check to make sure the form is completely valid
      if (isValid) {
        alert('our form is amazing');
      }

    };
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
