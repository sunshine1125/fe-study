angular.module('cart', [])
  .controller('carts', function carts() {
    this.titles = ["name","price", "num", "total"];
    this.cartData = {
      "data": [
        {
          "title": "demo1",
          "num": 1,
          "price": 10
        },
        {
          "title": "demo2",
          "num": 3,
          "price": 12
        },
        {
          "title": "demo3",
          "num": 1,
          "price": 6
        }
      ]
    };

    this.count = function() {
      let sum = 0;
      angular.forEach(this.cartData.data,function(value){
        sum += value.num * value.price;
      });
      return sum;
    }
  });
