myApp.controller('EditCatchController', ['UserService', function(UserService) {
    console.log('EditCatchController created');
    var self = this;
    self.userService = UserService;
  }]);
  