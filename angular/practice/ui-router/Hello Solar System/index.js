var app = angular.module('helloSystem', ['ui.router']);

app.config(function ($stateProvider) {

  var helloState = {
    name     : 'hello',
    url      : '/hello',
    component: 'hello'
  };

  var aboutState = {
    name    : 'about',
    url     : '/about',
    template: '<h3>about page</h3>'
  };

  var peopleState = {
    name     : 'people',
    url      : '/people',
    component: 'people',
    resolve  : {
      people: function (PeopleService) {
        console.log(PeopleService.getAllPeople());
        return PeopleService.getAllPeople();
      }
    }
  };

  var personState = {
    name     : 'person',
    url      : '/people/{personId}',
    component: 'person',
    resolve  : {
      person: function (PeopleService, $transition$) {
        return PeopleService.getPerson($transition$.params().personId);
      }
    }
  };

  $stateProvider.state(helloState);
  $stateProvider.state(aboutState);
  $stateProvider.state(peopleState);
  $stateProvider.state(personState);
});

app.service('PeopleService', ['$http', function ($http) {
  return {
    getAllPeople: getAllPeople,
    getPerson   : getPerson
  };

  function getAllPeople() {
    return $http.get('data.json').then(function (res){
      return res.data;
    });
  };

  function getPerson(id) {
    function personMatchesParam(person) {
      return person.id === id;
    }
    return getAllPeople().then(function (people) {
      return people.find(personMatchesParam);
    });
  };
}]);



app.component('hello', {
  template  : '<h3>{{$ctrl.greeting}} Solar System!</h3>' +
  '<button ng-click="$ctrl.toggleGreeting()">toggle greeting</button>',
  controller: function () {
    this.greeting = 'hello';

    this.toggleGreeting = function () {
      this.greeting = (this.greeting === 'hello') ? 'whats up' : 'hello';
    }
  }
});

app.component('people', {
  bindings: {people: '<'},

  template: '<h3>Some people:</h3>' +
  '<pre>{{$ctrl | json}}</pre>' +
  '<ul>' +
  '<li ng-repeat="person in $ctrl.people">' +
  '<a ui-sref="person({ personId: person.id })">' +
  '{{person.name}}' +
  '</a>' +
  '</li>' +
  '</ul>'
});

app.component('person', {
  bindings: {person: '<'},

  template: '<h3>A person!</h3>' +
    '<pre>1111{{$ctrl.person | json}}</pre>' +
  '<p>' +
  'Name: {{$ctrl.person.name}}' +
  '</p>' +
  '<p>' +
  'Id: {{$ctrl.person.id}}' +
  '</p>' +
  '<p>' +
  'Company: {{$ctrl.person.company}}' +
  '</p>' +
  '<p>' +
  'Address: {{$ctrl.person.address}}' +
  '</p>' +
  '<button ui-sref="people">Close</button>'
});
