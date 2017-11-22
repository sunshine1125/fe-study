let app = angular.module('groupApp',[]);
app.controller('groupController', ['$scope', 'dataFactory', function($scope, dataFactory) {
  $scope.items = dataFactory.data();
  $scope.setFlag = function(index){
    $scope.items.map(function(v, i){
      i === index ? v.flag = true : v.flag = false;
    })
  };
}]);
app.factory('dataFactory', function() {
  return {
    data : data
  };
  function data() {
    return [
      {val: 1, flag: true},
      {val: 2, flag: false},
      {val: 3, flag: false},
      {val: 4, flag: false},
      {val: 5, flag: false},
      {val: 6, flag: false},
    ];
  }
});
