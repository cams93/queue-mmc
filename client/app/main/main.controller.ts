'use strict';

(function() {

class MainController {

  constructor($http, $scope) {
    this.$http = $http;
    this.awesomeThings = [];
    $scope.p0 = "NaN";
    $scope.l = "NaN";
    $scope.w = "NaN";
    $scope.lq = "NaN";
    $scope.wq = "NaN";
    $scope.p = "NaN";
    $scope.chanel = "";
    $scope.lambda = "";
    $scope.tasa = "";

    $scope.submitForm = function(isValid) {
      if(isValid){
        $scope.calculatePO();
        $scope.calculateL();
        $scope.calculateW();
        $scope.calculateLQ();
        $scope.calculateWQ();
        $scope.calculateP();
      }
    };
    $scope.calculatePO = function(){
      var result = 0;
      var fact = 0;
      for(var i = 0; i < $scope.chanel; i++){
        fact = $scope.rFact(i);
        result = result + (1 / fact) * Math.pow($scope.lambda / $scope.tasa, i);
      }
      fact = $scope.rFact($scope.chanel);
      result = result + (1 / fact) * Math.pow($scope.lambda / $scope.tasa, $scope.chanel) *
        (($scope.chanel * $scope.tasa) / ($scope.chanel * $scope.tasa - $scope.lambda));
      result = 1 / result;
      $scope.p0 = Math.round(result * 1000) / 1000;
    };
    $scope.rFact = function(num){
      var rval = 1;
      for (var i = 2; i <= num; i++) {
        rval = rval * i;
      }
      return rval;
    };
    $scope.calculateL = function(){
      var result = 0;
      var fact = 0;
      fact = $scope.rFact($scope.chanel - 1);
      result = result + $scope.lambda * $scope.tasa * Math.pow($scope.lambda / $scope.tasa, $scope.chanel) * $scope.p0;
      result = result / (fact * Math.pow($scope.chanel * $scope.tasa - $scope.lambda, 2));
      result = result + ($scope.lambda / $scope.tasa);
      $scope.l = Math.round(result * 1000) / 1000;
    };
    $scope.calculateW = function(){
      var result = 0;
      result = $scope.l / $scope.lambda;
      $scope.w = Math.round(result * 1000) / 1000;
    };
    $scope.calculateLQ = function(){
      var result = 0;
      result = $scope.l - $scope.lambda / $scope.tasa;
      $scope.lq = Math.round(result * 1000) / 1000;
    };
    $scope.calculateWQ = function(){
      var result = 0;
      result = $scope.lq / $scope.lambda;
      $scope.wq = Math.round(result * 1000) / 1000;
    };
    $scope.calculateP = function(){
      var result = 0;
      result = $scope.lambda / ($scope.chanel * $scope.tasa);
      $scope.p = Math.round(result * 1000) / 1000;
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
