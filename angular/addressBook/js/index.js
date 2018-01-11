var app = angular.module('addressBook', ['ngMaterial']);

app.controller('addressBookController', ['$scope', 'addressData', '$mdDialog', function ($scope, addressData, $mdDialog) {

  $scope.isDisabled = false;
  $scope.searchData = [];
  addressData.getData().then(function (res) {
    $scope.todos = res.data;
  }).then(function () {
    $scope.querySearch = function (query) {
      angular.forEach($scope.todos, function (value) {
        angular.forEach(value.child, function (value) {
          $scope.searchData.push(value);
        })
      });
      $scope.states = $scope.searchData;
      return query ? $scope.states.filter(createFilterFor(query)) : $scope.states;
    };

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(state) {
        return (state.name.indexOf(lowercaseQuery) !== -1);
      };

    }
  });

  $scope.openPersonInfo = openPersonInfo;

  function openPersonInfo($event, item) {
    return $mdDialog.show({
      controller         : openPersonInfoController,
      parent             : angular.element(document.body),
      clickOutsideToClose: true,
      targetEvent        : $event,
      templateUrl        : 'openPersonInfoDialog.html',
      locals             : {
        item: item
      }
    });

    function openPersonInfoController($scope, $mdDialog, item) {
      $scope.item = item;
      $scope.sure = function () {
        $mdDialog.hide();
      };
    }
  }
}]);

app.service('addressData', function ($http) {
  return {
    getData: getData
  };

  function getData() {
    return $http.get('http://localhost:3000/data');

  }
});

// app.filter('searchPerson', function (addressData) {
//   var data;
//   return function (value) {
//     addressData.getData().then(function (res) {
//       data = res.data;
//     });
//     data.find(function (item) {
//       return item.who === value;
//     })
//   }
// });
