myApp.controller('UserController', ['UserService', function (UserService) {
  // console.log('UserController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
  self.items = UserService.items

  // Service to add item
  self.addItem = function (id) {
    UserService.addItem(id);
  }
  // Service to delete item
  self.deleteItem = function (id) {
    UserService.deleteItem(id);
  }

// UserService.getCatch();
}]);