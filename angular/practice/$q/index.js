var MyApp = angular.module('MyApp',[]);

MyApp.controller('ListCtrl', ['$scope','$http', '$q', function($scope, $http ,$q){
  $scope.name = 'sunshine1125';

  function demo(){
    var deferred = $q.defer(), that = this;
    if (that.cache == undefined) {
      $http.get('https://api.github.com/users/${$scope.name}')
        .then(function(data, status, headers){
          that.cache = data.data;
          deferred.resolve(that.cache);
        })
    }else {
      console.log('from cache');
      deferred.resolve(that.cache);
    }
    return deferred.promise;
  }


  // 利用闭包缓存结果
  function demo2() {
    var defer = $q.defer(), cache;
    return function() {
      if (cache == undefined) {
        $http.get('https://api.github.com/users/${$scope.name}')
          .then(function(res) {
          cache = res.data;
        defer.resolve(cache);
      })
      }else {
        console.log('from cache');
        defer.resolve(cache);
      }
      return defer.promise;
    }
  }



  // 点击加载
  var startDemo = demo2();
  $scope.load = function() {
    startDemo().then(function(data){
      $scope.list = data;
    })
  }

}])
