var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngTable', 'ngMessages'])
  .config(function($mdThemingProvider) {

  $mdThemingProvider.theme('default')
    .primaryPalette('blue', {
      'default': '400', // by default use shade 400 from the blue palette for primary intentions
      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': '800' // use shade 800 for the <code>md-hue-3</code> class
    })
      .warnPalette('red')
      .accentPalette('lime', {
        'default': 'A200', // by default use shade A200 from the blue palette for primary intentions
        'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
        'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
        'hue-3': '800' // use shade 800 for the <code>md-hue-3</code> class
      })
      .backgroundPalette('grey', {
        'default': '50', // by default use shade 50 from the blue palette for primary intentions
      })
      .dark();
  });

/// Routes ///
myApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  // console.log('myApp -- config')
  $routeProvider
    .when('/', {
      redirectTo: 'home'
    })
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'LoginController as vm',
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController as vm'
    })
    .when('/user', {
      templateUrl: '/views/templates/user.html',
      controller: 'UserController as vm',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/events', {
      templateUrl: '/views/templates/events.html',
      controller: 'UserController as vm',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/addItem', {
      templateUrl: '/views/templates/addItem.html',
      controller: 'UserController as vm',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/info', {
      templateUrl: '/views/templates/info.html',
      controller: 'InfoController as vm',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/editUser', {
      templateUrl: '/views/templates/editUser.html',
      controller: 'UserController as vm',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/editCatch', {
      templateUrl: '/views/templates/editCatch.html',
      controller: 'UserController as vm',
      resolve: {
        getCatch: function (UserService) {
          return UserService.getCatch();
        }
      }
    })
    .when('/saveCatchEdit', {
      templateUrl: '/views/templates/user.html',
      controller: 'UserController as vm',
      resolve: {
        getCatch: function (UserService) {
          return UserService.getCatch();
        }
      }
    })
    .otherwise({
      template: '<h1>404</h1>'
    });
}]);