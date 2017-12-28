var app = angular.module('helloSystem', ['ui.router']);

app.config(function ($stateProvider) {
  var helloState = {
    name: 'hello',
    url: '/hello',
    component: 'hello'
  };
  var aboutState = {
    name: 'about',
    url: '/about',
    template: '<h3>about page</h3>'
  };
  var peopleState = {
    name: 'people',
    url: '/people',
    component: 'people',
    resolve: {
      people: function (PeopleService) {
        return PeopleService.getAllPeople();
      }
    }
  }

  $stateProvider.state(helloState);
  $stateProvider.state(aboutState);
});

app.component('hello', {
  template: '<h3>{{$ctrl.greeting}} Solar System!</h3>' +
            '<button ng-click="$ctrl.toggleGreeting()">toggle greeting</button>',
  controller: function () {
    this.greeting = 'hello';

    this.toggleGreeting = function () {
      this.greeting = (this.greeting == 'hello') ? 'whats up' : 'hello';
    }
  }
})
