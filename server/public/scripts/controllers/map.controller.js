myApp.controller('MapController', ['UserService', function(UserService) {
    console.log('MapController created');
    var self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;
    self.items = UserService.items
  
  }]);
  