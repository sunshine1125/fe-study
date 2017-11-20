let app = angular.module('cart', []);
app.controller('cartsController',  ['$scope', 'cartFactory', function ($scope, cartFactory) {
  $scope.titles = ["名称", "单价", "数量", "总计", "操作"];
  $scope.flag = true;
  $scope.cartData = cartFactory.getCartList();
  // 计算商品总价
  $scope.totalPrice = function() {
    let sum = 0;
    let count = 0;
    angular.forEach($scope.cartData.data, function(value) {
      if(value.hasChecked) {
        count++;
        // 如果商品全部被选中，则为全选
        if(count === $scope.cartData.data.length ){
          $scope.flag = true;
        }
        sum += value.num * value.price;
      }else{
        $scope.flag = false;
      }
    });
    return sum;
  };
  // 计算商品总数量
  $scope.totalNum = function() {
    let sum = 0;
    angular.forEach($scope.cartData.data, function(value) {
      if(value.hasChecked) {
        sum += value.num;
      }else{
        $scope.flag = false;
      }
    });
    return sum;
  };
  // 清空购物车
  $scope.clearAll = function(obj) {
    obj.length = 0;
  };
  // 删除单个商品
  $scope.remove = function(index) {
    angular.forEach($scope.cartData.data, function(value,key) {
      if(index === value.id){
        $scope.cartData.data.splice(key, 1)
      }
    })
  };
  // 判断全选
  $scope.chooseAll = function() {
    $scope.flag = !$scope.flag;
    angular.forEach($scope.cartData.data, function(value) {
      value.hasChecked = $scope.flag;
    })
  };
  // 判断单选
  $scope.checkOne = function(index) {
    $scope.cartData.data[index].hasChecked = !$scope.cartData.data[index].hasChecked;
    return $scope.cartData.data[index].hasChecked;
  };

}]);

app.factory('cartFactory', function() {

  return {
    getCartList: getCartList
  };

  function getCartList() {

    return {
      "data": [
        {
          "id": 0,
          "title": "demo1",
          "num": 1,
          "price": 10,
          "hasChecked": true
        },
        {
          "id": 1,
          "title": "demo2",
          "num": 3,
          "price": 12,
          "hasChecked": true
        },
        {
          "id": 2,
          "title": "demo3",
          "num": 1,
          "price": 6,
          "hasChecked": true
        }
      ]
    };
  }


});
