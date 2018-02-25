myApp.controller('EditUserController', ['UserService', function(UserService) {
    console.log('EditUserController created');
    var self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;
    self.items = UserService.items
  
    // Service to add the item
    self.editUser = function (data) {
      UserService.editUser(data);
      self.newItem = UserService.newItem
    }
  }]);
  