myApp.controller('EditUserController', ['UserService', function(UserService) {
    console.log('EditUserController created');
    var self = this;
    self.userService = UserService;
  }]);
  