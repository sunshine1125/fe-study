let app = angular.module('myApp', []);
app.filter('dayMinutesToHour', function() {
  return function(value) {
    if(value) {
      let val = 0;
      let a = 0;
      let b = 0;
      if(value >= 60){
        a = parseInt(value / 60);
        b = value % 60;
      }else{
        a = 0;
        b = value;
      }
      if(a < 10){
        a = '0' + a;
      }
      if(b < 10){
        b = '0' + b;
      }
      val = a + ':' + b;
      return val;
    }

  }
})
