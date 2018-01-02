var app = angular.module('helloSystem', ['ui.router']);

app.config(function ($stateProvider) {

  var states = [
    {
      name     : 'hello',
      url      : '/hello',
      component: 'hello'
    },
    {
      name    : 'about',
      url     : '/about',
      template: '<h3>about page</h3>'
    },
    {
      name     : 'people',
      url      : '/people',
      component: 'people',
      resolve  : {
        people: function (PeopleService) {
          return PeopleService.getAllPeople();
        }
      }
    },
    {
      name     : 'people.person',
      url      : '/{personId}',
      component: 'person',
      resolve  : {
        person: function (people, $stateParams) {
          return people.find(function (person) {
            return person.id == $stateParams.personId;
          })
        }
      }
    }
  ];

  states.forEach(function (state) {
    $stateProvider.state(state);
  })
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

  template: '<div>' +
  '  <div>' +
  '    <h3>Some people:</h3>' +
  '    <ul>' +
  '      <li ng-repeat="person in $ctrl.people">' +
  '        <a ui-sref-active="active" ui-sref="people.person({ personId: person.id })">' +
  '          {{person.name}}' +
  '        </a>' +
  '      </li>' +
  '    </ul>' +
  '  </div>' +
  '  <ui-view></ui-view>' +
  '</div>'
});

app.component('person', {
  bindings: {person: '<'},

  template: '<h3>A person!</h3>' +
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
