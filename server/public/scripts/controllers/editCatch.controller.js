myApp.controller('EditCatchController', ['UserService', function(UserService) {
    console.log('EditCatchController created');
    var self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;
    self.items = UserService.items
  
    // Service to add the item
    self.addItem = function (data) {
      UserService.addItem(data);
      self.newItem = UserService.newItem
    }
  }]);
  